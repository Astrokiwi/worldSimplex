import {createNoise3D} from "https://cdn.skypack.dev/simplex-noise@4.0.0";
import alea from 'https://cdn.skypack.dev/alea';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let seed = "seed";
let projection = "equirectangular";
let rotationOffset = 0.;

let renderer;
let scene;
let sphere;
let controls;
const camera = new THREE.PerspectiveCamera(45, 2.0, 0.1, 1000);
camera.position.z = 3.;

const baseWidth = 1024;
const baseHeight = 512;

let baseHeightMap = new Array(baseWidth*baseHeight);

//let heightChart = numeric.random([1024,720]);
    

function simplexPowerSpectrumSum(x,y,z,noise3D) {
    let scales = [0.03,0.01,0.007,0.002,0.0002];
    let weights = [0.05,0.2,.2,1.,.5];
    
    let totalValue = 0.;
    let norm = 0.;

    for ( let ispec=0; ispec<weights.length; ispec++ ) {
        norm+=weights[ispec];
        totalValue+=noise3D(x*scales[ispec],y*scales[ispec],z*scales[ispec])*weights[ispec];
    }
    totalValue/=norm;
    totalValue=(totalValue+1)/2.;// from -1 to 1 to 0-1

    return totalValue;
}

function latLongTo3D(lat,long,radius) {
    let z = Math.sin(lat);
    let sliceRadius = Math.sqrt(1-z**2);
    let x = Math.sin(long)*sliceRadius;
    let y = Math.cos(long)*sliceRadius;

    return [x*radius,y*radius,z*radius];
}

function colorFromHeightLatLong(height,lat,long) {
    const seaHeight = 0.6;
    const temperatureCutoff = 0.8;

    let outColor = [0,0,0,255];

    if ( height<seaHeight ) {
        height=height/seaHeight;
        outColor[0]=height*50;
        outColor[1]=height*50;
        outColor[2]=150+100*height;
    } else {
        height = ((height-seaHeight)/(1-seaHeight))**2;
        let temperature = Math.min(Math.cos(lat)+height*0.2,1);

        let sand = [180,133,63];
        let lush = [34,139,34];
        let cold = [240,248,255];

        if ( temperature>temperatureCutoff ) {
            let interp = (temperature-temperatureCutoff)/(1-temperatureCutoff);
            for ( let ic = 0 ; ic<3 ; ic++ ) {
                outColor[ic] = sand[ic]*interp + lush[ic]*(1-interp);
            }
        } else {
            let interp = temperature/temperatureCutoff;
            for ( let ic = 0 ; ic<3 ; ic++ ) {
                outColor[ic] = lush[ic]*interp + cold[ic]*(1-interp);
            }
        }
        for ( let ic = 0 ; ic<3 ; ic++ ) {
            outColor[ic] += height * (240-outColor[ic])
        }
    }

    return outColor;
}

function gridCoordToLatLong(ix,iy,width,height,projection) {
    let lat,long;

    projection = projection.toLowerCase().replace(/\s+/g, '');

    switch(projection) {
        case 'equirectangular':
            long = ix/width*2*Math.PI;
            lat = (iy-height/2)/height*Math.PI;
            break; 
        case 'orthographic':
            let x;
            if (ix<width/2) {
                x = (ix-width/4)/height*2;
            } else {
                x = (ix-3*width/4)/height*2;
            }
            let z = (iy/height-0.5)*2;

            let y = Math.sqrt(1.-x*x-z*z);

            // let r = Math.sqrt(x*x+y*y);
            lat = Math.asin(z);

            if (ix<width/2) {
                long = Math.atan2(x,y)+rotationOffset;
            } else {
                long = Math.atan2(-x,-y)+rotationOffset;
            }
            if ( long<0. ) {
                long+=2.*Math.PI;
            }
            long = long%(2.*Math.PI);

            break;
    }
    return [lat,long];
}

function generateBaseMap() {
    const radius = 512;

    // let baseMapImage = new ImageData();
    
    let prng = new alea(seed);
    const noise3D = createNoise3D(prng);

    // long 0 to 2pi, lat -pi/2 to pi/2
    for (let ix=0 ; ix<baseWidth ; ix++ ) {
        for ( let iy = 0 ; iy<baseHeight ; iy++ ) {
            let long = ix*2.*Math.PI/baseWidth;
            let lat = iy*Math.PI/baseHeight-Math.PI/2.;

            let coords3d = latLongTo3D(lat,long,radius);

            baseHeightMap[ix+iy*baseWidth] = simplexPowerSpectrumSum(coords3d[0],coords3d[1],coords3d[2],noise3D);
        }
    }
}

function renderMap() {
    if (projection=="orthographic") {
        switchToCanvas3d();
        resizeCanvas();
        renderMap3d();
    } else {
        switchToCanvas2d();
        resizeCanvas();
        renderMap2d();
    }
}

function switchToCanvas3d() {
    let canvas2d = document.getElementById("mapCanvas");
    let canvas3d = document.getElementById("mapCanvas3d");
    canvas2d.style.display = 'none';
    canvas3d.style.display = 'block';
}

function switchToCanvas2d() {
    let canvas2d = document.getElementById("mapCanvas");
    let canvas3d = document.getElementById("mapCanvas3d");
    canvas2d.style.display = 'block';
    canvas3d.style.display = 'none';
}

function initMap3d() {
    let c = document.getElementById("mapCanvas3d");

    // Create the scene
    scene = new THREE.Scene();

    // Create the renderer
    renderer = new THREE.WebGLRenderer({ canvas: c });
    // Add orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smoothly rotate sphere

    renderMap3d();

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        controls.update();


        // Rotate the sphere for some animation
        // if (sphere) {
        //     sphere.rotation.y += 0.01;
        // }

        renderer.render(scene, camera);
    }

    animate();

}

function renderMap3d() {
    let c = document.getElementById("mapCanvas3d");

    // Create a sphere geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    // Create a canvas to draw the uniform color
    const colormapCanvas = document.createElement('canvas');
    colormapCanvas.width = baseWidth;
    colormapCanvas.height = baseHeight;
    const context = colormapCanvas.getContext('2d');

    // Create a texture from the color canvas
    const colormapTexture = new THREE.CanvasTexture(colormapCanvas);
    let width = colormapCanvas.width;
    let height = colormapCanvas.height;

    // Generate texture
    let chartImage = new ImageData(width,height);
    let chartColorMap = chartImage.data;

    let lat;
    let long;

    for (let ix=0 ; ix<width ; ix++ ) {
        for ( let iy = 0 ; iy<height ; iy++ ) {
            [lat,long] = gridCoordToLatLong(ix,iy,width,height,"equirectangular");
            if (!isFinite(lat) || !isFinite(long) ) {
                    for ( let ic=0 ; ic<3 ; ic++ ) {
                        chartColorMap[(ix+iy*width)*4+ic]=0;
                    }
                    chartColorMap[(ix+iy*width)*4+3]=255;
                    continue;
            }

            let xmap = Math.floor(long*baseWidth/(2.*Math.PI));
            let ymap = Math.floor((lat+Math.PI/2.)/(Math.PI)*baseHeight);

            let cellHeight = baseHeightMap[xmap+ymap*baseWidth];

            let cellColor = colorFromHeightLatLong(cellHeight,lat,long);
            for ( let ic=0 ; ic<4 ; ic++ ) {
                chartColorMap[(ix+iy*width)*4+ic]=cellColor[ic];
            }
        }
    }
    context.putImageData(chartImage,0,0);


    // Create a material with the color texture
    const material = new THREE.MeshBasicMaterial({ map: colormapTexture });

    // Create the mesh
    if (sphere) {
        scene.remove(sphere);
        sphere.geometry.dispose();
        sphere.material.dispose();
        sphere = null;
    }
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    renderer.render(scene, camera);

    // Handle window resize
    // window.addEventListener('resize', () => {
    //     camera.aspect = c.width / c.height;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize(c.width,c.height);
    // });    
}

function renderMap2d() {
    let c = document.getElementById("mapCanvas");
    let ctx = c.getContext("2d");

    let width = c.width;
    let height = c.height;
    // let width = 2048;
    // let height = 1024;

    let chartImage = new ImageData(width,height);
    let chartColorMap = chartImage.data;

    let lat;
    let long;

    // let minlat=1.,maxlat=1.;
    // let minlong=1.,maxlong=1.;

    // let baseHeightMap = generateLatLongMap();

    for (let ix=0 ; ix<width ; ix++ ) {
        for ( let iy = 0 ; iy<height ; iy++ ) {
            [lat,long] = gridCoordToLatLong(ix,iy,width,height,projection);
            if (!isFinite(lat) || !isFinite(long) ) {
                    for ( let ic=0 ; ic<3 ; ic++ ) {
                        chartColorMap[(ix+iy*width)*4+ic]=0;
                    }
                    chartColorMap[(ix+iy*width)*4+3]=255;
                    continue;
            }

            // let coords3d = latLongTo3D(lat,long,radius);

            // let cellHeight = simplexPowerSpectrumSum(coords3d[0],coords3d[1],coords3d[2],noise3D);

            let xmap = Math.floor(long*baseWidth/(2.*Math.PI));
            let ymap = Math.floor((lat+Math.PI/2.)/(Math.PI)*baseHeight);

            let cellHeight = baseHeightMap[xmap+ymap*baseWidth];

            let cellColor = colorFromHeightLatLong(cellHeight,lat,long);
            for ( let ic=0 ; ic<4 ; ic++ ) {
                chartColorMap[(ix+iy*width)*4+ic]=cellColor[ic];
            }

            // minlong = Math.min(long,minlong);
            // minlat = Math.min(lat,minlat);
            // maxlong = Math.max(long,maxlong);
            // maxlat = Math.max(lat,maxlat);
        }
    }
    // console.log(minlong,maxlong,minlat,minlong);
    ctx.putImageData(chartImage,0,0);
}

// function animateIf3D() {
//     projection = projection.toLowerCase().replace(/\s+/g, '');
//     if ( projection=='orthographic' ) {
//         rotationOffset+= 2*Math.PI/36.;
//         if (rotationOffset>2*Math.PI ) {
//             rotationOffset-=2.*Math.PI;
//         }
//         //renderMap();
//     }

//     setTimeout(animateIf3D, 100);
// }

function resizeCanvas() {
    const aspectRatio = 2.0;
    let canvas;
    let wrapper;
    if ( projection=='orthographic' ) {
        canvas = document.getElementById('mapCanvas3d');
        wrapper = document.querySelector('.canvas-wrapper3d');
    } else {
        canvas = document.getElementById('mapCanvas');
        wrapper = document.querySelector('.canvas-wrapper');
    }

    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientWidth/aspectRatio;

    if ( projection=='orthographic' ) {
        renderer.setSize(canvas.width,canvas.height);
    } else {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

let debounceTimeout;
let isImmediateCall = true;

function debounceWithImmediate(func, delay) {
    return function() {
        const context = this;
        const args = arguments;
        
        if (isImmediateCall) {
            func.apply(context, args);
            isImmediateCall = false;
        }
        
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            func.apply(context, args);
            isImmediateCall = true;
        }, delay);
    };
}

function resizeCanvasAndRenderMap() {
    resizeCanvas();
    renderMap();
}

function changeSeed () {
    seed = Math.random().toString();
    generateBaseMap();
    renderMap();
}

function onLoad () {
    generateBaseMap();
    debouncedResizeCanvasAndRenderMap();
    initMap3d();
}

const debouncedResizeCanvasAndRenderMap = debounceWithImmediate(resizeCanvasAndRenderMap, 200);

window.addEventListener('resize', debouncedResizeCanvasAndRenderMap);
window.addEventListener('load', onLoad);
document.getElementById('changeSeed').addEventListener('click', changeSeed);

export function toggleProjectionDropdown(newProjection) {
    projection = newProjection;
    renderMap();
}

window.toggleProjectionDropdown = toggleProjectionDropdown;

// Start animation thread
// animateIf3D();

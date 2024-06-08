import {createNoise3D} from "https://cdn.skypack.dev/simplex-noise@4.0.0";
const noise3D = createNoise3D();

//let heightChart = numeric.random([1024,720]);

let chartImage = new ImageData(1024,720);
let chartColorMap = chartImage.data;

const radius = 512;
const seaHeight = 0.6;
const temperatureCutoff = 0.8;

function simplexPowerSpectrumSum(x,y,z) {
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

function latLongTo3D(lat,long) {
    let z = Math.sin(lat);
    let sliceRadius = Math.sqrt(1-z**2);
    let x = Math.sin(long)*sliceRadius;
    let y = Math.cos(long)*sliceRadius;

    return [x*radius,y*radius,z*radius];
}

function colorFromHeightLatLong(height,lat,long) {
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

function renderMap() {
    let c = document.getElementById("mapCanvas");
    let ctx = c.getContext("2d");
    
    for (let ix=0 ; ix<1024 ; ix++ ) {
        for ( let iy = 0 ; iy<720 ; iy++ ) {
            // let cellHeight = simplexPowerSpectrumSum(ix,iy,0);
            let long = ix/512*Math.PI;
            let lat = (iy-360)/720*Math.PI;

            let coords3d = latLongTo3D(lat,long);
            let cellHeight = simplexPowerSpectrumSum(coords3d[0],coords3d[1],coords3d[2]);
            let cellColor = colorFromHeightLatLong(cellHeight,lat,long);

            for ( let ic=0 ; ic<4 ; ic++ ) {
                chartColorMap[(ix+iy*1024)*4+ic]=cellColor[ic];
            }
            // if (iy<5 && ix<5) {
            //     console.log(cellHeight,chartColorMap[(ix*720+iy)*4]);
            // }
        }
    }
    ctx.putImageData(chartImage,0,0);
}

renderMap();
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class OneWorld3DRenderer {

    constructor(c,worldMap) {
        this.camera = new THREE.PerspectiveCamera(45, 2.0, 0.1, 1000);
        this.camera.position.z = 3.;

        // let c = document.getElementById("mapCanvas3d");

        // Create the scene
        this.scene = new THREE.Scene();

        // Create the renderer
        this.renderer = new THREE.WebGLRenderer({ canvas: c });
        // Add orbit controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true; // Smoothly rotate sphere
        this.sphere = null;

        this.renderMap3d(worldMap);


        requestAnimationFrame(this.animate);
    }
    
    setSize(w,h) {
        this.renderer.setSize(w,h);
    }

    // Animation loop
    animate = () => {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    }

    renderMap3d(worldMap) {
        // Create a sphere geometry
        const geometry = new THREE.SphereGeometry(1, 32, 32);

        // Create a canvas to draw the uniform color
        const colormapCanvas = document.createElement('canvas');
        colormapCanvas.width = worldMap.baseWidth;
        colormapCanvas.height = worldMap.baseHeight;
        const context = colormapCanvas.getContext('2d');

        // Create a texture from the color canvas
        const colormapTexture = new THREE.CanvasTexture(colormapCanvas);

        context.putImageData(worldMap.generateColorMap(colormapCanvas.width,colormapCanvas.height,"equirectangular"),0,0);


        // Create a material with the color texture
        const material = new THREE.MeshBasicMaterial({ map: colormapTexture });

        // Create the mesh
        if (this.sphere) {
            this.scene.remove(this.sphere);
            this.sphere.geometry.dispose();
            this.sphere.material.dispose();
            this.sphere = null;
        }
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);

        this.renderer.render(this.scene, this.camera);

    }


    resetCamera() {
        this.controls.target.set(0, 0, 0);
        this.camera.position.x = 0.;
        this.camera.position.y = 0.;
        this.camera.position.z = 3.;
    }

}

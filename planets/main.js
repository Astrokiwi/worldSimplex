import { WorldMap } from './map.js';
import { OneWorld3DRenderer } from './OneWorld3DRenderer.js';

let seed = "seed";
let projection = "equirectangular";

const singleMap = new WorldMap(seed);
const world3DRender = new OneWorld3DRenderer(document.getElementById("mapCanvas3d"),singleMap);

function renderMap() {
    if (projection=="orthographic") {
        switchToCanvas3d();
        resizeCanvas();
        world3DRender.renderMap3d(singleMap);
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

function renderMap2d() {
    let c = document.getElementById("mapCanvas");
    let ctx = c.getContext("2d");

    ctx.putImageData(singleMap.generateColorMap(c.width,c.height,projection),0,0);
}

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
        world3DRender.setSize(canvas.width,canvas.height);
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
function enterSeed() {
    seed = document.getElementById("seedInput").value;
    singleMap.generateBaseMap(seed);
    renderMap();
}

function randomSeed () {
    seed = Math.random().toString();
    document.getElementById('seedInput').value = seed;
    singleMap.generateBaseMap(seed);
    renderMap();
}

function onLoad () {
    singleMap.generateBaseMap(seed);
    debouncedResizeCanvasAndRenderMap();
}

const debouncedResizeCanvasAndRenderMap = debounceWithImmediate(resizeCanvasAndRenderMap, 200);

function toggleProjectionDropdown(newProjectionEvent) {
    projection = newProjectionEvent.target.value;
    renderMap();
}

window.addEventListener('resize', debouncedResizeCanvasAndRenderMap);
window.addEventListener('load', onLoad);
document.getElementById('randomSeed').addEventListener('click', randomSeed);
document.getElementById('enterSeed').addEventListener('click', enterSeed);
document.getElementById('resetCamera').addEventListener('click', world3DRender.resetCamera);
document.getElementById('projections').addEventListener('change', toggleProjectionDropdown);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockCanvas_1 = require("./MockCanvas");
const THREE = require("three");
function renderThreeSceneToPdf(scene, camera, renderWidth, renderHeight) {
    //--Renderer
    const glContext = require('gl')(100, 100);
    let canvasGL = new MockCanvas_1.default();
    let renderer = new THREE.WebGLRenderer({ context: glContext,
        antialias: true,
        canvas: canvasGL });
    renderer.setRenderTarget(new THREE.WebGLRenderTarget(renderWidth, renderHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat
    }));
    renderer.render(scene, camera);
    //--Save to file
    let gl = renderer.getContext();
    let pixels = new Uint8Array(4 * renderWidth * renderHeight);
    gl.readPixels(0, 0, renderWidth, renderHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    const PNG = require('pngjs').PNG;
    var png = new PNG({ width: renderWidth, height: renderHeight });
    // lines are vertically flipped in the FBO / need to unflip them
    for (var j = 0; j < renderHeight; j++) {
        for (var i = 0; i < renderWidth; i++) {
            let k = j * renderWidth + i;
            let r = pixels[4 * k];
            let g = pixels[4 * k + 1];
            let b = pixels[4 * k + 2];
            let a = pixels[4 * k + 3];
            let m = (renderHeight - j + 1) * renderWidth + i;
            png.data[4 * m] = r;
            png.data[4 * m + 1] = g;
            png.data[4 * m + 2] = b;
            png.data[4 * m + 3] = a;
        }
    }
    return png.pack();
}
exports.renderThreeSceneToPdf = renderThreeSceneToPdf;

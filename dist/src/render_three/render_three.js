"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const MockCanvas_1 = __importDefault(require("./MockCanvas"));
const THREE = __importStar(require("three"));
const gl_1 = __importDefault(require("gl"));
const pngjs_1 = __importDefault(require("pngjs"));
function renderThreeSceneToPdf(scene, camera, renderWidth, renderHeight) {
    //--Renderer
    const glContext = gl_1.default(100, 100);
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
    const PNG = pngjs_1.default.PNG;
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

"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __importStar(require("three"));
const fs = __importStar(require("fs"));
const render_three_1 = require("../src/render_three");
//--Renderer
let renderWidth = 800;
let renderHeight = 800;
//--Scene
let scene = new THREE.Scene();
scene.background = new THREE.Color().setRGB(0.98, 0.98, 1);
scene.fog = new THREE.Fog(0x777777, 500, 2000);
var geometry = new THREE.PlaneBufferGeometry(50000, 50000);
geometry.rotateX(-3.14 / 2);
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xDDDDDD });
var ground = new THREE.Mesh(geometry, planeMaterial);
ground.castShadow = true;
ground.receiveShadow = true;
scene.add(ground);
ground.castShadow = true;
ground.receiveShadow = true;
scene.add(ground);
//--light
scene.add(new THREE.AmbientLight(0x777777));
var light = new THREE.DirectionalLight(0xffffff, 0.6);
light.position.set(2000, 1500, 1500);
light.castShadow = true;
light.shadow.mapSize.width = 4000;
light.shadow.mapSize.height = 4000;
scene.add(light);
//--Camera
let camera = new THREE.PerspectiveCamera(75, renderWidth / renderHeight, 0.1, 1000);
camera.position.set(0, 50, 1000);
camera.up = new THREE.Vector3(0, 1, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));
//--Objects
var octa = new THREE.Mesh(new THREE.OctahedronGeometry(100, 1), new THREE.MeshPhongMaterial({ color: 0xfffDF0 }));
octa.translateY(100);
octa.castShadow = true;
octa.receiveShadow = true;
scene.add(octa);
//--Save to file
var stream = fs.createWriteStream('./test1.png');
render_three_1.renderThreeSceneToPdf(scene, camera, renderWidth, renderHeight).pipe(stream);
stream.on('close', () => console.log('The PNG file was created.'));

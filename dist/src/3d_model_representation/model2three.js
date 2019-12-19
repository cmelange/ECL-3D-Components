"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = require("three");
const model_three_material_container_1 = require("./model_three_material_container");
const math_1 = require("./math");
const vector3d_1 = require("./vector3d");
const three_1 = require("three");
function modelGeometry2TreeGeometry(geometry) {
    let three_geometry = new THREE.BufferGeometry();
    three_geometry.name = geometry.id;
    let triangles = geometry.geometry.toTriangles();
    let positions = [];
    let normals = [];
    let uvs = [];
    for (let i = 0; i < triangles.length; ++i) {
        let ax = triangles[i].vertices[0].pos.x;
        let ay = triangles[i].vertices[0].pos.y;
        let az = triangles[i].vertices[0].pos.z;
        let au = triangles[i].vertices[0].uv.x;
        let av = triangles[i].vertices[0].uv.y;
        positions.push(ax, ay, az);
        uvs.push(au, av);
        let bx = triangles[i].vertices[1].pos.x;
        let by = triangles[i].vertices[1].pos.y;
        let bz = triangles[i].vertices[1].pos.z;
        let bu = triangles[i].vertices[1].uv.x;
        let bv = triangles[i].vertices[1].uv.y;
        positions.push(bx, by, bz);
        uvs.push(bu, bv);
        let cx = triangles[i].vertices[2].pos.x;
        let cy = triangles[i].vertices[2].pos.y;
        let cz = triangles[i].vertices[2].pos.z;
        let cu = triangles[i].vertices[2].uv.x;
        let cv = triangles[i].vertices[2].uv.y;
        positions.push(cx, cy, cz);
        uvs.push(cu, cv);
        let nx = triangles[i].plane.normal.x;
        let ny = triangles[i].plane.normal.y;
        let nz = triangles[i].plane.normal.z;
        normals.push(nx, ny, nz);
        normals.push(nx, ny, nz);
        normals.push(nx, ny, nz);
    }
    function disposeArray() {
        this.array = null;
    }
    three_geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3).onUpload(disposeArray));
    three_geometry.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3).onUpload(disposeArray));
    three_geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2).onUpload(disposeArray));
    return three_geometry;
}
exports.modelGeometry2TreeGeometry = modelGeometry2TreeGeometry;
function modelMaterial2ThreeMaterial(material) {
    let three_parameters = {
        'color': new THREE.Color(material.baseColor[0], material.baseColor[1], material.baseColor[2]),
        'opacity': material.baseColor[3],
        'transparent': (material.baseColor[3] < 1.0),
        'metalness': material.metallic,
        'roughness': material.roughness
        //TODO add textures
    };
    let three_material = new THREE.MeshStandardMaterial(three_parameters);
    three_material.name = material.id;
    return three_material;
}
exports.modelMaterial2ThreeMaterial = modelMaterial2ThreeMaterial;
function modelMesh2ThreeMesh(mesh, materialDict = {}) {
    let three_material = threeMaterialFromList(mesh.material, materialDict);
    let three_geometry = modelGeometry2TreeGeometry(mesh.geometry);
    let three_mesh = new THREE.Mesh(three_geometry, three_material);
    three_mesh.name = mesh.id;
    three_mesh.castShadow = mesh.castShadowFlag;
    three_mesh.receiveShadow = mesh.receiveShadowFlag;
    return three_mesh;
}
exports.modelMesh2ThreeMesh = modelMesh2ThreeMesh;
function modelGroup2ThreeGroup(group, materialDict = {}) {
    let three_group = new THREE.Group();
    three_group.name = group.id;
    group.meshes.forEach((mesh) => {
        three_group.add(modelMesh2ThreeMesh(mesh, materialDict));
    });
    group.children.forEach((group) => {
        three_group.add(modelGroup2ThreeGroup(group, materialDict));
    });
    let scale_matrix = new THREE.Matrix4().makeScale(group.scale[0], group.scale[1], group.scale[2]);
    three_group.applyMatrix(scale_matrix);
    three_group.setRotationFromEuler(new THREE.Euler(math_1.toRadians(group.rotation[0]), math_1.toRadians(group.rotation[1]), math_1.toRadians(group.rotation[2])));
    let translation_matrix = new THREE.Matrix4().makeTranslation(group.translation.vector[0], group.translation.vector[1], group.translation.vector[2]);
    three_group.applyMatrix(translation_matrix);
    return three_group;
}
exports.modelGroup2ThreeGroup = modelGroup2ThreeGroup;
function updateThreeMesh(threeMesh, modelMesh, materialDict = {}) {
    let threeMaterial = threeMesh.material;
    if (threeMaterial.name !== modelMesh.material.id) {
        //a new material was assigned to this mesh
        threeMesh.material = threeMaterialFromList(modelMesh.material, materialDict);
    }
    if (threeMesh.geometry.name !== modelMesh.geometry.id) {
        //a new geometry was assiged to this mesh
        threeMesh.geometry = modelGeometry2TreeGeometry(modelMesh.geometry);
    }
    if (threeMesh.castShadow !== modelMesh.castShadowFlag) {
        threeMesh.castShadow = modelMesh.castShadowFlag;
    }
    if (threeMesh.receiveShadow !== modelMesh.receiveShadowFlag) {
        threeMesh.receiveShadow = modelMesh.receiveShadowFlag;
    }
}
exports.updateThreeMesh = updateThreeMesh;
function updateThreeGroup(threeGroup, modelGroup, materialDict = {}) {
    //verify group transformation
    let EPS = 1e-5;
    let radX = math_1.toRadians(modelGroup.rotation[0]);
    let radY = math_1.toRadians(modelGroup.rotation[1]);
    let radZ = math_1.toRadians(modelGroup.rotation[2]);
    //scale
    if ((Math.abs(threeGroup.scale.x - modelGroup.scale[0]) > EPS) ||
        (Math.abs(threeGroup.scale.y - modelGroup.scale[1]) > EPS) ||
        (Math.abs(threeGroup.scale.z - modelGroup.scale[2]) > EPS)) {
        let diffScale = [modelGroup.scale[0] / threeGroup.scale.x,
            modelGroup.scale[1] / threeGroup.scale.y,
            modelGroup.scale[2] / threeGroup.scale.z];
        let scaleMatrix = new THREE.Matrix4().makeScale(diffScale[0], diffScale[1], diffScale[2]);
        //reset rotation so that scale is applied on local axis
        threeGroup.setRotationFromQuaternion(new three_1.Quaternion(1, 0, 0, 0));
        //apply scale
        threeGroup.applyMatrix(scaleMatrix);
    }
    //rotation
    if ((Math.abs(threeGroup.rotation.x - radX) > EPS) ||
        (Math.abs(threeGroup.rotation.y - radY) > EPS) ||
        (Math.abs(threeGroup.rotation.z - radZ) > EPS)) {
        threeGroup.setRotationFromEuler(new THREE.Euler(radX, radY, radZ));
    }
    //translation
    if ((Math.abs(threeGroup.position.x - modelGroup.translation.vector[0]) > EPS) ||
        (Math.abs(threeGroup.position.y - modelGroup.translation.vector[1]) > EPS) ||
        (Math.abs(threeGroup.position.z - modelGroup.translation.vector[2]) > EPS)) {
        let diffTranslation = modelGroup.translation.copy()
            .translate(new vector3d_1.Vector3D(-threeGroup.position.x, -threeGroup.position.y, -threeGroup.position.z));
        let translationMatrix = new THREE.Matrix4().makeTranslation(diffTranslation.vector[0], diffTranslation.vector[1], diffTranslation.vector[2]);
        threeGroup.applyMatrix(translationMatrix);
    }
    //clear active flags for materials in materialDict
    for (let id in materialDict) {
        materialDict[id].active = false;
    }
    //build dictionary of all objects in three group
    let threeObjectDict = {};
    threeGroup.children.forEach((object) => { threeObjectDict[object.name] = object; });
    //process alle meshes in the group
    modelGroup.meshes.forEach((mesh) => {
        if (mesh.id in threeObjectDict) {
            //mesh already exists -> update mesh
            updateThreeMesh(threeObjectDict[mesh.id], mesh, materialDict);
            delete threeObjectDict[mesh.id]; //remove from objectList because fully processed
        }
        else {
            //mesh doesn't exist yet -> add mesh
            threeGroup.add(modelMesh2ThreeMesh(mesh, materialDict));
        }
    });
    //process all child groups in the group
    modelGroup.children.forEach((group) => {
        if (group.id in threeObjectDict) {
            //group already exists -> update group
            updateThreeGroup(threeObjectDict[group.id], group, materialDict);
            delete threeObjectDict[group.id]; //remove from objectList because fully processed
        }
        else {
            //group doesn't exist yet -> add group
            threeGroup.add(modelGroup2ThreeGroup(group, materialDict));
        }
    });
    //remove all objects that are no longer in the model
    for (let id in threeObjectDict) {
        threeGroup.remove(threeObjectDict[id]);
    }
    //remove materials that are no longer used
    let materialsToRemove = [];
    for (let id in materialDict) {
        if (materialDict[id].active === false) {
            materialsToRemove.push(id);
        }
    }
    materialsToRemove.forEach(id => delete materialDict[id]);
}
exports.updateThreeGroup = updateThreeGroup;
function threeMaterialFromList(material, materialDict = {}) {
    let threeMaterial;
    if (material.id in materialDict) { //material already exists
        threeMaterial = materialDict[material.id].threeMaterial;
        materialDict[material.id].active = true;
    }
    else { //add material to the materialList if it hasn't been created before
        let newMaterialContainer = new model_three_material_container_1.Model2ThreeMaterialContainter(material);
        materialDict[material.id] = newMaterialContainer;
        threeMaterial = newMaterialContainer.threeMaterial;
    }
    return threeMaterial;
}

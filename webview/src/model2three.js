"use strict";
exports.__esModule = true;
var THREE = require("three");
function Csg2TreeGeometry(geometry) {
    var three_geometry = new THREE.BufferGeometry();
    three_geometry.name = geometry.name;
    var triangles = geometry.geometry.toTriangles();
    var positions = [];
    var normals = [];
    for (var i = 0; i < triangles.length; ++i) {
        var ax = triangles[i].vertices[0].pos.x;
        var ay = triangles[i].vertices[0].pos.y;
        var az = triangles[i].vertices[0].pos.z;
        positions.push(ax, ay, az);
        var bx = triangles[i].vertices[1].pos.x;
        var by = triangles[i].vertices[1].pos.y;
        var bz = triangles[i].vertices[1].pos.z;
        positions.push(bx, by, bz);
        var cx = triangles[i].vertices[2].pos.x;
        var cy = triangles[i].vertices[2].pos.y;
        var cz = triangles[i].vertices[2].pos.z;
        positions.push(cx, cy, cz);
        var nx = triangles[i].plane.normal.x;
        var ny = triangles[i].plane.normal.y;
        var nz = triangles[i].plane.normal.z;
        normals.push(nx, ny, nz);
        normals.push(nx, ny, nz);
        normals.push(nx, ny, nz);
    }
    function disposeArray() {
        this.array = null;
    }
    three_geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3).onUpload(disposeArray));
    three_geometry.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3).onUpload(disposeArray));
    return three_geometry;
}
exports.Csg2TreeGeometry = Csg2TreeGeometry;
function ModelMaterial2ThreeMaterial(material) {
    var three_parameters = {
        'color': new THREE.Color(material.baseColor[0], material.baseColor[1], material.baseColor[2]),
        'opacity': material.baseColor[3],
        'metalness': material.metallic,
        'roughness': material.roughness
        //TODO add textures
    };
    var three_material = new THREE.MeshStandardMaterial(three_parameters);
    three_material.name = material.name;
    return three_material;
}
exports.ModelMaterial2ThreeMaterial = ModelMaterial2ThreeMaterial;
function ModelMesh2ThreeMesh(mesh) {
    var three_material = ModelMaterial2ThreeMaterial(mesh.material);
    var three_geometry = Csg2TreeGeometry(mesh.geometry);
    var three_mesh = new THREE.Mesh(three_geometry, three_material);
    three_mesh.name = mesh.name;
    return three_mesh;
}
exports.ModelMesh2ThreeMesh = ModelMesh2ThreeMesh;
function ModelGroup2ThreeGroup(group) {
    var three_group = new THREE.Group();
    three_group.name = group.name;
    group.meshes.forEach(function (mesh, key) {
        three_group.add(ModelMesh2ThreeMesh(mesh));
    });
    group.children.forEach(function (group, key) {
        three_group.add(ModelGroup2ThreeGroup(group));
    });
    var scale_matrix = new THREE.Matrix4().makeScale(group.scale[0], group.scale[1], group.scale[2]);
    three_group.applyMatrix(scale_matrix);
    three_group.setRotationFromEuler(new THREE.Euler(group.rotation[0], group.rotation[1], group.rotation[2]));
    var translation_vector = group.translation.vector;
    var translation_matrix = new THREE.Matrix4().makeTranslation(translation_vector[0], translation_vector[1], translation_vector[2]);
    three_group.applyMatrix(translation_matrix);
    return three_group;
}
exports.ModelGroup2ThreeGroup = ModelGroup2ThreeGroup;

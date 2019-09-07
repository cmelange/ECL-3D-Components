"use strict";
exports.__esModule = true;
var THREE = require("three");
function Csg2TreeGeometry(csg) {
    var geometry = new THREE.BufferGeometry();
    var triangles = csg.toTriangles();
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
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3).onUpload(disposeArray));
    geometry.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3).onUpload(disposeArray));
    return geometry;
}
exports.Csg2TreeGeometry = Csg2TreeGeometry;

"use strict";
exports.__esModule = true;
var Mesh = /** @class */ (function () {
    function Mesh(geometry, material, name) {
        if (name === void 0) { name = 'mesh'; }
        this.geometry = geometry;
        this.material = material;
        this.name = name;
    }
    Mesh.prototype.Name = function (name) {
        this.name = name;
        return this;
    };
    Mesh.prototype.Geometry = function (geometry) {
        this.geometry = geometry;
        return this;
    };
    Mesh.prototype.Material = function (material) {
        this.material = material;
        return this;
    };
    return Mesh;
}());
exports.Mesh = Mesh;

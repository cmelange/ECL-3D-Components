"use strict";
exports.__esModule = true;
var csg = require("@jscad/csg");
var Geometry = /** @class */ (function () {
    function Geometry(geometry, name) {
        if (name === void 0) { name = 'geometry'; }
        this.name = name;
        this.geometry = geometry;
    }
    Geometry.prototype.Name = function (name) {
        this.name = name;
        return this;
    };
    Geometry.prototype.Translate = function (vector) {
        this.geometry = csg.translate(vector.vector, this.geometry);
        return this;
    };
    Geometry.prototype.Rotate = function (rotation) {
        this.geometry = csg.rotate(rotation, this.geometry);
        return this;
    };
    Geometry.prototype.Copy = function () {
        return new Geometry(csg.clone(this.geometry));
    };
    /**
     * Clip the geometry by a plane. Retuns the solid on the back side of the plane
     *
     * @param {Plane} plane plane to cut the geometry
     * @returns {Geometry}
     */
    Geometry.prototype.ClipByPlane = function (plane) {
        this.geometry = this.geometry.cutByPlane(plane.plane);
        return this;
    };
    Geometry.prototype.Union = function (geometry) {
        this.geometry = this.geometry.union(geometry.geometry);
        return this;
    };
    Geometry.prototype.Difference = function (geometry) {
        this.geometry = this.geometry.subtract(geometry.geometry);
        return this;
    };
    Geometry.prototype.Intersection = function (geometry) {
        this.geometry = this.geometry.intersect(geometry.geometry);
        return this;
    };
    return Geometry;
}());
exports.Geometry = Geometry;

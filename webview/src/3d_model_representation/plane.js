"use strict";
exports.__esModule = true;
var vector3d_1 = require("./vector3d");
var csg = require("@jscad/csg");
var Plane = /** @class */ (function () {
    function Plane(normal, point) {
        this.plane = csg.CSG.Plane.fromNormalAndPoint(normal.vector, point.vector);
    }
    Plane.prototype.Translate = function (vector) {
        this.plane = this.plane.transform(csg.Matrix4x4.translation(vector.vector));
        return this;
    };
    Plane.prototype.Flip = function () {
        this.plane = this.plane.flipped();
        return this;
    };
    Plane.prototype.Copy = function () {
        var copyPlane = new Plane(new vector3d_1.Vector3D(0, 0, 1), new vector3d_1.Vector3D(0, 0, 0));
        copyPlane.plane = new csg.CSG.Plane(this.plane.normal, this.plane.w);
        return copyPlane;
    };
    return Plane;
}());
exports.Plane = Plane;

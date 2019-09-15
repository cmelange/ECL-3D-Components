"use strict";
exports.__esModule = true;
var math_1 = require("./math");
var plane_1 = require("./plane");
var Vector3D = /** @class */ (function () {
    function Vector3D(x, y, z) {
        this.vector = [x, y, z];
    }
    Vector3D.prototype.Translate = function (vector, mult) {
        if (mult === void 0) { mult = 1; }
        for (var i = 0; i < 3; i++) {
            this.vector[i] += vector[i] * mult;
        }
        return this;
    };
    Vector3D.prototype.Multiply = function (mult) {
        for (var i = 0; i < 3; i++) {
            this.vector[i] *= mult;
        }
        return this;
    };
    Vector3D.prototype.ApplyMatrix_ = function (matrix) {
        var new_vector = [0, 0, 0];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                new_vector[i] = matrix[i][j] * this.vector[j];
            }
        }
        this.vector = new_vector;
    };
    Vector3D.prototype.Rotate = function (rotation) {
        var rotation_matrix = math_1.RotationMatrix3D(rotation);
        this.ApplyMatrix_(rotation_matrix);
        return this;
    };
    Vector3D.prototype.Copy = function () {
        return new Vector3D(this.vector[0], this.vector[1], this.vector[2]);
    };
    Vector3D.prototype.Length = function () {
        return Math.sqrt(Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2) +
            Math.pow(this.vector[3], 2));
    };
    Vector3D.prototype.DistanceTo = function (vector) {
        return new Vector3D(vector[0] - this.vector[0], vector[1] - this.vector[1], vector[2] - this.vector[2]).Length();
    };
    Vector3D.prototype.OrthogonalPlane = function (offset) {
        return new plane_1.Plane(this, offset);
    };
    return Vector3D;
}());
exports.Vector3D = Vector3D;

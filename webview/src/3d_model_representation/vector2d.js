"use strict";
exports.__esModule = true;
var math_1 = require("./math");
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        this.vector = [x, y];
    }
    Vector2D.prototype.Translate = function (vector, mult) {
        if (mult === void 0) { mult = 1; }
        for (var i = 0; i < 2; i++) {
            this.vector[i] += vector[i] * mult;
        }
        return this;
    };
    Vector2D.prototype.Multiply = function (mult) {
        for (var i = 0; i < 2; i++) {
            this.vector[i] *= mult;
        }
        return this;
    };
    Vector2D.prototype.ApplyMatrix_ = function (matrix) {
        var new_vector = [0, 0];
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 2; j++) {
                new_vector[i] = matrix[i][j] * this.vector[j];
            }
        }
        this.vector = new_vector;
    };
    Vector2D.prototype.Rotate = function (rotation) {
        var rotation_matrix = math_1.RotationMatrix2D(rotation);
        this.ApplyMatrix_(rotation_matrix);
        return this;
    };
    Vector2D.prototype.Copy = function () {
        return new Vector2D(this.vector[0], this.vector[1]);
    };
    Vector2D.prototype.Length = function () {
        return Math.sqrt(Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2));
    };
    Vector2D.prototype.DistanceTo = function (vector) {
        return new Vector2D(vector[0] - this.vector[0], vector[1] - this.vector[1]).Length();
    };
    /**
     * Calculate the angle between the vector and the x-axis
     *
     * @returns {number}    angle between the vector and the x-axis in degrees
     */
    Vector2D.prototype.Angle = function () {
        return math_1.toDegrees(Math.atan2(this.vector[1], this.vector[2]));
    };
    return Vector2D;
}());
exports.Vector2D = Vector2D;

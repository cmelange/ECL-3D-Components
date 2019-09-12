"use strict";
exports.__esModule = true;
var math_1 = require("./math");
var Curve3D = /** @class */ (function () {
    function Curve3D(vectors) {
        this.path = [];
        if (typeof vectors !== 'undefined') {
            this.AppendArray(vectors);
        }
        ;
    }
    Curve3D.prototype.Translate = function (vector) {
        for (var i = 0; i < this.path.length; ++i) {
            this.path[i].Translate(vector);
        }
        ;
        return this;
    };
    Curve3D.prototype.Rotate = function (rotation) {
        var rotation_matrix = math_1.RotationMatrix(rotation);
        for (var i = 0; i < this.path.length; ++i) {
            this.path[i].ApplyMatrix_(rotation_matrix);
        }
        ;
        return this;
    };
    Curve3D.prototype.Copy = function () {
        var copyArray = [];
        for (var i = 0; i < this.path.length; ++i) {
            copyArray.push(this.path[i].Copy());
        }
        ;
        return new Curve3D(copyArray);
    };
    Curve3D.prototype.Length = function () {
        var length = 0;
        for (var i = 0; i < this.path.length - 1; ++i) {
            length = length + this.path[i].DistanceTo(this.path[i + 1]);
        }
        ;
        return length;
    };
    Curve3D.prototype.AppendArray = function (vectorArray) {
        for (var i = 0; i < vectorArray.length; ++i) {
            this.path.push(vectorArray[i].Copy());
        }
        return this;
    };
    Curve3D.prototype.TangentAtStart = function () {
        return this.path[1].Copy().Translate(this.path[0], -1);
    };
    Curve3D.prototype.TangentAtEnd = function () {
        return this.path[this.path.length - 1].Copy().Translate(this.path[this.path.length - 2], -1);
    };
    return Curve3D;
}());
exports.Curve3D = Curve3D;

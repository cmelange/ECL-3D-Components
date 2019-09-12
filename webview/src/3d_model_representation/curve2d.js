"use strict";
exports.__esModule = true;
var shape_1 = require("./shape");
var Curve2D = /** @class */ (function () {
    function Curve2D(vectors) {
        this.path = [];
        if (typeof vectors !== 'undefined') {
            this.AppendArray(vectors);
        }
        ;
    }
    Curve2D.prototype.Translate = function (vector) {
        for (var i = 0; i < this.path.length; ++i) {
            this.path[i].Translate(vector);
        }
        ;
        return this;
    };
    Curve2D.prototype.Rotate = function (rotation) {
        for (var i = 0; i < this.path.length; ++i) {
            this.path[i].Rotate(rotation);
        }
        ;
        return this;
    };
    Curve2D.prototype.Copy = function () {
        var copyArray = [];
        for (var i = 0; i < this.path.length; ++i) {
            copyArray.push(this.path[i].Copy());
        }
        ;
        return new Curve2D(copyArray);
    };
    Curve2D.prototype.Length = function () {
        var length = 0;
        for (var i = 0; i < this.path.length - 1; ++i) {
            length = length + this.path[i].DistanceTo(this.path[i + 1]);
        }
        ;
        return length;
    };
    Curve2D.prototype.AppendArray = function (vectorArray) {
        for (var i = 0; i < vectorArray.length; ++i) {
            if ((i === 0) && (this.path.length > 0)) {
                if (this.path[this.path.length - 1].Copy().Translate(vectorArray[0], -1).Length() < 1) {
                    continue;
                }
                ;
            }
            ;
            this.path.push(vectorArray[i].Copy());
        }
        return this;
    };
    Curve2D.prototype.Append = function (curve) {
        this.AppendArray(curve.path);
        return this;
    };
    Curve2D.prototype.Repeat = function (num) {
        var singleCurve = this.Copy();
        var translationVector = singleCurve.path[singleCurve.path.length - 1].Copy();
        for (var i = 1; i < num; ++i) {
            this.Append(singleCurve.Translate(translationVector));
        }
        ;
        return this;
    };
    Curve2D.prototype.Shape = function () {
        return new shape_1.Shape([this]);
    };
    Curve2D.prototype.Thicken = function (distance) {
        var vectorArray = [];
        for (var i = this.path.length - 1; i >= 0; --i) {
            var tangentIndex = (i === 0) ? 1 : i;
            var translationVector = this.path[tangentIndex].Copy().Translate(this.path[tangentIndex - 1], -1).Rotate(90);
            translationVector.Multiply(distance / translationVector.Length());
            vectorArray.push(this.path[i].Copy().Translate(translationVector));
        }
        ;
        return this.Copy().Append(new Curve2D(vectorArray)).Shape();
    };
    return Curve2D;
}());
exports.Curve2D = Curve2D;

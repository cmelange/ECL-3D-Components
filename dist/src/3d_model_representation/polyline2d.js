"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("./math");
const shape_1 = require("./shape");
class Polyline2D {
    constructor(vectors) {
        this.path = [];
        if (typeof vectors !== 'undefined') {
            this.appendArray(vectors);
        }
        ;
    }
    calcPath() {
        return this.path;
    }
    translate(vector) {
        for (var i = 0; i < this.path.length; ++i) {
            this.path[i].translate(vector);
        }
        ;
        return this;
    }
    rotate(rotation) {
        let rotation_matrix = math_1.rotationMatrix2D(rotation);
        for (var i = 0; i < this.path.length; ++i) {
            this.path[i].applyMatrix_(rotation_matrix);
        }
        ;
        return this;
    }
    copy() {
        var copyArray = [];
        for (var i = 0; i < this.path.length; ++i) {
            copyArray.push(this.path[i].copy());
        }
        ;
        return new Polyline2D(copyArray);
    }
    length() {
        var length = 0;
        for (var i = 0; i < this.path.length - 1; ++i) {
            length = length + this.path[i].distanceTo(this.path[i + 1]);
        }
        ;
        return length;
    }
    appendArray(vectorArray) {
        for (var i = 0; i < vectorArray.length; ++i) {
            if ((i === 0) && (this.path.length > 0)) {
                if (this.path[this.path.length - 1].copy().translate(vectorArray[0], -1).length() < 1) {
                    continue;
                }
                ;
            }
            ;
            this.path.push(vectorArray[i].copy());
        }
        return this;
    }
    append(curve) {
        this.appendArray(curve.path);
        return this;
    }
    repeat(num) {
        var singleCurve = this.copy();
        var translationVector = singleCurve.path[singleCurve.path.length - 1].copy();
        for (var i = 1; i < num; ++i) {
            this.append(singleCurve.translate(translationVector));
        }
        ;
        return this;
    }
    shape() {
        let closedPolygon = this.copy();
        if (!closedPolygon.path[0].equals(closedPolygon.path[closedPolygon.path.length - 1])) {
            closedPolygon.appendArray([closedPolygon.path[0]]);
        }
        return new shape_1.Shape([closedPolygon]);
    }
    thicken(distance) {
        var vectorArray = [];
        for (var i = this.path.length - 1; i >= 0; --i) {
            var tangentIndex = (i === 0) ? 1 : i;
            var translationVector = this.path[tangentIndex].copy().translate(this.path[tangentIndex - 1], -1).rotate(90);
            translationVector.multiply(distance / translationVector.length());
            vectorArray.push(this.path[i].copy().translate(translationVector));
        }
        ;
        return this.copy().append(new Polyline2D(vectorArray)).shape();
    }
    generateConstructionString() {
        return 'POLYLINE2D(' + JSON.stringify(this.path.map(vector => [vector.vector[0], vector.vector[1]])) + ')';
    }
}
exports.Polyline2D = Polyline2D;

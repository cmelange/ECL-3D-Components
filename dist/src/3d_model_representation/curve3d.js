"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("./math");
class Curve3D {
    constructor(vectors) {
        this.path = [];
        if (typeof vectors !== 'undefined') {
            this.appendArray(vectors);
        }
        ;
    }
    translate(vector) {
        for (var i = 0; i < this.path.length; ++i) {
            this.path[i].translate(vector);
        }
        ;
        return this;
    }
    rotate(rotation) {
        let rotation_matrix = math_1.rotationMatrix3D(rotation);
        for (var i = 0; i < this.path.length; ++i) {
            this.path[i].applyMatrix(rotation_matrix);
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
        return new Curve3D(copyArray);
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
            this.path.push(vectorArray[i].copy());
        }
        return this;
    }
    tangentAtStart() {
        return this.path[1].copy().translate(this.path[0], -1);
    }
    tangentAtEnd() {
        return this.path[this.path.length - 1].copy().translate(this.path[this.path.length - 2], -1);
    }
}
exports.Curve3D = Curve3D;

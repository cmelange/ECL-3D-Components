"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plane_1 = require("./plane");
const quaternion_1 = require("./quaternion");
class Vector3D {
    constructor(x, y, z) {
        this.vector = [x, y, z];
    }
    get x() { return this.vector[0]; }
    get y() { return this.vector[1]; }
    get z() { return this.vector[2]; }
    set x(x) { this.vector[0] = x; }
    set y(y) { this.vector[0] = y; }
    set z(z) { this.vector[0] = z; }
    equals(vector) {
        return ((this.vector[0] === this.vector[0]) &&
            (this.vector[1] === this.vector[1]) &&
            (this.vector[2] === this.vector[2]));
    }
    translate(vector, mult = 1) {
        for (let i = 0; i < 3; i++) {
            this.vector[i] += vector.vector[i] * mult;
        }
        return this;
    }
    multiply(mult) {
        for (let i = 0; i < 3; i++) {
            this.vector[i] *= mult;
        }
        return this;
    }
    applyMatrix(matrix) {
        let new_vector = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                new_vector[i] += matrix[i][j] * this.vector[j];
            }
        }
        this.vector = new_vector;
        return this;
    }
    rotate(rotation) {
        let rotationQuaternion = new quaternion_1.Quaternion().setFromEuler(rotation);
        return this.rotateByQuaternion(rotationQuaternion);
    }
    rotateByQuaternion(q) {
        let vectorQ = new quaternion_1.Quaternion(0, this.vector[0], this.vector[1], this.vector[2]);
        let rotatedVec = q.multiply(vectorQ.multiply(q.conjugate()));
        this.vector[0] = rotatedVec.x;
        this.vector[1] = rotatedVec.y;
        this.vector[2] = rotatedVec.z;
        return this;
    }
    copy() {
        return new Vector3D(this.vector[0], this.vector[1], this.vector[2]);
    }
    length() {
        return Math.sqrt(Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2) +
            Math.pow(this.vector[3], 2));
    }
    distanceTo(vector) {
        return new Vector3D(vector[0] - this.vector[0], vector[1] - this.vector[1], vector[2] - this.vector[2]).length();
    }
    orthogonalPlane(offset) {
        return new plane_1.Plane(this, offset);
    }
}
exports.Vector3D = Vector3D;

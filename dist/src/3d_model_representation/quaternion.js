"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("./math");
class Quaternion {
    constructor(w = 1, x = 0, y = 0, z = 0) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    setFromQuaternion(q) {
        this.w = q.w;
        this.x = q.x;
        this.y = q.y;
        this.z = q.z;
        return this;
    }
    /**
     * As convention we use Euler intrinsic rotation in the order XYZ (Tait-Bryan xy'z'')
     * @param rotation euler angles around X,Y and Z angles respectively
     */
    setFromEuler(rotation) {
        let theta = [math_1.toRadians(rotation[0]), math_1.toRadians(rotation[1]), math_1.toRadians(rotation[2])];
        let c1 = Math.cos(theta[0] * 0.5);
        let s1 = Math.sin(theta[0] * 0.5);
        let c2 = Math.cos(theta[1] * 0.5);
        let s2 = Math.sin(theta[1] * 0.5);
        let c3 = Math.cos(theta[2] * 0.5);
        let s3 = Math.sin(theta[2] * 0.5);
        let qx = new Quaternion(c1, s1, 0, 0);
        let qy = new Quaternion(c2, 0, s2, 0);
        let qz = new Quaternion(c3, 0, 0, s3);
        this.setFromQuaternion(qx.multiply(qy.multiply(qz)));
        return this;
    }
    multiply(q) {
        let result = new Quaternion();
        result.w = this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z;
        result.x = this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y;
        result.y = this.w * q.y + this.y * q.w + this.z * q.x - this.x * q.z;
        result.z = this.w * q.z + this.z * q.w + this.x * q.y - this.y * q.x;
        return result;
    }
    conjugate() {
        return new Quaternion(this.w, -this.x, -this.y, -this.z);
    }
}
exports.Quaternion = Quaternion;

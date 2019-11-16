import {toRadians} from "./math"

export class Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;

    constructor(w: number =1, x: number =0, y: number =0, z: number =0) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setFromQuaternion(q: Quaternion): Quaternion {
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
    setFromEuler(rotation: number[]): Quaternion {
        let theta = [toRadians(rotation[0]), toRadians(rotation[1]), toRadians(rotation[2])];
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

    multiply(q: Quaternion): Quaternion {
        let result = new Quaternion();
        result.w = this.w*q.w - this.x*q.x - this.y*q.y - this.z*q.z;
        result.x = this.w*q.x + this.x*q.w + this.y*q.z - this.z*q.y;
        result.y = this.w*q.y + this.y*q.w + this.z*q.x - this.x*q.z;
        result.z = this.w*q.z + this.z*q.w + this.x*q.y - this.y*q.x;
        return result;
    }

    conjugate(): Quaternion {
        return new Quaternion(this.w, -this.x, -this.y, -this.z);
    }
}
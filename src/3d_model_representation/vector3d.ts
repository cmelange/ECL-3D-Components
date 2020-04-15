import {rotationMatrix3D} from './math';
import {Plane} from './plane';
import { Quaternion } from './quaternion';

export class Vector3D {

    vector: number[]

    constructor(x: number, y: number, z: number) {
        this.vector = [x,y,z];
    }

    get x(): number { return this.vector[0]; }
    get y(): number { return this.vector[1]; }
    get z(): number { return this.vector[2]; }

    set x(x: number) { this.vector[0] = x; }
    set y(y: number) { this.vector[0] = y; }
    set z(z: number) { this.vector[0] = z; }

    equals(vector: Vector3D): boolean {
        return ((this.vector[0] === this.vector[0]) && 
                (this.vector[1] === this.vector[1]) && 
                (this.vector[2] === this.vector[2]));
    }

    translate(vector: Vector3D, mult: number=1) {
        for (let i=0; i<3; i++)
        {
            this.vector[i] += vector.vector[i]*mult;
        }
        return this;
    }

    multiply(mult: number): Vector3D {
        for (let i=0; i<3; i++)
        {
            this.vector[i] *= mult;
        }
        return this;
    }

    applyMatrix(matrix: number[][]): Vector3D {
        let new_vector = [0,0,0];
        for (let i=0; i<3; i++)
        {
            for (let j=0; j<3; j++)
            {
                new_vector[i] += matrix[i][j]*this.vector[j];
            }
        }
        this.vector = new_vector;
        return this;
    }

    rotate(rotation: number[]): Vector3D {
        let rotationQuaternion = new Quaternion().setFromEuler(rotation);
        return this.rotateByQuaternion(rotationQuaternion);
    }

    rotateByQuaternion(q: Quaternion): Vector3D {
        let vectorQ = new Quaternion(0, this.vector[0], this.vector[1], this.vector[2]);
        let rotatedVec = q.multiply(vectorQ.multiply(q.conjugate()));
        this.vector[0] = rotatedVec.x;
        this.vector[1] = rotatedVec.y;
        this.vector[2] = rotatedVec.z;
        return this;
    }

    copy(): Vector3D {
        return new Vector3D(this.vector[0], this.vector[1], this.vector[2]);
    }

    length(): number {
        return Math.sqrt( Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2) + 
                          Math.pow(this.vector[3], 2));
    }

    distanceTo(vector: Vector3D): number {
            return new Vector3D(vector[0] - this.vector[0],
                                vector[1] - this.vector[1],
                                vector[2] - this.vector[2]).length();
    }

    orthogonalPlane(offset: Vector3D): Plane {
        return new Plane(this, offset);
    }

}
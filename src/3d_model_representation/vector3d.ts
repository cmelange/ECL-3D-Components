import {rotationMatrix3D} from './math';
import {Plane} from './plane';

export class Vector3D {

    vector: number[]

    constructor(x: number, y: number, z: number) {
        this.vector = [x,y,z];
    }

    translate(vector: Vector3D, mult: number=1) {
        for (let i=0; i<3; i++)
        {
            this.vector[i] += vector[i]*mult;
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

    applyMatrix_(matrix: number[][]): void {
        let new_vector = [0,0,0];
        for (let i=0; i<3; i++)
        {
            for (let j=0; j<3; j++)
            {
                new_vector[i] = matrix[i][j]*this.vector[j];
            }
        }
        this.vector = new_vector;
    }

    rotate(rotation: number[]): Vector3D {
        let rotation_matrix = rotationMatrix3D(rotation);
        this.applyMatrix_(rotation_matrix);
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
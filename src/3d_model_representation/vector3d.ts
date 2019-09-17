import {RotationMatrix3D} from './math';
import {Plane} from './plane';

export class Vector3D {

    vector: number[]

    constructor(x: number, y: number, z: number) {
        this.vector = [x,y,z];
    }

    Translate(vector: Vector3D, mult: number=1) {
        for (let i=0; i<3; i++)
        {
            this.vector[i] += vector[i]*mult;
        }
        return this;
    }

    Multiply(mult: number): Vector3D {
        for (let i=0; i<3; i++)
        {
            this.vector[i] *= mult;
        }
        return this;
    }

    ApplyMatrix_(matrix: number[][]): void {
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

    Rotate(rotation: number[]): Vector3D {
        let rotation_matrix = RotationMatrix3D(rotation);
        this.ApplyMatrix_(rotation_matrix);
        return this;
    }

    Copy(): Vector3D {
        return new Vector3D(this.vector[0], this.vector[1], this.vector[2]);
    }

    Length(): number {
        return Math.sqrt( Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2) + 
                          Math.pow(this.vector[3], 2));
    }

    DistanceTo(vector: Vector3D): number {
            return new Vector3D(vector[0] - this.vector[0],
                                vector[1] - this.vector[1],
                                vector[2] - this.vector[2]).Length();
    }

    OrthogonalPlane(offset: Vector3D): Plane {
        return new Plane(this, offset);
    }

}
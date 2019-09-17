import {toDegrees, toRadians, RotationMatrix2D} from './math';

export class Vector2D {

    vector: number[];
    
    constructor(x: number, y: number) {
        this.vector = [x,y];
    }

    Translate(vector: Vector2D, mult: number=1): Vector2D {
        for (let i=0; i<2; i++)
        {
            this.vector[i] += vector[i]*mult;
        }
        return this;
    }

    Multiply(mult: number): Vector2D {
        for (let i=0; i<2; i++)
        {
            this.vector[i] *= mult;
        }
        return this;
    }

    ApplyMatrix_(matrix: number[][]): void {
        let new_vector = [0,0];
        for (let i=0; i<2; i++)
        {
            for (let j=0; j<2; j++)
            {
                new_vector[i] = matrix[i][j]*this.vector[j];
            }
        }
        this.vector = new_vector;
    }

    Rotate(rotation: number): Vector2D {
        let rotation_matrix = RotationMatrix2D(rotation);
        this.ApplyMatrix_(rotation_matrix);
        return this;
    }

    Copy(): Vector2D {
        return new Vector2D(this.vector[0], this.vector[1]);
    }

    Length(): number {
        return Math.sqrt( Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2) );
    }

    DistanceTo(vector: Vector2D): number {
        return new Vector2D(vector[0] - this.vector[0], vector[1] - this.vector[1]).Length();
    }

    /**
     * Calculate the angle between the vector and the x-axis
     * 
     * @returns {number}    angle between the vector and the x-axis in degrees
     */
    Angle(): number {
        return toDegrees(Math.atan2(this.vector[1], this.vector[2]));
    }

}
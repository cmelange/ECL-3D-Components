import {toDegrees, toRadians, rotationMatrix2D} from './math';

export class Vector2D {

    vector: number[];
    
    constructor(x: number, y: number) {
        this.vector = [x,y];
    }

    get x(): number { return this.vector[0]; }
    get y(): number { return this.vector[1]; }

    set x(x: number) { this.vector[0] = x; }
    set y(y: number) { this.vector[1] = y; }

    equals(vector: Vector2D): boolean {
        return ((this.vector[0] === vector.vector[0]) &&
                (this.vector[1] === vector.vector[1]));
    }

    translate(vector: Vector2D, mult: number=1): Vector2D {
        for (let i=0; i<2; i++)
        {
            this.vector[i] += vector.vector[i]*mult;
        }
        return this;
    }

    multiply(mult: number): Vector2D {
        for (let i=0; i<2; i++)
        {
            this.vector[i] *= mult;
        }
        return this;
    }

    applyMatrix_(matrix: number[][]): void {
        let new_vector = [0,0];
        for (let i=0; i<2; i++)
        {
            for (let j=0; j<2; j++)
            {
                new_vector[i] += matrix[i][j]*this.vector[j];
            }
        }
        this.vector = new_vector;
    }

    rotate(rotation: number): Vector2D {
        let rotation_matrix = rotationMatrix2D(rotation);
        this.applyMatrix_(rotation_matrix);
        return this;
    }

    copy(): Vector2D {
        return new Vector2D(this.vector[0], this.vector[1]);
    }

    length(): number {
        return Math.sqrt( Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2) );
    }

    distanceTo(vector: Vector2D): number {
        return new Vector2D(vector[0] - this.vector[0], vector[1] - this.vector[1]).length();
    }

    /**
     * Calculate the angle between the vector and the x-axis
     * 
     * @returns {number}    angle between the vector and the x-axis in degrees
     */
    angle(): number {
        return toDegrees(Math.atan2(this.vector[1], this.vector[2]));
    }

}
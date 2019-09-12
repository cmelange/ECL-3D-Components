import {toDegrees, toRadians} from './math';

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

    Rotate(rotation: number): Vector2D {
        let radians = toRadians(rotation);
        let rotatedVector =
            [this.vector[0]*Math.cos(radians) - this.vector[1]*Math.sin(radians),
            this.vector[0]*Math.sin(radians) + this.vector[1]*Math.cos(radians)]
        this.vector = rotatedVector;
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
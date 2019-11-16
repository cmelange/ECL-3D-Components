import {rotationMatrix3D} from './math';
import {Vector3D} from './vector3d';

export class Curve3D {

    path: Vector3D[];

    constructor(vectors: Vector3D[]) {
        this.path = [];
        if (typeof vectors !== 'undefined') {
            this.appendArray(vectors);
        };
    }

    translate(vector: Vector3D): Curve3D {
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].translate(vector);
        };
        return this;
    }

    rotate(rotation: number[]): Curve3D {
        let rotation_matrix = rotationMatrix3D(rotation);
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].applyMatrix(rotation_matrix);
        };
        return this;
    }

    copy(): Curve3D {
        var copyArray = [];
        for (var i=0; i<this.path.length; ++i) {
            copyArray.push(this.path[i].copy());
        };
        return new Curve3D(copyArray);
    }

    length(): number {
        var length = 0;
        for (var i=0; i<this.path.length-1; ++i) {
            length = length + this.path[i].distanceTo(this.path[i+1]);
        };
        return length;
    }

    appendArray(vectorArray: Vector3D[]): Curve3D {
        for (var i=0; i<vectorArray.length; ++i) {
            this.path.push(vectorArray[i].copy());
        }
        return this;
    }

    tangentAtStart(): Vector3D {
        return this.path[1].copy().translate(this.path[0], -1);
    }

    tangentAtEnd(): Vector3D {
        return this.path[this.path.length-1].copy().translate(this.path[this.path.length-2], -1);
    }

}
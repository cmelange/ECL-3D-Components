import {RotationMatrix3D} from './math';
import {Vector3D} from './vector3d';

export class Curve3D {

    path: Vector3D[];

    constructor(vectors: Vector3D[]) {
        this.path = [];
        if (typeof vectors !== 'undefined') {
            this.AppendArray(vectors);
        };
    }

    Translate(vector: Vector3D): Curve3D {
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].Translate(vector);
        };
        return this;
    }

    Rotate(rotation: number[]): Curve3D {
        let rotation_matrix = RotationMatrix3D(rotation);
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].ApplyMatrix_(rotation_matrix);
        };
        return this;
    }

    Copy(): Curve3D {
        var copyArray = [];
        for (var i=0; i<this.path.length; ++i) {
            copyArray.push(this.path[i].Copy());
        };
        return new Curve3D(copyArray);
    }

    Length(): number {
        var length = 0;
        for (var i=0; i<this.path.length-1; ++i) {
            length = length + this.path[i].DistanceTo(this.path[i+1]);
        };
        return length;
    }

    AppendArray(vectorArray: Vector3D[]): Curve3D {
        for (var i=0; i<vectorArray.length; ++i) {
            this.path.push(vectorArray[i].Copy());
        }
        return this;
    }

    TangentAtStart(): Vector3D {
        return this.path[1].Copy().Translate(this.path[0], -1);
    }

    TangentAtEnd(): Vector3D {
        return this.path[this.path.length-1].Copy().Translate(this.path[this.path.length-2], -1);
    }

}
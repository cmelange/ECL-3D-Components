import {rotationMatrix2D} from './math';
import {Vector2D} from './vector2d';
import { Shape } from './shape';
import { Curve2D } from './curve2d';

export class PolyLine2D implements Curve2D {

    path: Vector2D[];

    constructor(vectors: Vector2D[]) {
        this.path = [];
        if (typeof vectors !== 'undefined') {
            this.appendArray(vectors);
        };
    }

    calcPath(): Vector2D[] {
        return this.path;
    }

    translate(vector: Vector2D): PolyLine2D {
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].translate(vector);
        };
        return this;
    }

    rotate(rotation: number): PolyLine2D {
        let rotation_matrix = rotationMatrix2D(rotation);
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].applyMatrix_(rotation_matrix);
        };
        return this;
    }

    copy():PolyLine2D {
        var copyArray = [];
        for (var i=0; i<this.path.length; ++i) {
            copyArray.push(this.path[i].copy());
        };
        return new PolyLine2D(copyArray);
    }

    length(): number {
        var length = 0;
        for (var i=0; i<this.path.length-1; ++i) {
            length = length + this.path[i].distanceTo(this.path[i+1]);
        };
        return length;
    }

    appendArray(vectorArray: Vector2D[]): PolyLine2D {
        for (var i=0; i<vectorArray.length; ++i) {
            if ((i===0) && (this.path.length > 0)) {
                if (this.path[this.path.length-1].copy().translate(vectorArray[0], -1).length() < 1) {
                    continue;
                };
            };
            this.path.push(vectorArray[i].copy());
        }
        return this;
    }

    append(curve: PolyLine2D): PolyLine2D {
        this.appendArray(curve.path);
        return this;
    }

    repeat(num: number): PolyLine2D {
        var singleCurve = this.copy();
        var translationVector = singleCurve.path[singleCurve.path.length-1].copy();
        for (var i=1; i<num; ++i) {
            this.append(singleCurve.translate(translationVector));
        };
        return this;
    }

    shape(): Shape {
        return new Shape([this]);
    }

    thicken(distance: number): Shape {
        var vectorArray = [];
        for(var i=this.path.length-1; i>=0; --i) {
            var tangentIndex = (i === 0) ? 1 : i;
            var translationVector = this.path[tangentIndex].copy().translate(this.path[tangentIndex-1], -1).rotate(90);
            translationVector.multiply(distance/translationVector.length());
            vectorArray.push(this.path[i].copy().translate(translationVector));
        };
        return this.copy().append(new PolyLine2D(vectorArray)).shape();
    }

    generateConstructionString(): string {
        return 'POLYLINE2D('+ JSON.stringify(this.path.map(vector => [vector.vector[0], vector.vector[1]])) + ')';
    }
}
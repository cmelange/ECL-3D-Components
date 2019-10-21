import {rotationMatrix2D} from './math';
import {Vector2D} from './vector2d';
import {Shape} from './shape';
import { PolygonShape } from './polygon_shape';

export class Curve2D {

    path: Vector2D[];

    constructor(vectors: Vector2D[]) {
        this.path = [];
        if (typeof vectors !== 'undefined') {
            this.appendArray(vectors);
        };
    }

    translate(vector: Vector2D): Curve2D {
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].translate(vector);
        };
        return this;
    }

    rotate(rotation: number): Curve2D {
        let rotation_matrix = rotationMatrix2D(rotation);
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].applyMatrix_(rotation_matrix);
        };
        return this;
    }

    copy():Curve2D {
        var copyArray = [];
        for (var i=0; i<this.path.length; ++i) {
            copyArray.push(this.path[i].copy());
        };
        return new Curve2D(copyArray);
    }

    length(): number {
        var length = 0;
        for (var i=0; i<this.path.length-1; ++i) {
            length = length + this.path[i].distanceTo(this.path[i+1]);
        };
        return length;
    }

    appendArray(vectorArray: Vector2D[]): Curve2D {
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

    append(curve: Curve2D): Curve2D {
        this.appendArray(curve.path);
        return this;
    }

    repeat(num: number): Curve2D {
        var singleCurve = this.copy();
        var translationVector = singleCurve.path[singleCurve.path.length-1].copy();
        for (var i=1; i<num; ++i) {
            this.append(singleCurve.translate(translationVector));
        };
        return this;
    }

    shape(): PolygonShape {
        return new PolygonShape([this]);
    }

    thicken(distance: number): Shape {
        var vectorArray = [];
        for(var i=this.path.length-1; i>=0; --i) {
            var tangentIndex = (i === 0) ? 1 : i;
            var translationVector = this.path[tangentIndex].copy().translate(this.path[tangentIndex-1], -1).rotate(90);
            translationVector.multiply(distance/translationVector.length());
            vectorArray.push(this.path[i].copy().translate(translationVector));
        };
        return this.copy().append(new Curve2D(vectorArray)).shape();
    }
}
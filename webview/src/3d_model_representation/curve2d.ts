import {Vector2D} from './vector2d';
import {Shape} from './shape';

export class Curve2D {

    path: Vector2D[];

    constructor(vectors: Vector2D[]) {
        this.path = [];
        if (typeof vectors !== 'undefined') {
            this.AppendArray(vectors);
        };
    }

    Translate(vector: Vector2D): Curve2D {
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].Translate(vector);
        };
        return this;
    }

    Rotate(rotation: number): Curve2D {
        for (var i=0; i<this.path.length; ++i) {
            this.path[i].Rotate(rotation);
        };
        return this;
    }

    Copy():Curve2D {
        var copyArray = [];
        for (var i=0; i<this.path.length; ++i) {
            copyArray.push(this.path[i].Copy());
        };
        return new Curve2D(copyArray);
    }

    Length(): number {
        var length = 0;
        for (var i=0; i<this.path.length-1; ++i) {
            length = length + this.path[i].DistanceTo(this.path[i+1]);
        };
        return length;
    }

    AppendArray(vectorArray: Vector2D[]): Curve2D {
        for (var i=0; i<vectorArray.length; ++i) {
            if ((i===0) && (this.path.length > 0)) {
                if (this.path[this.path.length-1].Copy().Translate(vectorArray[0], -1).Length() < 1) {
                    continue;
                };
            };
            this.path.push(vectorArray[i].Copy());
        }
        return this;
    }

    Append(curve: Curve2D): Curve2D {
        this.AppendArray(curve.path);
        return this;
    }

    Repeat(num: number): Curve2D {
        var singleCurve = this.Copy();
        var translationVector = singleCurve.path[singleCurve.path.length-1].Copy();
        for (var i=1; i<num; ++i) {
            this.Append(singleCurve.Translate(translationVector));
        };
        return this;
    }

    Shape(): Shape {
        return new Shape([this]);
    }

    Thicken(distance: number): Shape {
        var vectorArray = [];
        for(var i=this.path.length-1; i>=0; --i) {
            var tangentIndex = (i === 0) ? 1 : i;
            var translationVector = this.path[tangentIndex].Copy().Translate(this.path[tangentIndex-1], -1).Rotate(90);
            translationVector.Multiply(distance/translationVector.Length());
            vectorArray.push(this.path[i].Copy().Translate(translationVector));
        };
        return this.Copy().Append(new Curve2D(vectorArray)).Shape();
    }
}
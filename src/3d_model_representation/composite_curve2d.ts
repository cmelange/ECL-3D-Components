import { Vector2D } from './vector2d';
import { Shape } from './shape';
import { Curve2D } from './curve2d';

export class CompositeCurve2D implements Curve2D {

    calcPath(): Vector2D[] {
        let path: Vector2D[] = [];
        for (let i=0; i<this._curves.length; ++i) {
            path = path.concat(this._curves[i].calcPath());
        }
        return path;
    }

    translate(vector: Vector2D): CompositeCurve2D {
        for (let i=0; i<this._curves.length; ++i) {
            this._curves[i] = this._curves[i].translate(vector);
        }
        return this;
    }

    rotate(rotation: number): CompositeCurve2D {
        for (let i=0; i<this._curves.length; ++i) {
            this._curves[i] = this._curves[i].rotate(rotation);
        }
        return this;
    }

    copy(): CompositeCurve2D {
        return new CompositeCurve2D().appendCurves(this._curves);
    }

    shape(): Shape {
        return new Shape([this]);
    }

    generateConstructionString(): string {
        return 'COMPOSITE_CURVE2D({' + 
               this._curves.map(curve => curve.generateConstructionString()).join(';') +
               '})';
    }

    appendCurve(curve: Curve2D): CompositeCurve2D {
        this._curves.push(curve);
        return this;
    }

    appendCurves(curves: Curve2D[]): CompositeCurve2D {
        this._curves  = this._curves.concat(curves);
        return this;
    }

    private _curves: Curve2D[] = [];

}
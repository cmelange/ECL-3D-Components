import { toRadians } from './math';
import { Vector2D } from './vector2d';
import { Shape } from './shape';
import { Curve2D } from './curve2d';

export class Circleline2D implements Curve2D {

    public constructor(center: Vector2D,
                       radius: number,
                       startAngle: number,
                       endAngle: number,
                       numPoints: number = 20 ) {
        this._center = center;
        this._radius = radius;
        this._startAngle = startAngle;
        this._endAngle = endAngle;
        this._numPoints = numPoints;
    }

    calcPath(): Vector2D[] {
        let angleDistance = (this._endAngle - this._startAngle)/(this._numPoints-1);
        let circlePath = [];
        for (let i=0; i<this._numPoints; ++i) {
            circlePath.push(new Vector2D(this._radius * Math.cos(toRadians(this._startAngle + i*angleDistance)),
                                         this._radius * Math.sin(toRadians(this._startAngle + i*angleDistance)))
                                .translate(this._center));
        }
        return circlePath;
    }

    translate(vector: Vector2D): Circleline2D {
        this._center.translate(vector);
        return this;
    }

    rotate(rotation: number): Circleline2D {
        this._center.rotate(rotation);
        this._startAngle += rotation;
        this._endAngle += rotation;
        return this;
    }

    copy(): Circleline2D {
        return new Circleline2D(this._center, this._radius, this._startAngle, this._endAngle);
    }

    shape(): Shape {
        return new Shape([this]);
    }

    generateConstructionString(): string {
        return 'CIRCLELINE2D('+ JSON.stringify(this._center.vector) + ';' + this._radius + ';' +
                this._startAngle + ';' + this._endAngle + ')';
    }

    private _center: Vector2D;
    private _radius: number;
    private _startAngle: number;
    private _endAngle: number;
    private _numPoints: number;

}
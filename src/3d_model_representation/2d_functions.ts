import {toRadians} from './math';
import {Vector2D} from './vector2d';
import {Polyline2D} from './polyline2d';
import {Shape} from './shape';

export function tangentPointToCircle(point, center, radius, direction=true): Vector2D {
    let dir = (direction) ? 1 : -1;
    let tangent_angle = dir * Math.asin(radius/point.DistanceTo(center));
    return point.Copy().Add(center.Copy().Add(point,-1).Rotate(tangent_angle).Multiply(Math.cos(tangent_angle)));
}

export function rectangle(width: number,
                          height: number,
                          center: Vector2D = new Vector2D(0,0) ): Shape
{
    return new Polyline2D([new Vector2D(-width/2, -height/2),
                           new Vector2D(-width/2,  height/2),
                           new Vector2D( width/2,  height/2),
                           new Vector2D( width/2, -height/2),
                           new Vector2D(-width/2, -height/2)]).shape();
}

export function parabola(points: Vector2D[],
                         extremum: number,
                         numPoints: number=10,
                         iterations:number=15): Polyline2D {
    let x1 = points[0].vector[0];
    let y1 = points[0].vector[1] - extremum;
    let x2 = points[1].vector[0];
    let y2 = points[1].vector[1] - extremum;
    let xt = 0;
    let A = 0;
    let direction = ((x1 < x2) ? 1 : -1);
    let xtn = direction * (x1 + x2) / 2;
    let step = Math.abs((x1 - x2) / 2);
    let concave = ((extremum > y1) ? 1 : -1);
    for (let i=0; i<iterations; ++i) {
        xt = xtn;
        x1 = x1 - xt;
        x2 = x2 - xt;
        A = y1 / Math.pow(x1, 2);
        step = step/2;
        xtn = step * direction * concave * ((A*Math.pow(x2,2) < y2) ? 1 : -1);
    }
    let parabolaPath = [];
    let currentX = x1;
    let calcStep = (x2-x1) / (numPoints-1);
    let translation = new Vector2D(points[0].vector[0] - x1, extremum);
    for (let i=0; i<numPoints; ++i) {
        parabolaPath.push(new Vector2D(currentX , A*Math.pow(currentX,2)).translate(translation));
        currentX = currentX + calcStep;
    }
    return new Polyline2D(parabolaPath);
}
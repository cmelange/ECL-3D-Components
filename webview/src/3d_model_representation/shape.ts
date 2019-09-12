import {Vector2D} from './vector2d';
import {Curve2D} from './curve2d';
import {Geometry} from './geometry';
import * as csg from '@jscad/csg';

export class Shape {

    paths: Curve2D[];

    constructor(paths: Curve2D[]) {
        this.paths = [];
        for (let i=0; i < paths.length; ++i)
        {
            this.paths.push(paths[i].Copy())
        }
    }
    
    Translate(vector: Vector2D): Shape {
        for (var i=0; i<this.paths.length; ++i) {
            this.paths[i].Translate(vector);
        };
        return this;
    }

    Rotate(rotation: number): Shape {
        for (var i=0; i<this.paths.length; ++i) {
            this.paths[i].Rotate(rotation);
        };
        return this;
    }

    Copy(): Shape {
        return new Shape(this.paths);
    }

    ToCsgCag_() {
        let points: number[][][] = [];
        for (let i=0; i < this.paths.length; ++i)
        {
            points.push(this.paths[i].path.map(x => x.vector));
        }
        return csg.CAG.fromPoints(points);
    }

    /**
     * Linearly extrudes the shape along de z-axis
     * 
     * @param {number} height extrusion height
     * @returns {Geometry}
     */
    Extrude(height: number): Geometry {
        return new Geometry(this.ToCsgCag_().extrude({offset: [0,0,height], twiststeps: 1, twistangle: 0}));
    }

    /**
     * Revolves the shape around the y-axis
     * 
     * @param {number} angle angle of rotation in degrees
     * @param {number} resolution number of polygons per 360 degree revolution
     * @returns {Geometry}
     */
    Revolve(angle: number, resolution: number =12): Geometry {
        return new Geometry(this.ToCsgCag_().rotateExtrude({angle: angle, resolution: resolution}));
    }

}
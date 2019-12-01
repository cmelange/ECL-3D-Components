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
            this.paths.push(paths[i].copy())
        }
    }
    
    translate(vector: Vector2D): Shape {
        for (var i=0; i<this.paths.length; ++i) {
            this.paths[i].translate(vector);
        };
        return this;
    }

    rotate(rotation: number): Shape {
        for (var i=0; i<this.paths.length; ++i) {
            this.paths[i].rotate(rotation);
        };
        return this;
    }

    copy(): Shape {
        return new Shape(this.paths);
    }

    toCsgCag_() {
        let points: number[][][] = [];
        for (let i=0; i < this.paths.length; ++i)
        {
            points.push(this.paths[i].calcPath().map(x => x.vector));
        }
        return csg.CAG.fromPoints(points);
    }

    /**
     * Linearly extrudes the shape along de z-axis
     * 
     * @param {number} height extrusion height
     * @returns {Geometry}
     */
    extrude(height: number): Geometry {
        let constructionString: string = this.createConstructionString_() + ".EXTRUDE(" + height + ")";
        return new Geometry(this.toCsgCag_().extrude({offset: [0,0,height], twiststeps: 1, twistangle: 0}),
                            constructionString);
    }

    /**
     * Revolves the shape around the y-axis
     * 
     * @param {number} angle angle of rotation in degrees
     * @param {number} resolution number of polygons per 360 degree revolution
     * @returns {Geometry}
     */
    revolve(angle: number, resolution: number =12): Geometry {
        let constructionString: string = this.createConstructionString_() + ".REVOLVE(" + angle + ")";
        return new Geometry(this.toCsgCag_().rotateExtrude({angle: angle, resolution: resolution}),
                            constructionString);
    }

    private createConstructionString_(): string
    {
        return "SHAPE([" + this.paths.map(path => path.generateConstructionString()).join(',') + "])";
    }

}
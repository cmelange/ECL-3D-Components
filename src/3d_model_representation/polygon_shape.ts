import {Vector2D} from './vector2d';
import {Curve2D} from './curve2d';
import {Geometry} from './geometry';
import * as csg from '@jscad/csg';
import { Shape } from './shape';

export class PolygonShape implements Shape {

    paths: Curve2D[];

    constructor(paths: Curve2D[]) {
        this.paths = [];
        for (let i=0; i < paths.length; ++i)
        {
            this.paths.push(paths[i].Copy())
        }
    }
    
    Translate(vector: Vector2D): PolygonShape {
        for (var i=0; i<this.paths.length; ++i) {
            this.paths[i].Translate(vector);
        };
        return this;
    }

    Rotate(rotation: number): PolygonShape {
        for (var i=0; i<this.paths.length; ++i) {
            this.paths[i].Rotate(rotation);
        };
        return this;
    }

    Copy(): PolygonShape {
        return new PolygonShape(this.paths);
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
        let constructionString: string = this.CreatePolygonConstructionString_() + ".EXTRUDE(" + height + ")";
        return new Geometry(this.ToCsgCag_().extrude({offset: [0,0,height], twiststeps: 1, twistangle: 0}),
                            constructionString);
    }

    /**
     * Revolves the shape around the y-axis
     * 
     * @param {number} angle angle of rotation in degrees
     * @param {number} resolution number of polygons per 360 degree revolution
     * @returns {Geometry}
     */
    Revolve(angle: number, resolution: number =12): Geometry {
        let constructionString: string = this.CreatePolygonConstructionString_() + ".REVOLVE(" + angle + "," + resolution + ")";
        return new Geometry(this.ToCsgCag_().rotateExtrude({angle: angle, resolution: resolution}),
                            constructionString);
    }

    private CreatePolygonConstructionString_(): string
    {
        let vectorPaths: number[][][] = [];
        for (let i=0; i<this.paths.length; ++i){
            let vectorPath: number[][] = [];
            for (let j=0; j<this.paths[i].path.length; ++j) {
                vectorPath.push(this.paths[i].path[j].vector);
            }
            vectorPaths.push(vectorPath);
        }
        return "POLYGON_SHAPE(" + JSON.stringify(vectorPaths) + ")";
    }

}
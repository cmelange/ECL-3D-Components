import {Vector3D} from './vector3d';
import {Plane} from './plane';
import * as csg from '@jscad/csg';

export class Geometry {

    geometry; //type csg.CSG
    name: string;
    private constructionString: string;

    constructor(geometry, constructionString: string = '', name: string ='geometry') {
        this.name = name;
        this.geometry = geometry;
        this.constructionString = constructionString;
    }

    ConstructionString(): string {
        return this.constructionString;
    }

    Name(name: string): Geometry {
        this.name = name;
        return this;
    }

    Translate(vector: Vector3D): Geometry {
        this.constructionString = 
            this.constructionString + ".TRANSLATION(" + JSON.stringify(vector.vector) + ")";
        this.geometry.translate(vector.vector);
        return this;
    }

    Rotate(rotation: number[]): Geometry {
        this.constructionString = 
            this.constructionString + ".ROTATION(" + JSON.stringify(rotation) + ")";
        this.geometry.rotate(rotation);
        return this;
    }

    Copy(): Geometry {
        return new Geometry(csg.clone(this.geometry), this.name, this.constructionString);
    }

    /**
     * Clip the geometry by a plane. Retuns the solid on the back side of the plane
     * 
     * @param {Plane} plane plane to cut the geometry
     * @returns {Geometry}
     */
    ClipByPlane(plane: Plane): Geometry {
        this.constructionString = 
            this.constructionString + ".CLIP_BY_PLANE([" + plane.plane.normal.x + "," +
                plane.plane.normal.y + "," + plane.plane.normal.z + "]," + plane.plane.w + ")";
        this.geometry = this.geometry.cutByPlane(plane.plane);
        return this;
    }

    Union(geometry: Geometry): Geometry {
        this.constructionString = 
            this.constructionString + ".UNION(" + geometry.ConstructionString() + ")";
        this.geometry = this.geometry.union(geometry.geometry);
        return this;
    }

    Difference(geometry: Geometry): Geometry {
        this.constructionString = 
            this.constructionString + ".DIFFERENCE(" + geometry.ConstructionString() + ")";
        this.geometry = this.geometry.subtract(geometry.geometry);
        return this;
    }

    Intersection(geometry: Geometry): Geometry {
        this.constructionString = 
            this.constructionString + ".INTERSECT(" + geometry.ConstructionString() + ")";
        this.geometry = this.geometry.intersect(geometry.geometry);
        return this;
    }

}
import {Vector3D} from './vector3d';
import {Plane} from './plane';
import { AbstractIdentifiable } from './abstract_identifiable';

export class Geometry extends AbstractIdentifiable{

    geometry; //type csg.CSG
    name: string;
    private _constructionString: string;

    constructor(geometry, constructionString: string = '', name: string ='geometry') {
        super();
        this.name = name;
        this.geometry = geometry;
        this._constructionString = constructionString;
    }

    get constructionString(): string {
        return this._constructionString;
    }

    withName(name: string): Geometry {
        this.name = name;
        return this;
    }

    translate(vector: Vector3D): Geometry {
        this._constructionString = 
            this._constructionString + ".TRANSLATION(" + JSON.stringify(vector.vector) + ")";
        this.geometry = this.geometry.translate(vector.vector);
        return this;
    }

    rotate(rotation: number[]): Geometry {
        this._constructionString = 
            this._constructionString + ".ROTATION(" + JSON.stringify(rotation) + ")";
        this.geometry = this.geometry.rotateEulerXYZ(rotation[0], rotation[1], rotation[2]);
        return this;
    }

    copy(): Geometry {
        return new Geometry(this.clone(this.geometry), this._constructionString, this.name);
    }

    /**
     * Clip the geometry by a plane. Retuns the solid on the back side of the plane
     * 
     * @param {Plane} plane plane to cut the geometry
     * @returns {Geometry}
     */
    clipByPlane(plane: Plane): Geometry {
        this._constructionString = 
            this._constructionString + ".CLIP_BY_PLANE([" + plane.plane.normal.x + "," +
                plane.plane.normal.y + "," + plane.plane.normal.z + "]," + plane.plane.w + ")";
        this.geometry = this.geometry.cutByPlane(plane.plane);
        return this;
    }

    union(geometry: Geometry): Geometry {
        this._constructionString = 
            this._constructionString + ".UNION(" + geometry.constructionString + ")";
        this.geometry = this.geometry.union(geometry.geometry);
        return this;
    }

    difference(geometry: Geometry): Geometry {
        this._constructionString = 
            this._constructionString + ".DIFFERENCE(" + geometry.constructionString + ")";
        this.geometry = this.geometry.subtract(geometry.geometry);
        return this;
    }

    intersection(geometry: Geometry): Geometry {
        this._constructionString = 
            this._constructionString + ".INTERSECTION(" + geometry.constructionString + ")";
        this.geometry = this.geometry.intersect(geometry.geometry);
        return this;
    }

    /** clone the given object
     * @param {Object} obj - the object to clone by
     * @returns {CSG} new CSG object , a copy of the input
     *
     * @example
     * let copy = clone(sphere())
     */
    private clone (obj) {
        if (obj === null || typeof obj !== 'object') return obj
        var copy = obj.constructor()
        for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
        }
        return copy
    }

}
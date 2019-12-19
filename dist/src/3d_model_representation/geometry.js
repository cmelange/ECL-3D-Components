"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csg = require("@jscad/csg");
const abstract_identifiable_1 = require("./abstract_identifiable");
class Geometry extends abstract_identifiable_1.AbstractIdentifiable {
    constructor(geometry, constructionString = '', name = 'geometry') {
        super();
        this.name = name;
        this.geometry = geometry;
        this._constructionString = constructionString;
    }
    get constructionString() {
        return this._constructionString;
    }
    withName(name) {
        this.name = name;
        return this;
    }
    translate(vector) {
        this._constructionString =
            this._constructionString + ".TRANSLATION(" + JSON.stringify(vector.vector) + ")";
        this.geometry = this.geometry.translate(vector.vector);
        return this;
    }
    rotate(rotation) {
        this._constructionString =
            this._constructionString + ".ROTATION(" + JSON.stringify(rotation) + ")";
        this.geometry = this.geometry.rotateEulerXYZ(rotation[0], rotation[1], rotation[2]);
        return this;
    }
    copy() {
        return new Geometry(csg.clone(this.geometry), this.name, this._constructionString);
    }
    /**
     * Clip the geometry by a plane. Retuns the solid on the back side of the plane
     *
     * @param {Plane} plane plane to cut the geometry
     * @returns {Geometry}
     */
    clipByPlane(plane) {
        this._constructionString =
            this._constructionString + ".CLIP_BY_PLANE([" + plane.plane.normal.x + "," +
                plane.plane.normal.y + "," + plane.plane.normal.z + "]," + plane.plane.w + ")";
        this.geometry = this.geometry.cutByPlane(plane.plane);
        return this;
    }
    union(geometry) {
        this._constructionString =
            this._constructionString + ".UNION(" + geometry.constructionString + ")";
        this.geometry = this.geometry.union(geometry.geometry);
        return this;
    }
    difference(geometry) {
        this._constructionString =
            this._constructionString + ".DIFFERENCE(" + geometry.constructionString + ")";
        this.geometry = this.geometry.subtract(geometry.geometry);
        return this;
    }
    intersection(geometry) {
        this._constructionString =
            this._constructionString + ".INTERSECTION(" + geometry.constructionString + ")";
        this.geometry = this.geometry.intersect(geometry.geometry);
        return this;
    }
}
exports.Geometry = Geometry;

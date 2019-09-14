import {Vector3D} from './vector3d';
import {Plane} from './plane';
import * as csg from '@jscad/csg';

export class Geometry {

    geometry;
    name: string;

    constructor(geometry, name='geometry') {
        this.geometry = geometry;
    }

    Name(name: string) {
        this.name = name;
        return this;
    }

    Translate(vector: Vector3D): Geometry {
        this.geometry = csg.translate(vector.vector, this.geometry);
        return this;
    }

    Rotate(rotation: number[]): Geometry {
        this.geometry = csg.rotate(rotation, this.geometry);
        return this;
    }

    Copy() {
        return new Geometry(csg.clone(this.geometry));
    }

    /**
     * Clip the geometry by a plane. Retuns the solid on the back side of the plane
     * 
     * @param {Plane} plane plane to cut the geometry
     * @returns {Geometry}
     */
    ClipByPlane(plane: Plane): Geometry {
        this.geometry = this.geometry.cutByPlane(plane.plane);
        return this;
    }

    Union(geometry: Geometry): Geometry {
        this.geometry = this.geometry.union(geometry.geometry);
        return this;
    }

    Difference(geometry: Geometry): Geometry {
        this.geometry = this.geometry.subtract(geometry.geometry);
        return this;
    }

    Intersection(geometry: Geometry): Geometry {
        this.geometry = this.geometry.intersect(geometry.geometry);
        return this;
    }

}
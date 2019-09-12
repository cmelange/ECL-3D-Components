import {Vector3D} from './vector3d';
import * as csg from '@jscad/csg';

export class Plane {

    plane;

    constructor(normal: Vector3D, point: Vector3D) {
        this.plane = csg.CSG.Plane.fromNormalAndPoint(normal.vector, point.vector);
    }

    Translate(vector: Vector3D): Plane {
        this.plane = this.plane.transform(csg.Matrix4x4.translation(vector.vector));
        return this;
    }

    Flip(): Plane {
        this.plane = this.plane.flipped();
        return this;
    }

    Copy(): Plane {
        let copyPlane = new Plane(new Vector3D(0,0,1), new Vector3D(0,0,0));
        copyPlane.plane = new csg.CSG.Plane(this.plane.normal, this.plane.w);
        return copyPlane;
    }

}
import {Vector2D} from './vector2d';
import {Curve2D} from './curve2d';
import {Geometry} from './geometry';
import * as csg from '@jscad/csg';

export interface Shape {
 
    translate(vector: Vector2D): Shape;

    rotate(rotation: number): Shape;

    copy(): Shape;

    toCsgCag_();

    /**
     * Linearly extrudes the shape along de z-axis
     * 
     * @param {number} height extrusion height
     * @returns {Geometry}
     */
    extrude(height: number): Geometry;

    /**
     * Revolves the shape around the y-axis
     * 
     * @param {number} angle angle of rotation in degrees
     * @param {number} resolution number of polygons per 360 degree revolution
     * @returns {Geometry}
     */
    revolve(angle: number, resolution: number): Geometry;

}
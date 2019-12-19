"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geometry_1 = require("./geometry");
const csg = require("@jscad/csg");
class Shape {
    constructor(paths) {
        this.paths = [];
        for (let i = 0; i < paths.length; ++i) {
            this.paths.push(paths[i].copy());
        }
    }
    translate(vector) {
        for (var i = 0; i < this.paths.length; ++i) {
            this.paths[i].translate(vector);
        }
        ;
        return this;
    }
    rotate(rotation) {
        for (var i = 0; i < this.paths.length; ++i) {
            this.paths[i].rotate(rotation);
        }
        ;
        return this;
    }
    copy() {
        return new Shape(this.paths);
    }
    toCsgCag_() {
        let points = [];
        for (let i = 0; i < this.paths.length; ++i) {
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
    extrude(height) {
        let constructionString = this.createConstructionString_() + ".EXTRUDE(" + height + ")";
        return new geometry_1.Geometry(this.toCsgCag_().extrude({ offset: [0, 0, height], twiststeps: 1, twistangle: 0 }), constructionString);
    }
    /**
     * Revolves the shape around the y-axis
     *
     * @param {number} angle angle of rotation in degrees
     * @param {number} resolution number of polygons per 360 degree revolution
     * @returns {Geometry}
     */
    revolve(angle, resolution = 12) {
        let constructionString = this.createConstructionString_() + ".REVOLVE(" + angle + ")";
        return new geometry_1.Geometry(this.toCsgCag_().rotateExtrude({ angle: angle, resolution: resolution }), constructionString);
    }
    createConstructionString_() {
        return "SHAPE({" + this.paths.map(path => path.generateConstructionString()).join(';') + "})";
    }
}
exports.Shape = Shape;

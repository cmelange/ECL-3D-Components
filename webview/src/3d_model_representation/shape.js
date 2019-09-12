"use strict";
exports.__esModule = true;
var geometry_1 = require("./geometry");
var csg = require("@jscad/csg");
var Shape = /** @class */ (function () {
    function Shape(paths) {
        this.paths = [];
        for (var i = 0; i < paths.length; ++i) {
            this.paths.push(paths[i].Copy());
        }
    }
    Shape.prototype.Translate = function (vector) {
        for (var i = 0; i < this.paths.length; ++i) {
            this.paths[i].Translate(vector);
        }
        ;
        return this;
    };
    Shape.prototype.Rotate = function (rotation) {
        for (var i = 0; i < this.paths.length; ++i) {
            this.paths[i].Rotate(rotation);
        }
        ;
        return this;
    };
    Shape.prototype.Copy = function () {
        return new Shape(this.paths);
    };
    Shape.prototype.ToCsgCag_ = function () {
        var points = [];
        for (var i = 0; i < this.paths.length; ++i) {
            points.push(this.paths[i].path.map(function (x) { return x.vector; }));
        }
        return csg.CAG.fromPoints(points);
    };
    /**
     * Linearly extrudes the shape along de z-axis
     *
     * @param {number} height extrusion height
     * @returns {Geometry}
     */
    Shape.prototype.Extrude = function (height) {
        return new geometry_1.Geometry(this.ToCsgCag_().extrude({ offset: [0, 0, height], twiststeps: 1, twistangle: 0 }));
    };
    /**
     * Revolves the shape around the y-axis
     *
     * @param {number} angle angle of rotation in degrees
     * @param {number} resolution number of polygons per 360 degree revolution
     * @returns {Geometry}
     */
    Shape.prototype.Revolve = function (angle, resolution) {
        if (resolution === void 0) { resolution = 12; }
        return new geometry_1.Geometry(this.ToCsgCag_().rotateExtrude({ angle: angle, resolution: resolution }));
    };
    return Shape;
}());
exports.Shape = Shape;

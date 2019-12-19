"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shape_1 = require("./shape");
class CompositeCurve2D {
    constructor() {
        this._curves = [];
    }
    calcPath() {
        let path = [];
        for (let i = 0; i < this._curves.length; ++i) {
            path = path.concat(this._curves[i].calcPath());
        }
        return path;
    }
    translate(vector) {
        for (let i = 0; i < this._curves.length; ++i) {
            this._curves[i] = this._curves[i].translate(vector);
        }
        return this;
    }
    rotate(rotation) {
        for (let i = 0; i < this._curves.length; ++i) {
            this._curves[i] = this._curves[i].rotate(rotation);
        }
        return this;
    }
    copy() {
        return new CompositeCurve2D().appendCurves(this._curves);
    }
    shape() {
        return new shape_1.Shape([this]);
    }
    generateConstructionString() {
        return 'COMPOSITE_CURVE2D({' +
            this._curves.map(curve => curve.generateConstructionString()).join(';') +
            '})';
    }
    appendCurve(curve) {
        this._curves.push(curve);
        return this;
    }
    appendCurves(curves) {
        this._curves = this._curves.concat(curves);
        return this;
    }
}
exports.CompositeCurve2D = CompositeCurve2D;

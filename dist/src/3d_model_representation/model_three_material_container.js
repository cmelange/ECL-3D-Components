"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model2three_1 = require("./model2three");
class Model2ThreeMaterialContainter {
    get modelMaterial() { return this._modelMaterial; }
    ;
    get threeMaterial() { return this._threeMaterial; }
    ;
    constructor(material) {
        this._modelMaterial = material;
        this._threeMaterial = model2three_1.modelMaterial2ThreeMaterial(material);
        this.active = true;
    }
}
exports.Model2ThreeMaterialContainter = Model2ThreeMaterialContainter;

import { Material } from "./material";
import { Material as ThreeMaterial } from "three";
import { modelMaterial2ThreeMaterial } from "./model2three";

export class Model2ThreeMaterialContainter {
    public get modelMaterial(): Material { return this._modelMaterial };
    public get threeMaterial(): ThreeMaterial { return this._threeMaterial };

    constructor(material: Material) {
        this._modelMaterial = material;
        this._threeMaterial = modelMaterial2ThreeMaterial(material);
    }

    private _modelMaterial: Material;
    private _threeMaterial: ThreeMaterial;
}
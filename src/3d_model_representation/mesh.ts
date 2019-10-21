import { Geometry } from "./geometry";
import { Material } from "./material";

export class Mesh
{
    name: string;
    geometry: Geometry;
    material: Material;

    constructor(geometry: Geometry, material: Material, name: string='mesh')
    {
        this.geometry = geometry;
        this.material = material;
        this.name = name;
    }

    withName(name: string): Mesh
    {
        this.name = name;
        return this;
    }

    withGeometry(geometry: Geometry): Mesh
    {
        this.geometry = geometry;
        return this;
    }

    withMaterial(material: Material): Mesh
    {
        this.material = material;
        return this;
    }

}
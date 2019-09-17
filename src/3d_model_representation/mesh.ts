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

    Name(name: string): Mesh
    {
        this.name = name;
        return this;
    }

    Geometry(geometry: Geometry): Mesh
    {
        this.geometry = geometry;
        return this;
    }

    Material(material: Material): Mesh
    {
        this.material = material;
        return this;
    }

}
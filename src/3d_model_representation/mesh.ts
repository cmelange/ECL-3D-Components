import { Geometry } from "./geometry";
import { Material } from "./material";
import { Group } from "./group";
import { AbstractIdentifiable } from "./abstract_identifiable";

export class Mesh extends AbstractIdentifiable
{
    name: string;
    geometry: Geometry;
    material: Material;

    constructor(geometry: Geometry, material: Material, name: string='mesh')
    {
        super();
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

    toGroup(name: string): Group
    {
        return new Group().withName(name)
                          .addMesh(this);
    }

}
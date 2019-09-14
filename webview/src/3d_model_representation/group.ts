import { Mesh } from "./mesh";
import { Vector3D } from "./vector3d";

export class Group
{
    name: string;
    meshes: Map<string, Mesh>;
    translation: Vector3D;
    rotation: [number, number, number];
    scale: [number, number, number];
    children: Map<string, Group>;

    constructor(name: string='group')
    {
        this.name = name;
        this.meshes = new Map();
        this.children = new Map();
    }

    Name(name: string): Group
    {
        this.name = name;
        return this;
    }

    AddMesh(mesh: Mesh): Group
    {
        this.meshes.set(mesh.name, mesh);
        return this;
    }

    RemoveMesh(name: string): Group
    {
        this.meshes.delete(name);
        return this;
    }

    Translation(vector: Vector3D): Group
    {
        this.translation = vector;
        return this;
    }

    Rotation(rotation: [number, number, number]): Group
    {
        this.rotation = rotation;
        return this;
    }

    Scale(scale: [number, number, number]): Group
    {
        this.scale = scale;
        return this;
    }

    AddGroup(group: Group): Group
    {
        this.children.set(group.name, group);
        return this;
    }

    RemoveGroup(name: string): Group
    {
        this.children.delete(name);
        return this;
    }
}
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
        this.translation = new Vector3D(0,0,0);
        this.rotation = [0,0,0];
        this.scale = [1,1,1];
    }

    withName(name: string): Group
    {
        this.name = name;
        return this;
    }

    addMesh(mesh: Mesh): Group
    {
        this.meshes.set(mesh.name, mesh);
        return this;
    }

    removeMesh(name: string): Group
    {
        this.meshes.delete(name);
        return this;
    }

    withTranslation(vector: Vector3D): Group
    {
        this.translation = vector;
        return this;
    }

    withRotation(rotation: [number, number, number]): Group
    {
        this.rotation = rotation;
        return this;
    }

    withScale(scale: [number, number, number]): Group
    {
        this.scale = scale;
        return this;
    }

    addGroup(group: Group): Group
    {
        this.children.set(group.name, group);
        return this;
    }

    removeGroup(name: string): Group
    {
        this.children.delete(name);
        return this;
    }
}
import { Mesh } from "./mesh";
import { Vector3D } from "./vector3d";
import { AbstractIdentifiable } from "./abstract_identifiable";

export class Group extends AbstractIdentifiable
{
    name: string;
    meshes: Mesh[];
    translation: Vector3D;
    rotation: [number, number, number];
    scale: [number, number, number];
    children: Group[];

    constructor(name: string='group')
    {
        super();
        this.name = name;
        this.meshes = [];
        this.children = [];
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
        this.meshes.push(mesh);
        return this;
    }

    removeMesh(id: string): Group
    {
        let index = this.meshes.findIndex(function(mesh:Mesh) {
                                            return (mesh.id === id)
                                          });
        if (index > -1) {
            this.meshes.splice(index, 1);
        }        
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
        this.children.push(group);
        return this;
    }

    removeGroup(id: string): Group
    {
        let index = this.children.findIndex(function(group:Group) {
            return (group.id === id)
          });
        if (index > -1) {
        this.children.splice(index, 1);
        }        
        return this;
    }

    findMeshById(id: string): Mesh
    {
        return this.meshes.find(function(mesh:Mesh) {
            return (mesh.id === id)
        });
    }

    findMeshByName(name: string): Mesh
    {
        return this.meshes.find(function(mesh:Mesh) {
            return (mesh.name === name)
        });
    }

    findGroupById(id: string): Group
    {
        return this.children.find(function(group:Group) {
            return (group.id === id)
        });
    }

    findGroupByName(name: string): Group
    {
        return this.children.find(function(group:Group) {
            return (group.name === name)
        });
    }
}
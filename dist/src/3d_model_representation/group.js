"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector3d_1 = require("./vector3d");
const abstract_identifiable_1 = require("./abstract_identifiable");
class Group extends abstract_identifiable_1.AbstractIdentifiable {
    constructor(name = 'group') {
        super();
        this.name = name;
        this.meshes = [];
        this.children = [];
        this.translation = new vector3d_1.Vector3D(0, 0, 0);
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }
    withName(name) {
        this.name = name;
        return this;
    }
    addMesh(mesh) {
        this.meshes.push(mesh);
        return this;
    }
    removeMesh(id) {
        let index = this.meshes.findIndex(function (mesh) {
            return (mesh.id === id);
        });
        if (index > -1) {
            this.meshes.splice(index, 1);
        }
        return this;
    }
    withTranslation(vector) {
        this.translation = vector;
        return this;
    }
    withRotation(rotation) {
        this.rotation = rotation;
        return this;
    }
    withScale(scale) {
        this.scale = scale;
        return this;
    }
    addGroup(group) {
        this.children.push(group);
        return this;
    }
    removeGroup(id) {
        let index = this.children.findIndex(function (group) {
            return (group.id === id);
        });
        if (index > -1) {
            this.children.splice(index, 1);
        }
        return this;
    }
    findMeshById(id) {
        return this.meshes.find(function (mesh) {
            return (mesh.id === id);
        });
    }
    findMeshByName(name) {
        return this.meshes.find(function (mesh) {
            return (mesh.name === name);
        });
    }
    findGroupById(id) {
        return this.children.find(function (group) {
            return (group.id === id);
        });
    }
    findGroupByName(name) {
        return this.children.find(function (group) {
            return (group.name === name);
        });
    }
}
exports.Group = Group;

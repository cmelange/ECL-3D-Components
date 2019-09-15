"use strict";
exports.__esModule = true;
var vector3d_1 = require("./vector3d");
var Group = /** @class */ (function () {
    function Group(name) {
        if (name === void 0) { name = 'group'; }
        this.name = name;
        this.meshes = new Map();
        this.children = new Map();
        this.translation = new vector3d_1.Vector3D(0, 0, 0);
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }
    Group.prototype.Name = function (name) {
        this.name = name;
        return this;
    };
    Group.prototype.AddMesh = function (mesh) {
        this.meshes.set(mesh.name, mesh);
        return this;
    };
    Group.prototype.RemoveMesh = function (name) {
        this.meshes["delete"](name);
        return this;
    };
    Group.prototype.Translation = function (vector) {
        this.translation = vector;
        return this;
    };
    Group.prototype.Rotation = function (rotation) {
        this.rotation = rotation;
        return this;
    };
    Group.prototype.Scale = function (scale) {
        this.scale = scale;
        return this;
    };
    Group.prototype.AddGroup = function (group) {
        this.children.set(group.name, group);
        return this;
    };
    Group.prototype.RemoveGroup = function (name) {
        this.children["delete"](name);
        return this;
    };
    return Group;
}());
exports.Group = Group;

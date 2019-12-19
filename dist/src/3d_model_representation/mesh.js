"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const group_1 = require("./group");
const abstract_identifiable_1 = require("./abstract_identifiable");
class Mesh extends abstract_identifiable_1.AbstractIdentifiable {
    constructor(geometry, material, name = 'mesh') {
        super();
        this.castShadowFlag = false;
        this.receiveShadowFlag = false;
        this.geometry = geometry;
        this.material = material;
        this.name = name;
    }
    withName(name) {
        this.name = name;
        return this;
    }
    withGeometry(geometry) {
        this.geometry = geometry;
        return this;
    }
    withMaterial(material) {
        this.material = material;
        return this;
    }
    castShadow(castShadow = true) {
        this.castShadowFlag = castShadow;
        return this;
    }
    receiveShadow(receiveShadow = true) {
        this.receiveShadowFlag = receiveShadow;
        return this;
    }
    toGroup(name) {
        return new group_1.Group().withName(name)
            .addMesh(this);
    }
}
exports.Mesh = Mesh;

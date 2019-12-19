"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_json_serializer_1 = require("typescript-json-serializer");
const representation_item_1 = require("./representation_item");
const material_1 = require("./material");
let Representation = class Representation {
    constructor() {
        this.representationItems = [];
        this.materials = [];
    }
    addRepresentationItem(representationItem) {
        this.representationItems.push(representationItem);
        return this;
    }
    addRepresentationItems(representationItems) {
        this.representationItems = this.representationItems.concat(representationItems);
        return this;
    }
    addMaterial(material) {
        this.materials.push(material);
        return this;
    }
    addMaterials(materials) {
        this.materials = this.materials.concat(materials);
        return this;
    }
};
__decorate([
    typescript_json_serializer_1.JsonProperty({ type: representation_item_1.RepresentationItem }),
    __metadata("design:type", Array)
], Representation.prototype, "representationItems", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty({ type: material_1.Material }),
    __metadata("design:type", Array)
], Representation.prototype, "materials", void 0);
Representation = __decorate([
    typescript_json_serializer_1.Serializable()
], Representation);
exports.Representation = Representation;

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
const transformation_1 = require("./transformation");
let RepresentationItem = class RepresentationItem {
    constructor() {
        this.constructionString = "";
    }
    withConstructionString(constructionString) {
        this.constructionString = constructionString;
        return this;
    }
    withMaterial(material) {
        this.material = material;
        return this;
    }
    withTransformation(transformation) {
        this.transformation = transformation;
        return this;
    }
};
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", String)
], RepresentationItem.prototype, "constructionString", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", String)
], RepresentationItem.prototype, "material", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty({ type: transformation_1.Transformation }),
    __metadata("design:type", transformation_1.Transformation)
], RepresentationItem.prototype, "transformation", void 0);
RepresentationItem = __decorate([
    typescript_json_serializer_1.Serializable()
], RepresentationItem);
exports.RepresentationItem = RepresentationItem;

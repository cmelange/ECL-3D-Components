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
const color_rgba_1 = require("./color_rgba");
let Material = class Material {
    withName(name) {
        this.name = name;
        return this;
    }
    withColor(color) {
        this.color = color;
        return this;
    }
    isMetallic(metallic) {
        this.metal = metallic;
        return this;
    }
    withRoughness(roughness) {
        this.roughness = roughness;
        return this;
    }
};
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", String)
], Material.prototype, "name", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty({ type: color_rgba_1.ColorRGBa }),
    __metadata("design:type", color_rgba_1.ColorRGBa)
], Material.prototype, "color", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", Boolean)
], Material.prototype, "metal", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", Number)
], Material.prototype, "roughness", void 0);
Material = __decorate([
    typescript_json_serializer_1.Serializable()
], Material);
exports.Material = Material;

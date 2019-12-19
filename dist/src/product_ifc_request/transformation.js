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
class Transformation {
    constructor() {
        this.translation = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = 1;
    }
    withTranslation(translation) {
        this.translation = translation;
        return this;
    }
    /**
     * Set the rotation component of the transformation
     * @param rotation rotation in Quaternion format [w x y z]
     */
    withRotation(rotation) {
        this.rotation = rotation;
        return this;
    }
    withScale(scale) {
        this.scale = scale;
        return this;
    }
}
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", Array)
], Transformation.prototype, "translation", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", Array)
], Transformation.prototype, "rotation", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", Number)
], Transformation.prototype, "scale", void 0);
exports.Transformation = Transformation;

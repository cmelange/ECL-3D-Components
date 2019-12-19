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
const project_1 = require("./project");
const owner_history_1 = require("./owner_history");
const product_1 = require("./product");
var IfcSchema;
(function (IfcSchema) {
    IfcSchema["IFC2X3"] = "IFC2X3";
    IfcSchema["IFC4"] = "IFC4";
    IfcSchema["IFC4x1"] = "IFC4X1";
})(IfcSchema = exports.IfcSchema || (exports.IfcSchema = {}));
let ProductIfcRequest = class ProductIfcRequest {
    constructor() {
        this.schema = IfcSchema.IFC2X3;
    }
    withProject(project) {
        this.project = project;
        return this;
    }
    withOwner(owner) {
        this.owner = owner;
        return this;
    }
    withProduct(product) {
        this.product = product;
        return this;
    }
    withSchema(schema) {
        this.schema = schema;
        return this;
    }
    serialize() {
        return typescript_json_serializer_1.serialize(this);
    }
};
__decorate([
    typescript_json_serializer_1.JsonProperty({ type: project_1.Project }),
    __metadata("design:type", project_1.Project)
], ProductIfcRequest.prototype, "project", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty({ type: owner_history_1.OwnerHistory }),
    __metadata("design:type", owner_history_1.OwnerHistory)
], ProductIfcRequest.prototype, "owner", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty({ type: product_1.Product }),
    __metadata("design:type", product_1.Product)
], ProductIfcRequest.prototype, "product", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", String)
], ProductIfcRequest.prototype, "schema", void 0);
ProductIfcRequest = __decorate([
    typescript_json_serializer_1.Serializable()
], ProductIfcRequest);
exports.ProductIfcRequest = ProductIfcRequest;

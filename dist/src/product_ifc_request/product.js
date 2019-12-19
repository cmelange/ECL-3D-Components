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
const representation_1 = require("./representation");
var ProductType;
(function (ProductType) {
    ProductType["Proxy"] = "PROXY";
})(ProductType = exports.ProductType || (exports.ProductType = {}));
let Product = class Product {
    constructor() {
        this.type = ProductType.Proxy;
        this.name = '';
        this.description = '';
        this.representations = [];
    }
    withType(type) {
        this.type = type;
        return this;
    }
    withName(name) {
        this.name = name;
        return this;
    }
    withDescription(description) {
        this.description = description;
        return this;
    }
    addRepresentation(representation) {
        this.representations.push(representation);
        return this;
    }
    addRepresentations(representations) {
        this.representations = this.representations.concat(representations);
        return this;
    }
};
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", String)
], Product.prototype, "type", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty({ type: representation_1.Representation }),
    __metadata("design:type", Array)
], Product.prototype, "representations", void 0);
Product = __decorate([
    typescript_json_serializer_1.Serializable()
], Product);
exports.Product = Product;

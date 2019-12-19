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
const organization_1 = require("./organization");
let Application = class Application {
    constructor() {
        this.name = '';
        this.version = '';
        this.identifier = '';
        this.organization = new organization_1.Organization();
    }
    withName(name) {
        this.name = name;
        return this;
    }
    withVersion(version) {
        this.version = version;
        return this;
    }
    withIdentifier(identifier) {
        this.identifier = identifier;
        return this;
    }
    withOrganization(organization) {
        this.organization = organization;
        return this;
    }
};
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", String)
], Application.prototype, "name", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", String)
], Application.prototype, "version", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty(),
    __metadata("design:type", String)
], Application.prototype, "identifier", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty({ type: organization_1.Organization }),
    __metadata("design:type", organization_1.Organization)
], Application.prototype, "organization", void 0);
Application = __decorate([
    typescript_json_serializer_1.Serializable()
], Application);
exports.Application = Application;

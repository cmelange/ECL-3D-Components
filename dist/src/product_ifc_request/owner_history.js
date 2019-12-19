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
const person_1 = require("./person");
const application_1 = require("./application");
let OwnerHistory = class OwnerHistory {
    constructor() {
        this.person = new person_1.Person();
        this.organization = new organization_1.Organization();
        this.application = new application_1.Application();
    }
};
__decorate([
    typescript_json_serializer_1.JsonProperty({ type: person_1.Person }),
    __metadata("design:type", person_1.Person)
], OwnerHistory.prototype, "person", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty({ type: organization_1.Organization }),
    __metadata("design:type", organization_1.Organization)
], OwnerHistory.prototype, "organization", void 0);
__decorate([
    typescript_json_serializer_1.JsonProperty({ type: application_1.Application }),
    __metadata("design:type", application_1.Application)
], OwnerHistory.prototype, "application", void 0);
OwnerHistory = __decorate([
    typescript_json_serializer_1.Serializable()
], OwnerHistory);
exports.OwnerHistory = OwnerHistory;

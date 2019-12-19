"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class AbstractIdentifiable {
    get id() { return this._id; }
    ;
    constructor() {
        this._id = uuid_1.v4();
    }
}
exports.AbstractIdentifiable = AbstractIdentifiable;

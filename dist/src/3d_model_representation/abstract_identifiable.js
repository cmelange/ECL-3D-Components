"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class AbstractIdentifiable {
    constructor() {
        this._id = uuid_1.v4();
    }
    get id() { return this._id; }
    ;
}
exports.AbstractIdentifiable = AbstractIdentifiable;

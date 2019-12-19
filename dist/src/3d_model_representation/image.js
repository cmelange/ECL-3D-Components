"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Image {
    constructor(name = 'image') {
        this.name = name;
    }
    withName(name) {
        this.name = name;
        return this;
    }
    withImage(uri) {
        this.image = uri;
        return this;
    }
}
exports.Image = Image;

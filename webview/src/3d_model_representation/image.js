"use strict";
exports.__esModule = true;
var Image = /** @class */ (function () {
    function Image(name) {
        if (name === void 0) { name = 'image'; }
        this.name = name;
    }
    Image.prototype.Name = function (name) {
        this.name = name;
        return this;
    };
    Image.prototype.Image = function (uri) {
        this.image = uri;
        return this;
    };
    return Image;
}());
exports.Image = Image;

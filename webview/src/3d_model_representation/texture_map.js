"use strict";
exports.__esModule = true;
var FilterType;
(function (FilterType) {
    FilterType[FilterType["NEAREST"] = 9728] = "NEAREST";
    FilterType[FilterType["LINEAR"] = 9729] = "LINEAR";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
var WrapMethod;
(function (WrapMethod) {
    WrapMethod[WrapMethod["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
    WrapMethod[WrapMethod["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
    WrapMethod[WrapMethod["REPEAT"] = 10497] = "REPEAT";
})(WrapMethod = exports.WrapMethod || (exports.WrapMethod = {}));
var TextureMap = /** @class */ (function () {
    function TextureMap() {
    }
    TextureMap.prototype.Image = function (image) {
        this.image = image;
        return this;
    };
    TextureMap.prototype.MagFilter = function (filterType) {
        this.magFilter = filterType;
        return this;
    };
    TextureMap.prototype.MinFilter = function (filterType) {
        this.minFilter = filterType;
        return this;
    };
    TextureMap.prototype.WrapS = function (wrapMethod) {
        this.wrapS = wrapMethod;
        return this;
    };
    TextureMap.prototype.WrapT = function (wrapMethod) {
        this.wrapT = wrapMethod;
        return this;
    };
    TextureMap.prototype.Offset = function (offset) {
        this.offset = offset;
        return this;
    };
    TextureMap.prototype.Rotation = function (angle) {
        this.rotation = angle;
        return this;
    };
    TextureMap.prototype.Scale = function (scale) {
        this.scale = scale;
        return this;
    };
    return TextureMap;
}());
exports.TextureMap = TextureMap;

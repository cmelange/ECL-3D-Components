"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class TextureMap {
    WithImage(image) {
        this.image = image;
        return this;
    }
    withMagFilter(filterType) {
        this.magFilter = filterType;
        return this;
    }
    withMinFilter(filterType) {
        this.minFilter = filterType;
        return this;
    }
    withWrapS(wrapMethod) {
        this.wrapS = wrapMethod;
        return this;
    }
    withWrapT(wrapMethod) {
        this.wrapT = wrapMethod;
        return this;
    }
    withOffset(offset) {
        this.offset = offset;
        return this;
    }
    withRotation(angle) {
        this.rotation = angle;
        return this;
    }
    withScale(scale) {
        this.scale = scale;
        return this;
    }
}
exports.TextureMap = TextureMap;

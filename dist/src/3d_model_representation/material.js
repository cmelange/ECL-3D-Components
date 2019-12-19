"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_identifiable_1 = require("./abstract_identifiable");
class Material extends abstract_identifiable_1.AbstractIdentifiable {
    constructor(name = 'material') {
        super();
        this.baseColor = [1, 1, 1, 1];
        this.metallic = 1;
        this.roughness = 1;
        this.name = name;
    }
    withName(name) {
        this.name = name;
        return this;
    }
    /**
     * Set the RGBA components of the base color of the material. Each element in the array
     * must be greater than or equal to 0 and less than or equal to 1. These values are linear.
     * If a baseColorTexture is specified, this value is multiplied with the texel values.
     *
     * @param {[number, number, number, number]} baseColor
     * @returns {Material}
     */
    withBaseColor(baseColor) {
        this.baseColor = baseColor;
        return this;
    }
    /**
     * Set the base color texture. The first three components (RGB) are encoded with the
     * sRGB transfer function. They specify the base color of the material. If the fourth
     * component (A) is present, it represents the linear alpha coverage of the material.
     *
     * @param {TextureMap} baseColorTexture
     * @returns {Material}
     */
    withBaseColorTexture(baseColorTexture) {
        this.baseColorTexture = baseColorTexture;
        return this;
    }
    /**
     * Set the metalness of the material. A value of 1.0 means the material is a metal.
     * A value of 0.0 means the material is a dielectric. Values in between are for
     * blending between metals and dielectrics such as dirty metallic surfaces. This
     * value is linear. If a metallicRoughnessTexture is specified, this value is
     * multiplied with the metallic texel values.
     *
     * @param {number} metallic
     * @returns {Material}
     */
    withMetallic(metallic) {
        this.metallic = metallic;
        return this;
    }
    /**
     * Set the roughness of the material. A value of 1.0 means the material is completely rough.
     * A value of 0.0 means the material is completely smooth. This value is linear. If a
     * metallicRoughnessTexture is specified, this value is multiplied with the roughness
     * texel values.
     *
     * @param {number} roughness
     * @returns {Material}
     */
    withRoughness(roughness) {
        this.roughness = roughness;
        return this;
    }
    /**
     * Set the metallic-roughness texture. The metalness values are sampled from the Bleu channel.
     * The roughness values are sampled from the Green channel. These values are linear. If other
     * channels are present (Red or Alpha), they are ignored for metallic-roughness calculations.
     *
     * @param {TextureMap} metalRoughnessTexture
     * @returns {Material}
     */
    withMetalRoughnessTexture(metalRoughnessTexture) {
        this.metalRoughnessTexture = metalRoughnessTexture;
        return this;
    }
    /**
     * Set the tangent space normal map. The texture contains RGB components in linear space. Each
     * texel represents the XYZ components of a normal vector in tangent space. Red [0 to 255] maps
     * to X [-1 to 1]. Green [0 to 255] maps to Y [-1 to 1]. Blue [128 to 255] maps to Z [1/255 to 1].
     * The normal vectors use OpenGL conventions where +X is right and +Y is up. +Z points toward the
     * viewer.
     *
     * @param {TextureMap} normalTexture
     * @returns {Material}
     */
    withNormalTexture(normalTexture) {
        this.normalTexture = normalTexture;
        return this;
    }
    /**
     * Set the occlusion map texture. The occlusion values are sampled from the R channel. Higher
     * values indicate areas that should receive full indirect lighting and lower values indicate no
     * indirect lighting. These values are linear. If other channels are present (GBA), they are
     * ignored for occlusion calculations.
     *
     * @param {TextureMap} occlusionTexture
     * @returns {Material}
     */
    withOcclusionTexture(occlusionTexture) {
        this.occlusionTexture = occlusionTexture;
        return this;
    }
    /**
     * Set the RGB components of the emissive color of the material. These values are linear. If an
     * emissiveTexture is specified, this value is multiplied with the texel values.
     *
     * @param {[number, number, number]} emissive
     * @returns {Material}
     */
    withEmissive(emissive) {
        this.emissive = emissive;
        return this;
    }
    /**
     * Set the emissive map tthat controls the color and intensity of the light being emitted by the
     * material. This texture contains RGB components encoded with the sRGB transfer function. If a
     * fourth component (A) is present, it is ignored.
     *
     * @param {TextureMap} emissiveTexture
     * @returns {Material}
     */
    withEmissiveTexture(emissiveTexture) {
        this.emissiveTexture = emissiveTexture;
        return this;
    }
}
exports.Material = Material;

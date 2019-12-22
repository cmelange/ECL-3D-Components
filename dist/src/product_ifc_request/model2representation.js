"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const representation_1 = require("./representation");
const representation_item_1 = require("./representation_item");
const _3d_model_representation_1 = require("../3d_model_representation");
const transformation_1 = require("./transformation");
const material_1 = require("./material");
const color_rgba_1 = require("./color_rgba");
function group2Representation(group) {
    let representation = new representation_1.Representation();
    var materials = [];
    representation.addRepresentationItems(group2RepresentationItems(group, new _3d_model_representation_1.Vector3D(0, 0, 0), new _3d_model_representation_1.Quaternion().setFromEuler([0, 0, 0]), 1, materials))
        .addMaterials(materials);
    return representation;
}
exports.group2Representation = group2Representation;
function group2RepresentationItems(group, translation, rotation, scale, materials) {
    let items = [];
    let newTranslation = group.translation.copy()
        .multiply(scale)
        .rotateByQuaternion(rotation)
        .translate(translation);
    let newRotation = rotation.multiply(new _3d_model_representation_1.Quaternion().setFromEuler(group.rotation));
    let newScale = scale * group.scale[0];
    let transformation = new transformation_1.Transformation().withRotation([newRotation.w,
        newRotation.x,
        newRotation.y,
        newRotation.z])
        .withTranslation([newTranslation.vector[0],
        newTranslation.vector[1],
        newTranslation.vector[2]])
        .withScale(newScale);
    for (let i = 0; i < group.meshes.length; ++i) {
        if (group.meshes[i].material !== undefined) {
            let materialId = group.meshes[i].material.id;
            let modelMaterial = group.meshes[i].material;
            if (materials.find(material => material.id === materialId) === undefined) {
                materials.push(new material_1.Material().withId(materialId)
                    .withName(modelMaterial.name)
                    .withColor(new color_rgba_1.ColorRGBa(modelMaterial.baseColor[0], modelMaterial.baseColor[1], modelMaterial.baseColor[2], modelMaterial.baseColor[3]))
                    .isMetallic(modelMaterial.metallic > 0.5)
                    .withRoughness(modelMaterial.roughness));
            }
        }
        items.push(new representation_item_1.RepresentationItem().withConstructionString(group.meshes[i].geometry.constructionString)
            .withTransformation(transformation)
            .withMaterial(group.meshes[i].material.id));
    }
    for (let i = 0; i < group.children.length; ++i) {
        items = items.concat(group2RepresentationItems(group.children[i], newTranslation, newRotation, newScale, materials));
    }
    return items;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _3d_model_representation_1 = require("../../src/3d_model_representation");
const model2three_1 = require("../../src/3d_model_representation/model2three");
const math_1 = require("../../src/3d_model_representation/math");
test('updateThreeGroup update transformation test', () => {
    //construct initial model
    let group = new _3d_model_representation_1.Group().withName("group under test")
        .withTranslation(new _3d_model_representation_1.Vector3D(1, 2, 3))
        .withRotation([45, 45, 45])
        .withScale([1, 2, 3]);
    let threeGroup = _3d_model_representation_1.modelGroup2ThreeGroup(group);
    //update group transformation
    group.withTranslation(new _3d_model_representation_1.Vector3D(3, 2, 1))
        .withRotation([35, 35, 35])
        .withScale([3, 2, 1]);
    //apply update to threeGroup
    model2three_1.updateThreeGroup(threeGroup, group);
    //validate update
    expect(threeGroup.position.x).toBe(group.translation.vector[0]);
    expect(threeGroup.position.y).toBe(group.translation.vector[1]);
    expect(threeGroup.position.z).toBe(group.translation.vector[2]);
    expect(threeGroup.rotation.x).toBeCloseTo(math_1.toRadians(group.rotation[0]), 5);
    expect(threeGroup.rotation.y).toBeCloseTo(math_1.toRadians(group.rotation[1]), 5);
    expect(threeGroup.rotation.z).toBeCloseTo(math_1.toRadians(group.rotation[2]), 5);
    expect(threeGroup.scale.x).toBeCloseTo(group.scale[0], 5);
    expect(threeGroup.scale.y).toBeCloseTo(group.scale[1], 5);
    expect(threeGroup.scale.z).toBeCloseTo(group.scale[2], 5);
});
test('updateThreeGroup update meshes and materials', () => {
    //construct initial group with two meshes
    let geometry = new _3d_model_representation_1.Shape([new _3d_model_representation_1.Polyline2D([new _3d_model_representation_1.Vector2D(0, 0),
            new _3d_model_representation_1.Vector2D(0, 1),
            new _3d_model_representation_1.Vector2D(1, 1),
            new _3d_model_representation_1.Vector2D(1, 0)])])
        .extrude(1).translate(new _3d_model_representation_1.Vector3D(1, 2, 1));
    let material0 = new _3d_model_representation_1.Material().withName("material0");
    let material1 = new _3d_model_representation_1.Material().withName("material1");
    let materialDict = {};
    let group = new _3d_model_representation_1.Mesh(geometry, material0)
        .toGroup("group under test")
        .addMesh(new _3d_model_representation_1.Mesh(geometry, material1));
    let threeGroup = _3d_model_representation_1.modelGroup2ThreeGroup(group, materialDict);
    //update mesh, remove mesh, add mesh
    let newGeometry = new _3d_model_representation_1.Shape([new _3d_model_representation_1.Polyline2D([new _3d_model_representation_1.Vector2D(0, 0),
            new _3d_model_representation_1.Vector2D(0, 1),
            new _3d_model_representation_1.Vector2D(1, 1),
            new _3d_model_representation_1.Vector2D(1, 0)])])
        .extrude(1).translate(new _3d_model_representation_1.Vector3D(1, 2, 1));
    group.meshes[0].withGeometry(newGeometry)
        .withMaterial(material1);
    group.removeMesh(group.meshes[1].id);
    group.addMesh(new _3d_model_representation_1.Mesh(geometry, material1));
    //apply update to threeGroup
    model2three_1.updateThreeGroup(threeGroup, group, materialDict);
    //validate update
    expect(threeGroup.children.length).toBe(2);
    expect(threeGroup.children.find(mesh => mesh.name === group.meshes[0].id)).toBeDefined();
    let updatedMesh = threeGroup.children.find(mesh => mesh.name === group.meshes[0].id);
    expect(updatedMesh.geometry.name === newGeometry.id);
    expect(updatedMesh.material.name === newGeometry.id);
    expect(updatedMesh.castShadow).toBeFalsy();
    expect(updatedMesh.receiveShadow).toBeFalsy();
    expect(threeGroup.children.find(mesh => mesh.name === group.meshes[1].id)).toBeDefined();
    expect(Object.keys(materialDict).length).toBe(1);
});

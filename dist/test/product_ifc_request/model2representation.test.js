"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _3d_model_representation_1 = require("../../src/3d_model_representation");
const model2representation_1 = require("../../src/product_ifc_request/model2representation");
test('model to representation test', () => {
    let material1 = new _3d_model_representation_1.Material().withName("material0");
    let material2 = new _3d_model_representation_1.Material().withName("material1");
    let group1 = new _3d_model_representation_1.Mesh(new _3d_model_representation_1.Geometry(null, "construction mesh 1"), material1)
        .toGroup("group 1")
        .withTranslation(new _3d_model_representation_1.Vector3D(0, 0, 1))
        .withRotation([90, 0, 0])
        .withScale([0.5, 0.5, 0.5]);
    let group2 = new _3d_model_representation_1.Mesh(new _3d_model_representation_1.Geometry(null, "construction mesh 2"), material2)
        .toGroup("group 2")
        .withTranslation(new _3d_model_representation_1.Vector3D(1, 1, 0))
        .withRotation([90, 0, 0])
        .withScale([2, 2, 2]);
    group1.addGroup(group2);
    let representation = model2representation_1.group2Representation(group1);
    expect(representation.representationItems.length).toBe(2);
    let item0 = representation.representationItems[0];
    expect(item0.constructionString).toBe("construction mesh 1");
    expect(item0.transformation.rotation[0]).toBeCloseTo(Math.cos(90 / 2 * Math.PI / 180), 5);
    expect(item0.transformation.rotation[1]).toBeCloseTo(Math.sin(90 / 2 * Math.PI / 180), 5);
    expect(item0.transformation.rotation[2]).toBeCloseTo(0, 5);
    expect(item0.transformation.rotation[3]).toBeCloseTo(0, 5);
    expect(item0.transformation.scale).toBe(0.5);
    expect(item0.material).toBe(material1.id);
    let item1 = representation.representationItems[1];
    expect(item1.constructionString).toBe("construction mesh 2");
    expect(item1.transformation.translation[0]).toBeCloseTo(0.5, 5);
    expect(item1.transformation.translation[1]).toBeCloseTo(0, 5);
    expect(item1.transformation.translation[2]).toBeCloseTo(1.5, 5);
    expect(item1.transformation.rotation[0]).toBeCloseTo(Math.cos(180 / 2 * Math.PI / 180), 5);
    expect(item1.transformation.rotation[1]).toBeCloseTo(Math.sin(180 / 2 * Math.PI / 180), 5);
    expect(item1.transformation.rotation[2]).toBeCloseTo(0);
    expect(item1.transformation.rotation[3]).toBeCloseTo(0);
    expect(item1.transformation.scale).toBe(1);
    expect(item1.material).toBe(material2.id);
    expect(representation.materials).toHaveLength(2);
});

import { Mesh, Geometry, Group, Vector3D } from "../../src/3d_model_representation"
import { Representation } from "../../src/product_ifc_request/representation";
import { group2Representation } from "../../src/product_ifc_request/model2representation";
import { RepresentationItem } from "../../src/product_ifc_request/representation_item";

test('model to representation test', () => {
    let group1: Group = new Mesh(new Geometry(null, "construction mesh 1"), null)
                                 .toGroup("group 1")
                                 .withTranslation(new Vector3D(0,0,1))
                                 .withRotation([90,0,0])
                                 .withScale([0.5,0.5,0.5]);
    let group2: Group = new Mesh(new Geometry(null, "construction mesh 2"), null)
                                 .toGroup("group 2")
                                 .withTranslation(new Vector3D(1,1,0))
                                 .withRotation([90,0,0])
                                 .withScale([2,2,2]);
    group1.addGroup(group2);
    let representation: Representation = group2Representation(group1);
    expect(representation.representationItems.length).toBe(2);
    
    let item0: RepresentationItem = representation.representationItems[0];
    expect(item0.constructionString).toBe("construction mesh 1");
    expect(item0.transformation.rotation[0]).toBeCloseTo(Math.cos(90/2 * Math.PI/180),5);
    expect(item0.transformation.rotation[1]).toBeCloseTo(Math.sin(90/2 * Math.PI/180),5);
    expect(item0.transformation.rotation[2]).toBeCloseTo(0,5);
    expect(item0.transformation.rotation[3]).toBeCloseTo(0,5);
    expect(item0.transformation.scale).toBe(0.5);

    let item1: RepresentationItem = representation.representationItems[1];
    expect(item1.constructionString).toBe("construction mesh 2");
    expect(item1.transformation.translation[0]).toBeCloseTo(-1,5);
    expect(item1.transformation.translation[1]).toBeCloseTo(1,5);
    expect(item1.transformation.translation[2]).toBeCloseTo(1,5);
    expect(item1.transformation.rotation[0]).toBeCloseTo(Math.cos(180/2 * Math.PI/180),5);
    expect(item1.transformation.rotation[1]).toBeCloseTo(Math.sin(180/2 * Math.PI/180),5);
    expect(item1.transformation.rotation[2]).toBeCloseTo(0);
    expect(item1.transformation.rotation[3]).toBeCloseTo(0);
    expect(item1.transformation.scale).toBe(1);
});
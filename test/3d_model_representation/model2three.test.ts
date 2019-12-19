import { Mesh, Geometry, Group, Vector3D, Material, modelGroup2ThreeGroup, Shape, Polyline2D, Vector2D } from "../../src/3d_model_representation"
import { updateThreeGroup } from "../../src/3d_model_representation/model2three";
import { toRadians } from "../../src/3d_model_representation/math";
import { Model2ThreeMaterialContainter } from "../../src/3d_model_representation/model_three_material_container";

test('updateThreeGroup update transformation test', () => {
    //construct initial model
    let group = new Group().withName("group under test")
                           .withTranslation(new Vector3D(1,2,3))
                           .withRotation([45,45,45])
                           .withScale([1,2,3]);
    let threeGroup: THREE.Group = modelGroup2ThreeGroup(group);
    
    //update group transformation
    group.withTranslation(new Vector3D(3,2,1))
         .withRotation([35,35,35])
         .withScale([3,2,1]);

    //apply update to threeGroup
    updateThreeGroup(threeGroup, group);

    //validate update
    expect(threeGroup.position.x).toBe(group.translation.vector[0]);
    expect(threeGroup.position.y).toBe(group.translation.vector[1]);
    expect(threeGroup.position.z).toBe(group.translation.vector[2]);
    expect(threeGroup.rotation.x).toBeCloseTo(toRadians(group.rotation[0]),5);
    expect(threeGroup.rotation.y).toBeCloseTo(toRadians(group.rotation[1]),5);
    expect(threeGroup.rotation.z).toBeCloseTo(toRadians(group.rotation[2]),5);
    expect(threeGroup.scale.x).toBeCloseTo(group.scale[0], 5);
    expect(threeGroup.scale.y).toBeCloseTo(group.scale[1], 5);
    expect(threeGroup.scale.z).toBeCloseTo(group.scale[2], 5);
});

test('updateThreeGroup update meshes and materials', () => {
    //construct initial group with two meshes
    let geometry = new Shape([new Polyline2D([new Vector2D(0,0),
                                              new Vector2D(0,1),
                                              new Vector2D(1,1),
                                              new Vector2D(1,0)])])
                        .extrude(1).translate(new Vector3D(1,2,1));
    let material0: Material = new Material().withName("material0");
    let material1: Material = new Material().withName("material1");
    let materialDict: {[id: string]: Model2ThreeMaterialContainter} = {};
    let group: Group = new Mesh(geometry, material0)
                             .toGroup("group under test")
                             .addMesh(new Mesh(geometry, material1));
    let threeGroup: THREE.Group = modelGroup2ThreeGroup(group, materialDict);

    //update mesh, remove mesh, add mesh
    let newGeometry: Geometry = new Shape([new Polyline2D([new Vector2D(0,0),
                                                           new Vector2D(0,1),
                                                           new Vector2D(1,1),
                                                           new Vector2D(1,0)])])
                                    .extrude(1).translate(new Vector3D(1,2,1));
    group.meshes[0].withGeometry(newGeometry)
                   .withMaterial(material1);
    group.removeMesh(group.meshes[1].id);
    group.addMesh(new Mesh(geometry, material1));

    //apply update to threeGroup
    updateThreeGroup(threeGroup, group, materialDict);

    //validate update
    expect(threeGroup.children.length).toBe(2);
    expect(threeGroup.children.find(mesh => mesh.name === group.meshes[0].id)).toBeDefined();
    let updatedMesh: THREE.Mesh = <THREE.Mesh> threeGroup.children.find(mesh => mesh.name === group.meshes[0].id);
    expect(updatedMesh.geometry.name === newGeometry.id);
    expect((<THREE.Material> updatedMesh.material).name === newGeometry.id);
    expect(threeGroup.children.find(mesh => mesh.name === group.meshes[1].id)).toBeDefined();
    expect(Object.keys(materialDict).length).toBe(1);
});
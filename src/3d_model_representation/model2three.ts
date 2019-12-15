import * as THREE from 'three';
import { Geometry, Mesh, Material, Group } from '../3d_model_representation';
import { Model2ThreeMaterialContainter } from './model_three_material_container';
import { toRadians } from "./math";

export function modelGeometry2TreeGeometry(geometry: Geometry): THREE.BufferGeometry
{
    let three_geometry = new THREE.BufferGeometry();
    three_geometry.name = geometry.id;
    let triangles = geometry.geometry.toTriangles();
    let positions = [];
    let normals = [];
    let uvs = [];
    for (let i=0; i<triangles.length; ++i)
    {
        let ax = triangles[i].vertices[0].pos.x;
        let ay = triangles[i].vertices[0].pos.y;
        let az = triangles[i].vertices[0].pos.z;
        let au = triangles[i].vertices[0].uv.x;
        let av = triangles[i].vertices[0].uv.y;
        positions.push(ax, ay, az);
        uvs.push(au, av)

        let bx = triangles[i].vertices[1].pos.x;
        let by = triangles[i].vertices[1].pos.y;
        let bz = triangles[i].vertices[1].pos.z;
        let bu = triangles[i].vertices[1].uv.x;
        let bv = triangles[i].vertices[1].uv.y;
        positions.push(bx, by, bz);
        uvs.push(bu, bv)

        let cx = triangles[i].vertices[2].pos.x;
        let cy = triangles[i].vertices[2].pos.y;
        let cz = triangles[i].vertices[2].pos.z;
        let cu = triangles[i].vertices[2].uv.x;
        let cv = triangles[i].vertices[2].uv.y;
        positions.push(cx, cy, cz);
        uvs.push(cu, cv)

        let nx = triangles[i].plane.normal.x;
        let ny = triangles[i].plane.normal.y;
        let nz = triangles[i].plane.normal.z;
        normals.push( nx, ny, nz );
		normals.push( nx, ny, nz );
		normals.push( nx, ny, nz );
    }

    function disposeArray() {
        this.array = null;
    }

    three_geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ).onUpload( disposeArray ) );
    three_geometry.addAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ).onUpload( disposeArray ) );
    three_geometry.addAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ).onUpload( disposeArray ) );

    return three_geometry;
}

export function modelMaterial2ThreeMaterial(material: Material): THREE.MeshStandardMaterial
{
    let three_parameters =
    {
        'color': new THREE.Color( material.baseColor[0], material.baseColor[1], material.baseColor[2] ),
        'opacity': material.baseColor[3],
        'transparent': (material.baseColor[3] < 1.0),
        'metalness': material.metallic,
        'roughness': material.roughness
        //TODO add textures
    };
    let three_material = new THREE.MeshStandardMaterial(three_parameters);
    three_material.name = material.id;
    return three_material;
}

export function modelMesh2ThreeMesh(mesh: Mesh,
                                    materialList: {[id: string]: Model2ThreeMaterialContainter} = {})
{
    let three_material: THREE.Material = threeMaterialFromList(mesh.material, materialList);  
    let three_geometry = modelGeometry2TreeGeometry(mesh.geometry);
    let three_mesh = new THREE.Mesh(three_geometry, three_material);
    three_mesh.name = mesh.id;
    return three_mesh;
}

export function modelGroup2ThreeGroup(group: Group,
                                      materialList: {[id: string]: Model2ThreeMaterialContainter} = {}): THREE.Group
{
    let three_group = new THREE.Group();
    three_group.name = group.id;
    group.meshes.forEach((mesh: Mesh) => {
        three_group.add(modelMesh2ThreeMesh(mesh, materialList));
    });
    group.children.forEach((group: Group) => {
        three_group.add(modelGroup2ThreeGroup(group, materialList));
    });
    three_group.scale = new THREE.Vector3(group.scale[0],
                                          group.scale[1],
                                          group.scale[2]);
    three_group.setRotationFromEuler(new THREE.Euler(toRadians(group.rotation[0]),
                                                     toRadians(group.rotation[1]),
                                                     toRadians(group.rotation[2])));
    three_group.position = new THREE.Vector3(group.translation.vector[0],
                                             group.translation.vector[1],
                                             group.translation.vector[2]);
    three_group.updateMatrix();
    return three_group;
}

export function updateThreeMesh(threeMesh: THREE.Mesh,
                                modelMesh: Mesh,
                                materialList: {[id: string]: Model2ThreeMaterialContainter} = {}) {
    let threeMaterial: THREE.Material = <THREE.Material> threeMesh.material;
    if (threeMaterial.name !== modelMesh.material.id) {
        //a new material was assigned to this mesh
        threeMesh.material = threeMaterialFromList(modelMesh.material, materialList);
    }
    if (threeMesh.geometry.name !== modelMesh.geometry.id) {
        //a new geometry was assiged to this mesh
        threeMesh.geometry = modelGeometry2TreeGeometry(modelMesh.geometry);
    }
}

export function updateThreeGroup(threeGroup: THREE.Group,
                                 modelGroup: Group,
                                 materialList: {[id: string]: Model2ThreeMaterialContainter} = {}) {
    //verify group transformation
    let updateNeeded = false;
    let EPS = 1e-5;
    //scale
    if ((Math.abs(threeGroup.scale.x - modelGroup.scale[0]) > EPS) ||
        (Math.abs(threeGroup.scale.y - modelGroup.scale[1]) > EPS) ||
        (Math.abs(threeGroup.scale.z - modelGroup.scale[2]) > EPS)) {
        threeGroup.scale = new THREE.Vector3(modelGroup.scale[0],
                                              modelGroup.scale[1],
                                              modelGroup.scale[2]);
        updateNeeded = true;
    }
    //rotation
    let radX = toRadians(modelGroup.rotation[0]);
    let radY = toRadians(modelGroup.rotation[1]);
    let radZ = toRadians(modelGroup.rotation[2]);
    if ((Math.abs(threeGroup.rotation.x - radX) > EPS) ||
        (Math.abs(threeGroup.rotation.y - radY) > EPS) ||
        (Math.abs(threeGroup.rotation.z - radZ) > EPS)) {
        threeGroup.setRotationFromEuler(new THREE.Euler(radX,
                                                        radY,
                                                        radZ));
        updateNeeded = true;
    }
    //translation
    if ((Math.abs(threeGroup.position.x - modelGroup.translation.vector[0]) > EPS) ||
        (Math.abs(threeGroup.position.y - modelGroup.translation.vector[1]) > EPS) ||
        (Math.abs(threeGroup.position.z - modelGroup.translation.vector[2]) > EPS)) {
        threeGroup.scale = new THREE.Vector3(modelGroup.translation.vector[0],
                                             modelGroup.translation.vector[1],
                                             modelGroup.translation.vector[2]);
        updateNeeded = true;
    }
    if (updateNeeded) {
        threeGroup.updateMatrix();
    }
    //start with building dictionary of all objects in three group
    let threeObjectList: {[id: string]: THREE.Object3D} = {};
    threeGroup.children.forEach( (object) => {threeObjectList[object.name] = object} );
    //process alle meshes in the group
    modelGroup.meshes.forEach((mesh) => {
        if (mesh.id in threeObjectList) {
            //mesh already exists -> update mesh
            updateThreeMesh(<THREE.Mesh> threeObjectList[mesh.id], mesh, materialList);
            delete threeObjectList[mesh.id]; //remove from objectList because fully processed
        }
        else {
            //mesh doesn't exist yet -> add mesh
            threeGroup.add(modelMesh2ThreeMesh(mesh, materialList));
        }
    });
    //process all child groups in the group
    modelGroup.children.forEach( (group) => {
        if (group.id in threeObjectList) {
            //group already exists -> update group
            updateThreeGroup(<THREE.Group> threeObjectList[group.id], group, materialList);
            delete threeObjectList[group.id]; //remove from objectLis because fully processed
        }
    });
    //remove all objects that are no longer in the model
    for (let id in threeObjectList) {
        threeGroup.remove(threeObjectList[id]);
    }
    //TODO remove materials that are no longer used
}

function threeMaterialFromList(material: Material,
                               materialList: {[id: string]: Model2ThreeMaterialContainter} = {}): THREE.Material {
    let threeMaterial: THREE.Material;
    if (material.id in materialList) {
        threeMaterial = materialList[material.id].threeMaterial;
    } 
    else {  //add material to the materialList if it hasn't been created before
        let newMaterialContainer = new Model2ThreeMaterialContainter(material);
        materialList[material.id] = newMaterialContainer;
        threeMaterial = newMaterialContainer.threeMaterial;
    }
    return threeMaterial;
}
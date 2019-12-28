import * as THREE from 'three';
import { Geometry, Mesh, Material, Group } from '../3d_model_representation';
import { Model2ThreeMaterialContainter } from './model_three_material_container';
import { toRadians } from "./math";
import { Vector3D } from './vector3d';
import { Quaternion } from 'three';

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
                                    materialDict: {[id: string]: Model2ThreeMaterialContainter} = {},
                                    shadows: boolean = false)
{
    let three_material: THREE.Material = threeMaterialFromList(mesh.material, materialDict);  
    let three_geometry = modelGeometry2TreeGeometry(mesh.geometry);
    let three_mesh = new THREE.Mesh(three_geometry, three_material);
    three_mesh.name = mesh.id;
    three_mesh.castShadow = shadows;
    three_mesh.receiveShadow = shadows;
    return three_mesh;
}

export function modelGroup2ThreeGroup(group: Group,
                                      materialDict: {[id: string]: Model2ThreeMaterialContainter} = {},
                                      shadows: boolean = false): THREE.Group
{
    let three_group = new THREE.Group();
    three_group.name = group.id;
    group.meshes.forEach((mesh: Mesh) => {
        three_group.add(modelMesh2ThreeMesh(mesh, materialDict, shadows));
    });
    group.children.forEach((group: Group) => {
        three_group.add(modelGroup2ThreeGroup(group, materialDict, shadows));
    });
    let scale_matrix = new THREE.Matrix4().makeScale(group.scale[0],
                                                     group.scale[1],
                                                     group.scale[2]);
    three_group.applyMatrix(scale_matrix);
    three_group.setRotationFromEuler(new THREE.Euler(toRadians(group.rotation[0]),
                                                     toRadians(group.rotation[1]),
                                                     toRadians(group.rotation[2])));
    let translation_matrix = new THREE.Matrix4().makeTranslation(group.translation.vector[0],
                                                                 group.translation.vector[1],
                                                                 group.translation.vector[2]);
    three_group.applyMatrix(translation_matrix);
    return three_group;
}

export function updateThreeMesh(threeMesh: THREE.Mesh,
                                modelMesh: Mesh,
                                materialDict: {[id: string]: Model2ThreeMaterialContainter} = {},
                                shadows: boolean = false) {
    let threeMaterial: THREE.Material = <THREE.Material> threeMesh.material;
    if (threeMaterial.name !== modelMesh.material.id) {
        //a new material was assigned to this mesh
        threeMesh.material = threeMaterialFromList(modelMesh.material, materialDict);
    }
    if (threeMesh.geometry.name !== modelMesh.geometry.id) {
        //a new geometry was assiged to this mesh
        threeMesh.geometry = modelGeometry2TreeGeometry(modelMesh.geometry);
    }
    if (threeMesh.castShadow !== shadows) {
        threeMesh.castShadow = shadows;
    }
    if (threeMesh.receiveShadow !== shadows) {
        threeMesh.receiveShadow = shadows;
    }
}

export function updateThreeGroup(threeGroup: THREE.Group,
                                 modelGroup: Group,
                                 materialDict: {[id: string]: Model2ThreeMaterialContainter} = {},
                                 shadows: boolean = false) {
    //verify group transformation
    let EPS = 1e-5;
    let radX = toRadians(modelGroup.rotation[0]);
    let radY = toRadians(modelGroup.rotation[1]);
    let radZ = toRadians(modelGroup.rotation[2]);
    //scale
    if ((Math.abs(threeGroup.scale.x - modelGroup.scale[0]) > EPS) ||
        (Math.abs(threeGroup.scale.y - modelGroup.scale[1]) > EPS) ||
        (Math.abs(threeGroup.scale.z - modelGroup.scale[2]) > EPS)) {
        let diffScale: number[] = [modelGroup.scale[0] / threeGroup.scale.x,
                                   modelGroup.scale[1] / threeGroup.scale.y,
                                   modelGroup.scale[2] / threeGroup.scale.z];
        let scaleMatrix = new THREE.Matrix4().makeScale(diffScale[0],
                                                        diffScale[1],
                                                        diffScale[2]);
        //reset rotation so that scale is applied on local axis
        threeGroup.setRotationFromQuaternion(new Quaternion(1,0,0,0))
        //apply scale
        threeGroup.applyMatrix(scaleMatrix);
    }
    //rotation
    if ((Math.abs(threeGroup.rotation.x - radX) > EPS) ||
        (Math.abs(threeGroup.rotation.y - radY) > EPS) ||
        (Math.abs(threeGroup.rotation.z - radZ) > EPS)) {
        threeGroup.setRotationFromEuler(new THREE.Euler(radX,
                                                        radY,
                                                        radZ));
    }
    //translation
    if ((Math.abs(threeGroup.position.x - modelGroup.translation.vector[0]) > EPS) ||
        (Math.abs(threeGroup.position.y - modelGroup.translation.vector[1]) > EPS) ||
        (Math.abs(threeGroup.position.z - modelGroup.translation.vector[2]) > EPS)) {
        let diffTranslation = modelGroup.translation.copy()
                                                    .translate(new Vector3D(-threeGroup.position.x,
                                                                            -threeGroup.position.y,
                                                                            -threeGroup.position.z));
        let translationMatrix = new THREE.Matrix4().makeTranslation(diffTranslation.vector[0],
                                                                     diffTranslation.vector[1],
                                                                     diffTranslation.vector[2]);
        threeGroup.applyMatrix(translationMatrix);
    }

    //clear active flags for materials in materialDict
    for (let id in materialDict) {
        materialDict[id].active = false;
    }
    //build dictionary of all objects in three group
    let threeObjectDict: {[id: string]: THREE.Object3D} = {};
    threeGroup.children.forEach( (object) => {threeObjectDict[object.name] = object} );
    //process alle meshes in the group
    modelGroup.meshes.forEach((mesh) => {
        if (mesh.id in threeObjectDict) {
            //mesh already exists -> update mesh
            updateThreeMesh(<THREE.Mesh> threeObjectDict[mesh.id], mesh, materialDict, shadows);
            delete threeObjectDict[mesh.id]; //remove from objectList because fully processed
        }
        else {
            //mesh doesn't exist yet -> add mesh
            threeGroup.add(modelMesh2ThreeMesh(mesh, materialDict, shadows));
        }
    });
    //process all child groups in the group
    modelGroup.children.forEach( (group) => {
        if (group.id in threeObjectDict) {
            //group already exists -> update group
            updateThreeGroup(<THREE.Group> threeObjectDict[group.id], group, materialDict, shadows);
            delete threeObjectDict[group.id]; //remove from objectList because fully processed
        }
        else {
            //group doesn't exist yet -> add group
            threeGroup.add(modelGroup2ThreeGroup(group, materialDict, shadows));
        }
    });
    //remove all objects that are no longer in the model
    for (let id in threeObjectDict) {
        threeGroup.remove(threeObjectDict[id]);
    }
    //remove materials that are no longer used
    let materialsToRemove: string[] = [];
    for (let id in materialDict) {
        if (materialDict[id].active === false) {
            materialsToRemove.push(id);
        }
    }
    materialsToRemove.forEach(id => delete materialDict[id]);
}

function threeMaterialFromList(material: Material,
                               materialDict: {[id: string]: Model2ThreeMaterialContainter} = {}): THREE.Material {
    let threeMaterial: THREE.Material;
    if (material.id in materialDict) { //material already exists
        threeMaterial = materialDict[material.id].threeMaterial;
        materialDict[material.id].active = true;
    } 
    else {  //add material to the materialList if it hasn't been created before
        let newMaterialContainer = new Model2ThreeMaterialContainter(material);
        materialDict[material.id] = newMaterialContainer;
        threeMaterial = newMaterialContainer.threeMaterial;
    }
    return threeMaterial;
}
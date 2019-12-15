import * as THREE from 'three';
import { Geometry, Mesh, Material, Group } from '../3d_model_representation';

export function csg2TreeGeometry(geometry: Geometry): THREE.BufferGeometry
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

export function modelMesh2ThreeMesh(mesh: Mesh)
{
    let three_material = modelMaterial2ThreeMaterial(mesh.material);
    let three_geometry = csg2TreeGeometry(mesh.geometry);
    let three_mesh = new THREE.Mesh(three_geometry, three_material);
    three_mesh.name = mesh.id;
    return three_mesh;
}

export function modelGroup2ThreeGroup(group: Group): THREE.Group
{
    let three_group = new THREE.Group();
    three_group.name = group.id;
    group.meshes.forEach((mesh: Mesh) => {
        three_group.add(modelMesh2ThreeMesh(mesh));
    });
    group.children.forEach((group: Group) => {
        three_group.add(modelGroup2ThreeGroup(group));
    });
    let scale_matrix = new THREE.Matrix4().makeScale(group.scale[0],
                                                     group.scale[1],
                                                     group.scale[2]);
    three_group.applyMatrix(scale_matrix);
    three_group.setRotationFromEuler(new THREE.Euler(group.rotation[0],
                                                     group.rotation[1],
                                                     group.rotation[2]));
    let translation_vector = group.translation.vector;
    let translation_matrix = new THREE.Matrix4().makeTranslation(translation_vector[0],
                                                                 translation_vector[1],
                                                                 translation_vector[2]);
    three_group.applyMatrix(translation_matrix);
    return three_group;
}  
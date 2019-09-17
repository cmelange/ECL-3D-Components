import * as THREE from 'three';
import { Geometry, Mesh, Material, Group } from './3d_model_representation';

export function Csg2TreeGeometry(geometry: Geometry): THREE.BufferGeometry
{
    let three_geometry = new THREE.BufferGeometry();
    three_geometry.name = geometry.name;
    let triangles = geometry.geometry.toTriangles();
    let positions = [];
    let normals = [];
    for (let i=0; i<triangles.length; ++i)
    {
        let ax = triangles[i].vertices[0].pos.x;
        let ay = triangles[i].vertices[0].pos.y;
        let az = triangles[i].vertices[0].pos.z;
        positions.push(ax, ay, az);

        let bx = triangles[i].vertices[1].pos.x;
        let by = triangles[i].vertices[1].pos.y;
        let bz = triangles[i].vertices[1].pos.z;
        positions.push(bx, by, bz);

        let cx = triangles[i].vertices[2].pos.x;
        let cy = triangles[i].vertices[2].pos.y;
        let cz = triangles[i].vertices[2].pos.z;
        positions.push(cx, cy, cz);

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

    return three_geometry;
}

export function ModelMaterial2ThreeMaterial(material: Material): THREE.MeshStandardMaterial
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
    three_material.name = material.name;
    return three_material;
}

export function ModelMesh2ThreeMesh(mesh: Mesh)
{
    let three_material = ModelMaterial2ThreeMaterial(mesh.material);
    let three_geometry = Csg2TreeGeometry(mesh.geometry);
    let three_mesh = new THREE.Mesh(three_geometry, three_material);
    three_mesh.name = mesh.name;
    return three_mesh;
}

export function ModelGroup2ThreeGroup(group: Group): THREE.Group
{
    let three_group = new THREE.Group();
    three_group.name = group.name;
    group.meshes.forEach((mesh: Mesh, key: string) => {
        three_group.add(ModelMesh2ThreeMesh(mesh));
    });
    group.children.forEach((group: Group, key: string) => {
        three_group.add(ModelGroup2ThreeGroup(group));
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
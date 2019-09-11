import * as THREE from 'three';
import { Geometry } from './csg_wrapper';

export function Csg2TreeGeometry(geometry: Geometry): THREE.BufferGeometry
{
    let three_geometry = new THREE.BufferGeometry();
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
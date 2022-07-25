import * as THREE from 'three';

const getNearestVertex = (mesh, e) => {
    const meshPosition = mesh.current.geometry.attributes.position;
    const { face } = e;
    let vertices = [
        face.a,
        face.b,
        face.c
    ];
    if (vertices.length > 0) {
        const dist = vertices.map((v) => {
            const tempVertex = new THREE.Vector3();
            tempVertex.setX(meshPosition.getX(v));
            tempVertex.setY(meshPosition.getY(v));
            tempVertex.setZ(meshPosition.getZ(v));
            return { dist: e.ray.distanceToPoint(mesh.current.localToWorld(tempVertex)), vertex: v };
        });
        dist.sort((a, b) => {
            return a.dist - b.dist;
        });

        let ind = dist[0].vertex;

        const tempVertex = new THREE.Vector3();
        tempVertex.setX(meshPosition.array[ind * 3]);
        tempVertex.setY(meshPosition.array[ind * 3 + 1]);
        tempVertex.setZ(meshPosition.array[ind * 3 + 2]);
        return tempVertex;
    }
    return null;
};

export default getNearestVertex;
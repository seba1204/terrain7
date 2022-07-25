const meshPosition = mesh.current.geometry.attributes.position;
const linePosition = line.current.geometry.attributes.position;
const { face, shiftKey, nativeEvent } = e;
let vertices = [
    face.a,
    face.b,
    face.c
];
if (vertices.length > 0) {
    document.getElementById('root').classList.add('cursor-grabbing');
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

    if (isCklicked.current & isIn.current & nativeEvent.buttons === 1) {

        if (currentTool === toolsName.sculpt) {
            let mult = 1;
            if (shiftKey) mult = -1;
            const inten = 1 / 10000 * sculptIntensity * NB_VERTICES;
            meshPosition.array[ind * 3 + 2] = meshPosition.getZ(ind) + inten * mult;
        } else if (currentTool === toolsName.text) {
            console.log(mesh.current.geometry);
        }
        meshPosition.needsUpdate = true;
        mesh.current.geometry.computeVertexNormals();
        mesh.current.updateMatrix();
    }
    const tempVertex = new THREE.Vector3();
    tempVertex.setX(meshPosition.array[ind * 3]);
    tempVertex.setY(meshPosition.array[ind * 3 + 1]);
    tempVertex.setZ(meshPosition.array[ind * 3 + 2]);


    linePosition.copyAt(0, meshPosition, 1);
    linePosition.copyAt(1, meshPosition, 2);
    linePosition.copyAt(2, meshPosition, 3);
    linePosition.copyAt(3, meshPosition, 1);

    line.current.geometry.applyMatrix4(mesh.current.matrix);
    line.current.visible = true;
    mesh.current.geometry.groupNeedsUpdate = true;
}
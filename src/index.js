// import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js";
let container, stats;
let camera, scene, renderer;
let raycaster, pointer;
let terrain, line;
let mouvement;
const NB_VERTICES = 100;
const wireframe = false;
const img = "sand";


function init() {
    let material, geometry;
    // set up the camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    // set up the terrain material 
    const loader = new THREE.TextureLoader();
    material = new THREE.MeshBasicMaterial({ map: loader.load('assets/' + img + '.png'), side: THREE.DoubleSide, wireframe });

    // create the terrain
    geometry = new THREE.PlaneBufferGeometry(1, 1, NB_VERTICES, NB_VERTICES);
    terrain = new THREE.Mesh(geometry, material);

    // update randomly the terrain
    updateTerrain(NB_VERTICES, NB_VERTICES);

    // create outline for raycaster
    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(4 * 3), 3));
    material = new THREE.LineBasicMaterial({ color: 0xff0000, transparent: true, side: THREE.DoubleSide, });
    line = new THREE.Line(geometry, material);
    line.visible = false;

    // create lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const light = new THREE.DirectionalLight(0xffffff, 100.0, 5000);



    // set up the scene
    scene = new THREE.Scene();
    scene.add(light);
    scene.add(ambientLight);
    scene.add(terrain);
    scene.add(line);

    // set up the raycaster
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    // set up renderer and add it to the Web page
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointermove', onPointerMove);


    // set up controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    mouvement = { "haut": false, "bas": false, "droite": false, "gauche": false };

    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 68) {
            mouvement.droite = true;
        } else if (event.keyCode == 81) {
            mouvement.gauche = true;
        } else if (event.keyCode == 90) {
            mouvement.haut = true;
        } else if (event.keyCode == 83) {
            mouvement.bas = true;
        }
    });

    document.addEventListener('keyup', function (event) {
        if (event.keyCode == 68) {
            mouvement.droite = false;
        } else if (event.keyCode == 81) {
            mouvement.gauche = false;
        } else if (event.keyCode == 90) {
            mouvement.haut = false;
        } else if (event.keyCode == 83) {
            mouvement.bas = false;
        }
    });

}

function onPointerMove(event) {

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

}
function render() {

    raycaster.setFromCamera(pointer, camera);

    // rotate the terrain
    // terrain.rotation.z += 0.001;

    const intersects = raycaster.intersectObject(terrain);

    if (intersects.length > 0) {

        const intersect = intersects[0];
        const face = intersect.face;

        const linePosition = line.geometry.attributes.position;
        const meshPosition = terrain.geometry.attributes.position;

        linePosition.copyAt(0, meshPosition, face.a);
        linePosition.copyAt(1, meshPosition, face.b);
        linePosition.copyAt(2, meshPosition, face.c);
        linePosition.copyAt(3, meshPosition, face.a);

        terrain.updateMatrix();

        line.geometry.applyMatrix4(terrain.matrix);

        line.visible = true;

    } else {

        line.visible = false;

    }


    if (mouvement.bas) {
        camera.position.x += 0.01;
    } else if (mouvement.haut) {
        camera.position.x -= 0.01;
    } else if (mouvement.droite) {
        camera.position.z += 0.01;
    } else if (mouvement.gauche) {
        camera.position.z -= 0.01;
    }


    renderer.render(scene, camera);
}
function animate() {

    render();

}

function updateTerrain(widthSegments, heightSegments) {
    terrain.rotation.x = 360;
    terrain.rotation.z = 100;
    const totalSegmentsX = widthSegments + 1;
    const totalSegmentsZ = heightSegments + 1;

    for (let z = 0; z < totalSegmentsZ; z++) {
        for (let x = 0; x < totalSegmentsX; x++) {
            const index = 3 * (z * totalSegmentsX + x);
            terrain.geometry.attributes.position.array[index + 2] = 0.01 * Math.random();
        }
    }

    terrain.geometry.attributes.position.needsUpdate = true;
    terrain.geometry.computeVertexNormals();
}

init();
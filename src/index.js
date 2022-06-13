const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.z = 1;

const scene = new THREE.Scene();

const NB_VERTICES = 10;

const wireframe = true;
const widthSegments = NB_VERTICES;
const heightSegments = NB_VERTICES;

const geometry = new THREE.PlaneGeometry(1, 1, widthSegments, heightSegments);
const material = new THREE.MeshBasicMaterial({ color: 0x049ef4, side: THREE.DoubleSide, wireframe });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// const light = new THREE.AmbientLight(0x404040); // soft white light
// scene.add(light);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

// animation

function animation(time) {

    plane.rotation.x = time / 2000;
    plane.rotation.y = time / 1000;

    renderer.render(scene, camera);

}

// animate();
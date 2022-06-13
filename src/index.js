// import orbit controls
// import { OrbitControls } from '@/node_modules/three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const loader = new THREE.TextureLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const materials = [
    new THREE.MeshBasicMaterial({ map: loader.load('https://r105.threejsfundamentals.org/threejs/resources/images/flower-1.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('https://r105.threejsfundamentals.org/threejs/resources/images/flower-2.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('https://r105.threejsfundamentals.org/threejs/resources/images/flower-3.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('https://r105.threejsfundamentals.org/threejs/resources/images/flower-4.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('https://r105.threejsfundamentals.org/threejs/resources/images/flower-5.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('https://r105.threejsfundamentals.org/threejs/resources/images/flower-6.jpg') }),
];

// const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

camera.position.set(0, 0, 5);
// controls.update();

function animate() {
    requestAnimationFrame(animate);

    // controls.update();


    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();
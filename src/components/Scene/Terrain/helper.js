var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var container, camera, scene, renderer;
var vertices, mesh, cls;
var red, white;
vertices = [];
cls = [];
var raycaster = new THREE.Raycaster();
init();
animate();

function onDocumentMouseDown(event) {
    vertices = [];
    mouse = new THREE.Vector2();
    mouse.x = (event.clientX / SCREEN_WIDTH) * 2 - 1;
    mouse.y = - (event.clientY / SCREEN_HEIGHT) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObject(mesh);
    console.clear();
    if (typeof intersects[0] !== 'undefined') {
        vertices = [
            intersects[0].face.a,
            intersects[0].face.b,
            intersects[0].face.c
        ];
        vertices.forEach(function (vId, i) {
            vertices[i] = mesh.geometry.vertices[vId].clone();
            vertices[i].l2w = mesh.localToWorld(vertices[i].clone());
            vertices[i].id = vId;
            vertices[i].index = i;
            vertices[i].distance = vertices[i].l2w.distanceTo(intersects[0].point);
        });
        vertices.sort(function (a, b) {
            return a.distance - b.distance;
        });
    }
    if (vertices.length === 0) {
        cls.forEach(function (e) {
            e.visible = false;
        });
    } else {
        cls.forEach(function (e, i) {
            e.visible = true;
            e.position.copy(vertices[i]);
            if (i === 0) {
                e.material = red;
            } else {
                e.material = white;
            }
        });
    }
}
function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
    camera.position.z = 50;
    scene.add(camera);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.domElement.style.position = "relative";
    container.appendChild(renderer.domElement);
    renderer.autoClear = false;
    mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(10, 1),
        new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
    );
    scene.add(mesh);
    cls = [
        new THREE.Mesh(
            new THREE.SphereGeometry(0.3)
        ),
        new THREE.Mesh(
            new THREE.SphereGeometry(0.3)
        ),
        new THREE.Mesh(
            new THREE.SphereGeometry(0.3)
        )
    ];
    cls.forEach(function (e) {
        mesh.add(e);
    });
    red = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    white = new THREE.MeshBasicMaterial({ color: 0xffffff });
    document.addEventListener('mousedown', onDocumentMouseDown, false);
}
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.001;
    render();
}
function render() {
    renderer.clear();
    renderer.render(scene, camera);
}
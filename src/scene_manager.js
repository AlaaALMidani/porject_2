import * as THREE from 'three';
import * as dat from 'dat.gui'
// debug 
//export const gui = new dat.GUI()
/**
 * scene
*/
export const scene = new THREE.Scene();
/**
 * camera
*/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
export const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);
/**
 * render the scene
*/
export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = 0;
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
document.body.appendChild(renderer.domElement);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(0, 0);
var dragable;
export function onPointerClick(event) {

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersect = raycaster.intersectObjects(scene.children, true)

    if (intersect[0] != undefined) {
        console.log(intersect[0]);
        dragable = intersect[0].object.parent;
    }
}

function onPointerMove(event) {
  
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
}
function dragObject() {
    if (dragable != undefined) {
        dragable.position.x = pointer.x*2;
        dragable.position.y = pointer.y*2;
    }
}
export function render() {
    dragObject();
    renderer.render(scene, camera);
}

window.addEventListener('mousedown', onPointerClick);
window.addEventListener('mouseup',()=>{dragable=undefined;})
window.addEventListener('mousemove', onPointerMove)

//lighting
var sunLight = new THREE.SpotLight(0xffffff, 1.0, 0, Math.PI / 2);
sunLight.position.set(1000, 2000, 1000);
sunLight.castShadow = true;
sunLight.shadow.bias = -0.0002;
sunLight.shadow.camera.far = 4000;
sunLight.shadow.camera.near = 750;
sunLight.shadow.camera.fov = 30;
scene.add(sunLight);

/**
* texture 
*/
//skyBox texture
// const loader = new THREE.CubeTextureLoader();
// const skybox = loader.load([
//     'static/texture/skybox/rt.png',
//     'static/texture/skybox/lf.png',
//     'static/texture/skybox/up.png',
//     'static/texture/skybox/dn.png',
//     'static/texture/skybox/ft.png',
//     'static/texture/skybox/bk.png',
// ]);

scene.background = new THREE.Color().setRGB(54 / 255, 40 / 255, 93 / 255);

// // Create a grid helper
// const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);
// const light = new THREE.AmbientLight('white'); // soft white light
// scene.add(light);

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
camera.position.set(0, 5, 5);
camera.lookAt({ x: 0, y: 0, z: 0 })
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
//document.body.appendChild(renderer.domElement);

// 
// 
// 
// 
// 
// 
// 
// 


/*    */
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(0, 0);
var clickedObject;
var isDragging = false;
/*   */
export function onPointerClick(event) {

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersect = raycaster.intersectObjects(scene.children, true)

    for (let i = 0; i < intersect.length; i++) {
        if (intersect[i].object.type != 'GridHelper') {
            clickedObject = intersect[i].object.parent;
            isDragging = true;
            //console.log(intersect[i].object.type)
        }
    }
}

function onPointerMove(event) {

    if (isDragging && clickedObject) {
        pointer.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        pointer.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
    
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects([gridHelper]);
    
        if (intersects.length > 0) {
          const intersectionPoint = intersects[0].point;
          clickedObject.position.x = intersectionPoint.x;
          clickedObject.position.z = intersectionPoint.z;
        }
      }
 
}
// function dragObject() {

//     if (clickedObject != null && isDragging) {
//         clickedObject.position.x = pointer.x * 2;
//         clickedObject.position.y = pointer.y * 2;
//         console.log('dragging');
//     }
// }
export function render() {
    renderer.render(scene, camera);
}

function onMouseUp(event) {
    isDragging = false;
    clickedObject = null;
}

window.addEventListener('mousedown', onPointerClick);
window.addEventListener('mouseup', onMouseUp)
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



scene.background = new THREE.Color().setRGB(54 / 255, 40 / 255, 93 / 255);

// Create a grid helper
const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);



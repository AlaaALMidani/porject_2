import * as THREE from 'three';
import * as ModelManager from './model_manager.js'
import * as SceneManager from './scene_manager'
import * as Control from './control.js'


ModelManager.loadModel();
window.addEventListener('click',SceneManager.onPointerClick);

function addcube(x, y, z) {
    const boxGeometry = new THREE.BoxGeometry( .1 , 0.1 , 0.1);
    const boxMatireal = new THREE.MeshPhongMaterial({ color: 0xffffff })
    const mesh = new THREE.Mesh(boxGeometry, boxMatireal);
    mesh.position.set(x, y, z);
    SceneManager.scene.add(mesh);
}
for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++)
        for (let z = -1; z <= 1; z++) { 
    addcube(i, j, z);
 }
}
function animate() {

    Control.control.update();
    SceneManager.render();
    requestAnimationFrame(animate);
}

animate();

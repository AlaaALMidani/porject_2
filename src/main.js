import * as THREE from 'three';
import * as ModelManager from './logic/model_manager.js'
import * as SceneManager from './logic/scene_manager.js'
import * as Control from './logic/control.js'


ModelManager.loadModel();
window.addEventListener('click',SceneManager.onPointerClick);

function animate() {

    Control.control.update();
    SceneManager.render();
    requestAnimationFrame(animate);
}

animate();

import * as THREE from 'three';
import * as ModelManager from './model_manager.js'
import * as SceneManager from './scene_manager'
import * as Control from './control.js'


ModelManager.loadModel();
window.addEventListener('click',SceneManager.onPointerClick);

function animate() {

    Control.control.update();
    SceneManager.render();
    requestAnimationFrame(animate);
}

animate();

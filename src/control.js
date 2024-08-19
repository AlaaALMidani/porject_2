import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as SceneManager from './scene_manager'

// Controls
export const control = new OrbitControls(SceneManager.camera, SceneManager.renderer.domElement);
control.enabled = false;
var ControlEnabled = false

document.addEventListener('keydown', function (event) {
    if (event.key === 'f' && !ControlEnabled) {
        ControlEnabled = true;
        control.enableDamping = true;
        control.enabled = true;
        console.log('fi');
    }
});
document.addEventListener('keyup', function (event) {
    if (event.key === 'f') {
        ControlEnabled = false;
        control.enabled = false;
        control.enableDamping = false;
        console.log('n');
    }
});

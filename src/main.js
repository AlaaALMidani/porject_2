
import * as ModelManager from './logic/model_manager.js'
import * as SceneManager from './logic/scene_manager.js'
import * as Control from './logic/control.js'
import * as Network from './network/network_helper.js'

var url = 'static/models/modern chair 11 obj.obj'
var selectedRoom='static/rooms/room.glb'
ModelManager.loadModel(url);
ModelManager.loadModel(selectedRoom);
window.addEventListener('click',SceneManager.onPointerClick);

Network.getModelData();
function animate() {

    Control.control.update();
    SceneManager.render();
    requestAnimationFrame(animate);
}

animate();

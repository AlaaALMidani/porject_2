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


export function postData(file) {
    const formData = new FormData();
    formData.append('name', 'hope');
    formData.append('image', file);
    formData.append('category', 'none');
    formData.append('type', 'object');
    formData.append('room', 1);

    fetch(baseUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyNzEzOTIzLCJpYXQiOjE3MjI3MDY3MjMsImp0aSI6IjNlZTA4ZDNkYjAxMDQxMjJhMGIzNDA5MDExODdiZTcxIiwidXNlcl9pZCI6Nn0.pui0_37L5KDPXnOTNxpNGr0Wuyhk8A1JwIBA_vKcnCI"
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            console.log(response);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as SceneManager from './scene_manager'

var url = 'static/models/modern chair 11 obj.obj'
var model;



export function loadModel() {
	const fileSuffix = url.split(".").pop();
	if (fileSuffix == 'obj') {
		getObjModel((obj) => {
			model = obj;
			SceneManager.scene.add(model);

			obj.scale.set(0.01, 0.01, 0.01);
		})
	} else if (fileSuffix == 'gltf') {
		getGltfModel((gltf) => {
			model = gltf;
			SceneManager.scene.add(model);
		})
	} else {
		console.log('The model type is not supported');
	}

}
function getGltfModel(callback) {

	const gltfLoader = new GLTFLoader();
	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
	gltfLoader.setDRACOLoader(dracoLoader);

	gltfLoader.load(
		url,
		function (gltf) {
			console.log('gltf');

			callback(gltf.scene.children[0]);
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},
		function (error) {
			console.log('An error happened');
		}
	);
}
function getObjModel(callback) {
	const loader = new OBJLoader();
	loader.load(
		url,
		function (object) {
			console.log('obj');
			callback(object);
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},
		function (error) {
			console.log('An error happened');
			console.log(error.message);
		}
	);
}

const file = new File(['Hello, world!'], 'example.txt', {
	contentType: 'text/plain',
	lastModified: new Date()
});

fetch('https://503f-169-150-196-137.ngrok-free.app/api/objects', {
	method: 'POST',
	mode: 'no-cors',
	headers: {
		'Authorization':
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyNzEzOTIzLCJpYXQiOjE3MjI3MDY3MjMsImp0aSI6IjNlZTA4ZDNkYjAxMDQxMjJhMGIzNDA5MDExODdiZTcxIiwidXNlcl9pZCI6Nn0.pui0_37L5KDPXnOTNxpNGr0Wuyhk8A1JwIBA_vKcnCI"
		, 'Content-Type': 'application/json' 
	},
	body: JSON.stringify({
		'file':file 
		, 'td_model':{file}
		, 'td_model[name]': 'any'
		, 'material': {file}
		, 'td_model[description]':'description'
		, 'td_model[type]': 'object'
		, 'room': 2
	}) 
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



import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as SceneManager from './scene_manager'


export var model;



export function loadModel(url) {
	const fileSuffix = url.split(".").pop();
	if (fileSuffix == 'obj') {
		getObjModel(url,(obj) => {
			model = obj;
			SceneManager.scene.add(model);
			obj.scale.set(0.01, 0.01, 0.01);
			obj.position.set(0, 0, 0);
		})
	} else if (fileSuffix == 'gltf' || fileSuffix=='glb') {
		getGltfModel(url,(gltf) => {
			model = gltf;
			model.scale.set(10,10,10,)
			model.position.set(-10, 0, 0);
			SceneManager.scene.add(model);
		})
	} 
	
	else {
		console.log('The model type is not supported');
	}

}
function getGltfModel(url, callback) {

	const gltfLoader = new GLTFLoader();
	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
	gltfLoader.setDRACOLoader(dracoLoader);

	gltfLoader.load(
		url,
		function (gltf) {
			console.log('gltf');
			callback(gltf.scene);
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},
		function (error) {
			console.log('An error happened');
		}
	);
}
function getObjModel(url ,callback ) {
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

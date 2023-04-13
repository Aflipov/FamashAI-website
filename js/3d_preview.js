import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

function main() {
	const canvas = document.querySelector('#c');
	const renderer = new THREE.WebGLRenderer({alpha: true, canvas});
	renderer.outputEncoding = THREE.sRGBEncoding;

	const fov = 45;
	const aspect = 2;	// the canvas default
	const near = 0.1;
	const far = 10000;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 30, 460);

	const controls = new OrbitControls(camera, canvas);
	controls.target.set(0, 5, 0);
	controls.update();

	const scene = new THREE.Scene();
	// scene.background = new THREE.Color('black');

	// {
	// 	const planeSize = 40;

	// 	const loader = new THREE.TextureLoader();
	// 	const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png');
	// 	texture.encoding = THREE.sRGBEncoding;
	// 	texture.wrapS = THREE.RepeatWrapping;
	// 	texture.wrapT = THREE.RepeatWrapping;
	// 	texture.magFilter = THREE.NearestFilter;
	// 	const repeats = planeSize / 2;
	// 	texture.repeat.set(repeats, repeats);

	// 	const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
	// 	const planeMat = new THREE.MeshPhongMaterial({
	// 		map: texture,
	// 		side: THREE.DoubleSide,
	// 	});
	// 	const mesh = new THREE.Mesh(planeGeo, planeMat);
	// 	mesh.rotation.x = Math.PI * -.5;
	// 	scene.add(mesh);
	// }

	{
		const color = 0xFFFFFF;
		const intensity = 0.15;
		const light = new THREE.AmbientLight(color, intensity);
		scene.add(light);
	}

	{
		const color = 0xFFFFFF;
		const intensity = 0.4;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(0, 200, 460);
		scene.add(light);
		// scene.add(light.target);
	}

	// {
	// 	const mtlLoader = new MTLLoader();
	// 	mtlLoader.load('https://threejs.org/manual/examples/resources/models/windmill/windmill.mtl', (mtl) => {
	// 		mtl.preload();
	// 		const objLoader = new OBJLoader();
	// 		objLoader.setMaterials(mtl);
	// 		objLoader.load('https://threejs.org/manual/examples/resources/models/windmill/windmill.obj', (root) => {
	// 			scene.add(root);
	// 		});
	// 	});
	// }

	// {
	// 	const objLoader = new OBJLoader();
	// 	objLoader.load('obj models/5-36/5-36-in_mesh.obj', (root) => {
	// 		scene.add(root);
	// 		root.position.set(-200, -200, -120)
	// 	});
	// }

	{
		const material = new THREE.MeshPhongMaterial({
			color: 0x000000,
			flatShading: true,
			side: THREE.DoubleSide
		});
		const objLoader = new OBJLoader();
		// objLoader.setMaterials(material)
		objLoader.load('obj models/5-36/5-36-in_mesh.obj', (root) => {
			scene.add(root);
			root.position.set(-200, -200, -120)
		});
	}

	function resizeRendererToDisplaySize(renderer) {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			renderer.setSize(width, height, false);
		}
		return needResize;
	}

	function render() {

		if (resizeRendererToDisplaySize(renderer)) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		renderer.render(scene, camera);

		requestAnimationFrame(render);
	}

	requestAnimationFrame(render);
}

main();

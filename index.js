// Code following the tutorial from https://dev.to/waldowred5/getting-started-with-your-first-three-js-project-part-one-the-setup-147k 
// Going to attempt to change this code up to read clicks from certain tools to allow editting of the geometry
// documentation on three.js https://threejs.org/

import * as THREE from './node_modules/three/build/three.module.js'
// import { TrackballControls } from 'three/examples/jsm/Addons.js'

const renderGrounds = document.getElementById('model-grounds');
const rect = renderGrounds.getBoundingClientRect();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.6, 1200);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({antialias : true});

renderer.setClearColor('#233143');
renderer.setSize(rect.width, rect.height);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(rect.width, rect.height);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
})

const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.rotation.set(40,0,40);
scene.add(boxMesh);

const rendering = function() {
    requestAnimationFrame(rendering);

    scene.rotation.z -= 0.005;
    scene.rotation.x -= 0.01;

    renderer.render(scene, camera);
}

rendering();
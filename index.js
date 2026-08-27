// Code following the tutorial from https://dev.to/waldowred5/getting-started-with-your-first-three-js-project-part-one-the-setup-147k 
// Going to attempt to change this code up to read clicks from certain tools to allow editting of the geometry
// documentation on three.js https://threejs.org/

import * as THREE from './node_modules/three/build/three.module.js'

// ------------------------------------------------------------IMPORTANT-----------------------------------------------------------------------------|
// look into the issue with the imports at https://discourse.threejs.org/t/solved-importmaps-broken-on-firefox-which-now-supports-importmaps/48413/5 |
// --------------------------------------------------------------------------------------------------------------------------------------------------|
// import { TrackballControls } from './node_modules/three/examples/jsm/controls/TrackballControls.js'

// Container that will hold the model
const renderGrounds = document.getElementById('model-grounds');
const rect = renderGrounds.getBoundingClientRect();

// Camera for the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.6, 1200);
camera.position.z = 5;

// Rendering
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
boxMesh.rotation.set(0, 0, 0);
scene.add(boxMesh);

const rendering = function() {
    requestAnimationFrame(rendering);

    scene.rotation.z -= 0.005;
    scene.rotation.x -= 0.01;

    renderer.render(scene, camera);
}

// Lighting for the Cube
const lights = [];
const lighthelpers = [];  // Optional code to show the source of the lights
const lightValues = [
    {colour: 0x14D14A, intensity: 8, dist: 12, x:1, y:0, z:8},
    {colour: 0xBE61CF, intensity: 6, dist: 12, x:-2, y:1, z:-10},
    {colour: 0x00FFFF, intensity: 3, dist: 10, x:0, y:10, z:1},
    {colour: 0x00FF00, intensity: 6, dist: 12, x:0, y:-10, z:-1},
    {colour: 0x16A7F5, intensity: 6, dist: 12, x:10, y:3, z:0},
    {colour: 0x90F615, intensity: 6, dist: 12, x:-10, y:-1, z:0},
];

for (let i=0; i<6; i++) {
    lights[i] = new THREE.PointLight(
        lightValues[i]['colour'],
        lightValues[i]['intensity'],
        lightValues[i]['dist']);
    lights[i].position.set(
        lightValues[i]['x'],
        lightValues[i]['y'],
        lightValues[i]['z']);
    scene.add(lights[i]);

    // Optional code to show the source of the lights
    lighthelpers[i] = new THREE.PointLightHelper(lights[i], 0.7);
    scene.add(lighthelpers[i]);
}

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper); //X -> red, Y -> green, Z -> blue

// const controls = new TrackballControls(camera, renderer.domElement);                                                                              
// controls.rotateSpeed = 4;
// controls.dynamicDampingFactor = 0.15;
// controls.update()

rendering();

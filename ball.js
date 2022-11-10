import * as THREE from './packages/three.js';
import { AsciiEffect } from './packages/asciieffect.js';
import { TrackballControls } from './packages/trackballcontrols.js';
import { GLTFLoader } from './packages/gltfloader.js';

let camera, controls, scene, renderer, effect;

let sphere, plane, cube;

const start = Date.now();

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = -50;
    camera.position.z = 0;

    scene = new THREE.Scene();
    const skyTexture = new THREE.TextureLoader().load('./textures/bg.jpg');
    scene.background = skyTexture;
    // scene.background = new THREE.Color(0,0,0);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(0, 200, 0);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.25);
    pointLight2.position.set(500, 500, 500);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 0.25);
    pointLight3.position.set(- 500, - 500, - 500);
    scene.add(pointLight3);

    sphere = new THREE.Mesh(new THREE.SphereGeometry(200, 20, 10), new THREE.MeshPhongMaterial({ flatShading: true }));

    const laptoploader = new GLTFLoader();
    laptoploader.load("./textures/dibesfer_voxel_pc/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = 150
            gltf.scene.position.x = -100
            gltf.scene.position.y = -200;
            gltf.scene.rotation.y = -0.75
            // gltf.scene.rotation.y = -1.5;
            gltf.scene.scale.set(50,50,50);
            scene.add(gltf.scene) ;
            render();
        },
    );

    const pianoloader = new GLTFLoader();
    pianoloader.load("./textures/grand_piano_1mb/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = -150; 
            gltf.scene.position.x = -150; 
            gltf.scene.position.y = -200;
            gltf.scene.rotation.y = 0;
            gltf.scene.scale.set(7,7,7);
            scene.add(gltf.scene) ;
            render();
        },
    );

    // const animeloader = new GLTFLoader();
    // animeloader.load("./textures/blanket_in_the_wind/scene.gltf", ( gltf ) => {
    //         gltf.scene.position.z = 125; 
    //         gltf.scene.position.x = 100
    //         gltf.scene.position.y = -150;
    //         gltf.scene.rotation.y = -0.75;
    //         gltf.scene.scale.set(0.75,0.75,0.75);
    //         scene.add(gltf.scene) ;
    //         render();
    //     },
    // );

    const cubeTexture = new THREE.TextureLoader().load('pepega.png')
    cubeTexture.wrapS = THREE.RepeatWrapping;
    cubeTexture.wrapT = THREE.RepeatWrapping;
    // cubeTexture.repeat.set( 4, 4 );
    cube = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshBasicMaterial({ map: cubeTexture }));
    // scene.add(cube)
    // scene.add(sphere);

    // Plane

    const planeTexture = new THREE.TextureLoader().load('./textures/floor2.jpg')
    planeTexture.wrapS = THREE.RepeatWrapping;
    planeTexture.wrapT = THREE.RepeatWrapping;
    planeTexture.repeat.set( 2, 20 );
    plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 10000), new THREE.MeshBasicMaterial({ color: 0xe0e0e0, wireframe: false, map:planeTexture}));
    plane.position.y = - 200;
    plane.rotation.x = - Math.PI / 2;
    scene.add(plane);

    // renderer = new THREE.WebGLRenderer({});
    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg')});
    renderer.setSize(window.innerWidth, window.innerHeight);

    // effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
    // effect.setSize(window.innerWidth, window.innerHeight);
    // effect.domElement.style.color = 'white';
    // effect.domElement.style.backgroundColor = 'black';

    // Special case: append effect.domElement, instead of renderer.domElement.
    // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.

    // document.body.appendChild(effect.domElement);

    // controls = new TrackballControls(camera, effect.domElement);

    //

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {

    requestAnimationFrame(animate);

    render();

}

function moveCamera() {
    const t = document.body.getBoundingClientRect().top + 10000 * 0.2;
    camera.position.z = t * 0.25
    console.log(camera.position.z)
    // camera.position.x = t * -0.02;
    // camera.rotation.y = t * -0.02;
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.05;
    cube.rotation.z += 0.02;
}

// function deafaultPosition(){
//     camera.position.z = 500;
// }

function render() {

    const timer = Date.now() - start;

    // sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
    // sphere.rotation.x = timer * 0.0003;
    // sphere.rotation.z = timer * 0.0002;

    cube.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
    cube.rotation.x = timer * 0.0003;
    cube.rotation.z = timer * 0.0002;
    
    // controls.update();

    renderer.render(scene, camera);

}


init();
animate();
document.body.onscroll = moveCamera;
moveCamera();
// deafaultPosition();
console.log(camera.position.y)
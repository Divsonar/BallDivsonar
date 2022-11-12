import * as THREE from './packages/three.js';
import { AsciiEffect } from './packages/asciieffect.js';
import { TrackballControls } from './packages/trackballcontrols.js';
import { GLTFLoader } from './packages/gltfloader.js';

let camera, scene, renderer;

let sphere, plane, cube, phone, phoneload;
var modelnumber;

const start = Date.now();

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = -20;
    camera.position.z = 0;

    scene = new THREE.Scene();
    const skyTexture = new THREE.TextureLoader().load('./textures/bg.jpg');
    scene.background = skyTexture;
    // scene.background = new THREE.Color(0,0,0);

    // const dirLight = new THREE.PointLight(0xffffff,1);
    // dirLight.position.set(100, 100, 0);
    // dirLight.castShadow=true;
    // dirLight.shadow.camera.top = 2;
    // dirLight.shadow.camera.bottom = - 2;
    // dirLight.shadow.camera.left = - 2;
    // dirLight.shadow.camera.right = 2;
    // dirLight.shadow.camera.near = 0.1;
    // dirLight.shadow.camera.far = 40;
    // scene.add(dirLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 1.5);
    pointLight2.position.set(400, -10, 200);
    scene.add(pointLight2);

    // const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    // hemiLight.position.set(20, 20, 10);
    // scene.add(hemiLight);

    // const pointLight3 = new THREE.DirectionalLight(0xffffff, 1);
    // pointLight3.position.set(-350, 150, 100);
    // pointLight3.castShadow = true;
    // scene.add(pointLight3);

    // const helper = new THREE.CameraHelper(pointLight3.shadow.camera)
    // scene.add(helper)

    // sphere = new THREE.Mesh(new THREE.SphereGeometry(200, 20, 10), new THREE.MeshPhongMaterial({ flatShading: true }));

    const deskloader = new GLTFLoader();
    deskloader.load("textures/simple_dirty_desk/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = 255
            gltf.scene.position.x = -65
            gltf.scene.position.y = -205;
            gltf.scene.rotation.y = 0.61
            // gltf.scene.rotation.y = -1.5;
            gltf.scene.scale.set(175,175,175);
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = true;
                }
             });
            scene.add(gltf.scene) ;
            render();
        },
    );

    const desktoploader = new GLTFLoader();
    desktoploader.load("./textures/gaming_desktop_pc/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = 200
            gltf.scene.position.x = -0
            gltf.scene.position.y = -70;
            gltf.scene.rotation.y = -0.95
            // gltf.scene.rotation.y = -1.5;
            gltf.scene.scale.set(25,25,25);
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = true;
                }
             });
            scene.add(gltf.scene) ;
            render();
        },
    );

    const pianoloader = new GLTFLoader();
    pianoloader.load("./textures/grand_piano_1mb/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = -400; 
            gltf.scene.position.x = -135; 
            gltf.scene.position.y = -200;
            gltf.scene.rotation.y = 0;
            gltf.scene.scale.set(6.25,6.25,6.25);
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = true;
                }
             });
            scene.add(gltf.scene) ;
            render();
        },
    );

    phone = new GLTFLoader();
    phone.load("textures/samsung_galaxy_s21_ultra/scene.gltf", ( gltf ) => {
            console.log(gltf.scene.id)
            modelnumber = gltf.scene.id 
            gltf.scene.position.z = 125; 
            // gltf.scene.position.x = 150
            // gltf.scene.position.y = -200;
            // gltf.scene.rotation.y = -0.75;
            gltf.scene.scale.set(0.7,0.7,0.7);
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = true;
                }
             });
            scene.add(gltf.scene) ;
            render();
        },
    );

    // const cubeTexture = new THREE.TextureLoader().load('pepega.png')
    // cubeTexture.wrapS = THREE.RepeatWrapping;
    // cubeTexture.wrapT = THREE.RepeatWrapping;
    // // cubeTexture.repeat.set( 4, 4 );
    // cube = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshBasicMaterial({ map: cubeTexture }));
    // // scene.add(cube)
    // // scene.add(sphere);

    // Plane

    const planeTexture = new THREE.TextureLoader().load('./textures/marble.jpg')
    planeTexture.wrapS = THREE.RepeatWrapping;
    planeTexture.wrapT = THREE.RepeatWrapping;
    planeTexture.repeat.set( 4, 40 );
    plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 10000), new THREE.MeshPhongMaterial({ color: 0xe0e0e0, wireframe: false}));
    plane.position.y = - 200;
    plane.rotation.x = - Math.PI / 2;
    plane.receiveShadow = true;
    plane.castShadow = true;
    scene.add(plane);

    // renderer = new THREE.WebGLRenderer({});
    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg')});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
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
}

// function deafaultPosition(){
//     camera.position.z = 500;
// }

function render() {

    const timer = Date.now() - start;
    for (var i = 0; i < scene.children.length; i++)
        if (scene.children[i].id == modelnumber) {
            scene.children[i].position.set(100, Math.sin(timer * 0.001) * 10 - 15, 190);
            scene.children[i].rotation.set(0, timer * 0.0010 ,0);
        } 

    // cube.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
    // cube.rotation.x = timer * 0.0003;
    // cube.rotation.z = timer * 0.0002;
    
    const targetAspect = window.innerWidth / window.innerHeight;
    const imageAspect = 3840 / 2160;
    const factor = imageAspect / targetAspect;
    // When factor larger than 1, that means texture 'wilder' than target。 
    // we should scale texture height to target height and then 'map' the center  of texture to target， and vice versa.
    scene.background.offset.x = factor > 1 ? (1 - 1 / factor) / 2 : 0;
    scene.background.repeat.x = factor > 1 ? 1 / factor : 1;
    scene.background.offset.y = factor > 1 ? 0 : (1 - factor) / 2;
    scene.background.repeat.y = factor > 1 ? 1 : factor;

    // controls.update();

    renderer.render(scene, camera);

}


init();
animate();
document.body.onscroll = moveCamera;
moveCamera();
// deafaultPosition();
console.log(camera.position.y)
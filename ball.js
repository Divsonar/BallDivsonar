import * as THREE from './packages/three.js';
import { AsciiEffect } from './packages/asciieffect.js';
import { TrackballControls } from './packages/trackballcontrols.js';
import { GLTFLoader } from './packages/gltfloader.js';

let camera, scene, renderer;

let sphere, plane, cube, phone, phoneload;
var modelnumber;

const start = Date.now();

function init() {






    // Camera

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = -120;
    //-20
    camera.position.z = 0;






    // Scene

    scene = new THREE.Scene();
    const skyTexture = new THREE.TextureLoader().load('./textures/bg.jpg');
    scene.background = skyTexture;
    // scene.background = new THREE.Color(0,0,0);






    //Lights

    const bulbGeometry = new THREE.SphereGeometry( 5, 16, 8 );
    var bulbLight = new THREE.PointLight( 0xffee88, 100000, 1000, 2 );
    var bulbMat = new THREE.MeshStandardMaterial( {
        emissive: 0xffffff,
        emissiveIntensity: 1,
        color: 0x000000
    } );
    // bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
    bulbLight.shadow.bias = -0.05;
    bulbLight.position.set( 140, -20, 280 );
    bulbLight.castShadow = true;
    scene.add( bulbLight );

    var ambientLight = new THREE.AmbientLight( 0xffee88, 0.15, 1000, 2 );
    ambientLight.position.set( 0, -20, -200 );
    // ambientLight.castShadow = true; 0.15
    scene.add( ambientLight );






    // Objects

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
                  child.receiveShadow = true;
                }
             });
            gltf.scene.castShadow = true;
            gltf.scene.receiveShadow = true;
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
                  child.receiveShadow = true;
                }
             });
            gltf.scene.castShadow = true;
            gltf.scene.receiveShadow = true;
            scene.add(gltf.scene) ;
            render();
        },
    );

    const lamploader = new GLTFLoader();
    lamploader.load("textures/simple_studio_light/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = 255
            gltf.scene.position.x = 195
            gltf.scene.position.y = -205;
            gltf.scene.rotation.y = -1.7
            // gltf.scene.rotation.y = -1.5;
            gltf.scene.scale.set(100,100,100);
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
             });
            gltf.scene.castShadow = true;
            gltf.scene.receiveShadow = true;
            scene.add(gltf.scene) ;
            render();
        },
    );

    const pianoloader = new GLTFLoader();
    pianoloader.load("./textures/grand_piano_1mb/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = -700; 
            gltf.scene.position.x = -135; 
            gltf.scene.position.y = -200;
            gltf.scene.rotation.y = 0;
            gltf.scene.scale.set(6.25,6.25,6.25);
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
             });
            gltf.scene.castShadow = true;
            gltf.scene.receiveShadow = true;
            scene.add(gltf.scene) ;
            render();
        },
    );

    phone = new GLTFLoader();
    phone.load("textures/samsung_galaxy_s21_ultra/scene.gltf", ( gltf ) => {
            modelnumber = gltf.scene.id 
            gltf.scene.position.z = 125; 
            // gltf.scene.position.x = 150
            // gltf.scene.position.y = -200;
            // gltf.scene.rotation.y = -0.75;
            gltf.scene.scale.set(0.35,0.35,0.35);
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
             });
            gltf.scene.castShadow = true;
            gltf.scene.receiveShadow = true;
            scene.add(gltf.scene) ;
            render();
        },
    );

    const sofaloader = new GLTFLoader();
    sofaloader.load("textures/sofa/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = -350; 
            gltf.scene.position.x = -165; 
            gltf.scene.position.y = -150;
            gltf.scene.rotation.y = 1.57;
            gltf.scene.scale.set(150,150,150);
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
             });
            gltf.scene.castShadow = true;
            gltf.scene.receiveShadow = true;
            scene.add(gltf.scene) ;
            render();
        },
    );

    const tvloader = new GLTFLoader();
    tvloader.load("textures/modern_entertainment_center_free/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = -360; 
            gltf.scene.position.x = 185; 
            gltf.scene.position.y = -150;
            gltf.scene.rotation.y = 3.1457;
            gltf.scene.scale.set(0.5,0.5,0.5);
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
             });
            gltf.scene.castShadow = true;
            gltf.scene.receiveShadow = true;
            scene.add(gltf.scene) ;
            render();
        },
    );




    // Plane

    const planeTexture = new THREE.TextureLoader().load('./textures/marble.jpg')
    planeTexture.wrapS = THREE.RepeatWrapping;
    planeTexture.wrapT = THREE.RepeatWrapping;
    planeTexture.repeat.set( 4, 40 );
    plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 10000), new THREE.MeshPhongMaterial({ color: 0xe0e0e0, wireframe: false, map:planeTexture}));
    plane.position.y = - 200;
    plane.rotation.x = - Math.PI / 2;
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);

    // const textureLoader = new THREE.TextureLoader();
    // const cubeMat = new THREE.MeshStandardMaterial( {
    //     roughness: 0,
    //     color: 0xffffff,
    //     bumpScale: 0,
    //     metalness: 0
    // } );

    // textureLoader.wrapS = THREE.RepeatWrapping;
    // textureLoader.wrapT = THREE.RepeatWrapping;
    // textureLoader.anisotropy = 4;
    // textureLoader.load( "./textures/hardwood2_diffuse.jpg", function ( map ) {
    //     map.encoding = THREE.sRGBEncoding;
    //     cubeMat.map = map;
    //     cubeMat.needsUpdate = true;
    // } );
    // textureLoader.load( "./textures/hardwood2_bump.jpg", function ( map ) {
    //     cubeMat.bumpMap = map;
    //     cubeMat.needsUpdate = true;
    // } );

    // textureLoader.load( "./textures/hardwood2_roughness.jpg", function ( map ) {
    //     cubeMat.roughnessMap = map;
    //     cubeMat.needsUpdate = true;

    // } );

    // for(var x = -10; x < 10; x++) {
    //     for(var z = -10; z < 10; z++) {
    //         var plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), cubeMat);
    //         plane.position.x = - (x * 200);
    //         plane.position.y = - 200;
    //         plane.position.z = - (z * 200);
    //         plane.rotation.x = - Math.PI / 2;
    //         plane.castShadow = true;
    //         plane.receiveShadow = true;
    //         scene.add(plane);
    //     }
    // }






    // Render

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#bg')});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    render();

}

function moveCamera() {
    const t = document.body.getBoundingClientRect().top + 10000 * 0.2;
    camera.position.z = t * 0.25
    console.log("Camera Z Pos:" + camera.position.z)
    if (camera.position.y < -20) {
        camera.position.y += 1.5
    }
    // camera.position.x = t * -0.02;
    // camera.rotation.y = t * -0.02;
}

function render() {

    const timer = Date.now() - start;
    for (var i = 0; i < scene.children.length; i++)
        if (scene.children[i].id == modelnumber) {
            scene.children[i].position.set(100, Math.sin(timer * 0.001) * 10 - 30, 190);
            scene.children[i].rotation.set(0, timer * 0.0010 ,0);
        } 

    //Bouncing Pepega Cube Legacy Code (KEEP)
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
    renderer.render(scene, camera);
}


init();
animate();
document.body.onscroll = moveCamera;
moveCamera();
startanimate();
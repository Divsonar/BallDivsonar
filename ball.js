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

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.y = -20;
    // camera.rotation.x = -Math.PI
    //-20
    camera.position.z = 0;






    // Scene

    scene = new THREE.Scene();
    const skyTexture = new THREE.TextureLoader().load('./textures/bg2.jpg');
    scene.background = skyTexture;
    // scene.background = new THREE.Color(0,0,0);






    //Lights

    const bulbGeometry = new THREE.SphereGeometry( 5, 16, 8 );
    var bulbLight = new THREE.PointLight( 0xffee88, 20000, 0, 2 );
    var bulbMat = new THREE.MeshStandardMaterial( {
        emissive: 0xffffff,
        emissiveIntensity: 1,
        color: 0x000000
    } );
    // bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
    bulbLight.shadow.bias = -0.01;
    // bulbLight.shadow.mapSize.width = 300
    // bulbLight.shadow.mapSize.height = 300
    bulbLight.position.set( 140, -20, 280 );
    bulbLight.castShadow = true;
    bulbLight.shadow.radius = 5
    bulbLight.shadow.blurSamples = 25
    scene.add( bulbLight );


    // const signGeometry = new THREE.SphereGeometry( 5, 16, 8 );
    var signLight = new THREE.PointLight( 0xFF00FF, 100000, 1000, 2 );
    // var signMat = new THREE.MeshStandardMaterial( {
    //     emissive: 0xF000FF,
    //     emissiveIntensity: 1,
    //     color: 0xF000FF
    // } );
    // signLight.add( new THREE.Mesh( signGeometry, signMat ) );
    signLight.shadow.bias = -0.01;
    // bulbLight.shadow.mapSize.width = 300
    // bulbLight.shadow.mapSize.height = 300
    signLight.position.set( -135, 120, -500 );
    signLight.castShadow = true;
    signLight.shadow.radius = 5
    signLight.shadow.blurSamples = 25
    scene.add( signLight );


    //  const signGeometry = new THREE.SphereGeometry( 5, 16, 8 );
     var lamp2Light = new THREE.PointLight( 0xFFFFFF, 100000, 1000, 2 );
    //  var signMat = new THREE.MeshStandardMaterial( {
    //      emissive: 0xF000FF,
    //      emissiveIntensity: 1,
    //      color: 0xF000FF
    //  } );
    //  lamp2Light.add( new THREE.Mesh( signGeometry, signMat ) );
     lamp2Light.shadow.bias = -0.05;
     // bulbLight.shadow.mapSize.width = 300
     // bulbLight.shadow.mapSize.height = 300
     lamp2Light.position.set( 210, 110, -400 );
     lamp2Light.castShadow = true;
     lamp2Light.shadow.radius = 5
     lamp2Light.shadow.blurSamples = 50
     scene.add( lamp2Light );


     //  const signGeometry = new THREE.SphereGeometry( 5, 16, 8 );
     var outsideLight = new THREE.PointLight( 0xFFFFFF, 1000000, 1000, 2 );
    //  var signMat = new THREE.MeshStandardMaterial( {
    //      emissive: 0xF000FF,
    //      emissiveIntensity: 1,
    //      color: 0xF000FF
    //  } );
    //  lamp2Light.add( new THREE.Mesh( signGeometry, signMat ) );
    outsideLight.shadow.bias = 0.02;
    outsideLight.position.set( 100, 100, -1700 );
    outsideLight.castShadow = true;
    outsideLight.shadow.radius = 5
    outsideLight.shadow.blurSamples = 50
    scene.add(outsideLight);



    var ambientLight = new THREE.AmbientLight( 0xffee88, 0.1, 1000, 2 );
    ambientLight.position.set( 0, -20, -200 );
    // ambientLight.castShadow = true; 0.15
    scene.add( ambientLight );



    // Loading Screen

    const loadingManager = new THREE.LoadingManager();

    const progressBar = document.getElementById('progress-bar')
    const maintext = document.getElementById('maindiv')

    loadingManager.onStart = function(url, item, total) {
        maintext.style.visibility = 'hidden';
    }

    loadingManager.onProgress = function(url, item, total) {
        progressBar.value = (item/total) *100;
    }

    const progressBarConatiner = document.querySelector('.progress-bar-container');

    loadingManager.onLoad = function(url, item, total) {
        progressBarConatiner.style.display = 'none';
        maintext.style.visibility = 'visible'
        reloadScrollBars();
    }












    // Objects

    // LEGACY DESK
    // const deskloader = new GLTFLoader();
    // deskloader.load("textures/simple_dirty_desk/scene.gltf", ( gltf ) => {
    //         gltf.scene.position.z = 255
    //         gltf.scene.position.x = -65
    //         gltf.scene.position.y = -205;
    //         gltf.scene.rotation.y = 0.61
    //         // gltf.scene.rotation.y = -1.5;
    //         gltf.scene.scale.set(175,175,175);
    //         gltf.scene.traverse(function (child) {
    //             if (child.isMesh) {
    //               child.castShadow = true;
    //               child.receiveShadow = true;
    //             }
    //          });
    //         gltf.scene.castShadow = true;
    //         gltf.scene.receiveShadow = true;
    //         scene.add(gltf.scene) ;
    //         render();
    //     },
    // );

    const deskloader = new GLTFLoader(loadingManager);
    deskloader.load("textures/low_poly_desk_3/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = 255
            gltf.scene.position.x = -6
            gltf.scene.position.y = -115;
            gltf.scene.rotation.y = 0.62
            // gltf.scene.rotation.y = -1.5;
            gltf.scene.scale.set(3,3,3);
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

    const desktoploader = new GLTFLoader(loadingManager);
    desktoploader.load("textures/gaming_desktop_pc.glb", ( gltf ) => {
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

    const lamploader = new GLTFLoader(loadingManager);
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

    const pianoloader = new GLTFLoader(loadingManager);
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

    phone = new GLTFLoader(loadingManager);
    phone.load("textures/samsung_galaxy_s21_ultra/scene.gltf", ( gltf ) => {
            modelnumber = gltf.scene.id 
            gltf.scene.position.z = 135; 
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

    const sofaloader = new GLTFLoader(loadingManager);
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

    const tvloader = new GLTFLoader(loadingManager);
    tvloader.load("textures/led_tv_low_poly_free/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = -360; 
            gltf.scene.position.x = 185; 
            gltf.scene.position.y = -140;
            gltf.scene.rotation.y = Math.PI / 2;
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

    const tvstandloader = new GLTFLoader(loadingManager);
    tvstandloader.load("textures/tv_stand_low_poly/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = -360; 
            gltf.scene.position.x = 185; 
            gltf.scene.position.y = -210;
            gltf.scene.rotation.y = Math.PI / 2;
            gltf.scene.scale.set(250,250,250);
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
    
    const signloader = new GLTFLoader(loadingManager);
    signloader.load("textures/game_ready_japanese_small_vertical_neon_sign.glb", ( gltf ) => {
            gltf.scene.position.z = -500; 
            gltf.scene.position.x = -260; 
            gltf.scene.position.y = 120;
            gltf.scene.rotation.y = -Math.PI/2;
            gltf.scene.scale.set(2.5,2.5,2.5);
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = false;
                  child.receiveShadow = true;
                  child.material.emissive = new THREE.Color(0xF000FF);
                  child.material.vertexColors = true;
                }
             });
            gltf.scene.castShadow = true;
            gltf.scene.receiveShadow = true;
            scene.add(gltf.scene) ;
            render();
        },
    );

    const lamp2loader = new GLTFLoader(loadingManager);
    lamp2loader.load("textures/fluorescent_lamp/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = -400; 
            gltf.scene.position.x = 250; 
            gltf.scene.position.y = 120;
            gltf.scene.rotation.z = Math.PI/2
            gltf.scene.scale.set(2,2,2);
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = false;
                  child.receiveShadow = true;
                  child.material.emissive = new THREE.Color(0xFFFFFF);
                  child.material.vertexColors = true;
                }
             });
            gltf.scene.castShadow = true;
            gltf.scene.receiveShadow = true;
            scene.add(gltf.scene) ;
            render();
        },
    );

    const doorloader = new GLTFLoader(loadingManager);
    doorloader.load("textures/opened_patio_door/scene.gltf", ( gltf ) => {
            gltf.scene.position.z = -1350; 
            gltf.scene.position.x = -100; 
            gltf.scene.position.y = -90;
            gltf.scene.rotation.y = 0;
            gltf.scene.scale.set(20,20,20);
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



    // Walls

    const bricktexture = new THREE.TextureLoader().load('textures/brickwall.jpg')
    bricktexture.wrapS = THREE.RepeatWrapping;
    bricktexture.wrapT = THREE.RepeatWrapping;
    bricktexture.repeat.set( 6, 8 );
    
    const leftwall = new THREE.Mesh( new THREE.BoxGeometry( 2000, 2000, 0.1 ), new THREE.MeshStandardMaterial( { flatShading: false, map:bricktexture} ) );
    leftwall.rotation.y = Math.PI /2
    leftwall.position.y = -150
    leftwall.position.x = -255
    leftwall.position.z = -350
    leftwall.castShadow = true;
    leftwall.receiveShadow = true;
    scene.add( leftwall );

    const rightwall = new THREE.Mesh( new THREE.BoxGeometry( 2000, 2000, 0.1 ), new THREE.MeshStandardMaterial( { flatShading: false, map:bricktexture} ) );
    rightwall.rotation.y = Math.PI /2
    rightwall.position.y = -150
    rightwall.position.x = 255
    rightwall.position.z = -350
    rightwall.castShadow = true;
    rightwall.receiveShadow = true;
    scene.add( rightwall );

    const topwall = new THREE.Mesh( new THREE.BoxGeometry( 2000, 2000, 1 ), new THREE.MeshStandardMaterial( { flatShading: false, map:bricktexture} ) );
    topwall.rotation.x = Math.PI/2
    topwall.position.y = 350
    topwall.position.x = 100
    topwall.position.z = -350
    topwall.castShadow = true;
    topwall.receiveShadow = true;
    scene.add( topwall );

    const frontbricktexture = new THREE.TextureLoader().load('textures/brickwall.jpg')
    frontbricktexture.wrapS = THREE.RepeatWrapping;
    frontbricktexture.wrapT = THREE.RepeatWrapping;
    frontbricktexture.repeat.set( 1, 1 );

    const frontwall = new THREE.Mesh( new THREE.BoxGeometry( 530, 300, 0.3 ), new THREE.MeshStandardMaterial( { flatShading: false, map:frontbricktexture} ) );
    frontwall.rotation.x = 0
    frontwall.position.y = 240
    frontwall.position.x = 0
    frontwall.position.z = -1350
    frontwall.castShadow = true;
    frontwall.receiveShadow = true;
    scene.add( frontwall );

    const frontwall2 = new THREE.Mesh( new THREE.BoxGeometry( 300, 300, 0.3 ), new THREE.MeshStandardMaterial( { flatShading: false, map:frontbricktexture} ) );
    frontwall2.rotation.x = 0
    frontwall2.position.y = -55
    frontwall2.position.x = 200
    frontwall2.position.z = -1350
    frontwall2.castShadow = true;
    frontwall2.receiveShadow = true;
    scene.add( frontwall2 );

    const frontwall3 = new THREE.Mesh( new THREE.BoxGeometry( 300, 300, 0.3 ), new THREE.MeshStandardMaterial( { flatShading: false, map:frontbricktexture} ) );
    frontwall3.rotation.x = 0
    frontwall3.position.y = -55
    frontwall3.position.x = -340
    frontwall3.position.z = -1350
    frontwall3.castShadow = true;
    frontwall3.receiveShadow = true;
    scene.add( frontwall3 );




    // Plane

    const planeTexture = new THREE.TextureLoader().load('./textures/marble.jpg')
    planeTexture.wrapS = THREE.RepeatWrapping;
    planeTexture.wrapT = THREE.RepeatWrapping;
    planeTexture.repeat.set( 4, 40 );
    plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 2700), new THREE.MeshPhongMaterial({ color: 0xe0e0e0, wireframe: false, map:planeTexture}));
    plane.position.y = - 200;
    plane.rotation.x = - Math.PI / 2;
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);

    const grassTexture = new THREE.TextureLoader().load('./textures/grass.jpg')
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set( 30, 40 );
    const grass = new THREE.Mesh(new THREE.PlaneGeometry(4000, 2000), new THREE.MeshPhongMaterial({ color: 0xe0e0e0, wireframe: false, map:grassTexture}));
    grass.position.y = - 200;
    grass.rotation.x = - Math.PI / 2;
    grass.position.z = - 2345;
    grass.castShadow = true;
    grass.receiveShadow = true;
    scene.add(grass);


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
    console.log(t)
    console.log(window.innerWidth)
    var l = (window.innerWidth/1280)
    if (l<1) {
        camera.position.z = (t * (0.25*l))+400
    }
    else {
        camera.position.z = (t * (0.25*l))
    }
    camera.position.x = 0
    console.log("Camera Z Pos:" + camera.position.z)
    // camera.position.x = t * -0.02;
    // camera.rotation.y = t * -0.02;
}

function render() {

    const timer = Date.now() - start;
    for (var i = 0; i < scene.children.length; i++)
        if (scene.children[i].id == modelnumber) {
            scene.children[i].position.set(100, Math.sin(timer * 0.001) * 10 - 35, 200);
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

// Put Scroll back to Top upon Refresh
history.scrollRestoration = 'manual';
// startanimate();
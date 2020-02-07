import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Loader from "./Utils/Loader.js";
import Resources from "./Utils/Resources.js";
import World from "./World.js";


/*
* Wrapper class for threejs app
*/
export default class THREE_App {

    /**
     * options = { canvas, window}
     */
    constructor(_options) {
        this.options = _options;

        this.loader = new Loader();
        this.resources = new Resources();

        console.log("Resources: ", this.resources);

        this.init();

        this.setRenderer();
        this.setControls();
        
        this.render()

    }

    init() {

        // Load items (in manager)
        this.items = this.loader.loadResources(this.resources);

        this.scene = new THREE.Scene();
  
        this.scene.background = new THREE.Color(0.1, 0.1, 0.1);
    
        this.camera = new THREE.PerspectiveCamera( 75, this.options.window.width / this.options.window.height, 0.1, 1000 );

        this.loader.on('loadingFinished', () => {
            // TODO loading screen + animation
            console.log("Se han cargado todos los modelos.");
            
            console.log(this.items);
    
            const world = new World( { items: this.items, options: this.options } );

            this.scene.add(world.container);
        })


    }





    // loadResources() {
    //     // Draco loader
    //     var dracoLoader = new DRACOLoader();
    //     dracoLoader.setDecoderPath("assets/decoder");
    //     var gltfloader = new GLTFLoader().setDRACOLoader(dracoLoader);

    //     // this.world.items = [];
    //     // var loadedItems = this.world.items;
    //     var scene = this.scene;
    //     let that = this;

    //     var txtloader = new THREE.TextureLoader();
    //     var matcap = txtloader.load("assets/orange.png");

    //     gltfloader.load("assets/aulario3_separated.glb", (gltf) => {
    //               // Apply cartoon material
    //         gltf.scene.traverse(o => {
    //             if (o.isMesh) {
    //                 console.log(o);
    //                 // o.material = new THREE.MeshPhongMaterial({ color: 0x00ffff });
    //                 // o.material = new THREE.MeshStandardMaterial({
    //                 //     color: '#C84',
    //                 //     side: THREE.DoubleSide,
    //                 //     roughness: 0.8,
    //                 //     metalness: 0,
    //                 //   });
    //                 //o.material = new THREE.ShadowMaterial({color: 0x00ffff})
    //                 o.material = new THREE.MeshPhysicalMaterial( {
    //                     color: 0xffff00,
    //                     metalness: 0,
    //                     roughness: 0.5,
    //                     clearcoat: 0.7,
    //                     clearcoatRoughness: 1.0,
    //                     reflectivity: .5,
    //                     // envMap: ( index % 2 ) == 1 ? hdrCubeRenderTarget.texture : null
    //                 } );
    //                 o.receiveShadow = true;
    //                 o.castShadow = true;
    //             }
                
    //         });
    //         gltf.scene.translateZ(18);
    //         scene.add(gltf.scene);

    //     }, (prog) => {
    //         console.log("Progress: ", prog);
    //     }, (err) => {
    //         console.warn("Error: ", error);
    //     });

    //      //Create a plane that receives shadows (but does not cast them)
    //     var planeGeometry = new THREE.PlaneBufferGeometry(80, 80, 128, 128);
    //     planeGeometry.rotateX(-Math.PI/2)
    //     planeGeometry.translate(0,-3,-10);
    //     var planeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    //     var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    //     plane.castShadow = true;
    //     plane.receiveShadow = true;
    //     this.scene.add(plane);


    // }



    setControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 500;
        this.controls.maxPolarAngle = Math.PI / 2;
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.options.canvas,
            antialias: true
        })
        this.renderer.setPixelRatio(2)
        this.renderer.physicallyCorrectLights = true
        // this.renderer.gammaFactor = 2.2
        // this.renderer.gammaOutPut = true
        // this.renderer.toneMappingExposure = Math.pow(0.7, 5.0);
        this.renderer.toneMapping = THREE.LinearToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.setSize(this.options.window.width, this.options.window.height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.BasicShadowMap;
    }

    render() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render.bind(this));
    }

    resized(width, height) {
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(width, height);
    }
}

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

        this.items.camera = this.camera;

        this.loader.on('loadingFinished', () => {
            // TODO loading screen + animation
            console.log("Se han cargado todos los modelos.");
            
            console.log(this.items);
    
            const world = new World( { items: this.items, options: this.options } );

            this.scene.add(world.container);
        })


    }


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
        // this.renderer.physicallyCorrectLights = true

        // this.renderer.gammaFactor = 2.2
        // this.renderer.gammaOutPut = true
        
        // this.renderer.toneMapping = THREE.LinearToneMapping;
        // this.renderer.toneMappingExposure = Math.pow(0.7, 5.0);
        // this.renderer.toneMappingExposure = 1.0;
        // this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.setSize(this.options.window.width, this.options.window.height);
        this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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

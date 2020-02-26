import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "stats.js";

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

        // Raycasting only selected buildings
        this.mouse = new THREE.Vector2();
        this.INTERSECTED = undefined;
        this.raycaster = new THREE.Raycaster();
        this.checkInteractive = [];

        console.log("Resources: ", this.resources);

        this.stats = new Stats;
        this.stats.showPanel(1);

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
    
        // this.raycasterCamera = new THREE.OrthographicCamera(this.options.window.width / - 2, this.options.window.width / 2, this.options.window.height / 2, this.options.window.height / - 2, 1, 1000)
        this.camera = new THREE.PerspectiveCamera( 75, this.options.window.width / this.options.window.height, 0.1, 1000 );
        // this.camera.add(this.raycasterCamera);


        this.items.camera = this.camera;

        this.loader.on('loadingFinished', () => {
            // TODO loading screen + animation
            console.log("Se han cargado todos los modelos.");
            
            console.log(this.items);
    
            const world = new World( { items: this.items, options: this.options } );

            this.checkInteractive = world.interactiveObjects;

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
        this.stats.begin();

        this.controls.update();

        // Raycaster
        this.raycaster.setFromCamera( this.mouse, this.camera);
        var intersects = this.raycaster.intersectObjects( this.checkInteractive, true );
        // console.log("INTERSECTIONS: ");
        // console.log(intersects);

        if ( intersects.length > 0 ) {

            if ( this.INTERSECTED != intersects[ 0 ].object ) {
                // si es un objecto distinto al seleccionado
                if ( this.INTERSECTED ) {
                    this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
                    // for(let i=0; i<this.INTERSECTED.parent.children.length; i++) {
                    //     this.INTERSECTED.parent.children[i].material.emissive.setHex( this.INTERSECTED.currentHex[i] );
                    // }
                } 

                this.INTERSECTED = intersects[ 0 ].object;
                this.INTERSECTED.currentHex = [];
                // for(let i=0; i<this.INTERSECTED.parent.children.length; i++) {
                //     // saving original materials
                //     this.INTERSECTED.currentHex[i] = this.INTERSECTED.parent.children[i].material.emissive.getHex();
                //     // and apply new color
                //     this.INTERSECTED.parent.children[i].material.emissive.setHex( 0xff0000 );
                // }
                this.INTERSECTED.material.emissive.setHex( 0xff0000 );

            }

        } else {

            if ( this.INTERSECTED ) {
                this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
                // applying original colors
                // for(let i=0; i<this.INTERSECTED.parent.children.length; i++) {
                //     this.INTERSECTED.parent.children[i].material.emissive.setHex( this.INTERSECTED.currentHex[i] );
                // }
            }
            this.INTERSECTED = null;

        }

        this.renderer.render(this.scene, this.camera);

        this.stats.end();
        
        requestAnimationFrame(this.render.bind(this));
    }

    resized(width, height) {
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(width, height);
    }
}

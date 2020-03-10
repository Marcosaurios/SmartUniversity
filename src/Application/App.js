import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Loader from "./Utils/Loader.js";
import Resources from "./Utils/Resources.js";
import World from "./World.js";

// Debug
import Stats from "stats.js";

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
        this.SELECTED = null;
        this.raycaster = new THREE.Raycaster();
        this.checkInteractive = [];
        
        console.log("Resources: ", this.resources);
        
        /* ----------------------------- */
        // Debug
        // console.log(this.options);
        if(this.options.DEBUG) {
            this.stats = new Stats;
            this.stats.showPanel(1);      

            var msMin = 100;
            var msMax = 0;
        
            var container = this.options.doc.createElement( 'div' );
            container.style.cssText = 'width:80px; opacity:0.9; cursor:pointer; position:absolute; top:0px; right:0px';
        
            var msDiv = this.options.doc.createElement( 'div' );
            msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#200;';
            container.appendChild( msDiv );
        
            var msText = this.options.doc.createElement( 'div' );
            msText.style.cssText = 'color:#f00;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
            msText.innerHTML= 'WebGLRenderer';
            msDiv.appendChild( msText );
            
            this.msTexts = [];
            var nLines	= 9;
            for(var i = 0; i < nLines; i++){
                this.msTexts[i]	= this.options.doc.createElement( 'div' );
                this.msTexts[i].style.cssText = 'color:#f00;background-color:#311;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
                msDiv.appendChild( this.msTexts[i] );		
                this.msTexts[i].innerHTML= '-';
            }

            this.renderstats = container;
        }
        /* ----------------------------- */


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
            console.log("Se han cargado todos los modelos: ");
            console.log(this.items);
    
            const world = new World( { items: this.items, options: this.options } );

            // Outside reference to objects which we want to raycast
            this.checkInteractive = world.interactiveObjects;

            this.scene.add(world.container);
        });


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

        this.renderer.gammaFactor = 2.2
        this.renderer.gammaOutPut = true
        
        this.renderer.toneMapping = THREE.LinearToneMapping;
        // this.renderer.toneMappingExposure = Math.pow(0.7, 5.0);
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        // 
        this.renderer.toneMappingExposure = 1.0;
        

        this.renderer.setSize(this.options.window.width, this.options.window.height);
        this.renderer.shadowMap.enabled = true;
        
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.lastTime = Date.now();
    }

    render() {
        this.stats.begin();

        this.controls.update();

        // Raycaster
        this.raycaster.setFromCamera( this.mouse, this.camera);
        var intersects = this.raycaster.intersectObjects( this.checkInteractive, false );
        // console.log("INTERSECTIONS: ");
        // console.log(intersects);
        // console.log(this.SELECTED);

        if ( intersects.length > 0 ) {

            if ( this.INTERSECTED != intersects[ 0 ].object ) {
                // si es un objecto distinto al seleccionado
                if ( this.INTERSECTED ) {
                    // this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
                    this.INTERSECTED.material.setValues({ visible: 0 });

                } 

                this.INTERSECTED = intersects[ 0 ].object;
                // this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex();

                // this.INTERSECTED.material.color.setHex( 0xff0000 );
                this.INTERSECTED.material.setValues({ visible: 1 });
                this.SELECTED = this.INTERSECTED.name;
            }

        } else {

            if ( this.INTERSECTED ) {
                this.INTERSECTED.material.setValues({ visible: 0 });

                // this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
                // applying original colors
    
            }
            this.INTERSECTED = null;
            this.SELECTED = null;

        }

        this.renderer.render(this.scene, this.camera);

        this.stats.end();

        if(this.options.DEBUG) {
            /* ------------------------------ */
            var i	= 0;
            this.msTexts[i++].textContent = "== Memory =====";
            this.msTexts[i++].textContent = "Programs: "	+ this.renderer.info.memory.programs;
            this.msTexts[i++].textContent = "Geometries: "+this.renderer.info.memory.geometries;
            this.msTexts[i++].textContent = "Textures: "	+ this.renderer.info.memory.textures;
    
            this.msTexts[i++].textContent = "== Render =====";
            this.msTexts[i++].textContent = "Calls: "	+ this.renderer.info.render.calls;
            this.msTexts[i++].textContent = "Vertices: "	+ this.renderer.info.render.vertices;
            this.msTexts[i++].textContent = "Faces: "	+ this.renderer.info.render.faces;
            this.msTexts[i++].textContent = "Points: "	+ this.renderer.info.render.points;
            /* ------------------------------ */
        }

        requestAnimationFrame(this.render.bind(this));
    }

    resized(width, height) {
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(width, height);
    }

    buildingSelected() {
        return this.SELECTED;
    }
}

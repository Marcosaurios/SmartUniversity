import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { eventstart, eventend, eventmove, eventcancel } from '@composi/gestures';

import Loader from "./Utils/Loader.js";
import Resources from "./Utils/Resources.js";
import World from "./World.js";


// Debug
import Stats from "stats.js";
import {GUI} from "three/examples/jsm/libs/dat.gui.module.js";

/*
* Wrapper class for threejs app
*/
export default class THREE_App {
    
    /**
     * options = { canvas, window}
     */
    constructor(_options) {

        this.options = _options;

        // Window access: // console.log(this.options.doc.defaultView);
        // Width and height from Window
        this.width = this.options.doc.defaultView.outerWidth;
        this.height = this.options.doc.defaultView.outerHeight;
        
        this.loader = new Loader();
        this.resources = new Resources();
        
        // Raycasting only selected buildings
        this.mouse = new THREE.Vector2();
        this.INTERSECTED = undefined;
        this.SELECTED = null;
        this.raycaster = new THREE.Raycaster();
        this.checkInteractive = [];
        
        console.log("Resources: ", this.resources);
        
        // Debug
        if(this.options.DEBUG) {
            // Set netlify cookie
            
            // Create folder
            this.options.gui = new GUI();
            this.options.debugScene = this.options.gui.addFolder('Scene');

            // Stats
            /* ----------------------------- */
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
        this.setCamera();
        
        this.render();

        // Load events and set initial app size
        this.setInteractiveEvents();
    }

    init() {

        // Load items (in manager)
        this.items = this.loader.loadResources(this.resources);

        this.scene = new THREE.Scene();
        
        if(this.options.DEBUG){
            // Export variables to window for WebGL inspector plugin
            window.scene = this.scene;
            window.THREE = THREE;

            var axesHelper = new THREE.AxesHelper( 50 );
            this.scene.add( axesHelper );
        }
  
        this.scene.background = new THREE.Color(0.1, 0.1, 0.1);
    
        this.setCamera();

        this.loader.on('loadingFinished', () => {
            // TODO loading screen + animation
            // console.log("Se han cargado todos los modelos: ");
            // console.log(this.items);
    
            const world = new World( { items: this.items, options: this.options } );

            // Outside reference to objects which we want to raycast
            this.checkInteractive = world.interactiveObjects;

            this.scene.add(world.container);
        });



    }

    setInteractiveEvents(){

        // Update canvas size
        let body = this.options.doc.getElementsByTagName('body')[0];

        // tmp div to get REAL SIZES
        let div = this.options.doc.createElement('div');
        div.style.width = '100vw'
        div.style.height = '100vh'
        div.style.position = 'absolute'
        div.style.top = 0
        div.style.left = 0
        div.style.pointerEvents = 'none'

        // Sizes
        this.options.canvas.style.width = '100vw';
        this.options.canvas.style.height = '100vh';


        // Mousemove
        this.options.canvas.addEventListener('mousemove', e => {
            event.preventDefault();
            this.mouse.x = ( e.clientX / this.viewportWidth ) * 2 - 1;
            this.mouse.y = - ( e.clientY / this.viewportHeight ) * 2 + 1;
        })

        let resize = () => {

            body.appendChild(div);
    
            this.viewportWidth = div.offsetWidth;
            this.viewportHeight = div.offsetHeight;
    
            body.removeChild(div);
    
            this.options.canvas.style.width = this.viewportWidth;
            this.options.canvas.style.height = this.viewportHeight;
    
            // console.log("re SIZE: " + this.viewportWidth + " x " + this.viewportHeight);
            // console.log("aspect " + this.viewportWidth / this.viewportHeight);
    
            // Keep same render and camera aspect
            // (first render was took at max width and height, so we don't modify to reescale the entire render, we only crop the canvas size)
            this.renderer.setSize(this.viewportWidth, this.viewportHeight);
            
            this.camera.aspect = this.viewportWidth / this.viewportHeight;
            this.camera.updateProjectionMatrix();
        }

        this.options.doc.defaultView.addEventListener('resize', resize );

        resize();
    }

    setCamera() {

        this.camera = new THREE.PerspectiveCamera( 40, this.width / this.height, 1, 2400 );

        this.camera.zoom = 2;

        this.camera.position.setZ(931);
        this.camera.position.setY(733);
        this.camera.position.setX(-1186);
        
        this.camera.lookAt(0,0,0);

        if(this.options.DEBUG) {
            var buildingFolder = this.options.debugScene.addFolder('Camera');

            const params = {
                posX: this.camera.position.x,
                posY: this.camera.position.y,
                posZ: this.camera.position.z,
            }
            
            buildingFolder.add(params, 'posX', -3000,3000).onChange( (val) => {
                this.camera.position.setX(val);
            })
            buildingFolder.add(params, 'posY', -3000,3000).onChange( (val) => {
                this.camera.position.setY(val);
            })
            buildingFolder.add(params, 'posZ', -3000,3000).onChange( (val) => {
                this.camera.position.setZ(val);
            })
        }

        this.items.camera = this.camera;
    }

    setControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // Control keys
        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.PAN,
            RIGHT: THREE.MOUSE.ROTATE
        }
        this.controls.touches = {
            ONE: THREE.TOUCH.PAN,
            TWO: THREE.TOUCH.DOLLY_ROTATE
        }
        this.controls.zoomSpeed = 2;
        // this.controls.maxZoom = 300;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 10;
        this.controls.maxDistance = 1700;
        this.controls.maxPolarAngle = Math.PI / 2;
    }

    setRenderer() {
        
        let createRenderer = () => {
            
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.options.canvas,
                antialias: true
            })
            this.renderer.setPixelRatio(2)
            this.renderer.setSize(this.viewportWidth, this.viewportHeight);
            this.renderer.physicallyCorrectLights = true
            this.renderer.outputEncoding = THREE.sRGBEncoding;
            this.renderer.shadowMap.enabled = true;
        }

        createRenderer();
        
        
    // this.renderer.physicallyCorrectLights = true
        // this.renderer.gammaOutPut = true
        // this.renderer.gammaFactor = 2.2
        // this.renderer.toneMapping = THREE.LinearToneMapping;
        // this.renderer.toneMappingExposure = Math.pow(0.7, 5.0);
        // this.renderer.toneMappingExposure = 1.0;
    //this.renderer.outputEncoding = THREE.sRGBEncoding;
        // this.renderer.toneMappingExposure = 1.0;
    //this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
     
        this.lastTime = Date.now();

        if(this.options.DEBUG) {
            var renderFolder = this.options.debugScene.addFolder('Render');

            const params = {
                gammaFactor: this.renderer.gammaFactor,
                gammaOutPut: true,
                toneMapping: this.renderer.toneMapping,
                toneMappingExposure: this.renderer.toneMappingExposure,
                toneMappingWhitePoint: this.renderer.toneMappingWhitePoint,
                outputEncoding: THREE.sRGBEncoding,
                physicallyCorrectLights: true,
                // this.renderer.toneMappingExposure = Math.pow(0.7, 5.0);
                // this.renderer.toneMappingExposure = 1.0;
            }

            const encodings = {
                "LinearEncoding": THREE.LinearEncoding,
                "sRGBEncoding": THREE.sRGBEncoding,
                "GammaEncoding": THREE.GammaEncoding,
                "RGBEEncoding": THREE.RGBEEncoding,
                "LogLuvEncoding": THREE.LogLuvEncoding,
                "RGBM7Encoding": THREE.RGBM7Encoding,
                "RGBM16Encoding": THREE.RGBM16Encoding,
                "RGBDEncoding": THREE.RGBDEncoding,
            }

            const mappings = {
                "LinearToneMapping": THREE.LinearToneMapping,
                "ReinhardToneMapping": THREE.ReinhardToneMapping,
                "Uncharted2ToneMapping": THREE.Uncharted2ToneMapping,
                "CineonToneMapping": THREE.CineonToneMapping,
                "ACESFilmicToneMapping": THREE.ACESFilmicToneMapping
            }
            
            renderFolder.add(params, 'gammaFactor').onChange( (val) => {
                this.renderer.dispose();
                this.renderer = null;
                createRenderer();
                this.renderer.gammaFactor = val;
            })
            renderFolder.add(params, 'gammaOutPut').onChange( (val) => {
                this.renderer.dispose();
                this.renderer = null;
                createRenderer();
                this.renderer.gammaOutPut = val;
            })
            renderFolder.add(params, 'toneMapping', Object.keys(mappings)).onChange( (val) => {
                this.renderer.dispose();
                this.renderer = null;
                createRenderer();
                this.renderer.toneMapping = mappings[val];
            })
            renderFolder.add(params, 'toneMappingExposure').onChange( (val) => {
                this.renderer.dispose();
                this.renderer = null;
                createRenderer();
                this.renderer.toneMappingExposure = val;
            })
            renderFolder.add(params, 'toneMappingWhitePoint').onChange( (val) => {
                this.renderer.dispose();
                this.renderer = null;
                createRenderer();
                this.renderer.toneMappingWhitePoint = val;
            })
            renderFolder.add(params, 'outputEncoding', Object.keys(encodings)).onChange( (val) => {
                this.renderer.dispose();
                this.renderer = null;
                createRenderer();
                this.renderer.outputEncoding = encodings[val];
            })
            renderFolder.add(params, 'physicallyCorrectLights').onChange((val)=> {
                this.renderer.dispose();
                this.renderer = null;
                createRenderer();
                this.renderer.physicallyCorrectLights = val;
            })
        }

    }

    render() {

        this.options.DEBUG ? this.stats.begin() : 0;

        this.controls.update();

        this.calculateIntersections();

        this.renderer.render(this.scene, this.camera);

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
            this.stats.end();
        }

        requestAnimationFrame(this.render.bind(this));
    }

    calculateIntersections() {

        
        // Raycaster
        this.raycaster.setFromCamera( this.mouse, this.camera);
        
        var intersects = this.raycaster.intersectObjects( this.checkInteractive, false );

        if ( intersects.length ) {
            this.options.canvas.classList.add('has-pointer');

            if ( this.INTERSECTED ) {
                this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
                // this.INTERSECTED.material.setValues({ visible: 1 });

            } 

            this.INTERSECTED = intersects[ 0 ].object;
            this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex();

            // ON HOVER!!
            // this.INTERSECTED.material.color.setHex( 0xff0000 );
            // this.INTERSECTED.material.color.setHex( 0x56e1fc );
            this.INTERSECTED.material.color.setHex( 0xbbf3fd );
            this.INTERSECTED.material.setValues({opacity: 1});
            
            this.SELECTED = this.INTERSECTED;

            // console.log(object);
        
        } else {

            if ( this.INTERSECTED ) {

                this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
                this.INTERSECTED.material.setValues({opacity: 0.75});

                // applying original colors
    
            }
            this.INTERSECTED = null;
            this.SELECTED = null;
            this.options.canvas.classList.remove('has-pointer');


        }
    }

    getSelected(){
        return this.SELECTED ? this.SELECTED.name : null;
    }

}

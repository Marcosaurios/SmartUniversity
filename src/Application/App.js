import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import EventEmitter from "./Utils/EventEmitter";
import Loader from "./Utils/Loader.js";
import Resources from "./Utils/Resources.js";
import World from "./World.js";
import { Sky } from './Sky.js';

import TWEEN from "@tweenjs/tween.js";


// Debug
import Stats from "stats.js";
import {GUI} from "three/examples/jsm/libs/dat.gui.module.js";
// import { Vector3 } from "three";

/*
* Wrapper class for threejs app
*/
export default class THREE_App extends EventEmitter{
    
    /**
     * options = { canvas, window}
     */
    constructor() {
        // Event emitter
        super();
        
        this.loader = new Loader();
        this.resources = new Resources();
        
        // Raycasting only selected buildings
        this.mouse = new THREE.Vector2();
        this.INTERSECTED = undefined;
        this.SELECTED = null;
        this.raycaster = new THREE.Raycaster();
        this.checkInteractive = [];


        // todo sizes
        this.globals = {
            roation_speed: .5,
            min_desktop_width: 1200,
            focus_offset: [0, 437]  // [phone, desktop]
        }
        this.isDesktop = 0;
        
        console.log("Resources: ", this.resources);

        // Load items (in manager)
        this.items = this.loader.loadResources(this.resources);
        this.loadingPromise = new Promise( (resolve, reject) => {
            
            this.loader.on('loadingFinished', () => {
                return resolve('Loaded');
            });

        });

    }

    init(_options) {

        this.options = _options;

        // Window access: // console.log(this.options.doc.defaultView);
        // Width and height from Window
        this.width = this.options.doc.defaultView.innerWidth;
        this.height = this.options.doc.defaultView.innerHeight;

        this.loader.on('fileFinished', (value) => {
            // Emit % to Svelte
            this.emit('progress', Math.floor(value) );
            // console.log("this is");
            // console.log(this);
        })

        // debugger
        this.loader.on('loadingFinished', () => {

            // FIXME loading screen + animation
            const world = new World( { items: this.items, options: this.options } );
            // world.updateBillboardsStatus(this.options.status);
            
            // Outside reference to objects which we want to raycast
            this.checkInteractive = world.interactiveObjects;

            this.scene.add(world.container);

            this.world = world;

        });

        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color(0.1, 0.1, 0.1);

        if(this.options.DEBUG){
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
        
            // var container = this.options.doc.createElement( 'div' );
            // container.style.cssText = 'width:80px; opacity:0.9; cursor:pointer; position:absolute; top:0px; right:0px';
        
            // var msDiv = this.options.doc.createElement( 'div' );
            // msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#200;';
            // container.appendChild( msDiv );
        
            // var msText = this.options.doc.createElement( 'div' );
            // msText.style.cssText = 'color:#f00;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
            // msText.innerHTML= 'WebGLRenderer';
            // msDiv.appendChild( msText );
            
            // this.msTexts = [];
            // var nLines	= 9;
            // for(var i = 0; i < nLines; i++){
            //     this.msTexts[i]	= this.options.doc.createElement( 'div' );
            //     this.msTexts[i].style.cssText = 'color:#f00;background-color:#311;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
            //     msDiv.appendChild( this.msTexts[i] );		
            //     this.msTexts[i].innerHTML= '-';
            // }

            // this.renderstats = container;

            // Export variables to window for WebGL inspector plugin
            window.scene = this.scene;
            window.THREE = THREE;

            var axesHelper = new THREE.AxesHelper( 50 );
            this.scene.add( axesHelper );
        }

        // todo each hour update sky -> interactive events?
        this.loadSky();
    
        this.setCamera();
        this.setRenderer();
        this.setControls();
        
        if(this.options.DEBUG){
            this.debugRender();
        }
        else{
            this.render();
        }

        // Load events and set initial app size
        this.setInteractiveEvents();
    }

    loadSky() {
        const sky = new Sky();
        sky.scale.setScalar( 450000 );

        this.scene.add(sky);

        // Add Sun Helper
        const sunSphere = new THREE.Mesh(
            new THREE.SphereBufferGeometry( 20000, 16, 8 ),
            new THREE.MeshBasicMaterial( { color: 0xffffff } )
        );
        sunSphere.position.y = - 700000;
        sunSphere.visible = false;
        this.scene.add( sunSphere );

        let distance = 400000;

        var uniforms = sky.material.uniforms;
        uniforms[ "turbidity" ].value = 3.2;
        uniforms[ "rayleigh" ].value = 0.2689;
        uniforms[ "mieCoefficient" ].value = 0.004;
        uniforms[ "mieDirectionalG" ].value = 0.0;
        uniforms[ "luminance" ].value = 1.14;

        var theta = Math.PI * ( 0.0874 - 0.5 );
        var phi = 2 * Math.PI * ( 0.1064 - 0.5 );

        sunSphere.position.x = distance * Math.cos( phi );
        sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
        sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

        sunSphere.visible = false;

        uniforms[ "sunPosition" ].value.copy( sunSphere.position );

    }

    getAllLoadedItems() {
        return this.loadingPromise;
    }

    setInteractiveEvents(){

        this.camera.target = new THREE.Vector3(0,0,0);

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

            // this.height = this.viewportWidth;
            // this.width = this.viewportWidth;
    
            body.removeChild(div);
    
            this.options.canvas.style.width = this.viewportWidth;
            this.options.canvas.style.height = this.viewportHeight;
            console.log("width: ", this.viewportWidth);
            console.log("height: ", this.viewportHeight);

            this.width = this.viewportWidth;
            this.height = this.viewportHeight;


            if(this.viewportWidth > this.globals.min_desktop_width){
                this.isDesktop = 1;
                console.log("is desktop");
            }
            else{
                this.isDesktop = 0;
            }
    
            // console.log("re SIZE: " + this.viewportWidth + " x " + this.viewportHeight);
            // console.log("aspect " + this.viewportWidth / this.viewportHeight);
    
            // Keep same render and camera aspect
            // (first render was took at max width and height, so we don't modify to reescale the entire render, we only crop the canvas size)
            if(this.status == 1){
                // card
                this.camera.setViewOffset(this.width, this.height, this.globals.focus_offset[this.isDesktop], 0, this.width, this.height);   
            }

            this.renderer.setSize(this.viewportWidth, this.viewportHeight);
            
            this.camera.aspect = this.viewportWidth / this.viewportHeight;
            this.camera.updateProjectionMatrix();
        }

        this.options.doc.defaultView.addEventListener('resize', resize );

        resize();

        // On Scroll - resizing billboards (when zooming)
        // let resizeBillboards = () => {
        //     // TO FIX AND THINK
        //     console.log("e");
        // }
        // this.options.doc.defaultView.addEventListener('wheel', resizeBillboards, false );

        let cameraRotation = () => {

            let out = this;
            
            // User in popup
            if(this.SELECTED && this.status != 1){

                console.log("desktop ", this.isDesktop);


                // Save previous
                this.camera.previousPosition = this.camera.position.clone();
                this.controls.previousTarget = this.controls.target.clone();

                // Update controls
                this.controls.target = this.SELECTED.position.clone(); // Focus autorotate on selected object
                this.controls.autoRotate = true;
                // this.controls.autoRotateSpeed = .5; // slow
                this.controls.autoRotateSpeed = this.globals.roation_speed; // slow

                this.camera.target = this.SELECTED.position.clone();
                // this.camera.position.z += 1000;

                // TODO old or actual zoom?
                // let offset = this.camera.position.clone().normalize().multiplyScalar(1000);

                let offset = new THREE.Vector3( 0, 0, - 1000 );
                // offset.multiply(new THREE.Vector3(0,0,1000))
                // offset.applyQuaternion(this.camera.quaternion)
                // let offset = THREE.Vector3(0,0,0);

                // todo animate offset ?
                this.camera.setViewOffset(this.width, this.height, 0, 0, this.width, this.height);

                let tween = new TWEEN.Tween( this.camera)
                .to( {
                    zoom: 8,
                } )
                .easing( TWEEN.Easing.Linear.None ).onUpdate( function (obj, elapsed) {
                    
                    out.camera.setViewOffset(out.width, out.height, out.globals.focus_offset[out.isDesktop] * elapsed, 0, out.width, out.height);

                    out.camera.lookAt( out.camera.target );
                    out.camera.updateProjectionMatrix();
                } )
                .onComplete( function () {
            
                    // out.camera.lookAt( out.camera.target );

                    out.status = 1;

                    // console.log("to selected finished", out.status);

                    out.controls.enabled = false;     
                    
                    
                } )
                .start();

                // Ease camera position to selected + offset
                // let tween = new TWEEN.Tween( this.camera.position )
                // .to( {
                //     x: Math.abs(offset.x),
                //     y: Math.abs(offset.y),
                //     z: Math.abs(offset.z)
                // } )
                // .easing( TWEEN.Easing.Linear.None ).onUpdate( function () {
            
                //     out.camera.lookAt( out.camera.target );
            
                // } )
                // .onComplete( function () {
            
                //     // out.camera.lookAt( out.camera.target );

                //     out.status = 1;

                //     // console.log("to selected finished", out.status);

                //     out.controls.enabled = false;        

                // } )
                // .start();
                
            }
            else if(this.status == 1){
                // do normal status  
                
                this.SELECTED = null;

                // todo
                // this.camera.setViewOffset(this.width, this.height, 0, 0, this.width, this.height);

                
                // Ease camera position to previous 
                //  AND ease controls target to previous
                // let restoreCamPos = new TWEEN.Tween( this.camera.position )
                // .to( {
                //     x: this.camera.previousPosition.x,
                //     y: this.camera.previousPosition.y,
                //     z: this.camera.previousPosition.z
                // } )
                // .easing( TWEEN.Easing.Linear.None ).onUpdate( function () {
            
                //     out.camera.lookAt( out.camera.target );
            
                // } )
                // .onStart( function () {
                //     new TWEEN.Tween( out.controls.target ).to({
                //         x: out.controls.previousTarget.x,
                //         y: out.controls.previousTarget.y,
                //         z: out.controls.previousTarget.z,
                //     })
                //     .onComplete( function (){
                //         out.controls.autoRotate = false;
                //         out.controls.enabled = true;
                //             // out.controls.target = out.controls.previousTarget.clone();
                        
                //     }).start();
                // })
                // .onComplete( function () {
                //     console.log("finish");
                    
                //     out.camera.lookAt( out.camera.target );
                //     // out.controls.enablePan = true;                
                //     // out.controls.enableKeys = true;                
                //     // out.controls.enableZoom = true;   
                    
                //     out.status = 0;
                // } )
                // .start();

                // TODO fix come back to previous position ????
                // console.log(this.camera.position);
   
                let tween = new TWEEN.Tween( this.camera )
                .to( {
                    zoom: 2,
                    position:
                    {
                        x: this.camera.previousPosition.x,
                        y: this.camera.previousPosition.y,
                        z: this.camera.previousPosition.z
                    }

                })
                .easing( TWEEN.Easing.Linear.None ).onUpdate( function (obj, elapsed) {
                    out.camera.setViewOffset(out.width, out.height, 1 - elapsed, 0, out.width, out.height);
                    
                    out.camera.lookAt( out.camera.target );
                    out.camera.updateProjectionMatrix();
                } )
                .onComplete( function () {
                    out.controls.autoRotate = false;
                    out.controls.enabled = true;

                    out.camera.lookAt( out.camera.target );

                    out.status = 0;

                    // console.log(out.camera.position);
     
                } )
                .start();


            }
        }

        this.options.canvas.addEventListener('click', cameraRotation, false );
        this.options.canvas.addEventListener('touchstart', cameraRotation, false );

    }

    setCamera() {

        this.camera = new THREE.PerspectiveCamera( 40, this.width / this.height, 1, 4400 );

        this.camera.zoom = 2;

        this.camera.position.setZ(931);
        this.camera.position.setY(733);
        this.camera.position.setX(-1186);
        
        this.camera.lookAt(0,0,0);

        if(this.options.DEBUG) {
            var buildingFolder = this.options.debugScene.addFolder('Camera');

            let params = {
                posX: this.camera.position.x,
                posY: this.camera.position.y,
                posZ: this.camera.position.z,
                zoom: this.camera.zoom,
                fullX: this.width,
                fullY: this.height,
                offsetX: 0,
                offsetY: 0,
                width: this.width,
                height: this.height
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

            buildingFolder.add(params, 'zoom', -1000,1000).onChange( (val) => {
                this.camera.zoom = val;
                this.camera.updateProjectionMatrix();
            })


            buildingFolder.add(params, 'fullX', 0, 3000).onChange( (val) => {
                params.fullX = val;
                this.camera.setViewOffset(val, params.fullY, params.offsetX, params.offsetY, params.width, params.height);
            })
            buildingFolder.add(params, 'fullY', 0, 3000).onChange( (val) => {
                params.fullY = val;
                this.camera.setViewOffset(params.fullX, val, params.offsetX, params.offsetY, params.width, params.height);
            })
            buildingFolder.add(params, 'offsetX', -1000,1000).onChange( (val) => {
                params.offsetX = val;
                this.camera.setViewOffset(params.fullX, params.fullY, val, params.offsetY, params.width, params.height);
            })
            buildingFolder.add(params, 'offsetY', -1000,1000).onChange( (val) => {
                params.offsetY = val;
                this.camera.setViewOffset(params.fullX, params.fullY, params.offsetX, val, params.width, params.height);
            })
            buildingFolder.add(params, 'width', 0, 3000).onChange( (val) => {
                params.width = val;
                this.camera.setViewOffset(params.fullX, params.fullY, params.offsetX, params.offsetY, params.width, params.height);
            })
            buildingFolder.add(params, 'height', 0, 3000).onChange( (val) => {
                params.height = val;
                this.camera.setViewOffset(params.fullX, params.fullY, params.offsetX, params.offsetY, params.width, params.height);
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
        this.controls.maxZoom = 300;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 10;
        this.controls.maxDistance = 3000;
        // this.controls.maxPolarAngle = Math.PI / 4; // 90 deg limit
        this.controls.maxPolarAngle = 0.37 * Math.PI;   // 66 deg limit

        // Controls limits
        let value = 300;
        var minPan = new THREE.Vector3( - value, -value, -value );
		var maxPan = new THREE.Vector3( value, value, value );
		var _v = new THREE.Vector3();
    
        let _controls = this.controls;
        let _camera = this.camera;
        this.controls.addEventListener("change", function() {
            _v.copy(_controls.target);
            _controls.target.clamp(minPan, maxPan);
            _v.sub(_controls.target);
            _camera.position.sub(_v);
        })

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
            this.renderer.shadowMap.enabled = false;
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

    // Update render if debug -> one; else another render
    render(){
        // this.options.zoomValue = this.controls.target.distanceTo( this.controls.object.position )
        
        TWEEN.update(); 
        
        this.controls.update();

        this.calculateIntersections();

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render.bind(this));
    }

    debugRender() {

        this.options.DEBUG ? this.stats.begin() : 0;

        // this.options.zoomValue = this.controls.target.distanceTo( this.controls.object.position )
        TWEEN.update(); 
        
        this.controls.update();

        this.calculateIntersections();

        this.renderer.render(this.scene, this.camera);

        if(this.options.DEBUG) {
            
            /* ------------------------------ */
            // var i	= 0;
            // this.msTexts[i++].textContent = "== Memory =====";
            // this.msTexts[i++].textContent = "Programs: "	+ this.renderer.info.memory.programs;
            // this.msTexts[i++].textContent = "Geometries: "+this.renderer.info.memory.geometries;
            // this.msTexts[i++].textContent = "Textures: "	+ this.renderer.info.memory.textures;
    
            // this.msTexts[i++].textContent = "== Render =====";
            // this.msTexts[i++].textContent = "Calls: "	+ this.renderer.info.render.calls;
            // this.msTexts[i++].textContent = "Vertices: "	+ this.renderer.info.render.vertices;
            // this.msTexts[i++].textContent = "Faces: "	+ this.renderer.info.render.faces;
            // this.msTexts[i++].textContent = "Points: "	+ this.renderer.info.render.points;
            // /* ------------------------------ */
            this.stats.end();
        }

        requestAnimationFrame(this.debugRender.bind(this));
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

            // console.log(intersects[0]);
            this.INTERSECTED = intersects[ 0 ].object;
            this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex();

            // ON HOVER!!
            this.options.selectedZoom = intersects[0].distance;
            // this.INTERSECTED.material.color.setHex( 0xff0000 );
            // this.INTERSECTED.material.color.setHex( 0x56e1fc );
            this.INTERSECTED.material.color.setHex( 0xbbf3fd );
            this.INTERSECTED.material.setValues({opacity: 1});
            
            if(this.status != 1){
                this.SELECTED = this.INTERSECTED;
            }
            else{
                this.SELECTED = null;
            }


            // console.log(object);
        
        } else if ( this.INTERSECTED ) {

                this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
                this.INTERSECTED.material.setValues({opacity: 0.75});

                // applying original colors
    
            // }
            
            this.INTERSECTED = null;
            this.SELECTED = null;
            this.options.canvas.classList.remove('has-pointer');
            
        }
    }

    getSelected(){
        return this.SELECTED ? this.SELECTED.name : null;
    }

    updateStatus(status){
        // this.world.updateBillboardsStatus(status);

        // todo update materials
    }

}

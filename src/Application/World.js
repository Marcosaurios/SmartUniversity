import * as THREE from "three";
import {GUI} from "three/examples/jsm/libs/dat.gui.module.js";

import Setup from "./setup.js";

import Building from "./Building.js";
// import materials from "./materials";

export default class World{

    constructor( _params ) {

        // 
        this.items = _params.items;
        console.log("WORLD HAS");
        console.log(this.items.textures);
        this.options = _params.options;

        this.container = new THREE.Object3D();

        this.interactiveObjects = [];

        this.setup = new Setup( this.items.textures );
        this.setupWorld();

        return this;
    }

    setupWorld() {

        if(this.options.debug) {
            this.options.gui = new GUI();
        }

        this.setLights();
        this.setObjects();
    }

    setObjects() {

        if(this.options.debug) {

            const params = {
                posX: this.items.aulario3.scene.position.x,
                posY: this.items.aulario3.scene.position.y,
                posZ: this.items.aulario3.scene.position.z

            }
            
            this.options.gui.add(params, 'posX', -100,100).onChange( (val) => {
                this.items.aulario3.scene.position.x = val;
            })
            this.options.gui.add(params, 'posY', -100,100).onChange( (val) => {
                this.items.aulario3.scene.position.y = val;
            })
            this.options.gui.add(params, 'posZ', -100,100).onChange( (val) => {
                this.items.aulario3.scene.position.z = val;
            })
            
        }


        for( const setupObject of this.setup) {

            const name = Object.keys(setupObject);

            if( this.items[ name ] != undefined ) {
                
                const building = new Building( { setup: setupObject[name], item: this.items[ name ], textures: this.items.textures } );

                // building.castShadow = true;
                // building.receiveShadow = true;

                this.interactiveObjects.push(building.wrapper.children[0]);

                
                this.container.add(building.wrapper);
                this.container.add(building.container);

            }
            else{
                console.warn("Object " + name + " not found or loaded in items");
            }
        }

        // Plane
        const plane = new THREE.Mesh( 
            new THREE.PlaneGeometry(50,50,10,10),
            new THREE.MeshPhongMaterial({
                color: 0x999999,
                depthWrite: false,
                side: THREE.DoubleSide
        }));

        plane.position.set(0,-1,0);
        plane.rotation.x = - Math.PI / 2;
    
        // plane.castShadow = true;
        plane.receiveShadow = true;
    
        this.container.add(plane);



    }

    setLights() {
          // Lights
          var light = new THREE.SpotLight( 0xFFFFFF, 1);
          light.power = 50;
          light.position.set(-100,100,0);
        //   light.decay = 2;
          light.distance = 150;
        //   light.penumbra = 0.4;
        //   light.angle = Math.PI/4;
            light.castShadow = true;
            // light.shadow.camera.top = 180;
            // light.shadow.camera.bottom = - 100;
            // light.shadow.camera.left = - 120;
            // light.shadow.camera.right = 120;
          

        //   var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
        //   directionalLight.position.set( -70, 100, 0 );
        // //   directionalLight.shadow.bias = 0.1;
        // //   directionalLight.lookAt(0,0,0);

        //   this.container.add(directionalLight);
          
          //Set up shadow properties for the light
        //   directionalLight.castShadow = true; // default false
        //   directionalLight.shadow.camera.near = 1; // default
        //   directionalLight.shadow.camera.far = 21; // default
        // this.items.camera.add(light);    
  
          var pointLightHelper = new THREE.SpotLightHelper( light, 1 );
          this.container.add( pointLightHelper );
          this.container.add(light); 
  
        //   var sun = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
        //   sun.position.set(0,200,0);
        //   this.container.add(sun);


    }
}
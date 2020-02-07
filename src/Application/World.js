import * as THREE from "three";
import {GUI} from "three/examples/jsm/libs/dat.gui.module.js";

import setup from "./setup.js";

import Building from "./Building.js";

export default class World{

    constructor( _params ) {

        // 
        this.items = _params.items;
        this.options = _params.options;

        this.container = new THREE.Object3D();

        this.setup = setup;
        this.setupWorld();

    }

    setupWorld() {

        if(this.options.debug) {
            this.options.gui = new GUI();
        }

        this.setObjects();
        this.setLights();
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
                
                const building = new Building( { setup: setupObject[name], item: this.items[ name ] } );

                building.castShadow = true;
                building.receiveShadow = true;

                this.container.add(building);

            }
            else{
                console.warn("Object " + name + " not found or loaded in items");
            }
        }

        // Plane
        const plane = new THREE.Mesh( 
            new THREE.BoxBufferGeometry(50,0.1,50,10,1,10),
            new THREE.MeshPhongMaterial({
                color: 0x00ff00
        }));
    
        plane.castShadow = true;
        plane.receiveShadow = true;
    
        this.container.add(plane);
    }

    setLights() {
          // Lights
          var light = new THREE.SpotLight( 0xFFFFFF, 1);
          light.power = 600;
          light.position.set(-7, 6, 0);
          light.decay = 2;
          light.distance = 10000;
          light.penumbra = 0.4;
          light.angle = Math.PI/4;
          
          //Set up shadow properties for the light
          light.castShadow = true; // default false
          light.shadow.mapSize.width = 2048; // default
          light.shadow.mapSize.height = 2048; // default
          light.shadow.camera.near = 1; // default
          light.shadow.camera.far = 21; // default
  
          var pointLightHelper = new THREE.SpotLightHelper( light, 1 );
          this.container.add( pointLightHelper );
          this.container.add(light); 
  
          // var sun = new THREE.light
    }
}
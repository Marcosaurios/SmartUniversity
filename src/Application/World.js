import * as THREE from "three";

import materials from "./Materials.js"; 

export default class World{

    constructor( _items ) {

        // Items
        this.items = _items;

        this.container = new THREE.Object3D();

        this.setup = {
            aulario3: {
                location: [0.0, 0.0, 0.0],
                material: materials.base,
                href: null,
            }
        }

        this.setupWorld();

    }

    setupWorld() {
        this.setObjects();
        this.setLights();
    }

    setObjects() {
        this.container.add(this.items.aulario9.scene);

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
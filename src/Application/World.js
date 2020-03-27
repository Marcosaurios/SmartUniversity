import * as THREE from "three";
import {GUI} from "three/examples/jsm/libs/dat.gui.module.js";

import Setup from "./setup.js";

import Building from "./Building.js";
// import loadMaterials from "./materials";

export default class World{

    constructor( _params ) {

        // 
        this.items = _params.items;
        // console.log("WORLD HAS");
        // console.log(this.items.textures);
        this.options = _params.options;

        this.container = new THREE.Object3D();

        this.interactiveObjects = [];

        this.setup = new Setup( this.items.textures );
        this.setupWorld();

        return this;
    }

    setupWorld() {

        if(this.options.DEBUG) {
            this.options.gui = new GUI();
        }

        this.setLights();
        this.setObjects();
    }

    setObjects() {

        for( const setupObject of this.setup) {

            const name = Object.keys(setupObject);

            if( this.items[ name ] != undefined ) {
                
                const building = new Building( { setup: setupObject[name], item: this.items[ name ], textures: this.items.textures } );

                // building.castShadow = true;
                // building.receiveShadow = true;

                console.log(building);

                this.interactiveObjects.push(building.container.children[0].children[0]);

                
                // this.container.add(building.wrapper);
                this.container.add(building.container);

            }
            else{
                console.warn("Object " + name + " not found or loaded in items");
            }
        }

        console.log(this.items.textures);
        // Plane
        const mat = new THREE.MeshBasicMaterial( {map: this.items.textures['UA'] ,opacity: 0.8, transparent: true });
        const plane = new THREE.Mesh( 
            new THREE.PlaneGeometry(1680,889,10,10), mat);

        plane.position.set(0,-1,0);
        plane.rotation.x = - Math.PI / 2;
    
        // plane.castShadow = true;
        // plane.receiveShadow = true;

       
        if(this.options.DEBUG) {
            var buildingFolder = this.options.gui.addFolder('Building');

            const params = {
                posX: this.items.aulario3.scene.position.x,
                posY: this.items.aulario3.scene.position.y,
                posZ: this.items.aulario3.scene.position.z

            }
            
            buildingFolder.add(params, 'posX', -1000,1000).onChange( (val) => {
                this.items.aulario3.scene.position.x = val;
            })
            buildingFolder.add(params, 'posY', -1000,1000).onChange( (val) => {
                this.items.aulario3.scene.position.y = val;
            })
            buildingFolder.add(params, 'posZ', -1000,1000).onChange( (val) => {
                this.items.aulario3.scene.position.z = val;
            })
            
        }
    
        this.container.add(plane);



    }

    setLights() {
        // Lights
        var light = new THREE.PointLight( 0xFFFFFF, 1, 100);
        light.position.set(0,0,0);
        light.intensity = 0.22;
        light.distance = 0;
        light.power = 3;
        light.decay = 0;

        if(this.options.DEBUG) {
            var lighting = this.options.gui.addFolder('Lighting');
            
            lighting.add(light, 'distance', 0, 200).onChange( function(val) {
                light.distance = val;
            });
            lighting.add(light, 'power', 0, 100).onChange( function(val) {
                light.power = val;
            });
            lighting.add(light, 'decay', 0, 50).onChange( function(val) {
                light.decay = val;
            });
            lighting.add(light, 'intensity', 0, 50).onChange( function(val) {
                light.intensity = val;
            });

        }
        
        var pointLightHelper = new THREE.PointLightHelper( light, 1 );
        this.items.camera.add(light);
        this.container.add(this.items.camera)

        //   this.container.add( pointLightHelper );
        //   this.container.add(light); 
  
        //   var sun = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
        //   sun.position.set(0,200,0);
        //   this.container.add(sun);


    }
}
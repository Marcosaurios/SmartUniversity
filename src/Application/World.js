import * as THREE from "three";
// import {GUI} from "three/examples/jsm/libs/dat.gui.module.js";

import Setup from "./setup.js";

import Building from "./Building.js";
// import loadMaterials from "./materials";

export default class World{

    constructor( _params ) {

        // 
        this.items = _params.items;
        this.items.billboards = [];
        this.options = _params.options;

        this.container = new THREE.Object3D();

        this.interactiveObjects = [];

        console.log("Items in APP:");
        console.log(this.items);

        this.setup = new Setup( this.options, this.items.textures );

        this.setupWorld();

        return this;
    }

    setupWorld() {

        this.setLights();
        this.setObjects();

    }

    setObjects() {

        for( const setupObject of this.setup) {

            const name = Object.keys(setupObject);

            if( this.items[ name ] != undefined ) {
                
                const building = new Building( { setup: setupObject[name], item: this.items[ name ], textures: this.items.textures } );
                
                console.log(name);
                
                building.container.name = name;
                // building.castShadow = true;
                // building.receiveShadow = true;

                // debugger;
                let buildingObj = building.container.children[0].children[0];
                let geo = buildingObj.geometry;
                
                // Checking geo information (AO, normals)
                //console.log(buildingObj.geometry.attributes);

                if(geo.attributes.uv){
                    geo.addAttribute('uv2', new THREE.BufferAttribute( geo.attributes.uv.array, 2 ));
                }
                
                if(building.interactive){
                    this.interactiveObjects.push(building.container.children[0].children[0]);
                    
                    // Create billboards
                    this.setBillboard(building.container);
                }
                //setupObject[name].action();

                
                // this.container.add(building.wrapper);
                this.container.add(building.container);



            }
            else{
                console.warn("Object " + name + " not found or loaded in items");
            }
        }

        // Plane
        const mat = new THREE.MeshBasicMaterial( {map: this.items.textures['UA'], opacity: 0.8, transparent: true });
        const plane = new THREE.Mesh( 
            new THREE.PlaneGeometry(1788, 1788, 1,1), mat);
        plane.name = "UA base plane";

        plane.position.set(0,-0.05,0);
        plane.rotation.x = - Math.PI / 2;
    
        // plane.castShadow = true;
        // plane.receiveShadow = true;

       
        if(this.options.DEBUG) {
            var buildingFolder = this.options.debugScene.addFolder('Buildings');

            const params = {
                posX: this.items.BUA.scene.position.x,
                posY: this.items.BUA.scene.position.y,
                posZ: this.items.BUA.scene.position.z,
            }
            
            buildingFolder.add(params, 'posX', -1000,1000).onChange( (val) => {
                this.items.BUA.scene.position.x = val;
            })
            buildingFolder.add(params, 'posY', -1000,1000).onChange( (val) => {
                this.items.BUA.scene.position.y = val;
            })
            buildingFolder.add(params, 'posZ', -1000,1000).onChange( (val) => {
                this.items.BUA.scene.position.z = val;
            })
            
        }
    
        this.container.add(plane);



    }

    setBillboard( container ) {
        // Billboard field size
        const squareSize = 700;

        // console.log(container);
        let pos = container.children[0].children[0].position;
                    
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.canvas.width = squareSize * 4;
        ctx.canvas.height = squareSize;

        ctx.fillStyle = 'blue';
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);

        const texture = new THREE.CanvasTexture(ctx.canvas);

        const labelMat = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
        
        })

        const label = new THREE.Sprite(labelMat);

        container.add(label);
        label.position.y = pos.y + 80;
        label.position.x = pos.x;
        label.position.z = pos.z;

        label.scale.x = ctx.canvas.width * 0.01;
        label.scale.y = ctx.canvas.height * 0.01;

        this.items.billboards.push(label);
    }

    setLights() {

        var ambient = new THREE.AmbientLight(0xffffff, 2.56);
        ambient.name = "Ambient light";
        ambient.position.set(388, 20, -429);
        this.container.add(ambient);

        var directional = new THREE.DirectionalLight(0x434343, 3);
        directional.name = "Directional light"
        directional.position.set(0, 1.46, 4);
        this.container.add(directional);
        // Lights
        // var light = new THREE.PointLight( 0xFFFFFF, 1, 100);
        // var light = new THREE.AmbientLight(0xffffff, 1); 
        // var light = new THREE.DirectionalLight(0xffffff, 3);
        // light.position.set(0,70,0);
        // light.target
        // light.distance = 0;
        // light.power = 3;
        // light.decay = 0;

        // test

        // var ambient = new THREE.AmbientLight(0x333333);
        // ambient.position.set( light.position );

        if(this.options.DEBUG) {
            var lighting = this.options.debugScene.addFolder('Lighting');
            
            // lighting.add(light, 'distance', 0, 200).onChange( function(val) {
            //     light.distance = val;
            // });
            // lighting.add(light, 'power', 0, 100).onChange( function(val) {
            //     light.power = val;
            // });
            // lighting.add(light, 'decay', 0, 50).onChange( function(val) {
            //     light.decay = val;
            // });
            // lighting.add(light, 'intensity', 0, 50).onChange( function(val) {
            //     light.intensity = val;
            // });

        }
        
        // var pointLightHelper = new THREE.PointLightHelper( light, 1 );
        // this.items.camera.add(light);
        this.container.add(this.items.camera)

        //   this.container.add( pointLightHelper );
        //   this.container.add(light); 
  
        //   var sun = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
        //   sun.position.set(0,200,0);
        //   this.container.add(sun);


    }
}
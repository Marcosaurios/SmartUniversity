import * as THREE from "three";


export default class Building {

    constructor( data ) {

        this.setup = data.setup;
        this.scene = data.item.scene;
        this.textures = data.textures;

        console.log("ME LLEGA ESTO A BUILDING");
            console.log(data);

        this.container = new THREE.Object3D();

        this.materials = [];

        this.loadTextures();
        this.loadMaterials();
        this.loadMesh();

        return this.container;
    }

    loadMaterials() {

        // 1 material per mesh children
        for( let [index, child] of this.scene.children.entries() ) {
            
            if(this.setup.materials[ child.name ]) {

                // Set material
                this.scene.children[ index ].material = this.setup.materials[ child.name ];
                
                // testing
                // const img = this.textures["moon"];
                // img.wrapS = img.wrapT = THREE.RepeatWrapping;
                // img.encoding = THREE.sRGBEncoding;
                // img.anisotropy = 16;

                // this.scene.children[ index ].material.map = img;
                // this.scene.children[ index ].material.bumpMap = img;
                    
            }
            else{
                console.warn("material for " + child.name + " doesn't exist.");
            }
        }

    }

    loadTextures() {

        this.setup.textures.forEach( (textureName) => {
            console.log(textureName);
        })
    }

    loadMesh() {
        
        // console.log(this.scene.children[1]);
        let second = this.scene.clone();
        second.translateX(20);

        this.container.add(second);
        
        this.container.add(this.scene);



        this.container.translateX( this.setup.location[0]);
        this.container.translateY( this.setup.location[1]);
        this.container.translateZ( this.setup.location[2]);

    }
}
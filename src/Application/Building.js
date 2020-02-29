import * as THREE from "three";


export default class Building {

    constructor( data ) {

        this.setup = data.setup;
        this.scene = data.item.scene;
        this.textures = data.textures;

        console.log("ME LLEGA ESTO A BUILDING");
            console.log(data);

        // 3D container: every mesh belongs to this building
        this.container = new THREE.Object3D();

        // 3D wrapper: intersection mesh wrapping the whole building an allowing it to be interactive
        this.wrapper = new THREE.Object3D();

        this.materials = [];

        this.loadTextures();
        this.loadMaterials();
        this.loadMesh();

        console.log('devuelvo');
        return this;
    }

    loadMaterials() {

        // 1 material per mesh children
        for( let [index, child] of this.scene.children.entries() ) {
            
            if(this.setup.materials[ child.name ] /*&& child.name != "Aulario3_wrapper"*/) {

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
        
        this.container.add(this.scene);

        this.container.translateX( this.setup.location[0]);
        this.container.translateY( this.setup.location[1]);
        this.container.translateZ( this.setup.location[2]);

        this.wrapper.name = this.container.children[0].children[0].name;
        this.wrapper.add( this.container.children[0].children[0] );
        // console.log('load mesh');

    }
}
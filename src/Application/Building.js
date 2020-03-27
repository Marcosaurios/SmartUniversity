import * as THREE from "three";


export default class Building {

    constructor( data ) {

        this.setup = data.setup;
        this.scene = data.item.scene;
        this.textures = data.textures;


        // 3D container: every mesh belongs to this building
        this.container = new THREE.Object3D();

        // 3D wrapper: intersection mesh wrapping the whole building and allowing it to be interactive
        // this.wrapper = new THREE.Object3D();

        this.materials = [];

        this.loadTextures();
        this.loadMaterials();
        this.loadMesh();

        return this;
    }

    loadMaterials() {

        // 1 material per mesh children
        for( let [index, child] of this.scene.children.entries() ) {
            
            if(this.setup.materials[ child.name ]) {

                // Set material
                this.scene.children[ index ].material = this.setup.materials[ child.name ];
                    
            }
            else{
                console.warn("material for " + child.name + " doesn't exist.");
            }
        }

    }

    loadTextures() {

        // this.setup.textures.forEach( (textureName) => {
        //     console.log(textureName);
        // })
    }

    loadMesh() {

        // Do custom things for each building (defined in setup) as cloning meshes already placed
        // let geometry = this.setup.action( this.scene );
        // this.container.add( geometry );

        // this.container.name = "AULARIO";
        this.container.add(this.scene);
        

        // Place container
        this.container.translateX( this.setup.location[0]);
        this.container.translateY( this.setup.location[1]);
        this.container.translateZ( this.setup.location[2]);
        this.container.rotateX( this.setup.rotation[0]);
        this.container.rotateY( this.setup.rotation[1]);
        this.container.rotateZ( this.setup.rotation[2]);
        // And its wrapper
        // this.wrapper.translateX( this.setup.location[0]);
        // this.wrapper.translateY( this.setup.location[1]);
        // this.wrapper.translateZ( this.setup.location[2]);
        // this.wrapper.rotateX( this.setup.rotation[0]);
        // this.wrapper.rotateY( this.setup.rotation[1]);
        // this.wrapper.rotateZ( this.setup.rotation[2]);

        // this.wrapper.name = this.container.children[0].children[0].name;
        // this.wrapper.add( this.container.children[0].children[0] );

    }
}
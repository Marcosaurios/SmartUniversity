import * as THREE from "three";


export default class Building {

    constructor( data ) {

        this.setup = data.setup;
        this.scene = data.item.scene;

        this.container = new THREE.Object3D();

        this.materials = [];

        this.loadMaterials();
        this.loadMesh();

        return this.container;
    }

    loadMaterials() {
        // 1 material per mesh children
        for( let [index, child] of this.scene.children.entries() ) {
            
            if(this.setup.materials[ child.name ]) {

                this.scene.children[ index ].material = this.setup.materials[ child.name ];
            }
            else{
                console.warn("material for " + child.name + " doesn't exist.");
            }
        }

    }

    loadMesh() {
        this.container.add(this.scene);

        this.container.translateX( this.setup.location[0]);
        this.container.translateY( this.setup.location[1]);
        this.container.translateZ( this.setup.location[2]);

    }
}
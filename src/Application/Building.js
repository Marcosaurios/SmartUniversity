import * as THREE from "three";

import {getIconAsImage} from './setup.js';


export default class Building {

    constructor( data ) {

        this.setup = data.setup;
        this.scene = data.item.scene;
        this.textures = data.textures;
        this.status = data.status;
        
        
        // 3D container: every mesh belongs to this building
        this.container = new THREE.Object3D();
        
        // 3D wrapper: intersection mesh wrapping the whole building and allowing it to be interactive
        // this.wrapper = new THREE.Object3D();

        this.interactive = this.setup.interactive;
        
        this.materials = [];
        
        this.loadMaterials();
        this.loadMesh();
        this.loadTextures();

        // this.setBillboard();

        return this;
    }

    deleteBillboard(){
        this.container.remove(this.billboard);
    }

    async setBillboard(status){

        if(status) this.status = status;

        const pos = this.mesh.position;
        
        // todo

        // Billboard field size
        const squareSize = 700;
        const OFFSET = 100;
        const value = OFFSET+squareSize+OFFSET;
                    
        // create billboard
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.canvas.width = (OFFSET+squareSize+OFFSET) * 4;
        ctx.canvas.height = squareSize+OFFSET*2;

        // fill
        ctx.fillStyle = 'rgba(64, 64, 64, 1)';
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);

        let pics = await Promise.all([
            getIconAsImage("ENERGY", this.status[0]),
            getIconAsImage("WEATHER", this.status[1]),
            getIconAsImage("WIFIDOWN", this.status[2]),
            getIconAsImage("WIFIUP", this.status[3])
        ])

        ctx.drawImage(pics[0], value*0+OFFSET, OFFSET, squareSize, squareSize);

        ctx.drawImage(pics[1], value*1+OFFSET, OFFSET, squareSize, squareSize);

        ctx.drawImage(pics[2], value*2+OFFSET, OFFSET, squareSize, squareSize);

        ctx.drawImage(pics[3], value*3+OFFSET, OFFSET, squareSize, squareSize);

        const texture = new THREE.CanvasTexture(ctx.canvas);

        const labelMat = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
        
        })

        const label = new THREE.Sprite(labelMat);

        this.container.add(label);
        label.position.y = pos.y + 80;
        label.position.x = pos.x;
        label.position.z = pos.z;

        label.scale.x = ctx.canvas.width * 0.01 * 2;
        label.scale.y = ctx.canvas.height * 0.01 * 2;
        // scale 1 min 2 max last value;

        label.name = "label_" + this.container.name[0];

        this.billboard = label;

        // this.items.billboards.push(label);

        // if(this.interactiveObjects.length == this.items.billboards.length ){
        //     this.emit('ready');
        // }
     
    }

    loadMaterials() {

        // console.log("entro en building");
        // 1 material per mesh children
        for( let [index, child] of this.scene.children.entries() ) {
            
            
            // console.log(child.name);
            // to set different material to each part of mesh (diferent mesh, same object)
            if(this.setup.materials[ child.name ]) {
                // console.log("aplicando hijos");
                
                // OPTION
                this.scene.children[ index ].material = this.setup.materials[ child.name ];
                this.material = this.scene.children[ index ].material;                 
            }
            else{
                console.warn("material for " + child.name + " doesn't exist. Assigned default");
            }
        }

    }

    loadTextures() {
        // console.log("extra uv?", this.mesh);
        if(this.mesh.geometry.attributes.uv){
            this.mesh.geometry.setAttribute('uv2', new THREE.BufferAttribute( this.mesh.geometry.attributes.uv.array, 2 ));
        }
    }

    loadMesh() {


        this.mesh = this.scene.children[0];

        // Do custom things for each building (defined in setup) as cloning meshes already placed
        // ----->>> cloning won't instanciate vertices, only duplicate position => and DUPLICATE DRAW CALLS
        // let geometry = this.setup.action( this.scene );
        // this.container.add( geometry );

        this.container.add(this.scene);
    }
}
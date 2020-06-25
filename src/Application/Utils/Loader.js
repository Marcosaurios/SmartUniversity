import * as THREE from "three";

import EventEmitter from "./EventEmitter";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export default class Loader extends EventEmitter{
    constructor() {

        super();

        this.loadingItems = 0;
        this.loadedItems = 0;

        this.items = {};
        this.items.textures = {};

        this.loaders = [];

        this.setLoaders();
    }

    setLoaders() {
        // Draco loader
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("assets/decoder/");
        const gltfLoader = new GLTFLoader().setDRACOLoader(dracoLoader);

        this.loaders.push({
            extensions: ['glb'],
            action: (_resource) => {

                gltfLoader.load(_resource.path,
                    (gltf) => {

                        this.fileFinished(_resource, gltf);

                    }, null,
                    (err) => {
                        console.warn(`Error loading ${_resource.name} `, err);
                    }
                )
            }
        })

        // Texture loader
        const textureLoader = new THREE.TextureLoader();

        this.loaders.push({
            extensions: ['png', 'jpg'],
            action: (_resource) => {
                textureLoader.load(_resource.path,
                    (image) => {
                        
                        this.fileFinished(_resource, image);

                    }, null,
                    (err) => {
                        console.warn(`Error loading ${_resource.name} `, err);
                    }
                    )
            }
        })

        this.destroyDraco = function(){ dracoLoader.dispose() };
    }

    loadResources( array ){


        for( const _resource of array ) {

            this.loadingItems++;

            const extensionMatch = _resource.path.match(/\.([a-z]+)$/)
            const _extension = extensionMatch[1];

            if(_extension !== 'undefined') {
                const loader = this.loaders.find( (loader) => loader.extensions.find( (extension) => extension === _extension) );

                if(loader) {
                    loader.action(_resource);
                }
                else {
                    console.log("Unknown extension loader");
                }
            }
        }

        
        return this.items;
    }
    
    fileFinished(item, data) {
        
        this.loadedItems++;

        // Loaded
        // console.log("Loaded: ", item.name);

        if(item.type == 'png' || item.type == 'jpg') {
            this.items.textures[item.name] = data;
        }
        else{
            this.items[item.name] = data;
        }

        this.emit('fileFinished', this.loadedItems/this.loadingItems*100);
        // this.emit('fileFinished', name);
        
        if( this.loadingItems == this.loadedItems) {
            
            // setTimeout(() => {
                // debugger
                this.emit('loadingFinished');
            // }, 4000);

            // Update materials with textures
            this.destroyDraco();
        }
    }
}
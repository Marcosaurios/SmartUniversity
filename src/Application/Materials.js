import * as THREE from "three";

export default function loadMaterials( textureItems ){

    /*
        Inits materials and possible textures
    */

    textureItems.UA.encoding = THREE.sRGBEncoding;
    //
        /*
    textureItems.Au3_AO.encoding = THREE.sRGBEncoding;
    textureItems.Au3_AO.flipY = false;

    textureItems.BUA_AO.encoding = THREE.sRGBEncoding;
    textureItems.BUA_AO.flipY = false;

    textureItems.Au2_AO.encoding = THREE.sRGBEncoding;
    textureItems.Au2_AO.flipY = false;
        */

    const materials = {
        window: new THREE.MeshPhongMaterial( {
            color: 0xD8E6FF,
            // toneMapped: true,
            transparent: true,
            opacity: 0.7
        }),
        aulario3: new THREE.MeshPhongMaterial( {
            // matcap: textureItems.concrete,
            color: 0xffffff,
            // aoMap: textureItems.Au3_AO
        }),
        aulario2: new THREE.MeshPhongMaterial( { 
            color: 0xffffff,
            // aoMap: textureItems.Au2_AO
        }),
        eps1: new THREE.MeshPhongMaterial( {
            color: 0xffffff,
            // aoMap: textureItems.BUA_AO,
        }),
        eps2: new THREE.MeshPhongMaterial( {
            color: 0xffffff,
            // aoMap: textureItems.BUA_AO,
        }),
        eps3: new THREE.MeshPhongMaterial( {
            color: 0xffffff,
            // aoMap: textureItems.BUA_AO,
        }),
        derecho: new THREE.MeshPhongMaterial( {
            color: 0xffffff,
            // aoMap: textureItems.BUA_AO,
        }),
        BUA: new THREE.MeshPhongMaterial( {
            color: 0xffffff,
            // aoMap: textureItems.BUA_AO,
        }),        
        gerbernacer: new THREE.MeshPhongMaterial( {
            color: 0xffffff,
            // aoMap: textureItems.BUA_AO,
        }),
        default: new THREE.MeshPhongMaterial({
            color: 0x929292,
            side: THREE.DoubleSide
        })
    }

    // Add AO to each material


    return materials;


}

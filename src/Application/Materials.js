import * as THREE from "three";

export default function loadMaterials( textureItems ){

    /*
        Inits materials and possible textures
    */

    textureItems.UA.encoding = THREE.sRGBEncoding;
    //
    textureItems.Au3_AO.encoding = THREE.sRGBEncoding;
    textureItems.Au3_AO.flipY = false;

    textureItems.BUA_AO.encoding = THREE.sRGBEncoding;
    textureItems.BUA_AO.flipY = false;

    textureItems.Au2_AO.encoding = THREE.sRGBEncoding;
    textureItems.Au2_AO.flipY = false;


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
            aoMap: textureItems.Au3_AO
        }),
        aulario2: new THREE.MeshLambertMaterial( { 
            color: 0xffffff,
            aoMap: textureItems.Au2_AO
        }),
        mat3: new THREE.MeshPhongMaterial( {
            color: 0xffffff,
            aoMap: textureItems.BUA_AO,
        })
    }

    // Add AO to each material


    return materials;


}

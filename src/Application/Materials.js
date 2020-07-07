import * as THREE from "three";

export default function loadMaterials( textureItems ){

    /*
        Inits materials and possible textures
    */

    textureItems.UA.encoding = THREE.sRGBEncoding;
    //
            
    textureItems.Au3_AO.encoding = THREE.sRGBEncoding;
    textureItems.Au3_AO.flipY = false;


    textureItems.Au2_AO.encoding = THREE.sRGBEncoding;
    textureItems.Au2_AO.flipY = false;


    textureItems.Eps1_AO.encoding = THREE.sRGBEncoding;
    textureItems.Eps1_AO.flipY = false;


    textureItems.Eps3_AO.encoding = THREE.sRGBEncoding;
    textureItems.Eps3_AO.flipY = false;


    textureItems.Eps3_AO.encoding = THREE.sRGBEncoding;
    textureItems.Eps3_AO.flipY = false;


    textureItems.Bua_AO.encoding = THREE.sRGBEncoding;
    textureItems.Bua_AO.flipY = false;


    textureItems.Bernacer_AO.encoding = THREE.sRGBEncoding;
    textureItems.Bernacer_AO.flipY = false;

            

    const materials = {
        window: new THREE.MeshStandardMaterial( {
            color: 0xD8E6FF,
            // toneMapped: true,
            transparent: true,
            opacity: 0.7
        }),
        aulario3: new THREE.MeshStandardMaterial( {
            // matcap: textureItems.concrete,
            color: 0xffffff,
            aoMap: textureItems.Au3_AO
        }),
        aulario2: new THREE.MeshStandardMaterial( { 
            color: 0xffffff,
            aoMap: textureItems.Au2_AO
        }),
        eps1: new THREE.MeshStandardMaterial( {
            color: 0xffffff,
            aoMap: textureItems.Eps1_AO,
        }),
        eps2: new THREE.MeshStandardMaterial( {
            color: 0xffffff,
            aoMap: textureItems.Eps3_AO,
        }),
        eps3: new THREE.MeshStandardMaterial( {
            color: 0xffffff,
            aoMap: textureItems.Eps3_AO,
        }),
        derecho: new THREE.MeshStandardMaterial( {
            color: 0xffffff,
            // aoMap: textureItems.BUA_AO,
        }),
        BUA: new THREE.MeshStandardMaterial( {
            color: 0xffffff,
            aoMap: textureItems.Bua_AO,
        }),        
        gerbernacer: new THREE.MeshStandardMaterial( {
            color: 0xffffff,
            aoMap: textureItems.Bernacer_AO,
        }),
        default: new THREE.MeshStandardMaterial({
            color: 0x929292,
            side: THREE.DoubleSide
        })
    }

    // Add AO to each material


    return materials;


}

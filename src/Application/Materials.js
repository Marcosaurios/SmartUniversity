import * as THREE from "three";

export default function loadMaterials( textureItems ){

    // todo
        /*
            Different material per mesh (different material variable, same values and properties)
        */

    const materials = {
        window: new THREE.MeshPhongMaterial( {
            color: 0xD8E6FF,
            // toneMapped: true,
            transparent: true,
            opacity: 0.7
        }),
        mat1: new THREE.MeshMatcapMaterial( {
            matcap: textureItems.concrete,
        }),
        mat2: new THREE.MeshMatcapMaterial( {
            matcap: textureItems.concrete,
        }),
        mat3: new THREE.MeshMatcapMaterial( {
            matcap: textureItems.concrete,
        })
    }

    return materials;


}

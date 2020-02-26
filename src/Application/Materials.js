import * as THREE from "three";


export default function(){
    
    const materials = {
        concrete: new THREE.MeshToonMaterial( {
                color: 0xd9d9d9,
                map: null,
                bumpMap: null,
                bumpScale: 1,
                specular: 0xffffff,
                shininess: 5,
    
                // envMap: ( index % 2 ) == 1 ? hdrCubeRenderTarget.texture : null
            }),
        glass: new THREE.MeshToonMaterial({
            color: 0x082554,
    
        }),
        iron: new THREE.MeshToonMaterial({
            color: 0x808080,
    
        }),
        pillar: new THREE.MeshToonMaterial( {
            color: 0x808080,
            // envMap: ( index % 2 ) == 1 ? hdrCubeRenderTarget.texture : null
        }),
        plastic: new THREE.MeshToonMaterial( {
            color: 0xff0000,
            // envMap: ( index % 2 ) == 1 ? hdrCubeRenderTarget.texture : null
        }),
        floor: null
    }


    return materials;
}

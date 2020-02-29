import * as THREE from "three";

export default function loadMaterials( textureItems ){

    const materials = {

        matcapOrange: new THREE.MeshMatcapMaterial( {

            // color: 0x00ff00,
            matcap: textureItems['matcapOrange']
        }),

        hoverInvisible: new THREE.MeshBasicMaterial({
            color: 0x2194ce,
            visible: false,
            transparent: true,
            opacity: 0.3
        }),

        // hoverInvisible: new THREE.MeshBasicMaterial({
        //     color: 0x2194ce,
        //     transparent: true,
        //     opacity: 0.4,
        // }),

        window: new THREE.MeshPhongMaterial( {
            color: 0xcce9f0,
            // toneMapped: true,
            blending: THREE.CustomBlending,
            blendSrc: THREE.OneMinusSrcColorFactor,
            transparent: true,
            opacity: 0.04
        }),

        wall: new THREE.MeshPhongMaterial( {
            color: 0xfc8803,
            toneMapped: true,
        }),

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

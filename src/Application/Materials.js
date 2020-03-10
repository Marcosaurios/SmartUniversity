import * as THREE from "three";

export default function loadMaterials( textureItems ){

    const materials = {
        hoverInvisible: new THREE.MeshBasicMaterial({
            color: 0x2194ce,
            visible: false,
            transparent: true,
            opacity: 0.3
        }),
        concrete: new THREE.MeshPhongMaterial( {
            color: 0xa1a1a1,
            toneMapped: true,
        }),
        window: new THREE.MeshPhongMaterial( {
            color: 0xD8E6FF,
            toneMapped: true,
            transparent: true,
            opacity: 0.7,
            roughness: 0.02,
            metalness: 0
        }),
        iron: new THREE.MeshPhongMaterial( {
            color: 0x585858,
            roughness: 0.6,
            metalness: 0.7
        }),

        vent: new THREE.MeshPhongMaterial( {
            color: 0xE7E7E7,
            toneMapped: true,
        }),
    }

    return materials;


}

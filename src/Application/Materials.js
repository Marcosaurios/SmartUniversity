import * as THREE from "three";

const materials = {
    concrete: new THREE.MeshPhysicalMaterial( {
            color: 0xd9d9d9,
            metalness: 0,
            roughness: 0.8,
            clearcoat: 0.1,
            clearcoatRoughness: 1.0,
            reflectivity: .5,
            // envMap: ( index % 2 ) == 1 ? hdrCubeRenderTarget.texture : null
        }),
    glass: new THREE.MeshPhysicalMaterial({
        color: 0x082554,
        metalness: 0,
        roughness: 0.2,
        clearcoat: 0.7,
        clearcoatRoughness: 0.4,
        reflectivity: .8,

    }),
    iron: new THREE.MeshPhysicalMaterial({
        color: 0x808080,
        metalness: 0,
        roughness: 0.2,
        clearcoat: 0.2,
        clearcoatRoughness: 0.4,
        reflectivity: .8,

    }),
    pillar: new THREE.MeshPhysicalMaterial( {
        color: 0x808080,
        metalness: 0,
        roughness: 1,
        clearcoat: 0.1,
        clearcoatRoughness: 1.0,
        reflectivity: 0.2,
        // envMap: ( index % 2 ) == 1 ? hdrCubeRenderTarget.texture : null
    }),
    plastic: new THREE.MeshPhysicalMaterial( {
        color: 0xff0000,
        metalness: 0,
        roughness: 0.5,
        clearcoat: 0.7,
        clearcoatRoughness: 1.0,
        reflectivity: .5,
        // envMap: ( index % 2 ) == 1 ? hdrCubeRenderTarget.texture : null
    }),
    floor: null
}

export default materials;

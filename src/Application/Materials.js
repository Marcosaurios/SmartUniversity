import * as THREE from "three";

const materials = {
    base: new THREE.MeshPhysicalMaterial( {
            color: 0xffff00,
            metalness: 0,
            roughness: 0.5,
            clearcoat: 0.7,
            clearcoatRoughness: 1.0,
            reflectivity: .5,
            // envMap: ( index % 2 ) == 1 ? hdrCubeRenderTarget.texture : null
        }),
    glass: null,
    floor: null
}

export default materials;

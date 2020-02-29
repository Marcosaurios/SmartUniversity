
import loadMaterials from "./materials.js";

export default function( textureItems ) {

    const materials = loadMaterials( textureItems );

    const setup = [
        { 
            aulario3: {
                location: [0.0, 0.0, 0.0],
                materials: {
                    Aulario3_wrapper: materials.hoverInvisible,
                    Au3_1_base: materials.matcapOrange,
                    Au3_1_window: materials.window,
                    Au3_1_pillars: materials.matcapOrange,
                    Au3_1_vent: materials.wall,
                    Au3_1_door: materials.matcapOrange,
                    Au3_1_shutters: materials.matcapOrange
                },
                textures: [ "moon" ],
                href: null,
            }
        }
    ];

    return setup;
}

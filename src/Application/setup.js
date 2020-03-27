
import loadMaterials from "./materials.js";

export default function( textureItems ) {

    const materials = loadMaterials( textureItems );

    const UA_rotation = [ 0.0, - 60 * Math.PI/180 -10 * Math.PI/180, 0.0];

    const setup = [
        { 
            aulario3: {
                location: [347, 0.0, 237],
                rotation: UA_rotation,
                materials: {
                    Aulario3: materials.window,
                    Aulario3_wrapper: materials.hoverInvisible,
                    Au3_1_base: materials.concrete,
                    Au3_1_window: materials.window,
                    Au3_1_pillars: materials.iron,
                    Au3_1_vent: materials.vent,
                    Au3_1_door: materials.iron,
                    Au3_1_shutters: materials.iron,
                    Au3_2_base: materials.concrete,
                    Au3_2_window: materials.window,
                    Au3_2_pillars: materials.iron,
                    Au3_2_vent: materials.vent,
                    Au3_2_door: materials.iron,
                    Au3_2_shutters: materials.iron,
                    Au3_3_base: materials.concrete,
                    Au3_3_window: materials.window,
                    Au3_3_pillars: materials.iron,
                    Au3_3_vent: materials.vent,
                    Au3_3_door: materials.iron,
                    Au3_3_shutters: materials.iron,
                    Au3_4_base: materials.concrete,
                    Au3_4_window: materials.window,
                    Au3_4_pillars: materials.iron,
                    Au3_4_vent: materials.vent,
                    Au3_4_door: materials.iron,
                    Au3_4_shutters: materials.iron,
                    Au3_5_base: materials.concrete,
                    Au3_5_window: materials.window,
                    Au3_5_pillars: materials.iron,
                    Au3_5_vent: materials.vent,
                    Au3_5_door: materials.iron,
                    Au3_5_shutters: materials.iron,
                    Au3_6_base: materials.concrete,
                    Au3_6_window: materials.window,
                    Au3_6_pillars: materials.iron,
                    Au3_6_vent: materials.vent,
                    Au3_6_door: materials.iron,
                    Au3_6_shutters: materials.iron,
                    Au3_7_base: materials.concrete,
                    Au3_7_window: materials.window,
                    Au3_7_pillars: materials.iron,
                    Au3_7_vent: materials.vent,
                    Au3_7_door: materials.iron,
                    Au3_7_shutters: materials.iron,
                    Au3_ent_ramp: materials.concrete,
                    Au3_ent_pillar: materials.iron,
                    Au3_ent_ground: materials.window
                },
                textures: [ "moon" ],
                href: null,
                action: function( mesh ) {
                    // // clone
                    // let secondMesh = mesh.clone();
                    // secondMesh.translateX(2);
                    // mesh.add(secondMesh);

                    // return mesh;
                }
            }
        }
    ];

    return setup;
}

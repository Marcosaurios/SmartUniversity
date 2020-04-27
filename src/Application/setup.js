
import loadMaterials from "./Materials.js";

export default function( textureItems ) {

    const materials = loadMaterials( textureItems );

    // ?? not needed by the moment const UA_rotation = [ 0.0, - 60 * Math.PI/180 -10 * Math.PI/180, 0.0];
    const UA_rotation = [0,0,0];

    const setup = [
        { 
            aulario3: {
                location: [326, .5, -357],
                materials: {
                    Aulario3: materials.mat1,
                },
                rotation: UA_rotation,          // ???
                textures: [ "moon" ],           // ???
                action: function( mesh ) {
                    // custom stuff for each mesh individually (?)
                }
            }
        },
        {
            aulario2: {
                location: [30, .5, -252],
                rotation: [0,0,0],
                materials: {
                    Aulario2: materials.mat2
                }
            }
        },
        {
            BUA: {
                location: [124, .5, -38],
                rotation: [0,0,0],
                materials: {
                    BUA: materials.mat3
                }
            }
        }
    ];

    return setup;
}

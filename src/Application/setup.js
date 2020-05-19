
import loadMaterials from "./Materials.js";

export default function( options, textureItems ) {
    
    // Load materials
    const materials = loadMaterials( textureItems );
    
    if(options.DEBUG){
        var mtlFolder = options.debugScene.addFolder('Materials');

        var params = {
            mtl_picked: materials.aulario3,
            color: 0xffffff,
            emmisive: 0xffffff,
            emmisiveIntensity: 0,
            ambient: 0xffffff,
            specular: 0xffffff
        }

        var mtls = {
            "aulario2": materials.aulario2,
            "aulario3": materials.aulario3,
            // "mat3": materials.mat3,
        }

        mtlFolder.add(params, 'mtl_picked', Object.keys(mtls))
        .onChange((val)=> {
            params.mtl_picked = mtls[val];
        })

        var dif = mtlFolder.addColor( params, 'color').onChange((color) => {
            params.mtl_picked.setValues({color});
            params.mtl_picked.needsUpdate = true;
        })
        dif.name("Color Diffuse");

        mtlFolder.addColor( params, 'emmisive').onChange((color) => {
            params.mtl_picked.setValues({color});
            params.mtl_picked.needsUpdate = true;
        })

        mtlFolder.add( params, 'emmisiveIntensity').onChange((val) => {
            params.mtl_picked.setValues({emmisiveIntensity: val});
            params.mtl_picked.needsUpdate = true;
        })

        mtlFolder.addColor(params, 'ambient').onChange((color) => {
            params.mtl_picked.ambient.setHex( color.replace('#','0x') );
            params.mtl_picked.needsUpdate = true;
        })


        mtlFolder.addColor(params, 'specular').onChange( () => {
            // console.log(params.color);
            params.mtl_picked.specular.setHex( params.color );
            THREE.Color
            params.mtl_picked.needsUpdate = true;
        })
    }

    // ?? not needed by the moment const UA_rotation = [ 0.0, - 60 * Math.PI/180 -10 * Math.PI/180, 0.0];
    const UA_rotation = [0,0,0];

    const setup = [
        { 
            aulario3: {
                // location: [326, .5, -357],
                location : [0,0,0],
                materials: {
                    Aulario3: materials.aulario3,
                },
                interactive: true,
                rotation: UA_rotation,          // ???
                textures: [ "moon" ],           // ???
                action: function( geometry ) {
                    // let uv = 
                    // custom stuff for each mesh individually (?)
                    console.log("Doing things only in setup for aulario3");
                    console.log(mesh);
                }
            }
        },
        {
            aulario2: {
                // location: [30, .5, -252],
                location: [0,0,0],
                rotation: [0,0,0],
                interactive: true,
                materials: {
                    Aulario2: materials.aulario2
                },
                action: function(mesh){}
            }
        },
        {
            BUA: {
                location: [0,0,0],
                rotation: [0,0,0],
                interactive: true,
                materials: {
                    BUA: materials.BUA
                },
                action: function(mesh){}
            }
        },
        {
            derecho: {
                location: [0,0,0],
                rotation: [0,0,0],
                materials: {
                    Derecho: materials.derecho
                },
                interactive: true,
            }
        },
        {
            eps1: {
                location: [0,0,0],
                rotation: [0,0,0],
                materials: {
                    EPS1: materials.eps1
                },
                interactive: true,
            }
        },
        {
            eps2: {
                location: [0,0,0],
                rotation: [0,0,0],
                materials: {
                    EPS2: materials.eps2
                },
                interactive: true,
            }
        },
        {
            eps3: {
                location: [0,0,0],
                rotation: [0,0,0],
                materials: {
                    EPS3: materials.eps3
                },
                interactive: true,
            }
        },
        {
            gerbernacer: {
                location: [0,0,0],
                rotation: [0,0,0],
                materials: {
                    GerBernacer: materials.gerbernacer
                },
                interactive: true,
            }
        },
        {
            resto: {
                location: [0,0,0],
                rotation: [0,0,0],
                materials: {
                    Rest: materials.default
                },
                interactive: false,
            }
        }
    ];

    return setup;
}

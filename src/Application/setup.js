
import loadMaterials from "./Materials.js";

// Icon functions to get path with status color applied already
const CONSTANTS = {
    WIFIUP(WIFIUP_COLOR) {
        return `<svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.3" d="M15.1 14.5C15.1 11.7 17.3 9.5 20.1 9.5C20.5 9.5 20.8 9.5 21.1 9.6L23.2 7C22.8 6.7 18.3 3 11.6 3C4.9 3 0.4 6.7 0 7L11.6 21.5L15.1 17.2V14.5Z" fill="${WIFIUP_COLOR}"/>
        <path d="M4.40001 12.5L11.6 21.5L15.1 17.1V14.5C15.1 13.2 15.6 12 16.5 11.1C15.2 10.5 13.6 10 11.6 10C7.50001 10 4.80001 12.2 4.40001 12.5Z" fill="${WIFIUP_COLOR}"/>
        <path d="M18.1 13.4937V21H19.1V13.4937H20.6L18.6 11L16.6 13.4937H18.1Z" fill="${WIFIUP_COLOR}"/>
        </svg>`},
    WIFIDOWN(WIFIDOWN_COLOR) {
        return `<svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.3" d="M15.3 14.5C15.3 11.7 17.5 9.5 20.3 9.5C20.7 9.5 21 9.5 21.3 9.6L23.4 7C23 6.7 18.5 3 11.8 3C5.1 3 0.599997 6.7 0.199997 7L11.8 21.5L15.3 17.2V14.5Z" fill="${WIFIDOWN_COLOR}"/>
        <path d="M4.60001 12.5L11.8 21.5L15.3 17.1V14.5C15.3 13.2 15.8 12 16.7 11.1C15.4 10.5 13.8 10 11.8 10C7.70001 10 5.00001 12.2 4.60001 12.5Z" fill="${WIFIDOWN_COLOR}"/>
        <path d="M19.3 18.5063V11H18.3V18.5063H16.8L18.8 21L20.8 18.5063H19.3Z" fill="${WIFIDOWN_COLOR}"/>
        </svg>`
    },
    WEATHER(WEATHER_COLOR) {
        return `
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
        <path d="M18.5437 9.62166C18.2218 7.99031 17.3435 6.52132 16.0589 5.46561C14.7742 4.40989 13.1628 3.83295 11.5 3.83333C10.1864 3.83369 8.89818 4.19499 7.77598 4.87777C6.65378 5.56055 5.74078 6.53856 5.13667 7.70499C3.72658 7.85541 2.42191 8.52194 1.47365 9.57635C0.525388 10.6308 0.000514198 11.9986 0 13.4167C0 16.5887 2.57792 19.1667 5.75 19.1667H18.2083C20.8533 19.1667 23 17.02 23 14.375C23 11.845 21.0354 9.79416 18.5437 9.62166ZM18.2083 17.25H5.75C3.63208 17.25 1.91667 15.5346 1.91667 13.4167C1.91667 11.2987 3.63208 9.58333 5.75 9.58333C7.86792 9.58333 9.58333 11.2987 9.58333 13.4167H11.5C11.5 10.7717 9.7175 8.54833 7.28333 7.8775C8.25125 6.59333 9.775 5.75 11.5 5.75C14.4037 5.75 16.7708 8.11708 16.7708 11.0208V11.5H18.2083C19.7896 11.5 21.0833 12.7937 21.0833 14.375C21.0833 15.9562 19.7896 17.25 18.2083 17.25Z" fill="${WEATHER_COLOR}"/>
        </g>
        <defs>
        <clipPath id="clip0">
        <rect width="23" height="23" fill="white"/>
        </clipPath>
        </defs>
        </svg>`
    },
    ENERGY(ENERGY_COLOR) { 
        return `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.0171 3.83334H13.4167V1.91667H9.58333V3.83334H7.98291C7.28333 3.83334 6.70833 4.40834 6.70833 5.10792V19.7992C6.70833 20.5083 7.28333 21.0833 7.98291 21.0833H15.0075C15.7167 21.0833 16.2917 20.5083 16.2917 19.8088V5.10792C16.2917 4.40834 15.7167 3.83334 15.0171 3.83334ZM10.5417 19.1667V13.8958H8.62499L12.4583 6.70834V11.9792H14.375L10.5417 19.1667Z" fill="${ENERGY_COLOR}"/>
        </svg>`
    }
}

export function loadSetup( options, textureItems ) {
    
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

export async function getIconAsImage(icon, status) {
    return new Promise((resolve, reject) => {
        if(!CONSTANTS[icon]){
            return reject();
            throw new Error("Wrong constant icon name");
        }
        else{
            let svg_path = CONSTANTS[icon](status);
    
            let img = new Image();
            let svg = new Blob([svg_path], {type: "image/svg+xml;charset=utf-8"});
            let url = URL.createObjectURL(svg);
        
            img.onload = function(){
                // ctx.drawImage(img, posX, 0);
                URL.revokeObjectURL(url);
                return resolve(img);
            }
            img.src = url;
            
            // console.log(func);
            
            // return img;
        }
        
    });
}

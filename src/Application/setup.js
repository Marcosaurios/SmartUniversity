
import Materials from "./materials.js";

export default function() {

    const materials = new Materials();

    const setup = [
        { 
            aulario3: {
                location: [0.0, 0.0, 0.0],
                materials: {
                    Concrete: materials.concrete,
                    Windows: materials.glass,
                    Iron: materials.iron,
                    Pillar: materials.pillar,
                    Vent: materials.plastic,
                    Shutters: materials.iron,
                },
                textures: [ "moon" ],
                href: null,
            }
        }
    ];

    return setup;
}


import materials from "./materials.js";

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
            href: null,
        }
    }
];

export default setup;
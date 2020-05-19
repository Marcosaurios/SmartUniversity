

export default class Resources {
    
    constructor() {
        this.resources = [
            // Models
            {name: "aulario3", path: "assets/models/simples/aulario3.glb", type: "draco"},
            {name: "aulario2", path: "assets/models/simples/aulario2.glb", type: "draco"},
            {name: "BUA", path: "assets/models/simples/bua.glb", type: "draco"},
            {name: "derecho", path: "assets/models/simples/derecho.glb", type: "draco"},
            {name: "eps1", path: "assets/models/simples/eps1.glb", type: "draco"},
            {name: "eps2", path: "assets/models/simples/eps2.glb", type: "draco"},
            {name: "eps3", path: "assets/models/simples/eps3.glb", type: "draco"},
            {name: "gerbernacer", path: "assets/models/simples/gerbernacer.glb", type: "draco"},
            {name: "resto", path: "assets/models/simples/resto.glb", type: "draco"},
            // Textures
            {name: "UA", path: "assets/sigua_original.jpg", type: "jpg"},
            // {name: "UA", path: "assets/siguawms.jpg", type: "jpg"},
            {name: "Au3_AO", path: "assets/Au3_AO.png", type: "png"},
            {name: "Au2_AO", path: "assets/Au2_AO.png", type: "png"},
            {name: "BUA_AO", path: "assets/BUA_AO.png", type: "png"},



            // {name: "concrete", path: "assets/concrete.png", type: "png"},
            // {name: "orange", path: "assets/orange.png", type: "png"},

        ]

        return this.resources;
    }
}
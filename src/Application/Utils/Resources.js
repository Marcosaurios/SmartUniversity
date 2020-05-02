

export default class Resources {
    
    constructor() {
        this.resources = [
            // Models
            {name: "aulario3", path: "assets/models/au3.glb", type: "draco"},
            {name: "aulario2", path: "assets/models/au2.glb", type: "draco"},
            {name: "BUA", path: "assets/models/bua.glb", type: "draco"},
            // Textures
            {name: "UA", path: "assets/sigua.png", type: "png"},
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
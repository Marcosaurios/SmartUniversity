<script context="module">
    /*
        Wrapper for fetching items from SmartUniversity API
    */
    // get electricity
    const apikey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJzb25hbCI6IjEwNzgyOSIsImlhdCI6MTU4NTMwMzA4MywiZXhwIjoxNjE2ODM5MDgzLCJpc3MiOiJTbWFydFVBIEFwcGxpY2F0aW9uIn0.Tou_1Wc3qz5PboTMdiDgAeRKcBH9TzX8hJh9gxfaJsY";
    
    // Interactive buildings
    // BUA, EPS1, EPS2, EPS3, AUL2, AUL3, DER, GERBER
    export const buildings = [
        "Biblioteca General", "Politécnica 1", "Politécnica 2", "Politécnica 3-Acometida 2", "Aulario 2"     , "Aulario 3"     , "Derecho"      , "German Bernacer"];

    const sondas = [ 
        ""                  ,""              , "SONDAUA06_EPS2", "SONDA04_EPSIII"          , "SONDAUA19_AUL2", "SONDAUA21_AUL3", "SONDAUA22_DER", "SONDAUA20_GERBER"];

    const inales = [
        "BIBLIOTECA GENERAL", "EPS I", "EPS II", "EPS III", "AULARIO II", "AULARIO III", "DERECHO", "GERMAN BERNACER"
    ];

    const ids = [ "0033", "0016", "0015", "0014", "0030", "0042" ,"0011", "0036"];

    const capacity = [];
    for(let i=0;i<ids.length;i++){
        let cap = Math.random() * (1250 - 600) + 600;
        capacity.push( cap.toFixed(0) );
    }

    const students = [];
    for(let i=0;i<ids.length;i++){
        let res = Math.random() * (1400 - 30) + 30;
        students.push( res.toFixed(0) );
    }

    const classrooms = [];
    for(let i=0;i<ids.length;i++){
        let res = Math.random() * (110 - 30) + 30;
        classrooms.push( res.toFixed(0) );
    }

    const isClassroom = [true, true, false, false, true, true, true, true];
    const isOffice = [true, true, true, true, false, false, false, true];

    // let CONSTANTS = new Map();
    // for(let i=0; i<capacity.length; i++){
    //    CONSTANTS.set( ids[i], capacity[i]);
    // }

    /*
    [
        {}._id.nombre = inal
        {}.conexiones
        {}.umbralAlarma
    ]
    AULARIO III
    AULARIO II
    DERECHO
    EPS I
    EPS II
    EPS III
    BIBLIOTECA GENERAL
    GERMAN BERNACER
    */

    // INIT Buildings data
    let data = {};
    resetData();

    function resetData(){
        data = {};
        for(let i=0; i<buildings.length;i++){
            data[buildings[i]] = {};
            data[buildings[i]].name = buildings[i];
            data[buildings[i]].energia_activa = 0;
            data[buildings[i]].wifi_down = 0;
            data[buildings[i]].wifi_up = 0;
            data[buildings[i]].temperature = 0;
            //
            data[buildings[i]].wifi = true;
            data[buildings[i]].lights = false;
            data[buildings[i]].doors = true;
            //
            data[buildings[i]].conexiones = 0;
            data[buildings[i]].maxConexiones = 0;
            data[buildings[i]]["superficie"] = 0;
            data[buildings[i]]["estancias"] = 0;
            data[buildings[i]]["ocupantes"] = 0;
            data[buildings[i]]["estudiantes"] = 0;


            data[buildings[i]]["alarms"] = [];
        }
    }

    // Error template --> returns always buildings with ENERGIA_ACTIVA and ALIAS values

    async function getElectricity() {
        try{
            let response = await fetch( `https://smartua.dtic.ua.es:8080/apikey/${apikey}/e-meter/floor/all/last-date/period/15-m`, 
                {
                    method: 'GET',
                    mode: 'cors'
                });
            
            let parsed = await response.json();

            parsed.filter(x => {
                
                let exists = buildings.indexOf(x._id.alias);
                if(exists!=-1) {
                    let num = x.ENERGIA_ACTIVA;
                    data[buildings[exists]].energia_activa = num.toFixed(1);
                    // let status = (x.ENERGIA_ACTIVA )
                    // data[buildings[exists]].energia_status = status
                }
            })
            
            return true;
        
        }
        catch(e){
            console.error(e);

            // Clean energia_activa field in data{}
            for(let i=0; i<buildings.length; i++){
                data[buildings[i]].energia_activa = 0;
            }

            return false;
        }
    }

    async function getWifi() {
        try{
            // Wifi Down
            let response = await fetch(`https://smartua.dtic.ua.es:8080/apikey/${apikey}/sensor/model/WIFI_DOWN/structure/mapa_basico/date/2019-10-26-11-00-00/period/15`,
            {
                method: 'GET',
                mode: 'cors'
            });
            let parsed = await response.json();

            parsed.filter( (x) => {
                let exist = sondas.indexOf(x._id.alias);

                if(exist != -1) {
                    let num = x.value;
                    data[buildings[exist]]["wifi_down"] = num.toFixed(1);
                }
                
            });

            // Wifi Up

            response = await fetch(`https://smartua.dtic.ua.es:8080/apikey/${apikey}/sensor/model/WIFI_UP/structure/mapa_basico/date/2019-10-26-11-00-00/period/15`,
            {
                method: 'GET',
                mode: 'cors'
            });
            parsed = await response.json();

            parsed.filter( (x) => {
                // console.log(x._id.alias);
                let exist = sondas.indexOf(x._id.alias);

                if(exist != -1) {
                    
                    data[buildings[exist]]["wifi_up"] = x.value.toFixed(1);
                }
                
            });

            // console.log(parsed);

            return true;

        }
        catch(e){
            console.error(e);

            // Clean wifi field in data{}
            for(let i=0; i<buildings.length; i++){
                data[buildings[i]].wifi_down = 0;
                data[buildings[i]].wifi_up = 0;
            }
            return false;
        }
    }

    async function getTemperature() {
        try{
            let response = await fetch(`https://smartua.dtic.ua.es:8080/apikey/${apikey}/sensor/model/TEMPERATURA/structure/mapa_basico/date/2019-10-26-11-00-00/period/15`,
            {
                method: 'GET',
                mode: 'cors'
            });
            let parsed = await response.json();

            parsed.filter( (x) => {
                let exist = sondas.indexOf(x._id.alias);

                if(exist != -1) {
                    data[buildings[exist]]["temperature"] = x.value.toFixed(0);
                }
            });

            //

            // debugger;

            return true;

        }
        catch(e){
            console.error(e);

            // Clean temperature field in data{}
            for(let i=0; i<buildings.length; i++){
                data[buildings[i]].temperature = 0;
            }
            return false;
        }
    }

    async function getDescription() {
        try{
            let response = await fetch('/assets/descriptions.json',
            {
                method: 'GET',
                mode: 'cors'
            });

            let parsed = await response.json();
            
            for(let i=0; i<parsed.length; i++){
                let exist = buildings.indexOf(parsed[i].name);

                data[buildings[exist]].description = {
                    eng: parsed[i].eng,
                    esp: parsed[i].esp
                };
            }
            // console.log(data);
        }
        catch(e){

        }
    }

    async function getConexiones() {
        try{
            let response = await fetch(`https://smartua.dtic.ua.es:8080/apikey/${apikey}/inal/floor/all/last-date`,
            {
                method: 'GET',
                mode: 'cors'
            });
            let parsed = await response.json();

            parsed.filter( (x) => {
                let exist = inales.indexOf(x.edificio);

                if(exist != -1) {
                    data[buildings[exist]]["conexiones"] += x.conexiones;
                    data[buildings[exist]]["maxConexiones"] += x.umbralAlarma;
                }
            });

            //

            // debugger;

            return true;

        }
        catch(e){
            console.error(e);

            // Clean temperature field in data{}
            for(let i=0; i<buildings.length; i++){
                data[buildings[i]].conexiones = null;
                data[buildings[i]].maxConexiones = null;
            }
            return false;
        }
    }

    async function getEstancias(){
        try{
        
            let response = await fetch(`http://www.sigua.ua.es/api/agregados/seo/edificio/all/items`,
            {
                method: 'GET',
                mode: 'cors'
            });
            let parsed = await response.json();

            for(let i=0;i<parsed.length; i++){
                    // debugger
                    // console.log(parsed[i]);

                let element = parsed[i];

                let id_building = element.id.substring(
                    element.id.lastIndexOf("{")+1,
                    element.id.lastIndexOf(',')
                )
                // console.log(id_building);

                let exist = ids.indexOf(id_building);

                if(exist != -1){
                    data[buildings[exist]].superficie = parseFloat(element.superficie).toFixed(2);
                    data[buildings[exist]].estancias = element.estancias;
                    data[buildings[exist]].ocupantes = element.ocupantes;

                }

                
            }

            return true;
        }
        catch(e){
            console.error(e);
            
        }
    }

    function normalize(value, min, max) {
        let res = (value - min) / (max - min);
        let out = res.toFixed(2);
        return out;
    }

    export async function getData(){
        resetData();

        await Promise.all([
            getElectricity(),
            getWifi(),
            getTemperature(),
            getConexiones(),
            getEstancias()
            ]);

        let index = 0;
        for (var building in data) {
            if (data.hasOwnProperty(building)) {

                let wifid = data[building].wifi_down ? data[building].wifi_down : 0;
                let wifiu = data[building].wifi_up ? data[building].wifi_up : 0;
                let energia = data[building].energia_activa ? data[building].energia_activa : 0;
                let temp = data[building].temperature ? data[building].temperature : 0;
                let conex = data[building].conexiones ? data[building].conexiones : 0;
                let maxConex = data[building].maxConexiones ? data[building].maxConexiones : 0;
                let estancias = data[building].estancias ? data[building].estancias : 0;
                let ocupantes = data[building].ocupantes ? data[building].ocupantes : 0;

                // TODO normalize values 

                data[building].wifi_down_status = Math.min( normalize(wifid, 0, 5), 1);
                data[building].wifi_up_status = Math.min( normalize(wifiu, 0, 5), 1);
                data[building].energia_activa_status = Math.min( normalize(energia, 0, 20), 1);
                data[building].temperature_status = Math.min( normalize(temp, 0, 35), 1);

                data[building].conexiones_status = Math.min( normalize(conex, 0, maxConex), 1);

                // SUM
                data[building].status = data[building].wifi_down_status*0.25 + data[building].wifi_up_status*0.25 + data[building].energia_activa_status*0.25 + data[building].temperature_status*0.25;
                data[building].status = data[building].status.toFixed(2);
                
                // TODO CRAWL VALUES?
                // add constants
                    data[building].aforo = capacity[ index ];
                    data[building].estudiantes = students[ index ];
                    data[building].estudiantes_status = Math.min( normalize(data[building].estudiantes, 0, data[building].aforo), 1)

                    // estancia
                    data[building].despachos_status = Math.min( normalize(ocupantes, 0, estancias), 1);
                    
                    data[building].isOffice = isOffice[index];
                    data[building].isClassroom = isClassroom[index];

                    data[building].classroom = classrooms[index];
                    data[building].classroom_status = Math.min( normalize(classrooms[index], 0, data[building].aforo) );
            }
            index++;

        }

        console.log(data);
        
        return data;
    }

</script>

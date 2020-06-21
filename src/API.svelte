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

    const STATUS_GREEN = '#6DF099';
    const STATUS_YELLOW = '#EFEE6B';
    const STATUS_RED = '#EF6B6B';

    let WIFI_TOP = 4.5;
    let WIFI_MED = 2;
    let ENERGIA_TOP = 8;
    let ENERGIA_MED = 4; // kw
    let TEMP_TOP = 30; //ºC
    let TEMP_MED = 10;
    let TEMP_BOT = 0;

    // INIT Buildings data
    let data = {};
    for(let i=0; i<buildings.length;i++){
        data[buildings[i]] = {};
        data[buildings[i]].name = buildings[i];
        data[buildings[i]].energia_activa = 0;
        data[buildings[i]].wifi_down = 0;
        data[buildings[i]].wifi_up = 0;
        data[buildings[i]].temperature = 0;
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
                    data[buildings[exists]].energia_activa = x.ENERGIA_ACTIVA;
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
                    data[buildings[exist]]["wifi_down"] = x.value;
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
                    data[buildings[exist]]["wifi_up"] = x.value;
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
                    data[buildings[exist]]["temperature"] = x.value ? x.value : 0;
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

    function normalize(value, min, max) {
        return (value - min) / (max - min);
    }

    export async function getData(){
        await Promise.all([getElectricity(), getWifi(), getTemperature(), getDescription()]);

        for (var building in data) {
            if (data.hasOwnProperty(building)) {

                let wifid = data[building].wifi_down ? data[building].wifi_down : 0;
                let wifiu = data[building].wifi_up ? data[building].wifi_up : 0;
                let energia = data[building].energia_activa ? data[building].energia_activa : 0;
                let temp = data[building].temperature ? data[building].temperature : 0;

                // TODO normalize values 

                data[building].wifi_down_status = normalize(wifid, 0, 5);
                data[building].wifi_up_status = normalize(wifiu, 0, 5);
                data[building].energia_activa_status = normalize(energia, 0, 20);
                data[building].temperature_status = normalize(temp, 0, 35);

                data[building].status = data[building].wifi_down_status*0.25 + data[building].wifi_up_status*0.25 + data[building].energia_activa_status*0.25 + data[building].temperature_status*0.25;
                
            }
        }
        
        return data;
    }

</script>

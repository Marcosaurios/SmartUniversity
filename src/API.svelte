<script context="module">
    /*
        Wrapper for fetching items from SmartUniversity API
    */
    // get electricity
    const apikey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJzb25hbCI6IjEwNzgyOSIsImlhdCI6MTU4NTMwMzA4MywiZXhwIjoxNjE2ODM5MDgzLCJpc3MiOiJTbWFydFVBIEFwcGxpY2F0aW9uIn0.Tou_1Wc3qz5PboTMdiDgAeRKcBH9TzX8hJh9gxfaJsY";
    
    // Interactive buildings
    // BUA, EPS1, EPS2, EPS3, AUL2, AUL3, DER, GERBER
    export const buildings = [
        "Biblioteca General", "Politécnica 1", "Politécnica 2", "Politécnica 3-Acometida 2", "Aulario 2", "Aulario 3", "Derecho", "German Bernacer"];

    const sondas = [ 
        "", "", "SONDAUA06_EPS2", "SONDA04_EPSIII", "SONDAUA19_AUL2", "SONDAUA21_AUL3", "SONDAUA22_DER", "SONDAUA20_GERBER"];

    // Buildings data
    let data = {};
    for(let i=0; i<buildings.length;i++){
        data[buildings[i]] = {};
        data[buildings[i]].name = buildings[i];
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
                    data[buildings[exist]]["temperature"] = x.value;
                }
                
            });
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


    export async function getData(){
        await Promise.all([getElectricity(), getWifi(), getTemperature(), getDescription()]);

        // for (var property in data) {
        //     if (data.hasOwnProperty(property)) {
        //         // Do things here
        //         data[property].wifi_down ? data[property].wifi_down += " mb/s" : data[property].wifi_down = "Offline";
        //         data[property].wifi_up ? data[property].wifi_up += " mb/s" : data[property].wifi_up = "Offline";
        //         data[property].energia_activa ? data[property].energia_activa += " Kw" : data[property].energia_activa = "Offline";
        //         data[property].temperature ? data[property].temperature += " ºC" : data[property].temperature = "Offline";
        //         // console.log(property);
        //     }
        // }
        
        return data;
    }

</script>

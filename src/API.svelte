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

    const sigua_estancias = [{"id":"{0000,\"CAMPUS (ZONAS COMUNES)\"}","superficie":"647196.310401077","estancias":405,"ocupantes":0},{"id":"{0001,\"ZONA DEPORTIVA\"}","superficie":"37930.4272692054","estancias":216,"ocupantes":28},{"id":"{0002,\"AREA DE EXPERIMENTACION INDUSTRIAL Y DE SERVICIOS\"}","superficie":"3731.99261983554","estancias":93,"ocupantes":4},{"id":"{0003,\"FACULTAD DE CIENCIAS III\"}","superficie":"1419.90363244136","estancias":88,"ocupantes":37},{"id":"{0004,\"FACULTAD DE CIENCIAS IV\"}","superficie":"1886.42035448293","estancias":46,"ocupantes":24},{"id":"{0005,\"SERVICIO DE INFORM\u00c1TICA\"}","superficie":"1108.71355758132","estancias":71,"ocupantes":87},{"id":"{0006,\"EDIFICIO POLIVALENTE I\"}","superficie":"1428.5734621125","estancias":95,"ocupantes":11},{"id":"{0007,\"FACULTAD DE CIENCIAS II\"}","superficie":"13965.3928978407","estancias":472,"ocupantes":236},{"id":"{0008,\"FACULTAD DE CIENCIAS I\"}","superficie":"6072.39601583293","estancias":240,"ocupantes":126},{"id":"{0009,\"PABELLON DE BIOTECNOLOGIA\"}","superficie":"1402.71456219367","estancias":61,"ocupantes":38},{"id":"{0010,\"FACULTAD DE CIENCIAS V\"}","superficie":"1432.99851014463","estancias":62,"ocupantes":32},{"id":"{0011,\"FACULTAD DE DERECHO\"}","superficie":"19765.2187703174","estancias":462,"ocupantes":332},{"id":"{0012,\"PABELLON UNIVERSITARIO 12\"}","superficie":"1270.35773326993","estancias":66,"ocupantes":47},{"id":"{0013,\"PABELLON UNIVERSITARIO 13\"}","superficie":"1385.12228201009","estancias":57,"ocupantes":39},{"id":"{0014,\"ESCUELA POLITECNICA SUPERIOR III\"}","superficie":"3179.1240626467","estancias":106,"ocupantes":87},{"id":"{0015,\"ESCUELA POLITECNICA SUPERIOR II\"}","superficie":"4744.5897983244","estancias":246,"ocupantes":208},{"id":"{0016,\"ESCUELA POLITECNICA SUPERIOR I\"}","superficie":"3799.43351188356","estancias":112,"ocupantes":38},{"id":"{0017,\"CLUB SOCIAL I\"}","superficie":"2105.27920803227","estancias":49,"ocupantes":0},{"id":"{0018,\"FACULTAD DE FILOSOFIA Y LETRAS III\"}","superficie":"5169.32478904425","estancias":169,"ocupantes":110},{"id":"{0019,\"FACULTAD DE FILOSOFIA Y LETRAS II (GEOGRAF\u00cdA E HISTORIA)\"}","superficie":"5948.56784915844","estancias":163,"ocupantes":136},{"id":"{0020,\"FACULTAD DE FILOSOFIA Y LETRAS I (FILOLOG\u00cdA)\"}","superficie":"4881.66002043594","estancias":183,"ocupantes":175},{"id":"{0021,\"PABELLON DE ALUMNADO\"}","superficie":"770.389573147079","estancias":37,"ocupantes":28},{"id":"{0022,\"EDIFICIO POLIVALENTE II\"}","superficie":"596.369451375976","estancias":24,"ocupantes":0},{"id":"{0023,\"PABELLON JORGE JUAN\"}","superficie":"772.167180305998","estancias":30,"ocupantes":28},{"id":"{0024,\"EDIFICIO POLIVALENTE III\"}","superficie":"2604.11435002876","estancias":105,"ocupantes":107},{"id":"{0025,\"AULARIO I\"}","superficie":"22370.9165986381","estancias":328,"ocupantes":43},{"id":"{0026,\"FACULTAD DE CIENCIAS DE LA SALUD\"}","superficie":"2273.13351429537","estancias":92,"ocupantes":66},{"id":"{0027,\"TORRE DE CONTROL\"}","superficie":"1009.94324166881","estancias":59,"ocupantes":67},{"id":"{0028,\"RECTORADO Y SERVICIOS GENERALES\"}","superficie":"11130.8782502434","estancias":173,"ocupantes":199},{"id":"{0029,\"COLEGIO MAYOR UNIVERSITARIO\"}","superficie":"4960.44397323617","estancias":477,"ocupantes":69},{"id":"{0030,\"AULARIO II\"}","superficie":"15631.56009005","estancias":195,"ocupantes":42},{"id":"{0031,\"FACULTAD DE CIENCIAS ECONOMICAS Y EMPRESARIALES\"}","superficie":"9349.94004976474","estancias":330,"ocupantes":201},{"id":"{0032,\"CLUB SOCIAL II\"}","superficie":"3653.95310510725","estancias":64,"ocupantes":0},{"id":"{0033,\"BIBLIOTECA GENERAL\"}","superficie":"18107.4130137691","estancias":244,"ocupantes":130},{"id":"{0034,\"EDIFICIO DE CIENCIAS SOCIALES\"}","superficie":"8269.23770223348","estancias":305,"ocupantes":382},{"id":"{0035,\"CENTRO COMERCIAL\"}","superficie":"5179.65887205342","estancias":55,"ocupantes":6},{"id":"{0036,\"EDIFICIO GERMAN BERNACER\"}","superficie":"6976.25718489407","estancias":177,"ocupantes":145},{"id":"{0037,\"INSTITUTOS UNIVERSITARIOS\"}","superficie":"4508.24509685367","estancias":170,"ocupantes":74},{"id":"{0038,\"FACULTAD DE CIENCIAS: EDIFICIO DE \u00d3PTICA Y OPTOMETR\u00cdA\"}","superficie":"8099.98029343896","estancias":191,"ocupantes":47},{"id":"{0039,\"ESCUELA POLITECNICA SUPERIOR IV\"}","superficie":"12077.9110230379","estancias":323,"ocupantes":190},{"id":"{0040,\"MUSEO DE LA UNIVERSIDAD DE ALICANTE (MUA)\"}","superficie":"10993.4266207617","estancias":53,"ocupantes":11},{"id":"{0041,\"FACULTAD DE CIENCIAS VI : CENTRO DE TECNOLOG\u00cdA QU\u00cdMICA (CTQ)\"}","superficie":"7471.00779358049","estancias":211,"ocupantes":18},{"id":"{0042,\"AULARIO III\"}","superficie":"4248.76805027314","estancias":72,"ocupantes":13},{"id":"{0043,\"CLUB SOCIAL III\"}","superficie":"1820.98410047579","estancias":25,"ocupantes":0},{"id":"{0044,\"CAFETER\u00cdA FACULTAD DE CIENCIAS\"}","superficie":"279.08923991624","estancias":16,"ocupantes":0},{"id":"{0045,\"CAFETER\u00cdA ESCUELA POLIT\u00c9CNICA SUPERIOR\"}","superficie":"456.478377678227","estancias":13,"ocupantes":0},{"id":"{0046,\"EDIFICIO CENTRO DE CONTROL DE SEGURIDAD\"}","superficie":"202.994699996832","estancias":9,"ocupantes":1},{"id":"{0101,\"SEDE UNIVERSITARIA CIUDAD DE ALICANTE\"}","superficie":"2322.83794027472","estancias":83,"ocupantes":12},{"id":"{0103,\"EDIFICIO SAN FERNANDO\"}","superficie":"4721.98225480024","estancias":207,"ocupantes":2},{"id":"{0200,\"AMPLIACION CAMPUS (ZONAS COMUNES)\"}","superficie":"865973.135861985","estancias":138,"ocupantes":0},{"id":"{0201,ANIMALARIO}","superficie":"332.036189493979","estancias":30,"ocupantes":4},{"id":"{0202,PETROLOGIA}","superficie":"869.538938709753","estancias":25,"ocupantes":1},{"id":"{0203,\"SERVICIOS T\u00c9CNICOS DE INVESTIGACI\u00d3N\"}","superficie":"8990.70623425806","estancias":228,"ocupantes":44},{"id":"{0204,\"NUEVOS INSTITUTOS\"}","superficie":"22884.7446161741","estancias":581,"ocupantes":92},{"id":"{0205,\"NAVES DE TALLERES Y APOYO AL PARQUE CIENT\u00cdFICO\"}","superficie":"1743.63288868095","estancias":31,"ocupantes":4},{"id":"{0206,\"CENTRO INCUBADOR DE EMPRESAS\"}","superficie":"1998.55696755286","estancias":53,"ocupantes":0},{"id":"{0207,\"INVERNADERO 1\"}","superficie":"1194.05366959215","estancias":17,"ocupantes":0},{"id":"{0208,\"INVERNADERO 2\"}","superficie":"2441.51141705821","estancias":34,"ocupantes":2},{"id":"{0209,\"ERAS EXPERIMENTALES\"}","superficie":"851.8003554548","estancias":13,"ocupantes":0},{"id":"{0301,\"SEDE UNIVERSITARIA DE ORIHUELA\"}","superficie":"124.84789288192","estancias":5,"ocupantes":1},{"id":"{0401,\"SEDE UNIVERSITARIA DE LA MARINA\"}","superficie":"1860.61848233146","estancias":147,"ocupantes":1},{"id":"{0501,\"SEDE UNIVERSITARIA DE COCENTAINA\"}","superficie":"1394.42277604747","estancias":1,"ocupantes":1},{"id":"{0601,\"SEDE UNIVERSITARIA DE LA HABANA\"}","superficie":"318.376760013751","estancias":1,"ocupantes":0},{"id":"{0702,\"FACULTAD DE EDUCACI\u00d3N\"}","superficie":"14136.6082817304","estancias":366,"ocupantes":320},{"id":"{0801,\"SEDE UNIVERSITARIA DE ELDA\"}","superficie":"1112.68124881687","estancias":1,"ocupantes":0},{"id":"{0901,\"SEDE UNIVERSITARIA DE JIJONA\"}","superficie":"328.326731484435","estancias":1,"ocupantes":0},{"id":"{1001,\"SEDE UNIVERSITARIA DE BIAR\"}","superficie":"52.7152636017226","estancias":1,"ocupantes":0},{"id":"{1101,\"SEDE DE LA NUCIA\"}","superficie":"3576.95716952081","estancias":2,"ocupantes":0},{"id":"{1201,\"ESTACI\u00d3N CIENT\u00cdFICA FONT-ROJA NATURA-UA\"}","superficie":"1174.62959999451","estancias":37,"ocupantes":1},{"id":"{1202,\"CAMPUS DE ALCOI\"}","superficie":"1555.00999402226","estancias":77,"ocupantes":1},{"id":"{1301,\"CENTRO DE INVESTIGACI\u00d3N MARINA DE SANTA POLA \\\"PR\u00cdNCIPE FELIPE\\\"\"}","superficie":"1470.29622045829","estancias":29,"ocupantes":3},{"id":"{1400,\"ESTACI\u00d3N BIOL\u00d3GICA DE TORRETES\"}","superficie":"511026.161694429","estancias":1,"ocupantes":0},{"id":"{1401,\"ESTACI\u00d3N BIOL\u00d3GICA DE TORRETES (LABORATORIOS)\"}","superficie":"178.386431029119","estancias":9,"ocupantes":2},{"id":"{1402,\"ESTACI\u00d3N BIOL\u00d3GICA DE TORRETES (INVERNADEROS)\"}","superficie":"343.911254379995","estancias":14,"ocupantes":0},{"id":"{1501,\"SEDE UNIVERSITARIA DE VILLENA\"}","superficie":"507.632961528161","estancias":1,"ocupantes":1},{"id":"{1601,\"MUSEO DE LA BIODIVERSIDAD DE IBI\"}","superficie":"956.898750588222","estancias":11,"ocupantes":1},{"id":"{1700,\"YACIMIENTO ARQUEOL\u00d3GICO DE LA ALCUDIA\"}","superficie":"100698.114351496","estancias":1,"ocupantes":0},{"id":"{1701,\"MUSEO LA ALCUDIA\"}","superficie":"1105.26805279474","estancias":30,"ocupantes":0},{"id":"{1801,\"CENTRO DE GASTRONOM\u00cdA DEL MEDITERR\u00c1NEO\"}","superficie":"1222.449908776","estancias":36,"ocupantes":0},{"id":"{1901,\"SEDE UNIVERSITARIA DE PETRER\"}","superficie":"111.501546793369","estancias":1,"ocupantes":0},{"id":"{2001,\"SEDE UNIVERSITARIA DE TORREVIEJA\"}","superficie":"1531.34975499677","estancias":1,"ocupantes":0},{"id":"{2101,\"SEDE UNIVERSITARIA DE CALP\"}","superficie":"1025.98382355411","estancias":1,"ocupantes":0},{"id":"{2201,\"SEDE UNIVERSITARIA DE VILLAJOYOSA\"}","superficie":"1154.02898637725","estancias":1,"ocupantes":0}];

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
        
            // let response = await fetch(`http://www.sigua.ua.es/api/agregados/seo/edificio/all/items`,
            // {
            //     method: 'GET',
            //     mode: 'cors'
            // });
            
            // let parsed = await sigua_estancias.json();
            let parsed = sigua_estancias;

            for(let i=0;i<parsed.length; i++){

                let element = parsed[i];

                let id_building = element.id.substring(
                    element.id.lastIndexOf("{")+1,
                    element.id.lastIndexOf(',')
                )

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

    export async function getData(weights){
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
                data[building].status = data[building].wifi_down_status*weights.wifid + data[building].wifi_up_status*weights.wifiu + data[building].energia_activa_status*weights.energy + data[building].temperature_status*weights.weather;
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

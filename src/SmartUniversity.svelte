
<svelte:head>
	<!-- elements go here -->
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-K2WCDTGRPC"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-K2WCDTGRPC');
    </script>
</svelte:head>

<script>
    // Svelte 
    import {onMount} from 'svelte';
    import { fade } from "svelte/transition";

    // Components
    import Loading from './Components/Loading.svelte';
    import Popup from './Popup.svelte';
    import Menu from './Menu.svelte';
    import Help from './Help.svelte';
    import Settings from './Settings.svelte';
    import Cookies from './Services/Cookies.svelte';
    import {setCookie, getCookie} from "./Components/setCookie.svelte";

    // internationalization
    import { _, setupi18n, isLoaded, locale, getLocaleFromNavigator } from './Services/Internationalization.js';

    // Stores
    import { buildings_status, weights, firstVisit, help_toggle, cookiesUse } from './Stores/stores.js';
 
    import THREE_App from './Application/App.js';

     
    const DEBUG = process.env.prod != "prod";

    // ThreeJS APP
    let canvasElement;
    let height, width;
    let SmartUniversity_Instance = new THREE_App();
    let selected = null;


    let popup;

    let promise = SmartUniversity_Instance.getAllLoadedItems();
    let progress = 0;

    SmartUniversity_Instance.on('progress', (value) => {
        progress = value;
    });

    function cookieCheck(){
        
        // first time only
        let _firstVisit = getCookie('firstVisit');
        if( _firstVisit ){
            // read data if available
            let storedData = getCookie('data');
            if(storedData){
                let _weights = JSON.parse( storedData.split('=')[1] );
                weights.set(_weights);
            }
        }
        else{
            setCookie("firstVisit", "false");
            firstVisit.set( true );
        }
        help_toggle.set( $firstVisit );

        // lang
        setupi18n({withLocale: 'en'});
        let savedLang_cookie = getCookie("lang");
        if(savedLang_cookie){
            let savedLang = savedLang_cookie.split('=')[1]
            locale.set(savedLang);
        }
        else{
            let nav_locale = getLocaleFromNavigator()+"";
            if(nav_locale.indexOf('en') != -1){
                locale.set('en');
            }
            else if(nav_locale.indexOf('es') != -1){
                locale.set('es');
            }
            else if(nav_locale.indexOf('ca') != -1 ){
                locale.set('va');
            }
        }

        // cookies
        let cookiesUse_cookie = getCookie("cookiesUse");
        if(cookiesUse_cookie){
            let cookiesUse_value = cookiesUse_cookie.split('=')[1];
            // console.log(cookiesUse_value);
            cookiesUse.set( cookiesUse_cookie.split('=')[1] );
        }

    }
    cookieCheck();



    
    onMount(async () => {
        
        await popup.refreshData();
        
        // debugger
        await SmartUniversity_Instance.init({ canvas: canvasElement, window: { height, width }, doc: document , DEBUG, status: $buildings_status }); 

        setInterval(async () => {
            await popup.refreshData($weights);
            await SmartUniversity_Instance.updateStatus($buildings_status);
        // }, 15*60*1000); // 15 mins update
        }, 15000); // 15 s update

        
        // debug 
        // DEBUG ? document.body.appendChild( SmartUniversity_Instance.stats.domElement ) : 0;
        // DEBUG ? document.body.appendChild( SmartUniversity_Instance.renderstats ) : 0;

    })

    function clicked(event) {
        SmartUniversity_Instance.mouse.x = ( event.clientX / SmartUniversity_Instance.viewportWidth ) * 2 - 1;
        SmartUniversity_Instance.mouse.y = - ( event.clientY  / SmartUniversity_Instance.viewportHeight ) * 2 + 1;

        SmartUniversity_Instance.calculateIntersections();
        selected = SmartUniversity_Instance.getSelected();

        // console.log("Svelte selected ", selected);
    }

    function touched(event) {
        SmartUniversity_Instance.mouse.x = ( event.touches[0].clientX / SmartUniversity_Instance.viewportWidth ) * 2 - 1;
        SmartUniversity_Instance.mouse.y = - ( event.touches[0].clientY  / SmartUniversity_Instance.viewportHeight ) * 2 + 1;

        SmartUniversity_Instance.calculateIntersections();
        selected = SmartUniversity_Instance.getSelected();

        // console.log("Svelte selected ", selected);
    }

</script>

<svelte:window bind:outerWidth={width} bind:outerHeight={height} />

<Popup content={ selected } bind:this={popup}/>

{#await promise }
    <Loading {progress}></Loading>
{:then value}
    <Menu></Menu>
    <Help></Help>
    <Settings smartUniversityInstance = {SmartUniversity_Instance} ></Settings>
{/await}

<div transition:fade>
    <canvas 
        bind:this={canvasElement}
        on:click={ clicked }
        on:touchstart={ touched }
        id="app"
        in:fade
    ></canvas>
</div>

<Cookies></Cookies>


<style>
    div {
        width: 100%;
        height: 100%;
    }
    div :global(.has-pointer) {
        cursor: pointer;
    }

    canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

    p{
        color: aliceblue;
    }

</style>




   



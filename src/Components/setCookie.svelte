<script context="module">
export function setCookie(key = null, value = null, days = 365){
    
    let expires = new Date();
    expires.setTime(expires.getTime() + 24*60*60*1000*days)

    let cookie = `${key}=${value}; expires=${expires}; `;

    let exist = true;

    if(!document.cookie.split('; ').find( el => el.startsWith(key))){
        // set cookie and show help
        document.cookie = cookie;
    }
    else{
        // don't show help
        exist = false;
    }
    
    return exist;
}
</script>
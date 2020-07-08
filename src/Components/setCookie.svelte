<script context="module">
    export function setCookie(key = null, value = null, days = 365){
        
        let expires = new Date();
        expires.setTime(expires.getTime() + 24*60*60*1000*days)

        let cookie = `${key}=${value}; expires=${expires}; `;

        let exist = true;

        // console.log("created", key, "with", value);
        document.cookie = cookie;

        if(document.cookie.split('; ').find( el => el.startsWith(key))){
            // console.log(key, " already exists");
            // don't show help
            exist = false;
        }
        
        return exist;
    }

    export function getCookie(key) {
        // console.log(document.cookie.split('; ').find( el => el.startsWith(key)));
        if(document.cookie){
            return document.cookie.split('; ').find( el => el.startsWith(key));
        }
        return false;
    }

    export function removeCookie(key) {
        // console.log("removed ", key);
        document.cookie.split('; ').find( el => {
            if(el.startsWith(key)){
                document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
            }
        })
    }
</script>
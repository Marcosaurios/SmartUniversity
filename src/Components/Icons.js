// Icon functions to get path with status color applied already
function readColor(color){
    if(typeof color == 'number'){
        // hsl
        return `hsl(${color}, 80%, 68%)`;
    }
    else if(color.includes('#')){
        // #rgb
        return color;
    }   
    else{
        console.error(color, " doesn't match types in Icon");
    }
}
const CONSTANTS = {
    WIFIUP(WIFIUP_COLOR) {
        return `<svg width="34" height="34" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.3" d="M15.1 14.5C15.1 11.7 17.3 9.5 20.1 9.5C20.5 9.5 20.8 9.5 21.1 9.6L23.2 7C22.8 6.7 18.3 3 11.6 3C4.9 3 0.4 6.7 0 7L11.6 21.5L15.1 17.2V14.5Z" fill="${readColor(WIFIUP_COLOR)}"/>
        <path d="M4.40001 12.5L11.6 21.5L15.1 17.1V14.5C15.1 13.2 15.6 12 16.5 11.1C15.2 10.5 13.6 10 11.6 10C7.50001 10 4.80001 12.2 4.40001 12.5Z" fill="${readColor(WIFIUP_COLOR)}"/>
        <path d="M18.1 13.4937V21H19.1V13.4937H20.6L18.6 11L16.6 13.4937H18.1Z" fill="${readColor(WIFIUP_COLOR)}"/>
        </svg>`},
    WIFIDOWN(WIFIDOWN_COLOR) {
        return `<svg width="34" height="34" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.3" d="M15.3 14.5C15.3 11.7 17.5 9.5 20.3 9.5C20.7 9.5 21 9.5 21.3 9.6L23.4 7C23 6.7 18.5 3 11.8 3C5.1 3 0.599997 6.7 0.199997 7L11.8 21.5L15.3 17.2V14.5Z" fill="${readColor(WIFIDOWN_COLOR)}"/>
        <path d="M4.60001 12.5L11.8 21.5L15.3 17.1V14.5C15.3 13.2 15.8 12 16.7 11.1C15.4 10.5 13.8 10 11.8 10C7.70001 10 5.00001 12.2 4.60001 12.5Z" fill="${readColor(WIFIDOWN_COLOR)}"/>
        <path d="M19.3 18.5063V11H18.3V18.5063H16.8L18.8 21L20.8 18.5063H19.3Z" fill="${readColor(WIFIDOWN_COLOR)}"/>
        </svg>`
    },
    WEATHER(WEATHER_COLOR) {
        return `
        <svg width="34" height="34" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
        <path d="M18.5437 9.62166C18.2218 7.99031 17.3435 6.52132 16.0589 5.46561C14.7742 4.40989 13.1628 3.83295 11.5 3.83333C10.1864 3.83369 8.89818 4.19499 7.77598 4.87777C6.65378 5.56055 5.74078 6.53856 5.13667 7.70499C3.72658 7.85541 2.42191 8.52194 1.47365 9.57635C0.525388 10.6308 0.000514198 11.9986 0 13.4167C0 16.5887 2.57792 19.1667 5.75 19.1667H18.2083C20.8533 19.1667 23 17.02 23 14.375C23 11.845 21.0354 9.79416 18.5437 9.62166ZM18.2083 17.25H5.75C3.63208 17.25 1.91667 15.5346 1.91667 13.4167C1.91667 11.2987 3.63208 9.58333 5.75 9.58333C7.86792 9.58333 9.58333 11.2987 9.58333 13.4167H11.5C11.5 10.7717 9.7175 8.54833 7.28333 7.8775C8.25125 6.59333 9.775 5.75 11.5 5.75C14.4037 5.75 16.7708 8.11708 16.7708 11.0208V11.5H18.2083C19.7896 11.5 21.0833 12.7937 21.0833 14.375C21.0833 15.9562 19.7896 17.25 18.2083 17.25Z" fill=" ${readColor(WEATHER_COLOR)}"/>
        </g>
        <defs>
        <clipPath id="clip0">
        <rect width="23" height="23" fill="white"/>
        </clipPath>
        </defs>
        </svg>`
    },
    ENERGY(ENERGY_COLOR) { 
        return `<svg width="34" height="34" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.0171 3.83334H13.4167V1.91667H9.58333V3.83334H7.98291C7.28333 3.83334 6.70833 4.40834 6.70833 5.10792V19.7992C6.70833 20.5083 7.28333 21.0833 7.98291 21.0833H15.0075C15.7167 21.0833 16.2917 20.5083 16.2917 19.8088V5.10792C16.2917 4.40834 15.7167 3.83334 15.0171 3.83334ZM10.5417 19.1667V13.8958H8.62499L12.4583 6.70834V11.9792H14.375L10.5417 19.1667Z" fill=" ${readColor(ENERGY_COLOR)}"/>
        </svg>`
    },
    CROSS(CROSS_COLOR, HOVER) {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64">
        <path d="M62 10.571L53.429 2L32 23.429L10.571 2L2 10.571L23.429 32L2 53.429L10.571 62L32 40.571L53.429 62L62 53.429L40.571 32z" fill="${readColor(CROSS_COLOR)}"}></path></svg>
        `;
    }
}

export {CONSTANTS};
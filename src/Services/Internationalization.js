
import { dictionary, locale, _, addMessages, getLocaleFromNavigator } from "svelte-i18n";

import { derived } from "svelte/store";

import en from './lang/en.json';
import es from './lang/es.json';
import va from './lang/va.json';


async function setupi18n( {withLocale: _locale} = {withLocale: 'en'} ) {

    // const EN_ROUTE = ROUTE_TRANSLATIONS.replace('{source}', 'va');

    addMessages('en', en);
    addMessages('es', es);
    addMessages('va', va);

    // console.log("Web lang: ", getLocaleFromNavigator() );

    locale.set(_locale);
}

const isLoaded = derived( locale, $locale=> typeof $locale === 'string');

export {_, setupi18n, isLoaded, locale, getLocaleFromNavigator};

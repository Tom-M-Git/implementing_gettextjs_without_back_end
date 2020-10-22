import Gettext from "../lib/gettext.js";

let i18n = new Gettext();
let _ = (msgid, arg1, arg2, arg3, arg4, arg5)=>{return i18n.gettext(msgid, arg1, arg2, arg3, arg4, arg5);};
let _n = (msgid, msgid_plural, arg1, arg2, arg3, arg4, arg5)=>{return i18n._n(msgid, msgid_plural, arg1, arg2, arg3, arg4, arg5);};

translationJs();

function translationJs(){
    let currentLocale, requestUrl, fetchLocaleJson, localeJson;
    currentLocale = i18n.getLocale();
    requestUrl = `locale/${currentLocale}/${currentLocale}.json`;
    requestUrl = new XMLHttpRequest().open("GET", requestUrl, true)
        ? requestUrl
        : "../" + requestUrl;
    fetchLocaleJson = fetch(requestUrl);


    fetchLocaleJson.then((res)=>{
        return res.json();
    }).then((resJson)=>{
        localeJson = resJson;
        checkComponents(allTranslationFuncs);
    });

    function setGettext(jsonArg){
        i18n.loadJSON(jsonArg, "messages");
        let gettextEl, gettextArg, ngettextEl, ngettextArg;
        gettextEl = document.querySelectorAll("[data-gettext]");
        gettextEl.forEach( (eachEl) => {
            gettextArg = eachEl.getAttribute("data-gettext").split(/,\s?/);
            eachEl.innerHTML = _(eachEl.innerHTML, gettextArg[0], gettextArg[1], gettextArg[2], gettextArg[3], gettextArg[4]);
        } );
        ngettextEl = document.querySelectorAll("[data-ngettext]");
        ngettextEl.forEach( (eachEl) => {
            ngettextArg = eachEl.getAttribute("data-ngettext").split(/,\s?/);
            eachEl.innerHTML = _n(eachEl.innerHTML, ngettextArg[0],ngettextArg[1],ngettextArg[2],ngettextArg[3],ngettextArg[4],ngettextArg[5]);
        } );
        
    }

    /* Start Translation =================== */
    function translateDate () {

        /* formatting the specified date */
        let datesToFormat, dateValue, i18nDate;
        if(document.querySelectorAll("[data-date]")){
            datesToFormat = document.querySelectorAll("[data-date]");
            datesToFormat.forEach((eachDate)=>{
                dateValue = eachDate.getAttribute("data-date")
                i18nDate = new Date(dateValue).toLocaleDateString(langAttr, {year:"numeric", month:"long", day: 'numeric'});
                eachDate.innerHTML = i18nDate;
            });
        }
        /* ----------------------------- */
    }
    /* =================================== */

    function allTranslationFuncs(){
        setGettext(localeJson);translateDate();
    }
}
import Gettext from "./lib/gettext.js";
import Gettext2 from "../lib/gettext.js";

let i18n;
i18n = Gettext ? new Gettext(): new Gettext2;
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
        setGettext(localeJson);
        checkComponents(allTranslationFuncs);
    }).then(()=>{createClock();});

    function setGettext(jsonArg){
        i18n.loadJSON(jsonArg, "messages");
    }

    function executeGettext(){
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

    /* Date Translation =================== */
    function translateDate () {

        /* formatting the specified date */
        let datesToFormat, dateValue, i18nDate;
        if(document.querySelectorAll("[data-date]")){
            datesToFormat = document.querySelectorAll("[data-date]");
            datesToFormat.forEach((eachDate)=>{
                dateValue = eachDate.getAttribute("data-date")
                i18nDate = new Date(dateValue).toLocaleDateString(currentLocale, {year:"numeric", month:"long", day: 'numeric'});
                eachDate.innerHTML = i18nDate;
            });
        }
        /* ----------------------------- */
    }

    function createClock(){
        let clock = document.getElementById("date-and-time");
        setInterval(()=>{
            let currentDate = new Date();
            let formattedDate = currentDate.toLocaleDateString(currentLocale, {year:"numeric", month:"long", day: 'numeric', weekday:"long", hour: '2-digit', minute:"2-digit", second:"2-digit", hour12:"true"});
            clock.innerHTML = formattedDate;
        }, 1000);
    }
    /* =================================== */

    function allTranslationFuncs(){
        executeGettext();translateDate();
    }
}
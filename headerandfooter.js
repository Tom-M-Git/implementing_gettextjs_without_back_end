function headerandfooterJs(){

    let fetchUrl, fetchXml, xmlParser, parsedXml;
    fetchUrl = "components/headerandfooter.xml";
    if( !(new XMLHttpRequest().open("GET", fetchUrl, true)) ){
        fetchUrl = "../"+fetchUrl;
    }

    fetchXml = fetch(fetchUrl);
    fetchXml.then((res)=>{
        return res.text();
    }).then((res)=>{
        xmlParser = new DOMParser();
        parsedXml = xmlParser.parseFromString(res, "text/xml");
        loadComponents(parsedXml);
        fixLinks();
    });

    function getHeader (arg) {
        let gotHeader = arg.getElementsByTagName("header");
        document.getElementById("header").outerHTML = gotHeader[0].outerHTML;
    }
    function getFooter (arg) {
        let gotFooter = arg.getElementsByTagName("footer");
        document.getElementById("footer").outerHTML = gotFooter[0].outerHTML;
    }
    function loadComponents (arg) {
        getHeader(arg);getFooter(arg);mediator.componentsAdded=1;
    }

    /* Optional =============================== */
    function fixLinks(){
        const currentLocale = document.getElementsByTagName("html")[0].getAttribute("lang");
        let hrefEn = document.querySelector("[href='../index.html']");
        let hrefJa = document.querySelector("[href='ja/index.html']");
        if(currentLocale == "en"){
            hrefEn.removeAttribute("href");
            hrefEn.className += " disabled"
        }
        if(currentLocale == "ja"){
            hrefJa.removeAttribute("href");
            hrefJa.className += " disabled"
        }
    }
    /* =============================== */

}
headerandfooterJs();
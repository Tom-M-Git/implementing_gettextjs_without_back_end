function headerandfooterJs(){

    let xhrUrl, parsedXml, xhr, xhrPromise;
    xhrUrl = "./components/headerandfooter.xml";
    xhr = new XMLHttpRequest();
    xhrPromise = new Promise((resolve, reject)=>{
        xhr.onload = () => {
            resolve(xhr.responseXML);
        };
        xhr.open("GET", xhrUrl, true);
        xhr.send();
    });

    
    xhrPromise.then((res)=>{
        parsedXml = res;
        loadComponents(parsedXml);
        fixLinks();
    }).catch(()=>{
        xhrUrl = "../components/headerandfooter.xml";
        xhrPromise = new Promise((resolve, reject)=>{
            xhr.onload = () => {
                resolve(xhr.responseXML);
            };
            xhr.open("GET", xhrUrl, true);
            xhr.send();
        });
        xhrPromise.then((res)=>{
            parsedXml = res;
            loadComponents(parsedXml);
            fixLinks();
        });
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
        let iconSrc = document.querySelector("[src^='..']");
        let iconSrcAttr = iconSrc.getAttribute("src");
        let newIconSrc = iconSrcAttr.replace(/^../, ".");
        if(currentLocale == "en"){
            hrefEn.removeAttribute("href");
            hrefEn.className += " disabled";
            iconSrc.setAttribute("src", newIconSrc);
        }
        if(currentLocale == "ja"){
            hrefJa.removeAttribute("href");
            hrefJa.className += " disabled"
        }
    }
    /* =============================== */

}
headerandfooterJs();
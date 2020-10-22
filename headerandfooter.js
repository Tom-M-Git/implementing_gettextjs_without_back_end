function headerandfooterJs(){

    let fetchUrl, fetchXml, xmlParser, parsedXml;
    fetchUrl = "components/headerandfooter.xml";
    fetchUrl = new XMLHttpRequest().open("GET", fetchUrl, true)
        ? fetchUrl
        : "../"+fetchUrl;

    fetchXml = fetch(fetchUrl);
    fetchXml.then((res)=>{
        return res.text();
    }).then((res)=>{
        xmlParser = new DOMParser();
        parsedXml = xmlParser.parseFromString(res, "text/xml");
        loadComponents(parsedXml);
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

}
headerandfooterJs();
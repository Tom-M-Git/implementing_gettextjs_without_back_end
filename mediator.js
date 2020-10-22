/*
    This is a mediator/proxy object to monitor a number of web components asynchronously loaded (XML which this object specializes in) and whether the number has reached the total then execute a function.
    Load this js file before all components and a translation program loaded in an html file.
*/
let mediator = {
    "numOfComponentFiles": 1,
    "componentsLoaded": 0,
    "listener": function(){},
    "registerListener": function(newListener){
        this.listener = newListener;
    },
    set componentsAdded(val){
        this.componentsLoaded += val;
        this.listener();
    }
}
/* Warns if loading components failed or is taking too long */
setTimeout(()=>{
    if(!(mediator.componentsLoaded >= mediator.numOfComponentFiles)){
        let errorMeassage = document.createElement("div");
        errorMeassage.style.position = "fixed";
        errorMeassage.style.backgroundColor = "#ffffff";
        errorMeassage.style.textAlign = "center";
        errorMeassage.style.zIndex = "999";
        errorMeassage.innerHTML = "<h1 style='color:red'>Failed to load content or taking too long.</h1><p>Try reloading the page or disable a script blocker if you have one.</p>";
        document.getElementsByTagName("body")[0].prepend(errorMeassage);
    }
    console.log("checking components timed out");
}, 4000);

/* Adds a function to call next when all components have been loaded */
function checkComponents(nextFunction){
    mediator.registerListener(()=>{
        if(mediator.componentsLoaded >= mediator.numOfComponentFiles){
            nextFunction();
        }
    });
    mediator.componentsAdded = 0;
}
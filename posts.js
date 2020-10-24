function postsJS(){

    let fetchUrl, fetchXml, xmlParser, parsedXml, xhr;
    fetchUrl = "components/posts.xml";
    xhr = new XMLHttpRequest();
    if( !(xhr.open("GET", fetchUrl, true)) ){
        fetchUrl = "../components/posts.xml";
    }

    fetchXml = fetch(fetchUrl);
    fetchXml.then((res)=>{
        return res.text();
    }).then((res)=>{
        xmlParser = new DOMParser();
        parsedXml = xmlParser.parseFromString(res, "text/xml");
        loadComponents(parsedXml);

    });

    let mainEl, postSection;
    mainEl = document.getElementById("main");
    mainEl.className = "bg-white";mainEl.style.position = "relative";mainEl.innerHTML = "";
    postSection = document.createElement("section");postSection.className = "post-section";
    mainEl.appendChild(postSection);

    function getPosts (arg) {
        const langAttr = document.getElementsByTagName("html")[0].getAttribute("lang");
        let postOutput="", gotPosts, dateAttr, authorAttr, gotItem, gotTitle, gotBody, formattedDateAttr, postsArr=[];
        gotPosts = arg.querySelectorAll("post");
        
        gotPosts.forEach((eachPost)=>{
            dateAttr = eachPost.getAttribute("date");
            authorAttr = eachPost.getAttribute("author");
            gotItem = eachPost.querySelector(`item[lang="${langAttr}"]`);
            gotTitle = gotItem.querySelector("title").innerHTML;
            gotBody = gotItem.querySelector("body").innerHTML;
            formattedDateAttr = new Date(dateAttr).toLocaleDateString(langAttr, {year:"numeric", month:"short", day:"numeric"});

            postsArr.push(`
                <article class="post mt-5">
                    <header class="post-header d-flex flex-wrap">
                        <h1 class="post-title w-100">${gotTitle}</h1>
                        <h6 class="post-author mr-3">By <span data-gettext>${authorAttr}</span></h6>
                        <h6 class="post-date">${formattedDateAttr}</h6>
                    </header><hr/>
                    <div class="post-body">
                        ${gotBody}
                    </div>
                </article>
            `);
        });
        addingPosts(postsArr);

        
    }
    /* simply adding all posts at once */
    function displayPosts(output){
        postSection.innerHTML = `
                <div id="page-header" class="container bg-light border-top border-bottom">
                    <h1 class="my-1"><span data-gettext>Posts</span></h1>
                </div>
                <section id="posts" class="container mt-5">${output}</section>
        `;
    }
    /* ================================ */
    function addingPosts(posts){
        let config, i, addOutput="", postButton, buttonDiv;
        config = {
            "maxParAddition":3,
            "numOfEntries": posts.length,
            "start":0
        }

        for(i=0;i<config.maxParAddition;i++){
            addOutput += posts[config.start];
            ++config.start;
        }
        displayPosts(addOutput);

        buttonDiv = document.createElement("div");
        buttonDiv.className = "d-flex justify-content-center";
        postButton = document.createElement("button");
        postButton.innerHTML= "More";
        postButton.className = "btn btn-secondary w-75";
        buttonDiv.appendChild(postButton);
        document.getElementById("main").appendChild(buttonDiv);
        postButton.addEventListener("click", ()=>{
            for(i=0;i<config.maxParAddition;i++){
                addOutput += posts[config.start];
                ++config.start;
                if(config.start >= config.numOfEntries){
                    postButton.style.display = "none";
                    break;
                }
            }
            displayPosts(addOutput);
            mediator.componentsAdded=0;
        });

    }

    function loadComponents (arg) {
        getPosts(arg);mediator.componentsAdded=1;
    }
}
postsJS();
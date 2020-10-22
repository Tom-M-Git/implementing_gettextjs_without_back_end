function postsJS(){

    let fetchUrl, fetchXml, xmlParser, parsedXml;
    fetchUrl = "components/posts.xml";
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

    function getPosts (arg) {
        const langAttr = document.getElementsByTagName("html")[0].getAttribute("lang");
        let postOutput="", gotPosts, dateAttr, authorAttr, gotItem, gotTitle, gotBody, formattedDateAttr;
        gotPosts = arg.querySelectorAll("post");

        gotPosts.forEach((eachPost)=>{
            dateAttr = eachPost.getAttribute("date");
            authorAttr = eachPost.getAttribute("author");
            gotItem = eachPost.querySelector(`item[lang="${langAttr}"]`);
            gotTitle = gotItem.querySelector("title").innerHTML;
            gotBody = gotItem.querySelector("body").innerHTML;
            formattedDateAttr = new Date(dateAttr).toLocaleDateString(langAttr, {year:"numeric", month:"short", day:"numeric"});

            postOutput += `
                <article class="post mt-5">
                    <header class="post-header d-flex flex-wrap">
                        <h1 class="post-title w-100">${gotTitle}</h1>
                        <h6 class="post-author mr-3">By <span data-i18n="Tomoaki Morioka">${authorAttr}</span></h6>
                        <h6 class="post-date">${formattedDateAttr}</h6>
                    </header><hr/>
                    <div class="post-body">
                        ${gotBody}
                    </div>
                </article>
            `
        });

        document.getElementById("main").outerHTML = `
            <main id="main" class="bg-white" style="position:relative">
                <div id="page-header" class="container bg-light border-top border-bottom">
                    <h1 class="my-1"><span data-i18n="posts">Posts</span></h1>
                </div>
                <section id="posts" class="container mt-5">${postOutput}</section>
            </main>
        `;
    }
    function loadComponents (arg) {
        getPosts(arg);mediator.componentsAdded=1;
    }

}
postsJS();
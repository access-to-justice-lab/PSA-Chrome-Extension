function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    return html;
}

function injectQA(document){
    var title = getTitle2(document);
    console.log("Title:" + title);

    var pcidrows = document.getElementsByClassName('PCID');
    for(var i = 0; i < pcidrows.length; i++)
    {
        console.log(pcidrows[i].innerText);
        var pcid = pcidrows[i].innerText;
        if(UrlExists("http://localhost:8080/main/docs/PSA_" + pcid + ".pdf")){
            var psarow = document.getElementById("psa_" + pcid);
            psarow.innerHTML = '<a href="docs/PSA_' + pcid + '.pdf" target="_blank"><img src="psa_icon.png" class="img-thumbnail" height="50" width="50"></a>';
        }
        if(UrlExists("http://localhost:8080/main/docs/QA_" + pcid + ".pdf")){
            var psarow = document.getElementById("qa_" + pcid);
            psarow.innerHTML = '<a href="docs/QA_' + pcid + '.pdf" target="_blank"><img src="qa_icon.png" class="img-thumbnail" height="50" width="50"></a>';
        }
    }
    console.log(UrlExists("http://localhost:8080/main/docs/PSA_1313.pdf"));
    console.log(UrlExists("http://localhost:8080/main/docs/PSA_1314.pdf"));


}
function getTitle2(document) {

    try {
        var x = document.getElementById("title");
        return x.innerText.trim();
    }
    catch(e) {
        return "null";
    }
}
function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status != 404){
        return true;
    }else{
        return false;
    }
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: injectQA(document)
});


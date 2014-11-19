var fs = require('fs');

function getPosts() {
    var posts = fs.readdirSync("./posts");
    var bodyRE = /{%\s*CONTENT\s*%}/;
    var templateHTML = String(fs.readFileSync('./templates/posts.template'));
    var postsHTML = "";
    for(i in posts){
        var postText = String(fs.readFileSync('./posts/' + posts[i]));
        postsHTML = postsHTML + templateHTML.replace(bodyRE, postText);
    }
    return postsHTML;
}

function getIndex() {
    var contentRE = /{%\s*BODY\s*%}/;
    var templateHTML = String(fs.readFileSync('./templates/index.template'));
    var indexHTML = templateHTML.replace(contentRE, getPosts());
    return indexHTML;
}

exports.getIndex = getIndex;

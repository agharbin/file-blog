var fs = require('fs');
var _ = require('underscore');

CONTENT_TYPES = {
    'POSTS': './templates/posts.template'
};

function render(contentType, contentObj){
    var templateFileName = "./templates/" + contentType.toLowerCase() + ".template";
    var templateHTML = String(fs.readFileSync(templateFileName));
    var resultHTML = templateHTML.replace(/{%\s*(\w*)\s*%}/, function(str,s1){
        return JSON.parse(contentObj)[s1];
    });
    return resultHTML;
}

function startsWithPeriod(name) { return name[0] == '.' ? false : true; };

function getPosts(continuation) {
    var files = _.filter(fs.readdirSync('./posts'), startsWithPeriod);

    var postHTML = '';
    for(i in files){
        var postObj = fs.readFileSync('./posts/' + files[i]);
        postHTML = postHTML + render('POSTS', postObj);
    }
    return postHTML;
}

function getIndex() {
    var contentRE = /{%\s*BODY\s*%}/;
    var templateHTML = String(fs.readFileSync('./templates/index.template'));
    return templateHTML.replace(contentRE, getPosts);
}

exports.getIndex = getIndex;

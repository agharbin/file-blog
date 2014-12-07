var fs = require('fs');
var _ = require('underscore');

TEMPLATES = {
    'POSTS' : './templates/posts.template',
    'INDEX' : './templates/index.template'
};

function match(token){
    if (token == 'ANY') return /{%\s*(\w*)\s*%}/g;
    else return RegExp('{%\\s*' + token + '\\s*%}','g');
}

function getTemplate(contentType) {
    return String(fs.readFileSync(TEMPLATES[contentType]));
}

function render(contentType, contentObj){
    return getTemplate(contentType).replace(match('ANY'), function(str,s1){
        return JSON.parse(contentObj)[s1];
    });
}

function startsWithPeriod(name) { return name[0] == '.' ? false : true; };

function renderPosts() {
    var files = _.filter(fs.readdirSync('./posts'), startsWithPeriod);

    var postHTML = '';
    for(i in files){
        var postObj = fs.readFileSync('./posts/' + files[i]);
        postHTML = postHTML + render('POSTS', postObj);
    }
    return postHTML;
}

function renderIndex() {
    var templateHTML = String(fs.readFileSync(TEMPLATES['INDEX']));
    return templateHTML.replace(match('POSTS'), renderPosts);
}

exports.renderIndex = renderIndex;

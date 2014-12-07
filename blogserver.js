var http = require('http');
var url = require('url');
var fs = require('fs');
var template = require('./template.js');

function run() {
	function requestHandler(request, response){
        switch(request.url) {
            case '/':
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(template.renderIndex());
		        response.end();
                break;
            case '/style.css':
                fs.readFile('css/style.css', function(err,data){
                    response.writeHead(200, {"Content-Type": "text/css"});
                    response.write(String(data));
                    response.end();
                });
                break;
        }
	}
	http.createServer(requestHandler).listen(8080);
}

exports.run = run;

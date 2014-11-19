var http = require('http');
var url = require('url');
var fs = require('fs');
var template = require('./template.js');

function run() {
	function requestHandler(request, response){
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(template.getIndex());
		response.end();
	}
	http.createServer(requestHandler).listen(8080);
}

exports.run = run;

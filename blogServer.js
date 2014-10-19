var http = require('http');
var url = require('url');
var fs = require('fs');

function run() {
	function requestHandler(request, response){
		fs.readFile('./templates/template.html', function(err,data){
			if (err) throw err;
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data);
			response.end();
		});
	}
	http.createServer(requestHandler).listen(80);
}

exports.run = run;

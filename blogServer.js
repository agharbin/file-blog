var http = require("http");
var url = require("url");

function run() {
	function requestHandler(request, response){
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("<!DOCTYPE HTML>");
		response.write("<html>");
		response.write("<head><title>Title</title></head>");
		response.write("<body><p>Body</p></body>");
		response.write("</html>");
	}
	http.createServer(requestHandler).listen(80);
}

exports.run = run;

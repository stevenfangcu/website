
var http = require('http');
const ROOT = "./HTML";
var fs = require('fs');
var mime = require("mime-types");
var server = http.createServer(handleRequest);
server.listen(8000);
console.log('Server listening on port 8000');

function handleRequest(req, res) {

	console.log(req.method+" request for "+req.url);

	var filename = ROOT+req.url;
  var file = req.url;
	var data ="";
	var code = 500;
  console.log(filename);
	if(fs.existsSync(filename)){
		var stats = fs.statSync(filename);

		if(stats.isDirectory()){
			filename+="/index.html";
		}
		data = fs.readFileSync(filename);
		code = 200;
        // for each unique url request
	}
	else{
		data = fs.readFileSync(ROOT+"/404.html");
		code = 404;
	}
	// content header

	res.writeHead(code, {'content-type': mime.lookup(filename) || 'text/html'});

	res.end(data);
};


var http = require('http');
var url = require('url');
var queryString = require('querystring');

var {info, error} = require('./modules/my-log');
var {countries} = require('countries-list'); 
var utils = require('./utils/consts');

var server = http.createServer(function(request, response){    

    var parsed = url.parse(request.url);
    console.log("parsed:", parsed);

   var pathname = parsed.pathname;

   var query = queryString.parse(parsed.query)
   console.log("query:", query);

    if(request.url==="/"){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write('<html><body><p>Hello world JS</p></body></html>');
        response.end();
    }else if(pathname ==="/exit"){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write('<html><body><p>Bye</p></body></html>');
        response.end();
    }else if(pathname ==="/info"){
        var result = info(request.url);
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(result);
        response.end();
    }else if(pathname ==="/country"){
        var result = info(request.url);
        response.writeHead(200, {'Content-Type' : 'application/json'});
        response.write(JSON.stringify(countries[query.code]));
        response.end();
    }else if(pathname ==="/error"){
        var result = error(request.url);
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(result);
        response.end();        
    }else{
        response.writeHead(404, {'Content-Type' : 'text/html'});
        response.write('<html><body><p>Not found!</p></body></html>');
        response.end();
    } 

});

server.listen(4000);
console.log("running on 4000");
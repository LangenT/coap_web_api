#!/usr/bin/env node

const http = require('http');
const coap = require("node-coap-client").CoapClient;
const url = require('url');

main();

function main() {
    // create a web server at to output JSON structs 
    const server = http.createServer((req, res) => {
        let coapPort = 5683; //default coap port
        if (req.method != 'GET') { //checks if request, normal if called in browser
            return res.write('{ "error": "query-failed" }');
        }
        res.statusCode = 200;                               // HTTP OK
        res.setHeader('Content-Type', 'application/json');  // HTTP Header
        res.setHeader("Access-Control-Allow-Origin", "*");  // allow access from any other site - don't use in production!

        var callURL = url.parse(req.url, true);

        console.log(callURL['pathname']);

        callURL['pathname'] = callURL['pathname'].replace('/', '');
        let iPv6 = callURL['pathname'].substring(0, callURL['pathname'].indexOf('/'));

        callURL['pathname'] = callURL['pathname'].replace(iPv6+'/', '');
        let callFunction = callURL['pathname'].substring(0, callURL['pathname'].length);

        console.log("callFunction is: " + callFunction);
        console.log("iPv6 adress is: " + iPv6);
        
        let coapURL = "coap://[" + iPv6 + "]:" + coapPort +"/" + callFunction;
        console.log("callURL: " + coapURL);
        let responseObj = {};
        
        coap
        .request(coapURL,"get")//send request to coap server
        .then(response => {//promise after response received (async process)
            let resp = response.payload.toString();
            console.log(resp);
            responseObj['response'] = resp;
            res.write(JSON.stringify(responseObj));
            res.end();//write JSON to object --> web server output
          })
        .catch(err => {//catch errors like timeouts (async process)
            console.log("Error lol");
            responseObj['error'] = "something whent wrong";
            res.write(JSON.stringify(responseObj));
            res.end();  //write JSON to object --> web server output
        })
    });

    let port = 3000;//port where the webserver should run, change as needed
    // start webserver and listen for requests
    server.listen(port, () => {
        console.log("Server running at port " + port + " (http)");
    });
}
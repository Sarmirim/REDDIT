const http = require('http');
const parser = require('./parser');
const test1 = require('./test');

let arrayData = [];

//In case someone stumbles upon this in the future.. If you are running nginx in front of node.js you can also block favicon requests by adding this line:
//
// location = /favicon.ico { access_log off; log_not_found off; }

http.createServer((request, response) => {
    const { headers, method, url } = request;
    let requestedURL = request.url.toString()
    console.log(requestedURL);
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
    });

    //console.log(a);
    parser.f(requestedURL).then((tableArray)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('X-Powered-By', 'Riftach');
        arrayData = tableArray
        let jsonArray = JSON.stringify(arrayData);

        //console.table(arrayData);

       /* arrayData.map((item, index, array) => {
            let a = new Object(item);
            let b = Object.entries(a);
            let ans = test1.answer(a);
            //response.write(ans);
           // response.write('\r\n');

            // returns the new value instead of item
        });*/

        response.end(jsonArray);
    });

}).listen(8080);

// const hostname = '127.0.0.1';
// const port = 8080;
// console.log(`Server running at http://${hostname}:${port}/`);
console.log(`Server running ......
`);

////////////////////////Promise
let afterLink = "/r/all.json?limit=5&raw_json=1"
let jsonData;




const http = require('http');
let parser = require('./parser');
let test1 = require('./test');

const hostname = '127.0.0.1';
const port = 8080;
let arrayData = [];

http.createServer((request, response) => {
    const { headers, method, url } = request;
    let test = request.url.toString()
    console.log(test);
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // At this point, we have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.
    });

    parser.f(test).then((tableArray)=>{
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

}).listen(8080); // Activates this server, listening on port 8080.



console.log(`Server running at http://${hostname}:${port}/`);


////////////////////////Promise
let afterLink = "/r/all.json?limit=5&raw_json=1"
let jsonData;




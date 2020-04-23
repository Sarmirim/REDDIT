const parser = require('./parser');
const request = require('request');
const link = '';
const dataFromParser = require('./dataParser');
const key = '.json?limit=5&raw_json=1';

function parse(linkToParse){
    return new Promise(function(resolve, reject){
        request(linkToParse + key,
            function (error, response, body) {
            resolve(body);
            reject(new Error('Error'));
        });
    });
}

let jsonData;
let arrayData = [];

async function f(redditLink){
    console.log(redditLink);

    let arr = [];
    jsonData = await parse(redditLink).then(function(val) {
        return val;
    }).catch(function(err) {
        console.err(err);
        return "ERROR";
    });
    arr = dataFromParser.dataParser(redditLink, jsonData);

    return arr;
}

module.exports = {
    parse, f
};
/////Example
/*f().then((massiv)=>{
        arrayData = massiv
        console.table(arrayData)
    });*/
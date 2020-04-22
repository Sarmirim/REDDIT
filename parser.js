let parser = require('./parser');
////////////////////////Promise
const request = require('request');
let link = 'https://www.reddit.com';
let key = '&raw_json=1';
function parse(neewLink){
    return new Promise(function(resolve, reject){
        request(link + neewLink, function (error, response, body) {
            // in addition to parsing the value, deal with possible errors
            resolve(body);
            reject(new Error('Error'));
        });
    });
}

let jsonData;
let arrayData = [];

async function f(redditLink){
    let arr = [];
    jsonData = await parse(redditLink).then(function(val) {
        //console.log(val);
        return val;
    }).catch(function(err) {
        console.err(err);
        return "ERROR";
    });
    try {
        let parsed = await JSON.parse(jsonData).data;
        let dist = parsed.dist;

        for(let i=0; i<parsed.children.length; i++){
            children = parsed.children[i].data;
            subreddit = children.subreddit;
            author = children.author;
            ups = children.ups;
            title = children.title;
            timeUTC = new Date(children.created_utc*1000).toISOString().slice(-13, -5);

            let info = " " + subreddit + " " + author + " " + timeUTC + " ";
            let objectData = {
                //title,
                author,
                subreddit,
                ups,
                timeUTC
            }

            if(children.preview){
                url = children.preview.images[0].source.url;
                //objectData.url = url;
                //console.log(i + info + ": " + children.preview.images[0].source.url);
            } else{
                //console.log(i + info );
            }
            arr.push(objectData);
        }

    } catch (error) {

    }

    return arr;
}

/*f().then((massiv)=>{
        arrayData = massiv
        console.table(arrayData)
    });*/

module.exports = {
    parse, f
};
const parser = require('./parser');
const request = require('request');
const link = '';
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
    try {
        let parsed
        let a = redditLink.search(`/comments/`);
        if(a != -1){
            parsed = await JSON.parse(jsonData)[0].data;
        }else {
            parsed = await JSON.parse(jsonData).data;
        }
        for(let i=0; i<parsed.children.length; i++){
            let children = parsed.children[i].data;
            let subreddit = children.subreddit;
            let author = children.author;
            let ups = children.ups;
            let title = children.title;
            let timeUTC = new Date(children.created_utc*1000).toISOString().slice(-13, -5);

            let info = " " + subreddit + " " + author + " " + timeUTC + " ";
            let objectData = {
                title,
                author,
                subreddit,
                ups,
                timeUTC
            }
            if(children.url){
                objectData.url = children.url;
                if(children.thumbnail.toString() > 10) {
                    objectData.thumbnail = children.thumbnail;
                }else {
                    objectData.thumbnail = children.url;
                }
                if(children.media){
                    objectData.gif = children.media.reddit_video.fallback_url;
                }
            }
            arr.push(objectData);
        }
    } catch (error) {
    }
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
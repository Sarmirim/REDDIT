module.exports = {
    dataParser
};

function answer(objectWithData){
    let retAnswer = new String();
    console.log(objectWithData)
    for (let [key, value] of Object.entries(objectWithData)) {
        retAnswer= retAnswer+`${key}: ${value}`;
    }
    let fin = JSON.stringify(retAnswer);
    return fin;
}

async function dataParser(redditLink, jsonData) {
    let arr = [];
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
    return arr
}
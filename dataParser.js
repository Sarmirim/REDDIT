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
            // let subreddit = children.subreddit;
            // let author = children.author;
            // let ups = children.ups;
            let title = children.title;
            // let timeUTC = new Date(children.created_utc*1000).toISOString().slice(-13, -5);
            let gif = false;
            let objectData = {
                title,
                // author,
                // subreddit,
                // ups,
                // timeUTC
            }
            if(children.url){
                let url = children.url;
                let mediaFlag = children.media;
                let preview = children.preview;
                objectData.url = children.url;
                if(children.thumbnail.toString().length > 10) {
                    objectData.thumbnail = children.thumbnail;
                }else {
                    objectData.thumbnail = children.url;
                }
                try {if(preview.reddit_video_preview){objectData.media = preview.reddit_video_preview.fallback_url; gif = true}}catch (e) {}
                try {if(children.is_video == true){objectData.media = mediaFlag.reddit_video.fallback_url; gif = true}}catch (e) {}
                try {if(mediaFlag.reddit_video){objectData.media = mediaFlag.reddit_video.fallback_url; gif = true}}catch (e) {}
                try {if(url.match(/\b.gif+/i)) {objectData.media = children.url; gif = true}}catch (e) {}

                try {if(children.crosspost_parent_list[0]){
                    let parent = children.crosspost_parent_list[0];
                    try {if(parent.reddit_video_preview){objectData.media = parent.preview.reddit_video_preview.fallback_url; gif = true}}catch (e) {}
                    try {if(parent.is_video == true){objectData.media = parent.media.reddit_video.fallback_url; gif = true}}catch (e) {}
                    try {if(parent.media.reddit_video){objectData.media = parent.media.reddit_video.fallback_url; gif = true}}catch (e) {}
                    try {if(parent.url.match(/\b.gif+/i)) {objectData.media = parent.url; gif = true}}catch (e) {}
                }}catch (e) {}
                // //preview.images[0].variants.gif.source.url && preview.reddit_video_preview.is_gif
            }
            objectData.gif = gif;
            arr.push(objectData);
        }
    } catch (error) {
        console.log(error);
    }
    return arr
}
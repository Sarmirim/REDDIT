module.exports = {
    answer
};

function answer(objectWithData){
    let retAnswer = new String();
    console.log(objectWithData)
    for (let [key, value] of Object.entries(objectWithData)) {
        retAnswer= retAnswer+`${key}: ${value}`;
    }
    let fin = JSON.stringify(retAnswer);
    return fin;
    //console.log(arrayData);
}
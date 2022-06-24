console.log("game is starting")

let Twit = require('twit')  //basically import in java
let config = require('./config')
//console.log(config)

let T = new Twit(config)

//--> get() --> search tweets? by hashtag, by location, by user
//--> post() -> tweeting! 
//--> stream()> ???????? a continuous connection with twitter (advanced), assign events to a stream
let params = {
    q: 'from:KingJames OR from:POTUS OR from:AOC OR from:BarackObama OR from:elonmusk OR from:kanyewest OR from:taylorswift13 OR from:Money23Green OR from:rihanna OR from:FoxNews OR from:CNN since:2011-07-11 ', 
    lang: 'en',
    count: 10000
    
}
function gotData(err, data, response){
    let tweets = data.statuses;
    tweets.forEach(tweet => {
        console.log(tweet.text)
    });
   // console.log(data)
}
T.get('search/tweets', params, gotData) //search for tweets with params, gotData is the callback function when the request finishes

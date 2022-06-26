const Twit = require('twit');
const config = require('./config');
const express = require('express');
const {TwitterApi, TweetStream} = require('twitter-api-v2');
const app = express();
const T = new Twit(config);
const T2 = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAFlmeAEAAAAAnRjFP45Am%2F7a1loqOOgX9HTzqck%3DluT12OOfGvj4pkkdnT8d6a3jsHkoPxR5PKhSETIk8ogL6v1Vma');
var accounts = ["BarackObama", "AOC", "elonmusk", "Money23Green", "POTUS", "neiltyson", "ConanOBrien", "BillGates", "JohnCena", "MichelleObama", "VP", "jimmyfallon"]


const cors = require('cors');
app.use(cors());
const PORT = 8080;;

app.use(express.static('public'));

realNameMap = {}
tweetBank = {}
async function retrieveTweet(username) {
    try {
        q = 'from:' + username + ' -is:retweet -is:reply -is:quote -has:links -has:mentions -has:links -has:media -has:images -has:videos -RT'
        const data = await T2.v2.get('tweets/search/recent', {query: q, expansions: ["author_id"], "tweet.fields" : ["created_at"], max_results: 100});
        curTweets = []
        // console.log(data)
        data.data.forEach(tweet => {
            author_id = tweet.author_id;
            curTweets.push({text:tweet.text, id:tweet.id, date:tweet.created_at});
        });
        tweetBank[username] = curTweets; 
        const data2 = await T2.v2.get('users/' + author_id);
        realNameMap[username] = realName = data2.data.name; 
        if (username == "POTUS") {
            console.log("Finished preprocessing!");
        }
    }
    catch (error) {
        console.log(username);
    }

}

(async () => {
    try {
        for (let i = 0; i < accounts.length; i++) {
            await retrieveTweet(accounts[i]);
        }
    }
    catch (error) {
        console.log(accounts[i]);
    }    
})();


app.get('/:name', (req, res) => {
    const { name } = req.params; 
    (async () => {
        try {
            if (!accounts.includes(name))  {
                accounts.push(name);
                await retrieveTweet(name);
                var idx = Math.floor(Math.random() * tweetBank[name].length);
                res.status(200).send({
                    tweet: tweetBank[name][idx].text,
                    id: tweetBank[name][idx].id,
                    name: realNameMap[name],
                    date: tweetBank[name].date
                })
            }
            else {
                var idx = Math.floor(Math.random() * tweetBank[name].length);
                res.status(200).send({
                    tweet: tweetBank[name][idx].text,
                    id: tweetBank[name][idx].id,
                    name: realNameMap[name],
                    date: tweetBank[name].date
                })
            }
        }
        catch (error) {
            console.log(error);
        }    
    })();
});



app.listen(process.env.PORT || PORT)

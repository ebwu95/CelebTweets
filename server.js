const Twit = require('twit');
const config = require('./config');
const express = require('express');
const {TwitterApi} = require('twitter-api-v2');
const app = express();
const T = new Twit(config);
const T2 = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAFlmeAEAAAAAnRjFP45Am%2F7a1loqOOgX9HTzqck%3DluT12OOfGvj4pkkdnT8d6a3jsHkoPxR5PKhSETIk8ogL6v1Vma');

const cors = require('cors');
app.use(cors());
const PORT = 8080;

app.use(express.static('public'));

app.get('/:name', (req, res) => {
    const { name } = req.params; 
    (async () => {
        try {
            q = 'from:' + name 
    
            var curTweets = [];
            var ids = [];
            const data = await T2.v2.get('tweets/search/recent', {query: q, expansions: ["author_id"], "tweet.fields" : ["created_at"], max_results: 50});
            var author_id = 0;
            var dates = [];
            data.data.forEach(tweet => {
                curTweets.push(tweet.text);
                author_id = tweet.author_id;
                ids.push(tweet.id);
                dates.push(tweet.created_at);
            });
            const data2 = await T2.v2.get('users/' + author_id);
            var realName = data2.data.name; 
            var idx = Math.floor(Math.random() * curTweets.length);
            res.status(200).send({
                tweet: curTweets[idx],
                id: ids[idx],
                name: realName,
                date: dates[idx]
            })
        }
        catch (error) {
            console.log(error);
        }    
    })();
});



app.listen(process.env.PORT || PORT)
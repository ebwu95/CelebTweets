const Twit = require('twit')
const config = require('./config')
const express = require('express')
const app = express();
const T = new Twit(config);
const cors = require('cors')
app.use(cors())
const PORT = 8080;

app.use(express.static('public'))

app.get('/:name', (req, res) => {
    const { name } = req.params; 
    query = 'from:' + name + ' -is:retweet -is:reply -is:quote -has:links -has:mentions -has:links -has:media -has:images -has:videos -RT'
    
    let params = {
        q: query,  
        lang: 'en',
        count: 50,
    }
    function gotData(err, data, response){
        if (err) {
            res.status(400).send('no');
        }
        curTweets = [];
        ids = []
        data.statuses.forEach(tweet => {
            curTweets.push(tweet.text);
            ids.push(tweet.id);
        });

        var idx = Math.floor(Math.random() * curTweets.length);
        res.status(200).send({
            tweet: curTweets[idx],
            id: ids[idx]
        })
    }
    T.get('search/tweets', params, gotData);
});

app.listen(
    PORT,
)
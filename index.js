var dotenv = require('dotenv');
dotenv.config();
var _reddit = require('snoowrap');
var snoostorm = require('snoostorm');
var _twit = require('twit');
var isgd = require('isgd');
var r = new _reddit({
    username: process.env.reddit_username,
    password: process.env.reddit_password,
    userAgent: 'r/HifumiTakimoto Twitter Bot',
    clientId: process.env.reddit_clientID,
    clientSecret: process.env.reddit_clientSecret
});
const twit = new _twit({
    access_token: process.env.twitter_accesToken,
    access_token_secret: process.env.twitter_accesTokenSecret,
    consumer_key: process.env.twitter_consumerKey,
    consumer_secret: process.env.twitter_consumerSecret,
});

const client = new snoostorm(r);
client.SubmissionStream({
    subreddit: 'TakimotoHifumi'
}).on('submission', sub => {
    isgd.shorten('https://www.reddit.com/' + sub.subreddit_name_prefixed + '/' + sub.id, (link) => {
        twit.post('statuses/update', {
            status: '(' + link + ') ' + sub.title
        }).then((tw) => {
            console.log('Posted:' + tw.data.text);
        }).catch(err => console.log(err));
    });

});

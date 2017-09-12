var Twit = require('twit');

var T = new Twit({
    consumer_key: '41VTGK8Kr2HpycnWeP9OduXU3',
    consumer_secret: 'aNG4yOMAmF8Z6DNKvcxartPAzIzDGMYUOjy4ayZt3q9H9h1ETC',
    access_token: '901631702317051904-fuDIEp5P7KtiUnJWtSg55ERrZPE18eJ',
    access_token_secret: '7uC4SqNE3I2M1ZMi12xWxQIsJeGKRr8GLhxWOsW02Lw3g',
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests. 
})

// T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
//     console.log(data)
// })

T.get('search/tweets', { q: '@kuunganatv since:2016-07-11', count: 100 }, function(err, data, response) {

    console.log(data)
})
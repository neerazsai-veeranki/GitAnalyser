var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', async function(req, res, next) {
  var options = {
    url: process.env.GET_USER+req.query.id+'/followers',
    headers: {
      'User-Agent': 'request',
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  };

  console.log(options.url)

  await request(options, (error, response, body)=> {
    if (!error && response.statusCode === 200) {
      const result = JSON.parse(body)
      // console.log(result)
      console.log(response.headers.link)

      const arr = response.headers.link.split('>; rel="next",')
      const next = arr[0].substring(1, arr[0].length)
      const temp = arr[1].split('>; rel="last"')
      const last = temp[0].substring(2, temp[0].length)
      console.log(next)
      console.log(last)

      res.render('followers', { result });
    } else {
      console.log("Got an error: ", error, ", status code: ", response.statusCode)
    }
  })
});

module.exports = router;
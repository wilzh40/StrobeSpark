var spark = require('spark');
spark.login({accessToken: '71177b5e2ea528b6f84f2729f0017aba9071b5e0'});
var device;
/*
spark.listDevices(function(devices) {
    device = devices[0];

console.log('Device name: ' + device.name);
console.log('- connected?: ' + device.connected);
console.log('- variables: ' + device.variables);
console.log('- functions: ' + device.functions);
console.log('- version: ' + device.version);
console.log('- requires upgrade?: ' + device.requiresUpgrade);
});

*/

var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var morgan = require('morgan'); 			// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML mashup (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


// configuration =================

// connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console
/*
app.use(bodyParser.urlencoded({'extended': 'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json*/

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(methodOverride());

// listen (start app with node server.js) ======================================
var router = express.Router(); 		

// Models


// Routing
router.use(function(req, res, next) {
    // do logging
    console.log('Routing...');
    next(); // make sure we go to the next routes and don't stop here
});

app.get('/api/apis', function (req, res) {

    Api.find(function (err, apis) {
        if (err) {
            res.send (err);
        }
        res.json(apis); 
    });
});

app.post('/api/apis', function (req, res){
    Api.create({
        title : req.body.text,
        done : false
    }, function(err, Api) {
        if (err)
            res.send(err);
        res.json(Api);
        // get and return all the todos after you create another
        Api.find(function(err, apis) {
            if (err)
                res.send(err);
            res.json(apis);
        });
    });

});

router.route('/mashups')
.post(function(req,res) {
    var mashup = new Mashup();
    mashup.name = req.body.name;
    mashup.upvotes = req.body.upvotes;
    mashup.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json(mashup);
    });
})
.get(function(req,res) {
    Mashup.find(function(err,mashups) {
        if (err)
            res.send(err);
        res.json(mashups);
    });
});

// EXTERNAL REQUESTS OVER HERE
router.route('/songs')
.get(function(req,res) {
    SC.get("/groups/55517/tracks", {limit: 1}, function(tracks){
        console.log(tracks);
    });
    request("https://www.kimonolabs.com/api/99j7fzni?apikey=deEjldQkPV5fRpfyTC3L9xQpPe2VeBeS", 
            function(err, response, body) {
        console.log(JSON.parse(body).results.collection1);
        res.json(JSON.parse(body).results.collection1);
    });
});
router.route('/embedSong/')
.get(function(req,res) {
    request('http://soundcloud.com/oembed?format=json&url=' + "http://soundcloud.com/forss/flickermood", 
            function(err, response, body) {
        console.log(body);
        //  req.json(body)   
        res.json(JSON.parse(body).html);
    });

});

//{"version":1.0,"type":"rich","provider_name":"SoundCloud","provider_url":"http://soundcloud.com","height":400,"width":"100%","title":"Flickermood by Forss","description":"From the Soulhack album,\u0026nbsp;recently featured in this ad \u003Ca href=\"https://www.dswshoes.com/tv_commercial.jsp?m=october2007\"\u003Ehttps://www.dswshoes.com/tv_commercial.jsp?m=october2007\u003C/a\u003E ","thumbnail_url":"http://i1.sndcdn.com/artworks-000067273316-smsiqx-t500x500.jpg?86347b7","html":"\u003Ciframe width=\"100%\" height=\"400\" scrolling=\"no\" frameborder=\"no\" src=\"https://w.soundcloud.com/player/?visual=true\u0026url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F293\u0026show_artwork=true\"\u003E\u003C/iframe\u003E","author_name":"Forss","author_url":"http://soundcloud.com/forss"

// Default

app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

var port = 8000;
app.use('/api', router);
app.listen(port);
console.log("App listening on " + port);
var express = require('express');
var app = express();
var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient
app.use(express.json());


app.get('/listUsers', function (req, respo) {
    var url = 'mongodb://localhost:27017/fruits'
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            console.log('Connected to', url)
            var db = client.db('fruits')
            var collection = db.collection('apples');
            collection.find().toArray(function (err, res) {
                if (err) {
                    console.log(err)
                } else if (res.length) {
                    console.log("doc find", res)
                    respo.end(JSON.stringify(res))
                } else {
                    console.log('No Matches Found')
                }
                client.close();

            });

        }
    });
    // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    //    console.log( data );
    //    res.end( data );
    // });
})

app.post('/addUsers', function (req, response) {
    var url = 'mongodb://localhost:27017/fruits'
    // First read existing users.
    //  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    //     data = JSON.parse( data );
    //     data["user4"] = user["user4"];
    //     console.log( data );
    //     res.end( JSON.stringify(data));
    //  });
    console.log("Request", req.body)
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            console.log('Connected to', url)
            var db = client.db('fruits')
            var collection = db.collection('apples');
            var doc = { name: 'red apples', color: 'red' };
            var doc2 = { name: 'green apples', color: 'green' };
            var docs = []
            docs.push(doc)
            collection.insertMany(docs, function (err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("doc inserted", res.insertedCount, res)
                    response.end(JSON.stringify(res));
                }
                client.close();

            });

        }
    });
})


app.post('/editUsers', function (req, response) {
    console.log(req)
    var url = 'mongodb://localhost:27017/fruits'
    // First read existing users.
    //  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    //     data = JSON.parse( data );
    //     data["user4"] = user["user4"];
    //     console.log( data );
    //     res.end( JSON.stringify(data));
    //  });
    var data={'name':'red apples'}
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            console.log('Connected to', url)
            var db = client.db('fruits')
            var collection = db.collection('apples');
            collection.updateMany({'name':'red apples'}, {$set: {'color':'blue'}}, function (err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("doc inserted", res.insertedCount, res)
                    //response.end(JSON.stringify(res));
                    collection.find().toArray( function (err, res) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("doc inserted", res.insertedCount, res)
                            response.end(JSON.stringify(res));
                        }
                        client.close();
        
                    });
        
                }

            });
          
        }
    });
})


app.get('/getUser', function (req, response) {
    // First read existing users.
    // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    //    var users = JSON.parse( data );
    //    var user = users["user" + req.params.id] 
    //    console.log( user );
    //    res.end( JSON.stringify(user));
    // });
    var url = 'mongodb://localhost:27017/fruits'
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err)
        } else {
            console.log('Connected to', url)
            var db = client.db('fruits')
            var collection = db.collection('apples');
            collection.find({ "_id":"60d0d6fa34d78b543076dbca"}).toArray(function (err, res) {
                if (err) {
                    console.log(err)
                } else if (res.length) {
                    console.log("doc find", res)
                    response.end(JSON.stringify(res));
                } else {
                    console.log('No Matches Found')
                }
                client.close();

            });

        }
    });
})

var server = app.listen(process.env.PORT || 8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
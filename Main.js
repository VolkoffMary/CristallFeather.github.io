const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const http = require('http');
const static = require('node-static');
const file = new static.Server('.');
const express = require('express');
const app = express();

// http.createServer(function(req, res) {
//     res.writeHeader(200, {"Content-Type": "text/html"});  
//     res.write('MainPage.html');  
//     console.log('Server running on port 8080');
//     res.end();    
// }).listen(8080);

//login
login = 'AlasER';

//password
pass = 'LunaLina';

// Connection URL
url = 'mongodb://' + login + ':' + pass + '@mycluster-shard-00-00-w2hxl.mongodb.net:27017,mycluster-shard-00-01-w2hxl.mongodb.net:27017,mycluster-shard-00-02-w2hxl.mongodb.net:27017/test?ssl=true&replicaSet=myCluster-shard-0&authSource=admin&retryWrites=true';

// Database Name
const dbName = 'Patients&Doctors';

// Use connect method to connect to the server

app.use(express.static('./public/'));

app.route('/doctors/')
    .get((req, res) => docLookup(res))

app.route('/doctors/:id')
    .get(function(req, res) {
        docLookup(res, req.param('id'));
    })
    .post(function(req, res) {
        res.send('Add a book');
    });

function docLookup(res, user_id) {
    MongoClient.connect(url, function(err, client) {
        console.log("Connecting to server...");    
        assert.equal(null, err);
        console.log("Connected successfully to server");
        
        //Collection name
        col = 'Doctors';
        const db = client.db(dbName);
        findDocuments(db, col, user_id, function(doc) {
            res.send(doc);
            client.close();
        })
    })
}
// app.get('/doctors', (req, res) =>  MongoClient.connect(url, function(err, client) {
//                                         console.log("Connecting to server...");    
//                                         assert.equal(null, err);
//                                         console.log("Connected successfully to server");
                                        
//                                         //Collection name
//                                         var user_id = req.param('id');
//                                         col = 'Doctors';
//                                         const db = client.db(dbName);
//                                         findDocuments(db, col, user_id, function(doc) {
//                                             res.send(doc);
//                                             client.close();
//                                         })
//                                     })
// )

//res.send([{name : 'ABC', created : 123}])
app.listen(8080, () => console.log('I am up on :8080'));

//================================================

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection(col);
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

const findDocuments = function(db, col, user_id, callback) {
    // Get the documents collection
    const collection = db.collection(col);
    // Find some documents
    if (user_id != undefined) { 
        console.log('LOOKA FOR A >>>>>>>>>', user_id); 
        var docs = collection.findOne({_id : ObjectID(user_id)}).then(doc => {
            console.log('FOND AND FOUND >>>>>>>>>', doc);        
            callback(doc);
        });
        // console.log("Found the following record");
        // console.log(docs);
        // callback(docs);
    } else {
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            callback(docs);
        });        
    }
}

const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection(col);
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 2");
        callback(result);
    });  
}

const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection(col);
  // Delete document where a is 3
  collection.deleteOne({ a : 1 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    
}

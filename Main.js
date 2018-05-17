const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const http = require('http');
const static = require('node-static');
const file = new static.Server('.');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

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
    .get((req, res) => {
        col = 'Doctors';
        docLookup(res, col)
    });

app.route('/doctors/:id')
    .get(function(req, res) {
        col = 'Doctors';
        docLookup(res, col, req.param('id'));
    })
    .post(function(req, res) {
        col = 'Doctors';
        docUpdate(req.body, res, col, req.param('id'));
        res.redirect(`/DoctorView.html?id=${req.param('id')}`);
    });

function docLookup(res, col, user_id) {
    MongoClient.connect(url, function(err, client) {
        console.log("Connecting to server...");    
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        findDocuments(db, col, user_id, function(doc) {
            res.send(doc);
            client.close();
        })
    })
}

function docUpdate(formData, res, col, user_id) {
    MongoClient.connect(url, function(err, client) {
        console.log("Connecting to server...");    
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        updateDocument(db, col, user_id, formData, function() {
            client.close();
        })
    })
}

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
    } else {
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            callback(docs);
        });        
    }
}

const updateDocument = function(db, col, user_id, formData, callback) {
    // Get the documents collection
    const collection = db.collection(col);
    // Update document
    collection.updateOne({ _id : ObjectID(user_id) }, { $set: formData }, function(err, result) {
    //   console.log('ARRR"', err)
        
        assert.equal(err, null);
        console.log("Updated the document");
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

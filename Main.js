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

app.route('/')
    .get((req, res) => {
		res.redirect(`/MainPage.html`);
    });

app.route('/doctors/')
    .get((req, res) => {
        var col = 'Doctors';
        docLookup(res, col)
    })
    .post(function(req, res) {
        var col = 'Doctors';
        docCreate(req.body, res, col);
        res.redirect(`/DoctorsList.html`);           
    })    

app.route('/doctors/:id')
    .get(function(req, res) {
        var col = 'Doctors';
        docLookup(res, col, req.param('id'));
    })
    .post(function(req, res) {
        var col = 'Doctors';
        docUpdate(req.body, res, col, req.param('id'));
        res.redirect(`/DoctorView.html?id=${req.param('id')}`);            
    })
    .delete(function(req, res) {
        var col = 'Doctors';
	    console.log(req.param('id'))
        docDelete(res, col, req.param('id'));
        res.redirect(`/DoctorsList.html`);
    })

app.route('/patients/')
    .get((req, res) => {
        var col = 'Patients';
        docLookup(res, col)
    })
    .post(function(req, res) {
        var col = 'Patients';
        docCreate(req.body, res, col);
        res.redirect(`/PatientList.html`);           
    })    

app.route('/patients/:id')
    .get(function(req, res) {
        var col = 'Patients';
        docLookup(res, col, req.param('id'));
    })
    .post(function(req, res) {
        var col = 'Patients';
        docUpdate(req.body, res, col, req.param('id'));
        res.redirect(`/FormView.html?id=${req.param('id')}`);            
    })
    .delete(function(req, res) {
        var col = 'Patients';
	    console.log(req.param('id'))
        docDelete(res, col, req.param('id'));
        res.redirect(`/PatientList.html`);
    })

const PORT = process.env.PORT; 
app.listen(PORT, () => console.log('I am up on PORT'));

//=============================================================================

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

function docCreate(formData, res, col) {
    MongoClient.connect(url, function(err, client) {
        console.log("Connecting to server...");    
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        insertDocument(db, col, formData, function() {
            client.close();
        })
    })
}

function docDelete(res, col, user_id) {
    MongoClient.connect(url, function(err, client) {
        console.log("Connecting to server...");    
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        removeDocument(db, col, user_id, function() {
            client.close();
        })
    })
}

//================================================

const insertDocument = function(db, col, formData, callback) {
    // Get the documents collection
    const collection = db.collection(col);
    // Insert some documents
    collection.insertOne( formData, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted document into the collection");
        console.log(result);
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

const removeDocument = function(db, col, user_id, callback) {
  // Get the documents collection
  const collection = db.collection(col);
  // Delete document
  console.log(user_id)
//   collection.deleteOne({ _id : ObjectID(user_id) }, function(err, result) {
//     assert.equal(err, null);
//     console.log("Removed the document");
//     callback(result);
//   });    
}

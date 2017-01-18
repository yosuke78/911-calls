var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://localhost:27017/911-calls';

//calls around Landsale
var numberCallsLandsale = function(db, callback){
    var radius = 0.310686 / 3963.2;
    db.collection('calls').count({ loc: { $geoWithin: { $centerSphere: [ [ -75.283783, 40.241493 ] , radius ] } } }, (err, count) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("There are " + count + " calls around Lansdale.")
        }
    })
    callback()
}

var numberCallsEMS = function(db, callback){
    db.collection('calls').count({$text: {$search: "EMS"}}, (err, count) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("There are " + count + " calls about EMS.")
        }
    })
    callback()
}

var numberCallsFire = function(db, callback){
    db.collection('calls').count({$text: {$search: "Fire"}}, (err, count) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("There are " + count + " calls about Fire.")
        }
    })
    callback()
}

var numberCallsTraffic = function(db, callback){
    db.collection('calls').count({$text: {$search: "TrafficS"}}, (err, count) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("There are " + count + " calls about Traffic.")
        }
    })
    callback()
}

MongoClient.connect(mongoUrl, (err, db) => {
    numberCallsLandsale(db, (err) => {
        if (err) {
            console.log(err)
        }
    })

    numberCallsEMS(db, (err) => {
        if (err) {
            console.log(err)
        }
    })

    numberCallsFire(db, (err) => {
        if (err) {
            console.log(err)
        }
    })

    numberCallsTraffic(db, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            db.close()
        }
    })

});
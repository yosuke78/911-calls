var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://localhost:27017/911-calls';

//calls around Landsale
var numberCalls = function(db, callback){
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


MongoClient.connect(mongoUrl, (err, db) => {
    numberCalls(db, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            db.close;
        }
    })
});
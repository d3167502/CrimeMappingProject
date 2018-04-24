var mongojs  = require('mongojs');
var db = mongojs('mongodb://d3167502:12345@ds237409.mlab.com:37409/crimedata',['crimerecord']);

module.exports.showAll = function(req, res, next) {
    console.log("Showing all now..");
    db.crimerecord.find(function(err, records){
        if(err){
            res.send(err);
        }
        res
        .status(200)
        .json(records);
    })
    
}

module.exports.addOne = function(req, res, next) {
    console.log("Adding one on server now..");
    var r = req.body;
    if (!r.location.lat || !r.location.lng || !r.time || !r.type)
    {
        res
        .status(400)
        .json({"error": "Bad Data"});
    } else {
        db.crimerecord.save(r, function(err, r){
            if(err){
                res.send(err);
            }
            res.json(r);
        });
    }
}

module.exports.delete = function(req, res, next) {
    console.log("Delete one now..");
    db.crimerecord.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, records){
        if(err){
            res.send(err);
        }
        res.json(records);
    });
}

module.exports.login = function(req, res, next) {
    console.log("Log in now..");
    db.crimerecord.find(function(err, records){
        if(err){
            res.send(err);
        }
        res
        .status(200)
        .json(records);
    })
    
}
const express = require("express");
const router = express.Router();
const Ninja = require('../models/ninja')

// get a list of ninjas from the db
router.get('/ninjas', (req, res, next) => {
   /* Ninja.find({}).then(function(ninjas){
        res.send(ninjas);
    }); */
    Ninja.geoNear(
        {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function(ninjas){
        res.send(ninjas);
    });
});

// add a new ninja to the db
router.post('/ninjas', (req, res, next) => {
    Ninja.create(req.body).then(function(ninja){  //.create will create instance and then save it
            res.send(ninja);    //display the new ninja to user
    }).catch(next);
});

// update a ninja in the db
router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
 
        });
    });
});

// delete a ninja from the db
router.delete('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    });
    res.send({type: 'DELETE'});
});

module.exports = router;
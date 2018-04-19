var express = require('express');
var router = express.Router();
const path = require('path');

var recordController = require('../controllers/recordContoller')
router
    .route('/')
    .get(function(req, res){
        console.log('try to render..')
        res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
        console.log('success')
    });

    router
    .route('/showAll')
    .get(recordController.showAll);
    router

    .route('/login')
    .get(recordController.login);

    router
    .route('/add')
    .post(recordController.addOne);

    router
    .route('/delete/:id')
    .delete(recordController.delete);

    router
    .route('/search/:name')
    .get();

module.exports = router;
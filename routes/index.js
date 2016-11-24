var express = require('express');
var router = express.Router();

var models = require('../models/index'),
    User = models.User,
    Pic = models.Pic;

/* GET home page. */
router.get('/', function(req, res) {
  Pic.find({}).populate('owner').exec(function(err, pics){
    if(err){
      // show error on home page
    }else{
      var processedPics = pics.map(function(pic){
        return {
          url: pic.url,
          title: pic.title,
          likes: pic.vote.length,
          owner: pic.owner,
          id: pic._id
        }
      });

      res.render('index', {
        user: req.user,
        pics: processedPics,
        currentpage: 'all'
      });
    }
  });
});

module.exports = router;

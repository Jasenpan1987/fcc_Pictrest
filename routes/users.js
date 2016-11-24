var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middlewares').isLoggedIn;

var models = require('../models/index'),
    User = models.User,
    Pic = models.Pic;

/* GET users listing. */
router.get('/', isLoggedIn, function(req, res) {

  Pic.find({owner: req.user._id}).populate('owner').exec(function(err, pics){
    if(err){
      return res.redirect(302, '/');
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

      res.render('mypics', {
        user: req.user,
        pics: processedPics,
        currentpage: 'mypic'
      });
    }
  });
});

module.exports = router;

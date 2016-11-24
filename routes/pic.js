var express = require('express');
var router = express.Router();

var isLoggedIn = require('../middlewares').isLoggedIn;

var models = require('../models/index'),
    User = models.User,
    Pic = models.Pic;

router.post('/newpic', isLoggedIn, function(req, res){

    if(!req.body.imgurl||!req.body.imgtitle){
        return res.redirect(302, '/');
    }
    var newPic = new Pic();
    newPic.url = req.body.imgurl;
    newPic.title = req.body.imgtitle;
    newPic.owner = req.user._id;
    newPic.vote = [];
    newPic.save(function(err){
        if(err){
            res.redirect(302, '/');
        }else{
            res.redirect(302, '/');
        }
    });
});

router.get('/like', isLoggedIn, function(req, res){
    var imgid = req.query.imgid;
    if(!imgid){

        res.redirect(302, '/');
    }else{
        Pic.findOne({_id: imgid}, function(err, pic){
            if(err){
                console.log(err)
                res.redirect(302, '/');
            }else{
                if(!pic){
                    console.log('no pic')
                    res.redirect(302, '/');
                }else{
                    var pic = pic;
                    if(pic.vote.indexOf(req.user._id)==-1){
                        pic.vote.push(req.user._id);
                        pic.save(function(err1){
                            if(err1){
                                console.log('err1')
                                res.redirect(302, '/');
                            }else{
                                res.redirect(302, '/');
                            }
                        })
                    }else{
                        res.redirect(302, '/');
                    }
                }
            }
        });
    }
});


router.get('/delete', isLoggedIn, function(req, res){
    var imgid = req.query.imgid;
    if(!imgid) return res.redirect(302, '/');

    Pic.remove({_id: imgid, owner: req.user._id}, function(err){
        if(err){
            res.redirect(302, '/');
        }else{
            res.redirect(302, '/users');
        }
    })
});

module.exports = router;
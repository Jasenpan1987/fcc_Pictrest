
var isLoggedIn =  function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
};

module.exports = {
    isLoggedIn: isLoggedIn
};
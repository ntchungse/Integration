
module.exports.requireLogin = function(req,res,next){
    if(!req.session.loggedIn){
        res.redirect('login');
        return;
    }
    next();
};
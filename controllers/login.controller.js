var connection = require('../database')

module.exports.index = function(req,res){
   if(req.session.loggedIn===true){
      res.redirect('/dashboard');
   }else{
      res.render('login');
   }
};
module.exports.postLogin = function(req,res){
   let username = req.body.username;
   let password = req.body.password;
   connection.query('SELECT * FROM users WHERE User_Name = ? AND Password = ?', [username, password], function(error, results, fields){
      if(results.length > 0){
         req.session.loggedIn = true;
         req.session.username = username;
         res.redirect('/dashboard');
      }else{
         res.render('login',{errors:['Something went wrong!']});
      }
   })
}
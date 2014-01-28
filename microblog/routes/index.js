
/*
 * GET home page.
 */

var crypto = require('crypto');
     var User = require('../models/user.js');
exports.index = function(req, res){
  res.render('layout', { title: '首頁' });
};

exports.user = function(req, res) {

};

exports.post = function(req,res){

};

exports.reg = function(req,res){
  res.render('reg', {title:'使用者註冊'});
  
};

exports.doReg = function(req,res){

if (req.body['password-repeat'] != req.body['password'])
    {
    
 req.flash('error', '兩次輸入密碼不一樣');
   // req.session.messages = ['兩次密碼輸入不同'];  
   return res.redirect('/reg');
    }    
     
      var md5 = crypto.createHash('md5');
     var password = md5.update(req.body.password).digest('base64');
     var newUser = new User({ name: req.body.username, password: password, });
     //
     User.get(newUser.name, function(err, user) {
        if (user){
              err = 'Username already exists.';
                 }
         if (err){
            // req.flash('error', err);
return res.redirect('/reg');
              }
       newUser.save(function(err) {
             if (err){
return res.redirect('/reg');
}
req.session.user = newUser;
//req.flash('success', '註冊成功');
res.redirect('/');
});
});

};
             

exports.login = function(req,res){

};

exports.doLogin = function(req,res){

};

exports.logout = function(req,res){

};

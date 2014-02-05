
/*
 * GET home page.
 */

var User = require('../models/user.js');
var Post = require('../models/post.js');
exports.index = function(req, res){
	Post.get(null, function(err, posts){
	if (err){
		post = [];
		}
  res.render('layout', { title: '首頁',user: req.session.user,posts:posts,success:req.flash('success').toString() });
});
};
exports.dopost = function(req, res) {
res.render('post',{title:'發表',user:req.session.user, success:req.flash('success').toString(), error:req.flash('error').toString()});
};

exports.post = function(req,res){
var currentUser = req.session.user;
var post = new Post(currentUser.name, req.body.title, req.body.post);
	post.save(function(err){
			if (err){
				req.flash('error',err);
				return res.redirect('/');
				}
			req.flash('success');
			res.redirect('/');
	});
	};

exports.reg = function(req,res){
  res.render('reg', {title:'使用者註冊',user:req.session.user,success:req.flash('success').toString(),error:req.flash('error').toString()});

};

exports.doReg = function(req,res){

  if (req.body['password-repeat'] != req.body['password'])
  {

     req.flash('error', '兩次輸入密碼不一樣');
    // req.session.messages = ['兩次密碼輸入不同'];  
    return res.redirect('/reg');
  }    

  //var md5 = crypto.createHash('md5');
  //var password = md5.update(req.body.password).digest('base64');
  var newUser = new User({ name: req.body.username, password: req.body.password, });

 
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
      req.flash('success', '註冊成功');
      res.redirect('/');
      });
    });
};


exports.login = function(req,res){
 res.render('login',{
            title:'登入',
            user:req.session.user,
            success:req.flash('success').toString(),
            error:req.flash('error').toString()
        }); 
};

exports.doLogin = function(req,res){
 User.get(req.body.username, function(err, user){
    var password = req.body.password ;
//	console.log(user);
            if(!user){
                req.flash('error', '用户不存在'); 
                return res.redirect('/login'); 
            }
            if(user.password !=password){
               console.log(password);
		console.log(user.password);
                req.flash('error', '密碼錯誤'); 
                return res.redirect('/login');
            }
            req.session.user = user ;
		console.log(req.session.user);
            req.flash('success','登入成功');
            res.redirect('/');
        });

};

exports.logout = function(req,res){
   req.session.user = null;
        req.flash('success','登出成功');
        res.redirect('/');


};

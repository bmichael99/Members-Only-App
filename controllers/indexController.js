const { body, validationResult } = require("express-validator");
const db = require("../db/queries")
const passport = require("passport");
const bcrypt = require("bcryptjs")
const isAuth = require("./authMiddleware").isAuth;
require('dotenv').config()


exports.showHomePage = async (req,res) => {
  //Can do this instead of passing in req.user to the template. 
  //Now we can access this local variable in any view
  const messages = await db.getMessages();
  //if(req.session)
    //console.log(req.session);
  //console.log(messages);
  res.locals.user = req.user; 
  res.locals.messages = messages;
  //console.log(req.user);
  res.render('index', {title: 'Express Template!'});
};



exports.showSignUp = (req,res) => {
  res.render('sign-up-form');
};

exports.SignUpPost = async (req,res, next) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.createUser(req.body.first_name, req.body.last_name, req.body.username,hashedPassword);
    res.redirect("/");
  }
  catch(err){
    return next(err);
  }
};

exports.LogInPost = (req,res,next) => {
    passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
    })(req, res, next);
};

exports.LogOutGet = (req,res,next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};


exports.showJoinClubPage = (req,res) => {
  res.render('join-club-form', {title: 'Join Club'});
};

exports.JoinClubPost = (req,res) => {
  if(req.body.secret_password == process.env.SECRET_PASSWORD)
    db.upgradeMember(req.user.id);

  res.redirect("/");
};

exports.showCreateMessagePage = (req,res) => {
  res.render('create-message-form', {title: 'Create Message'});
};

exports.CreateMessagePost = async (req,res) => {
  //console.log(req.body);
  await db.createMessage(req.body.message_title,req.body.message_content,req.user.id);
  res.redirect("/");
};

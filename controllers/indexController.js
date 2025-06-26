const { body, validationResult } = require("express-validator");
const db = require("../db/queries")
const passport = require("passport");
const bcrypt = require("bcryptjs")


exports.showHomePage = (req,res) => {
  //Can do this instead of passing in req.user to the template. 
  //Now we can access this local variable in any view
  res.locals.user = req.user; 

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
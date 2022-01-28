const User         = require('../models/User');
const PasswordHash = require('password-hash');
var jwt            = require('jsonwebtoken');


exports.createUser = async(req, res) => {
  var user = await User.findOne({
    email: req.body.email
  });

  if (user) {
    return res.send({
      message: "User already exists"
    });
  }

  if (!req.body.name) {
    return res.send({
      message: "Name is required"
    });
  }

  if (!req.body.email) {
    return res.send({
      message: "Email is required"
    });
  }

  if (!req.body.phone) {
    return res.send({
      message: "Phone is required"
    });
  }

  if (!req.body.password) {
    return res.send({
      message: "Password is required"
    });
  }

  if (!req.body.confirm_password) {
    return res.send({
      message: "Confirm Password is required"
    });
  }

  if (req.body.password !== req.body.confirm_password) {

    return res.send({
      message: "Both passwords do not match"
    });
  }
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: PasswordHash.generate(req.body.password),
    phone: req.body.phone,
  });


  user = await user.save();
  if (user) {
    res.status(200).send({
      message: "Registered"
    });
  }
}

exports.login = async(req, res) => {
  var user = await User.findOne({
    email: req.body.email
  });

  if (!user) {
    return res.send({
      message: "User does not exists"
    });
  }

  if (!req.body.email) {
    return res.send({
      message: "Email is required"
    });
  }

  if (!req.body.password) {
    return res.send({
      message: "Password is required"
    });
  }

  if (user) {
    if(PasswordHash.verify(req.body.password, user.password)){
      var token = jwt.sign({ 
        exp: Math.floor(Date.now() / 1000) + (60 * 60), 
        data: {name: user.name, email: user.email} 
      }, 'shhhhh');

      var user = await User.findOneAndUpdate({email: req.body.email},{$set :{token : token}});

      return res.send({
        message: "Logged in Successfully.",
        token: token
      });
    }
    else{
      return res.send({
        message: "Wrong Password."
      });
    }
  }  

}





'use strict';

// dependencies
const express = require('express');
const users = require('./models/users-model.js');
const basic = require('./middleware/basic.js');
const bearer = require('./middleware/bearer.js'); 
const oauth = require('./middleware/oauth.js');

// Storing the router in a variable
const router = express.Router();

// SIGN UP ROUTE 
router.post('/signup', async(req, res, next) => {
  let userData = {
    username: req.body.username, 
    password: req.body.password,
    role: req.body.role || 'guest',
  }
// creates a new instance of the mongo schema...
  let record = new users(userData);
  let newUser = await record.save();
    // console.log(req.body);
    res.status(201)
    .json({token : newUser.generateToken()});

    next();

}); 

// SIGN IN ROUTE 
router.post('/signin', basic, (req, res, next) => {
  
  let output = {
    user: req.username, 
    token: req.token
  }

  // set a Cookie and a Token header on the response, with token as the value

        res.status(200)
        .cookie('cookieToken')
       .header('token', output.token)
       .json(output); 

  next();

});

// USERS ROUTE 
router.get('/users', basic, async (req, res, next) => {

// returns a JSON obj with all of the users
  let allUsers = await users.find();

  res.status(201)
  .json(allUsers);

  next();
});


// SECRET / BEARER ROUTE

router.get('/secret', bearer, (req, res, next) => {
  // return a status of 201 with the user object. 
  res.status(201)
  .json(req.user); 

  next();
});

// OAUTH ROUTE
router.get('/oauth', oauth, (req, res) => {
  res.status(200).send('ok');
});

module.exports = router; 
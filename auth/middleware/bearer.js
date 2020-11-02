'use strict';

// 1. Write the bearer auth module: logic that does the bearer auth 
// 2. Update the users model, for token validation 
// 3. Add a route that tests out the bearer auth 
// 4. Add two security features : two easiest ones

const base64 = require('base-64');
const users = require('../models/users-model');

module.exports = async (req, res , next) => {

    // Incoming:
    // Authorization : bearer fsdfsdfmskfnmlkenfl(TOKEN)
    // Authorization : basic user:pass

  try{
    let authorization = req.headers.authorization;
    let token = authorization.split(' ')[1];

    //get user instance from the model if we can
    let userRecord = await users.validateToken(token);
    //this returns a promise

    if(userRecord == undefined) {
      next('Invalid token');
    } else {
      // Finding the user by the token!
      // compare the token 
      // if it's good carry on my wayward son

      req.user = userRecord;

      next();
      //res.send('signin complete');
    }

  } catch (err) {
    next("Invalid Token");
  }

}

// Authorization header and our token. 
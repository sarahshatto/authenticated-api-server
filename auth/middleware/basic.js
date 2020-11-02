'use strict';

const base64 = require('base-64');
const users = require('../models/users-model');

module.exports = async (req, res , next) => {


  try{
    let authorization = req.headers.authorization;
    // console.log(`authorization = ${authorization}`);
    let encoded = authorization.split(' ')[1]
    // console.log(`encoded = ${encoded}`);
    let creds = base64.decode(encoded);
    // console.log(`creds = ${creds}`);
    let [username, password] = creds.split(":");

    // console.log(`basic.js : username = ${username}, password = ${password}`);

    //get user instance from the model if we can
    let userRecord = await users.validateBasic(username, password);//this returns a promise

    console.log('made user record');
    req.token = userRecord.generateToken();

    // console.log({ authorization })
    // console.log({ encoded })
    // console.log({ creds })
    //console.log(username, password);


    // Look up the user by the username
    // compare the password sent against the password in the db
    // if it's good, send a token, if not, send an Error
    req.user = userRecord;

    next();
    //res.send('signin complete');

  } catch (err) {
    console.log(err);
    next("Invalid Login");
  }

}
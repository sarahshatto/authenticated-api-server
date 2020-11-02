'use strict'; 

// dependencies needed: 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// define a secret: 
const secret = 'sauce';

// build a schema: rules for data to be entered in
const users = mongoose.Schema({
  username: {type: String, required: true}, 
  password: {type: String, required: true},
  role: {
    type: String,
    required: true,
    default: 'guest',
    enum: ['guest', 'user', 'admin'],
  },
});

// The permissions each role has by role
const permissionsByRole = {
  guest: ['read'],
  user: ['read', 'create'],
  admin: ['read', 'create', 'update', 'delete'],
};

// encrypt the password.. this is called everytime before .save is called. 
users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
  console.log('the password is', this.password);
});

// creating a json web token 
users.methods.generateToken = function() {
  let token = jwt.sign({ username: this.username }, secret);
  return token;
};

// static --- this works without an instance/user record.generateToken()

//  Lookup the user by the username 
users.statics.validateBasic = async function (username, password) {
  let user = await this.findOne({ username: username });
  // console.log('found', user);
  // Compare the entered password sent against what we have in the db
  let isValid = await bcrypt.compare( password, user.password );

  if (isValid) {
    return user;
  } else {
    return undefined;
  }
  
}

users.statics.validateToken = async function (token){
 
 try {
   // use jwt.verify to undo what jwt.sign did, returns an object containing the username 
  let userObject = jwt.verify(token, secret); 

// create a variable that is the true username
  let username = userObject.username;   
  
// Lookup in the database and find the username
  let userRecord = await this.findOne({ username: username }); 
  // return it
  return userRecord; 

 } catch (error) {
   console.log('Invalid Token part 2')
   return undefined;
 }; 

}

users.statics.getOauthUser = async function (userID){
  // need to see if this username already exists within the database: 
  // if it does: return it from the database
  // if it does not: create a new username, make up a password, and then return the new user 

  let userRecord = await this.findOne({ username: userID });

  if(userRecord){
    return userRecord;
  }
  else {
    let newUser = new UserModel({ 
      username: userID,
      password: Math.random()
    });
    return await newUser.save();
  };
};

// Check user capability
users.methods.can = function (capability) {
  // check our role capabilities array by this role to see if we can do this
  return permissionsByRole[this.role].includes(capability);
};

const UserModel = mongoose.model('users', users);
module.exports = UserModel;
 
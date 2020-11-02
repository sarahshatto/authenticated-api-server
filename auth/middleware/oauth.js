// 1. cache out all of the values that we have in the .env 
// 2. Req.query will contain a code: and that code is what we have to use to verify the user data with our Oauth server
// 3. Once we get it back, we need to create or GET our local user data based off of the github user data. 
// 4. Set the user and a token in the request. 
// 5. El fin. 

'use strict';

require('dotenv').config();
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const state = process.env.STATE;
const tokenServer = process.env.TOKEN_SERVER;
const redirectURI = process.env.REDIRECT_URI;
const remoteAPI = process.env.REMOTE_API;
const superagent = require('superagent'); 
const users = require('../models/users-model.js');

module.exports = async (req, res, next) => {
  try {
    // authentication has already happened on github, and github has passed this code to us
    let code = req.query.code; 
    //post to ..
    let tokenServerResponse =  await superagent.post(tokenServer).send({ 
      code: code, 
      client_id: clientID,
      client_secret: clientSecret,
      redirect_uri: redirectURI,
      state: state, 
      grant_type: 'authorization_code'
    });

    let remoteToken = tokenServerResponse.body.access_token; 

    let userResponse = await superagent.get(remoteAPI).set('user-agent', 'express-server').set('Authorization', `token ${remoteToken}`);
    
    let remoteUser = userResponse.body; 

    let localUser = await users.getOauthUser(remoteUser.login);

    req.user = localUser;
    req.token = localUser.generateToken();

    next();

  } catch (error) {
    console.log(error);
     next('Invalid Token');
  }
};

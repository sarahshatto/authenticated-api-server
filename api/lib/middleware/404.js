// Sends a 404/Not-Found message as the response (does not call .next())
// Import this into your server and set it up to be “used” after your other routes

'use strict';

module.exports = (req, res) => {
  res.status(404).send('Sorry! Page not found');
}
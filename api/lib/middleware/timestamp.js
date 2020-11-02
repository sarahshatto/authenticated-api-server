'use strict';

// Javascript is able to give you it's date- In terminal, run "Node" and hit enter. Creating a new date object will give you the first chunk. Once you're running node, run "new Date()" 2020-08-30T04:36:17.247Z. This is gross. So turn it into a string with .toString() , new Date().toString() gives us 'Sat Aug 29 2020 21:36:56 GMT-0700 (Pacific Daylight Time)' >> to cut this down, use slice. 'Sat Aug 29 2020 21:37:15'

module.exports = (req, res, next) => {
  req.reqTime = new Date().toString().slice(0,24);
  next();
}

// what this is really doing: between the client and your route handler- this reaches up, grabs your request, and then brings it back and tells it to move on. Like a conveyor belt. 


'use strict';

const user = require('../models/users-model');

module.exports = (capability) => {
    return (req, res, next) => {
        // req.user should be valid since it should be set in auth
        if (req.user.can(capability)) {
        next();
        } else {
        next('Invalid capabilities');
        }
    };
};
  
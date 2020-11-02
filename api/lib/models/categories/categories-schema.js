'use strict'; 

const mongoose = require('mongoose');

const categoriesModel = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('categoriesModel', categoriesModel);
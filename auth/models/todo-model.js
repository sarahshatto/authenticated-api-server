'use strict';

const mongoose = require('mongoose');

// Schema defintion
const todo = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Todo', todo);
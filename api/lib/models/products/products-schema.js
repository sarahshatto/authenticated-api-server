'use strict';

const mongoose = require('mongoose');

// Schema defintion
const Product = new mongoose.Schema({
  name: { type: String, required: true, },
  display_name: { type: String, required: true, },
  description: { type: String, required: true, },
  categroy: { type: String, required: true, },
  id: { type: Number, required: true, },
});

module.exports = mongoose.model("Product", Product);
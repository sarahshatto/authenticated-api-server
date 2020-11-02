'use strict';

const products = require('../models/products/products-collection.js');
const categories = require('../models/categories/categories-collection.js');

function modelFinder(req, res, next) {
  let model = req.params.model;

  switch (model) {
    case 'products':
    req.model = products;
  next()
  return;
    case 'categories':
    req.model= categories;
  next()
  return;
  default:
    next('Sorry, No Model!');
    return;
  }
}

module.exports = modelFinder;
'use strict';

const productSchema = require('./products-schema.js');

/*
Imports the schema
Exports a class with CRUD methods, coded to work with your schema
    read() performs a find() query in your schema
    create() performs a save() query in your schema for a new record
    update() performs a findOneByIdAndUpdate() operation in your schema for an existing record
    delete() performs a findOneByIdAndDelete() in your schema for a new record
*/

const Model = require('../mongo.js');

class Product extends Model {
    constructor() {
        super(schema);
    }
};

module.exports = new Product();
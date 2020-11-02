'use strict'; 

const express = require('express');
const router = express.Router();

const product = require('../lib/models/products/products-collection.js');
const categories = require('../lib/models/categories/categories-collection.js');
const modelFinder = require('../lib/middleware/model-finder.js');

// What we want is that /api/v1/<model>/ ends up using the right module from the models folder
// Let the class lead the "how" discussion and land on a simplistic solution like this one
// Lab will be for them to make this 100% dynamic and safe

router.param('model', modelFinder);

// Route Definitions
router.get('/api/v1/:model', handleGetAll);
router.get('/api/v1/:model/:id', handleGetOne);

router.post('/api/v1/:model', handlePost);

router.put('/api/v1/:model/:id', handleUpdate);

router.delete('/api/v1/:model/:id', handleDelete);


// Route Handlers
async function handleGetAll(req, res, next) {
    req.model.get()
        .then(results => {
        let count = results.length;
        res.json({ count, results });
        })
        .catch(next);
}

function handleGetOne(req, res, next) {
    let id = req.params.id;

    req.model.get(id)
        .then(record => res.json(record))
        .catch(next);
}

function handlePost(req, res, next) {
    req.model.post(req.body)
        .then(result => res.json(result))
        .catch(next);
}

function handleUpdate(req, res, next) {
    let id = req.params.id;

    req.model.update(id, req.body)
        .then(result => res.json(result))
        .catch(next);
}

function handleDelete(req, res, next) {
    let id = req.params.id;

    req.model.delete(id)
        .then(result => res.json({}))
        .catch(next);
}

module.exports = router;
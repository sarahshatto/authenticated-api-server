'use strict';

const express = require('express');

const router = express.Router();

const products = [
    {
        name: "FirstProductTest",
        display_name: "FirstProductTestDisplayName",
        description: "FirstProductTestDescription",
        category: "FirstProductTestCategory",
        id: 1
    },
    {
        name: "SecondProductTestCategory",
        id: 2
    },
    {
        name: "3rdProductTestCategory",
        display_name: "2ndProductTestDisplayName",
        description: "2ndProductTestDescription",
        category: "2ndProductTestCategory",
        id: 3
    }
];

router.post('/products', (req, res) => {
    // pushing the req.body into products... it's a post
    products.push(req.body);
    // If everything goes well...send a pretty response!  
    res.status(200).json(req.body);
    // console.log(req.body);
});

// I want the API to return an object containing count and a results[] array.
router.get('/products', (req, res) => {
    res.json({
        count: products.length,
        results: products
    });
});
  
router.get('/products/:id', (req, res) => {
    // looking for a specific item (id) within the array - .filter to go through -
    let idFinder = products.filter(obj => {
        if (obj.id === req.params.id.toString()){ 
            return obj;
        } else {
            return false;
        }
    })
    // send a response with your results at the first position
    res.status(200).json(idFinder[0]);
});
  
router.put('/products/:id', (req, res) => {
    // need it to find the id from the params
    // need to replace w/ req.body
    let results;
    // go through the array , for every object that's passed in, we ask if any objects within the products array have an id that matches the req.params.id (the user input). 
    // If it does, we store the index position of that obect in the results variable. 
    // then go into the products array at that index position and replace it with req.body;
    products.forEach((obj, i) => {
    if (obj.id === req.params.id.toString()){ 
        results = i;
    }
    });
    products[results] = req.body; 
    res.status(200).json(req.body);
});
  
router.delete('/products/:id', (req, res) => {  
    let deleteResult;
    products.forEach((obj, i) => {
    if (obj.id === req.params.id.toString()){ 
        deleteResult = i;
    }
    });
    delete products[deleteResult]; 
    res.status(200).json('successfully deleted');
});
  
module.exports = router;
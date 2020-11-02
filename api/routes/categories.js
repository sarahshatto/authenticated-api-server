'use strict';

const express = require('express');

const router = express.Router();

const categories = [
    {
        name: "FirstTest",
        display_name: "FirstTestDisplayName",
        description: "FirstTestDescription",
        id: 1
    },
    {
        name: "Test2",
        display_name: "2ndTestDisplayName",
        description: "2ndTestDescription",
        id: 2
    }
];

//  //  //  //  CATEGORIES  //  //  //  //  

router.post('/categories', (req, res) => {
    // pushing the req.body into categories... it's a post
    categories.push(req.body);
    // If everything goes well...send a pretty response!  
    res.status(200).json(req.body);
    // console.log(req.body);
});

// I want the API to return an object containing count and a results[] array.
router.get('/categories', (req, res) => {
    res.json({
      count: categories.length,
      results: categories
    })
});
  
router.get('/categories/:id', (req, res) => {
    // looking for a specific item (id) within the array - .filter to go through -
    let categoriesIdFinder = categories.filter(obj => {
        if (obj.id === req.params.id.toString()){ 
            return obj;
        } else {
            return false;
        }
    })
    // send a response with your results at the first position
    res.status(200).json(categoriesIdFinder[0]);
});
  
router.put('/categories/:id', (req, res) => {
    let categoryResults;
    categories.forEach((obj, i) => {
        if (obj.id === req.params.id.toString()){ 
            categoryResults = i;
        }
    });
    
    categories[categoryResults] = req.body; 
    res.status(200).json(req.body);
});
  
router.delete('/categories/:id', (req, res) => {
    let categoryDeleteResult;
    categories.forEach((obj, i) => {
        if (obj.id === req.params.id.toString()){ 
            categoryDeleteResult = i;
        }
    });
    delete categories[categoryDeleteResult]; 
    res.status(200).json('successfully deleted');
});

module.exports = router;
'use strict';

const express = require('express');
const router = express.Router();
const todo = require('./auth/models/todo-model.js');

router.post('/todo', addSingleItem);
router.get('/todo', getAllItems);

router.put('/todo/:id', updateSingleItem);
router.get('/todo/:id', getSingleItem);

router.delete('/todo/:id', removeSingleItem);

async function addSingleItem(req, res) {
  // Create an id if one is not provided
  let todoData = {
    name: req.body.name,
    id: req.body.id,
  };

  let record = new todo(todoData);
  let newTodo = await record.save();

  // Add a new todo entry
  res.status(201).json(newTodo);
}

async function getAllItems(req, res) {
  let todoEntries = await todo.find();

  // Add a new todo entry
  res.status(201).json(todoEntries);
}

async function updateSingleItem(req, res) {
  let todoEntry = await todo.findOne({ id: req.params.id });

  if (todoEntry == undefined) {
    res.status(404).send('Entry not found');
  } else {
    todoEntry.name = req.body.name;
    todoEntry = await todoEntry.save();

    // Add a new todo entry
    res.status(201).json(todoEntry);
  }
}

async function getSingleItem(req, res) {
  let todoEntry = await todo.findOne({ id: req.params.id });

  if (todoEntry == undefined) {
    res.status(404).send('Entry not found');
  } else {
    res.status(201).json(todoEntry);
  }
}

async function removeSingleItem(req, res) {
  // Attempt to delete by id
  let deleteCount = await todo.deleteOne({ id: req.params.id });

  res.status(201).json({});
}

module.exports = router;

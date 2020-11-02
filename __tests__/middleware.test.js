'use strict';

// bringing in my files to be 
const timestamp = require('../lib/middleware/timestamp.js');
const logger = require('../lib/middleware/logger');

let req = {};
let next = jest.fn();
let res = {};

describe('testing the logger', () => {

  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    })
  afterEach(() => {
    consoleSpy.mockRestore();
  })

  it('it should console log', () => {
    logger(req, res, next)
    expect(consoleSpy).toHaveBeenCalled();
    })

  it('it should move to the next middleware', () => {

    logger (req, res, next)
    expect(next).toHaveBeenCalledWith()
  })

  })

  describe('testing the timestamp', () => { 
    it('it should add the time stamp',() => {
      timestamp(req, res, next)
      expect(req.reqTime).not.toBeNull()
    })

    it('it should move to the next middleware', () => {
      timestamp(req, res, next)
      expect(next).toHaveBeenCalledWith()
    })
  })
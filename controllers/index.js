const { Router } = require('express');
const { clientResponse } = require('../utils/clientResponse');
const { User } = require('../db/models');

// TODO: This file should probably be removed, and the healthcheck endpoint moved to the app.js file

const router = Router();


/** Simple test route or ping route to check availability */
router.get('/', (req, res) => {
  res.render('index');
});

/** Express sanitizer */
router.post('/', (req, res) => {
  // replace an HTTP posted body property with the sanitized string
  req.body.sanitized = req.sanitize(req.body.propertyToSanitize);
  // send the response
  res.send(`Your value was sanitized to: ${req.body.sanitized}`);
});

module.exports = router;

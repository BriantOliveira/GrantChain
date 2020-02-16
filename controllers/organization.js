const { Router } = require('express');
const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const { clientResponse } = require('../utils/clientResponse');

const { Op } = Sequelize;
const router = Router();

router.get('/ethdenver', (req, res) => {
  res.render('profile');
});

router.get('/spaceforhumanity', (req, res) => {
  res.render('space');
});

router.get('/spaceforhumanity/edit', (req, res) => {
  res.render('editProfile');
});

router.get('/collaboration', (req, res) => {
  res.render('collab');
});

module.exports = router;
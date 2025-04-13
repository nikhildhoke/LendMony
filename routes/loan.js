var express = require('express');
var router = express.Router();

router.get('/request', (req, res) => {
  res.render('loan-request');
});

router.get('/offers', (req, res) => {
  res.render('loan-offers');
});

router.get('/manage', (req, res) => {
  res.render('loan-manage');
});

module.exports = router;

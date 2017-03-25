var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/weatherchart', function(req, res, next) {
  res.render('weatherchart', { title: 'Express' });
});

router.get('/weatherchart2', function(req, res, next) {
  res.render('weatherchart2', { title: 'Express' });
});
module.exports = router;

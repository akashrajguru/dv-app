var express = require('express');
var router = express.Router();
	var path = require('path');
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

router.get('/drilldown', function(req, res, next) {
  res.render('drilldown', { title: 'Express' });
});

router.get('/weatherchart3', function(req, res, next) {
  res.render('weatherchart3', { title: 'Express' });
});

router.get('/hourly.json', function(req, res, next) {
	//var file = '../fakeData.json'
	//console.log('inside hourly',file);
  //res.sendFile(path.normalize(file)) 
  res.sendFile('./hourly.json', { root: __dirname });
});

module.exports = router;

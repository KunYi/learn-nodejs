
// to loading dependencies module
var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function(req, res) {
	var q = req.query.q;
	var md5Value = utility.md5(q);
	var sha1Value = utility.sha1(q);

	var result = 'md5:' + md5Value + '<br \\>';
	result += 'sha1:' + sha1Value;
	res.send(result);
	});

app.listen(3000, function (req, res) {
	console.log('app is running at port 3000');
});



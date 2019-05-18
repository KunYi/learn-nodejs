
// to loading dependencies module
// test query api
//      http://localhost:3000/?q=test
// will response
//      md5:098f6bcd4621d373cade4e832627b4f6
//      sha1:a94a8fe5ccb19ba61c4c0873d391e987982fbbd3
//
var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function(req, res) {
	var q = req.query.q;
	var result;
	if (q == null ) {
		result = '<div>none query variable</div>';
		result += '<div>example:</div>';
		result += '<div>localhost:3000/?q=test</div>';
	}
	else {
		var md5Value = utility.md5(q);
		var sha1Value = utility.sha1(q);
		result = '<div>query:' + q + '</div>';
		result += '<div>';
		result += 'md5:' + md5Value + '<br \\>';
		result += 'sha1:' + sha1Value;
		result += '</div>';
	}
	res.send(result);
});

app.listen(3000, function (req, res) {
	console.log('app is running at port 3000');
});



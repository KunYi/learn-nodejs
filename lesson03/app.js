
// loading modules
var express = require('express');
var superagent = require('superagent'); // http agent
var cheerio = require('cheerio'); // for process css selector

var app = express();

app.get('/', function(req, res, next) {
	superagent.get('https://cnodejs.org/')
		.end(function (err, sres) {
			// exception 
			if (err) {
				return next(err);
			}
			
			var $ = cheerio.load(sres.text);
			var items = [];
			var user;
			var title;
			$('#topic_list .topic_title, .user_avatar').each( function ( idx, element) {
				if (idx % 2) {
					title = $(element);
					items.push ({
						title: title.attr('title'),
						href: title.attr('href'),
						author: user
					});
				}
				else { 
					user = $(element).children('img').attr('title');
				}
			});
			res.send(items);
			console.log(items);
		});
});

app.listen(3000, function (req, res) {
		console.log('app is running at port 3000');
});

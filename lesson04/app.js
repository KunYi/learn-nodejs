
// loading modules
var superagent = require('superagent'); // http agent
var cheerio = require('cheerio'); // for process css selector
var eventproxy = require('eventproxy');

var url = require('url');

const cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
	.end(function (err, sres) {
	// exception 
	if (err) {
		return console.error(err);
	}
	
	var topicUrls = [];
	var $ = cheerio.load(sres.text);

	$('#topic_list .topic_title').each(function (idx, element) {
		var $element = $(element);
		var href = url.resolve(cnodeUrl, $element.attr('href'));
		topicUrls.push(href);
	});

	console.log(topicUrls);
	console.log(topicUrls.length)

	var ep = new eventproxy();
	// prepare callback function
	ep.after('topic_html', topicUrls.length, function(topics) {
		topics = topics.map(function (topicPair) {
			var topicUrl = topicPair[0];
			var topicHtml = topicPair[1];
			var $ = cheerio.load(topicHtml);
			return ({
				title: $('.topic_full_title').text().trim(),
				href: topicUrl,
				comment1: $('.reply_content').eq(0).text().trim(),
			  });
		})
		console.log('final:');
		console.log(topics);
	})

	topicUrls.forEach(function (topicUrl) {
		superagent.get(topicUrl)
		  .end(function (err, res) {
			console.log('fetch ' + topicUrl + ' successful');
			ep.emit('topic_html', [topicUrl, res.text]);
		  });
	});
});




var async = require('async')

var conCurrencyCount = 0;
var fetchUrl = function (url, callback) {
    // delay is randrom and less 2000
    let delay = parseInt((Math.random() * 10000000) % 2000, 10);
    conCurrencyCount++;
    console.log('Concurrency Counter:', conCurrencyCount, 
        ', fetching:', url, ', time:', delay, 'millisecond');
    setTimeout(function (){
        conCurrencyCount--;
        callback(null, url + ', html content');
        }, delay);
};

var urls = [];
const fakeUrl = 'http://datasource_';

for (var i = 0; i < 30; i++) {
    urls.push(fakeUrl + i);
}

console.log(urls);
async.mapLimit(urls, 5, function (url, callback) {
    fetchUrl(url, callback);
}, function (err, result) {
    console.log('final:')
    console.log(result)
})

'use strict';

import * as async from 'async';

var conCurrencyCount = 0;
var fetchUrl = function (url: string, callback: (err: Error, url: string) => void)  {
    // delay is randrom and less 2000
    let delay = (Math.random() * 10000000) % 2000;
    conCurrencyCount++;
    console.log('Concurrency Counter:', conCurrencyCount, 
        ', fetching:', url, ', time:', delay, 'millisecond');
    setTimeout(function (){
        conCurrencyCount--;
        callback(null, url + ', html content');
        }, delay);
};

var urls: string[] = [];
const fakeUrl: string = 'http://datasource_';

for (var i = 0; i < 30; i++) {
    urls.push(fakeUrl + i);
}

console.log(urls);
async.mapLimit(urls, 5, function (url: string, callback: (error: Error, url: string) => void) {
    fetchUrl(url, callback);
}, function (err: Error, result: string[]): void {
    console.log('final:');
    console.log(result);
})
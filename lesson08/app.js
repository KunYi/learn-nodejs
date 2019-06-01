'use strict';

var express = require( 'express' );

var fibonacci = function (n) {
    // for error check
    // due to NaN === number type
    if (typeof(n) !== 'number' || isNaN(n)) 
        throw new Error('n should be a number');
    if (n < 0)
        throw new Error('n should >= 0');
    if (n > 10)
        throw new Error('n should <= 10');

    if (n === 0)
        return 0;

    if (n === 1)
        return 1;
    
    return fibonacci( n-1 ) + fibonacci( n-2 );
}

var app = express();

app.get('/fib', (req, res) => {
    let v = parseInt(req.query.n, 10);
    try {
        res.send(String(fibonacci(v)));
    } catch (e) {
        res
          .status(500)
          .send(e.message);
    }
});

module.exports = app;

app.listen(3000, function () {
    console.log('app is listening at port 3000');
});
'use strict';

var fibonacci = function (n) {
    if (n === 0)
        return 0;

    if (n === 1)
        return 1;
    
    return fibonacci( n-1 ) + fibonacci(n-2);
}

if (require.main === module) {
    let v = parseInt(process.argv[2], 10);
    console.log('fibonacci(', v, ') is ', fibonacci(v));    
}
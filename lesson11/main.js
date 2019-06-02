"use strict";

var value;

function foo () {
    value = "hello";
}

foo();

console.log(value);
console.log(global.value);

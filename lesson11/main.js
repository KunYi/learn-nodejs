"use strict";

let value;
global.value = "world"; // must assign/create the variable for below console.log ref.
this.value = "just for test";

function foo () {
    value = "hello";
}

foo();

console.log(value);
console.log(global.value);

let adder = function (x) {
    var base = x;
    return function (n) {
      return n + base;
    };
};

let add10 = adder(10);
console.log(add10(5));

let add20 = adder(20);
console.log(add20(5));

let test1Bad = () => {
    // error result for ref. variable to same
    for (var i = 0; i < 5; i++) {
        setTimeout(function () {
         console.log(i);
        }, 5);
    }
}

let test1Okay = () => {
// correct result for new local variable to store 'i' value
    for (var i = 0; i < 5; i++) {
        (function (idx) {
        setTimeout(function () {
            console.log(idx);
            }, 5);
        })(i);
    }
}

test1Bad();
test1Okay();

let myObject = {value: 100};
myObject.getValue = function () {
  var foo = function () {
    console.log(this);//undefine, due to 'foo' not myObject member/method
  };

  foo();
  return this.value;
};

console.log(myObject.getValue()); // => 100

var myObject1 = {value: 100};
myObject1.getValue = function () {
  console.log(this.value);  // 輸出 100

  // 輸出 { value: 100, getValue: [Function] }，
  // 其實就是 myObject1 本身
  console.log(this);

  return this.value;
};

console.log(myObject1.getValue()); // => 100
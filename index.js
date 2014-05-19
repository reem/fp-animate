var Lazy = require('lazy.js');

module.exports = { animate: animate };

function animate(animator, stepper, stopper, start, wait) {
  _animate(animator, Lazy.takeWhile(not(stopper), iterate(stepper, start))); 
}

function _animate(animator, sequence, wait) {
  animator(sequence.first());
  if (typeof wait === 'number') {
    setTimeout(function () {
      _animate(animator, sequence.rest(), wait);
    }, wait);
  } else {
    requestAnimationFrame(function () {
      _animate(animator, sequence.rest(), wait);
    });
  }
}

function iterate(stepper, start) {
  var current;

  return Lazy.generate(function () {
    if (current === undefined) {
      current = start;
    } else {
      current = stepper(current);
    }
    return current;
  });
}

function not(fn, c) {
  return function () { return !fn.apply(c, arguments); };
}
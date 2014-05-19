var Lazy = require('lazy.js');

module.exports = { animate: animate };

/**
 * Performs a lazy, time-space animation given its arguments.
 * @param  {function} animator animates a particular state of the generated sequence
 * @param  {function} stepper  takes a state and returns the next state 
 * @param  {function} stopper  takes a state and returns a boolean that instructs the loop whether to continue animating. 
 * @param  {state} start       an object representing the initial state of your animated object 
 * @param  {number} wait       optional - the interval time between animations. animate will use requestAnimationFrame if this is not passed in
 */
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
# fp-Animate

A teeny-tiny library for doing animations in a functional programming style.

Provides a single function, animate, which generates a lazy sequence based
on passed in functions and calls a provided animation function on the
intermediate states every x ms or using requestAnimationFrame.

Crucially, animate will not generate the entire sequence before animating,
so it can be extremely useful to use this when generating intermediate states
is very computationally expensive (i.e. when drawing a particle system).

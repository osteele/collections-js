Status
======
This library predates [Underscore], [Underscore.string], and [Lowdash],
which I now recommend (and personally use) instead.

Additionally, modern versions of JavaScript (as of ECMAScript 5) include a number of Array methods
(`forEach`, `every`, `some`, `reduce`, `filter`, `indexOf`, `lastIndexOf`, and `reduceRight`),
that provide a substantial subset of what this library provides.
[Modern browsers](http://kangax.github.io/es5-compat-table/) support these methods.

Finally, [es5-shim] is an alternative to Underscore etc. that extends pre-ECMAScript 5 JavaScript implementations with the ECMAScript 5 array methods.

[Underscore]: http://underscorejs.org
[Underscore.string]: http://epeli.github.io/underscore.string/
[Lowdash]: http://lodash.com
[es5-shim]: https://github.com/kriskowal/es5-shim

Collections JS
==============

Framework-independent JavaScript collection methods, for use in
browser JavaScript and in ActionScript.

The Array and String methods use prototype extension; Hash methods use
a proxying wrapper to avoid prototype pollution.  The methods with the
same names as the ECMAScript 1.6+ extensions have the same spec as
those; the ones with the same name as prototype extensions have the
same spec as those in the Prototype library; and there's a few odds
and ends such as String#capitalize.

The methods are documented in lib/collections.js, and speced (for
further documentation, as well as testing) in spec/*.js.

License
=======
Copyright 2007-2008 by Oliver Steele.  Available under the MIT License.

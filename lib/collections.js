/* Copyright 2007-2008 by Oliver Steele.  All rights reserved. */

/*
 * JavaScript 1.6 Array extensions
 *
 * http://developer.mozilla.org/en/docs/New_in_JavaScript_1.6
 */

/** This method returns true if each call to `fn` returns true.
  * `fn` is called with each item and its index.  
  */
Array.prototype.every = function(fn, thisObject) {
    var len = this.length;
    for (var i = 0 ; i < len; i++)
        if (!fn.call(thisObject, this[i], i, this))
            return false;
    return true;
}

/** This method returns true if some call to `fn` returns true.
  * `fn` is called with each item and its index.  
  */
Array.prototype.some = function(fn, thisObject) {
    var len = this.length;
    for (var i = 0 ; i < len; i++)
        if (fn.call(thisObject, this[i], i, this))
            return true;
    return false;
}

/** Returns a subarray for which `fn` returns true.
  * `fn` is called with each item and its index.  
  */
Array.prototype.filter = function(fn, thisObject) {
    var len = this.length,
        results = [];
    for (var i = 0 ; i < len; i++)
        if (fn.call(thisObject, this[i], i, this))
            results.push(this[i]);
    return results;
}

/** Runs `fn` for each item in the array.
  * `fn` is called with each item and its index.  
  */
Array.prototype.forEach = function(fn, thisObject) {
    var len = this.length;
    for (var i = 0 ; i < len; i++)
        if (typeof this[i] != 'undefined')
            fn.call(thisObject, this[i], i, this);
}

/** Returns the index such that this[index] === searchElement,
  * or -1.
  *
  * The `fromIndex` parameter is not implemented.
  */
Array.prototype.indexOf = function(searchElement/*, fromIndex*/) {
    var len = this.length;
    for (var i = 0; i < len; i++)
        if (this[i] == searchElement)
            return i;
    return -1;
}

/** Runs a function on every item in the array and returns the results
  * in an array.
  */
Array.prototype.map = function(fn, thisObject) {
    var len = this.length,
        result = new Array(len);
    for (var i = 0; i < len; i++)
        if (typeof this[i] != 'undefined')
            result[i] = fn.call(thisObject, this[i], i, this);
    return result;
}


/*
 * Prototype Array extensions
 *
 * These have the same spec as in the Prototype library.
 */

/** Returns a copy of this array without null and undefined elements. */
Array.prototype.compact = function() {
    var results = [];
    this.forEach(function(item) {
        item == null || item == undefined || results.push(item);
    });
    return results;
}

/** Returns the first element e of this array such that fn(e, ix)
  * is true, where ix is the array index.  Returns null if no
  * such element exists.
  */
Array.prototype.detect = function(fn, thisObject) {
    for (var i = 0; i < this.length; i++)
        if (fn.call(thisObject, this[i], i, this))
            return this[i];
    return null;
}

/** A synonym for Array#forEach. */
Array.prototype.each = Array.prototype.forEach;

/** Returns true iff an element of this array is == `item`. */
Array.prototype.find = function(item) {
    for (var i = 0; i < this.length; i++)
        if (this[i] == item)
            return true;
    return false;
}

/** A synonym for Array#find. */
Array.prototype.contains = Array.prototype.find;

/** Invokes the `name` method of each element of this array,
  * and returns a new array of the results.  Additional arguments
  * to this method are supplied as arguments to the `name` method.
  */
Array.prototype.invoke = function(name) {
    var result = new Array(this.length),
        args = [].slice.call(arguments, 1);
    this.forEach(function(item, ix) {
        result[ix] = item[name].apply(item, args);
    });
    return result;
}

/** Returns an array of the values of the `name` property of each
  * element of this array.
  */
Array.prototype.pluck = function(name) {
    var result = new Array(this.length);
    this.forEach(function(item, ix) {
        result[ix] = item[name];
    });
    return result;
}

/** A synonym for Array#filter. */
Array.prototype.select = Array.prototype.filter;

/** Returns the sum of the items of this array, which should be numeric. */
Array.prototype.sum = function() {
    var sum = 0;
    this.forEach(function(n) {sum += n});
    return sum;
}

/** Returns a copy of this array not including any items == item. */
Array.prototype.without = function(item) {
    return this.filter(function(it) {
        return it != item;
    });
}


/*
 * Other array extensions
 */

/** Returns a string: the string representations of the elements,
  * interpolated by ','.
  */
Array.prototype.commas = function() {
    return this.join(',');
}

/** Returns the minimum of the elements of this array, which should
  * be numeric.
  */
Array.prototype.min = function() {
    var n = Infinity;
    for (var i = 0, len = this.length; i < len; i++)
        n = Math.min(n, this[i]);
    return n;
}

/** Returns the maximum of the elements of this array, which should
  * be numeric.
  */
Array.prototype.max = function() {
    var n = -Infinity;
    for (var i = 0, len = this.length; i < len; i++)
        n = Math.max(n, this[i]);
    return n;
}

/** Returns the last element of this array, or null if it is empty.
  */
Array.prototype.last = function() {
    var length = this.length;
    return length ? this[length-1] : null;
}

/** Returns a partition of the elements of this array by `fn`.  The
  * return value is a hash, where the keys are the values returned by
  * `fn` and the values are lists of elements with those keys.
  */
Array.prototype.partitionBy = function(fn) {
    var partitions = {};
    for (var i = 0, len = this.length; i < len; i++) {
        var item = this[i],
            key = fn(item, i),
            partition = partitions[key];
        if (!partition)
            partition = partitions[key] = [];
        partition.push(item);
    }
    return partitions;
}



/*
 * Monadic Arrays
 */

/** Return an array.  Identity for arrays; same as monadic `return`
  * for other values.
  */
Array.toList = function(ar) {
    return ar instanceof Array ? ar : [ar];
}

/** Return a non-array.  Returns the first element of an array;
  * identity for other values.
  */
Array.fromList = function(ar) {
    return ar instanceof Array ? ar[0] : ar;
}


/*
 * Prototype Hash utilities
 *
 * An framework-netural implementation of the Prototype Hash
 * API.  See http://www.prototypejs.org/api/hash
 */

function $H(object) {
    return object instanceof Hash ? object : new Hash(object);
}

function Hash(object) {
    this.hash = object;
}

Hash.prototype.each = function(fn) {
    var hash = this.hash,
        ix = 0;
    for (var key in hash)
        fn({key:key, value:hash[key]}, ix++);
}

Hash.prototype.keys = function() {
    var hash = this.hash,
        keys = [];
    for (var key in hash)
        keys.push(key);
    return keys;
}

Hash.prototype.merge = function(source) {
    var hash = this.hash;
    for (var key in source)
        hash[key] = source[key];
    return hash;
}

Hash.prototype.toQueryString = function() {
    var hash = this.hash,
        words = [];
    for (name in hash) {
        var value = hash[name];
        typeof value == 'function' ||
            words.push([name, '=', value].join(''));
    }
    words.sort();
    return words.join('&');
}

Hash.prototype.values = function() {
    var hash = this.hash,
        values = [];
    for (var key in hash)
        values.push(hash[key]);
    return values;
}


/*
 * Other Hash extensions
 */

Hash.prototype.compact = function() {
    var hash = this.hash,
        result = {};
    for (var name in hash) {
        var value = hash[name];
        if (value != null && value != undefined)
            result[name] = value;
    }
    return result;
}

Hash.prototype.items = function() {
    var hash = this.hash,
        result = [];
    for (var key in hash)
        result.push({key:key, value:hash[key]});
    return result;
}

Hash.prototype.map = function(fn) {
    var hash = this.hash,
        result = [];
    for (var key in hash)
        result.push(fn({key:key, value:hash[key]}));
    return result;
}


/*
 * String utilities
 */

/** Return this string with its first letter uppercase. */
String.prototype.capitalize = function() {
    return this.slice(0,1).toUpperCase() + this.slice(1);
}

/** Replace the four XML characters by entities. */
String.prototype.escapeHTML = function() {
    return (this.replace('&', '&amp;')
            .replace('<', '&lt;')
            .replace('>', '&gt;')
            .replace('"', '&quot;'));
}

/** An interesting and complicated function that I will document later. */
String.prototype.inflect = function(suffix) {
    var index = this.indexOf(' ');
    if (index >= 0)
        return this.slice(0, index).inflect(suffix) + this.slice(index);
    // pos == 'v', or vp has single word
    var vowels = "aeiou",
        inflections = {'ed': {'set': 'set'}},
        key = this.toLowerCase(),
        value = (inflections[suffix]||{})[key];
    if (!value) {
        value = key;
        var lastChar = key.charAt(key.length-1);
        info(0, key);
        switch (lastChar) {
        case 'y':
            if (suffix == 'ed')
                value = value.slice(0, value.length-1) + 'i';
            break;
        case 'e':
            value = value.slice(0, value.length-1);
            break;
        }
        if (key == value &&
            // CVC -> VCVV
            vowels.indexOf(value.charAt(value.length-1)) < 0 &&
            vowels.indexOf(value.charAt(value.length-2)) >= 0 &&
            vowels.indexOf(value.charAt(value.length-3)) < 0)
            value += value.charAt(value.length-1);
        value += suffix;
    }
    // TODO: capitalize
    return value;
}

/** Dirt-cheap pluralization: adds 's' if count != 1 */
String.prototype.pluralize = function(count) {
    if (arguments.length && count == 1)
        return this;
    return this+'s';
}

/** Return a string without start and trailing whitespace. */
String.prototype.strip = function() {
    // uses ws instead of regular expressions, so that this will
    // compile with OpenLaszlo
    var ws = " \t\n\r";
    for (j = this.length; --j >= 0 && ws.indexOf(this.charAt(j)) >= 0; )
        ;
    for (i = 0; i < j && ws.indexOf(this.charAt(i)) >= 0; i++)
        ;
    return 0 == i && j == this.length-1 ? this : this.slice(i, j+1);
}

/** If this string is longer than `length`, trim it to `length`
  * and add `ellipsis`.
  */
String.prototype.truncate = function(length, ellipsis) {
    return (this.length <= length
            ? string
            : string.slice(0, length) + ellipsis);
}
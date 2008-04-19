describe('Array.every', {
    'should return true': function() {
        value_of([1, 2].every(function(x){return x>0})).should_be(true);
    },
    'should return false': function() {
        value_of([1, 2].every(function(x){return x>1})).should_be(false);
    },
    'should return true for an empty list': function() {
        value_of([].every(function(x){return x>1})).should_be(true);
    }
});

describe('Array.some', {
    'should return true': function() {
        value_of([1, 2].some(function(x){return x>1})).should_be(true);
    },
    'should return false': function() {
        value_of([1, 2].some(function(x){return x>2})).should_be(false);
    },
    'should return false for an empty list': function() {
        value_of([].some(function(x){return x>1})).should_be(false);
    }
});

describe('Array.filter', {
    'should remove some elements': function() {
        value_of([1, 2].filter(function(x){return x>1})).should_be([2]);
    }
});

describe('Array.forEach', {
    'should apply fn to each element': function() {
        var visited = [];
        [1, 2].forEach(function(x){visited.push(x)});
        value_of(visited).should_be([1,2]);
    }
});

describe('Array.indexOf', {
    'should return the least index': function() {
        var ix = [1, 2, 3, 2].indexOf(2);
        value_of(ix).should_be(1);
    },
    
    'should return -1 when no item matches': function() {
        var ix = [1, 2, 3, 2].indexOf(5);
        value_of(ix).should_be(-1);
    },
    
    'should return -1 when the array is empty': function() {
        var ix = [].indexOf(2);
        value_of(ix).should_be(-1);
    }
});

describe('Array.map', {
    'should apply fn to each item': function() {
        var value = [1, 2, 3].map(function(x){return x + 1});
        value_of(value).should_be([2, 3, 4]);
    }
});

describe('Array.compact', {
    'should remove null': function() {
        value_of([1,null,2].compact()).should_be([1,2]);
    },
    'should remove undefined': function() {
        value_of([1,undefined,2].compact()).should_be([1,2]);
    },
    'should remove multiple null values': function() {
        value_of([1,null,2,null].compact()).should_be([1,2]);
    },
    'should leave 0 alone': function() {
        value_of([1,0,2].compact()).should_be([1,0,2]);
    },
});

describe('Array.detect', {
    'should return the first matching item': function() {
        var value = [1, 2, 3, 2].detect(function(x){return x > 1});
        value_of(value).should_be(2);
    },
    
    'should return null when no item matches': function() {
        var value = [1, 2, 3, 2].detect(function(x){return x == 5});
        value_of(value).should_be(null);
    },
    
    'should return null when the array is empty': function() {
        var value = [].detect(function(x){return x == 5});
        value_of(value).should_be(null);
    }
});

describe('Array.find', {
    'should find the item': function() {
        var value = [1, 2, 3, 2].find(2);
        value_of(value).should_be(true);
    },
    
    'should return false when no item matches': function() {
        var value = [1, 2, 3, 2].find(5);
        value_of(value).should_be(false);
    },
    
    'should return false when the array is empty': function() {
        var value = [].find(2);
        value_of(value).should_be(false);
    }
});

describe('Array.invoke', {
    'should call the method': function() {
        function C(x) { this.x = x }
        C.prototype.m = function() {return this.x};
        var ar = [new C(2), new C(3)];
        value_of(ar.invoke('m')).should_be([2,3]);
    }
});

describe('Array.pluck', {
    'should retrieve the property': function() {
        function C(x) { this.x = x }
        var ar = [new C(2), new C(3)];
        value_of(ar.pluck('x')).should_be([2,3]);
    }
});

describe('Array.sum', {
    'should sum the values': function() {
        value_of([1,2,3].sum()).should_be(6);
    },
    'should return 0 when the list is empty': function() {
        value_of([].sum()).should_be(0);
    }
});

describe('Array.without', {
    'should remove all copies of the value': function() {
        value_of([1,2,3,2,4].without(2)).should_be([1,3,4]);
    }
});


describe('Array.min', {
    'should return the min': function() {
        value_of([1,2,3].min()).should_be(1);
    },
    'should return Infinity when the list is empty': function() {
        value_of([].min()).should_be(Infinity);
    }
});


describe('Array.max', {
    'should return the max': function() {
        value_of([1,2,3].max()).should_be(3);
    },
    'should return -Infinity when the list is empty': function() {
        value_of([].max()).should_be(-Infinity);
    }
});

describe('Array.commas', {
    'should join the values': function() {
         value_of([1,2,3].commas()).should_be('1,2,3');
    },
    'should return the item string when the array is unary': function() {
         value_of(['x'].commas()).should_be('x');
    },
    'should return the empty string when the array is empty': function() {
         value_of([].commas()).should_be('');
    }
});

describe('Array.last', {
    'should return the last value': function() {
        value_of([1,2,3].last()).should_be(3);
    },
    'should return the null string when the array is empty': function() {
        value_of([].last()).should_be(null);
    }
});

describe('Array.partitionBy', {
    'should partition': function() {
        var part = [1,2,10,11,22].partitionBy(function(x) {return x % 10});
        value_of(part[0]).should_be([10]);
        value_of(part[1]).should_be([1,11]);
        value_of(part[2]).should_be([2,22]);
    }
});

describe('Array.slice', {
    'should slice': function() {
        var array = [1,2,10,11,22];
        value_of(Array.slice(array, 0).join(',')).should_be([1,2,10,11,22].join(','));
        value_of(Array.slice(array, 1).join(',')).should_be([2,10,11,22].join(','));
        value_of(Array.slice(array, 1, 3).join(',')).should_be([2,10].join(','));
    }
});

describe('pluck', {
    'should work with map': function() {
        value_of([{x:1,y:2}, {x:3,y:4}].map(pluck('x'))).should_be([1,3]);
    },
    'should work with select': function() {
        var array = [{x:1,y:2}, {z:3,w:4}];
        var result = array.select(pluck('x'));
        value_of(result.length).should_be(1);
        value_of(result[0]).should_be(array[0]);
    }
});

describe('Array.toList', {
    'should be identity on arrays': function() {
        value_of(Array.toList([1,2])).should_be([1,2]);
    },
    'should inject non-arrays': function() {
        value_of(Array.toList(1)).should_be([1]);
    }
});

describe('Array.fromList', {
    'should be extract the first element from a list': function() {
        value_of(Array.fromList([1,2])).should_be(1);
    },
    'should be identity on non-arrays': function() {
        value_of(Array.fromList(1)).should_be(1);
    }
});

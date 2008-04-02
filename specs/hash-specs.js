describe('$H', {
    'should return a Hash': function() {
        value_of($H({}) instanceof Hash).should_be(true);
    },
    'should be idempotent': function() {
        var h = $H({});
        value_of($H(h)).should_be(h);
    }
});

describe('Hash.each', {
    'should visit each item': function() {
        var visits = 0;
        $H({a:1, b:2}).each(function(item) { visits++ });
        value_of(visits).should_be(2);
    },
    'should supply the keys': function() {
        var visits = [];
        $H({a:1, b:2}).each(function(item) { visits.push(item.key) });
        value_of(visits).should_be(['a', 'b']);
    },
    'should visit the values': function() {
        var visits = [];
        $H({a:1, b:2}).each(function(item) { visits.push(item.value) });
        value_of(visits).should_be([1,2]);
    }
});

describe('Hash.keys', {
    'should return a list of keys': function() {
        value_of($H({a:1, b:2}).keys()).should_be(['a','b']);
    }
});

describe('Hash.merge', {
    'should fill in unspecified values': function() {
        var h = $H({a:1, b:2}).merge({b:3, c:4});
        value_of(h.c).should_be(4);
    },
    'should replace overridden values': function() {
        var h = $H({a:1, b:2}).merge({b:3, c:4});
        value_of(h.b).should_be(3);
    },
    'should leave values non-overridden values intact': function() {
        var h = $H({a:1, b:2}).merge({b:3, c:4});
        value_of(h.a).should_be(1);
    }
});

describe('Hash.toQueryString', {
    'should join values with &': function() {
        value_of($H({a:1, b:2}).toQueryString()).should_be('a=1&b=2');
    },
    'should return null when there are no values': function() {
        value_of($H({}).toQueryString()).should_be('');
    }
});

describe('Hash.values', {
    'should return a list of values': function() {
        value_of($H({a:1, b:2}).values()).should_be([1, 2]);
    }
});

describe('Hash.compact', {
    'should remove null-valued items': function() {
        var h = $H({a:null, b:2}).compact();
        value_of('a' in h).should_be(false);
    },
    'should remove undefined-valued items': function() {
        var h = $H({a:undefined, b:2}).compact();
        value_of('a' in h).should_be(false);
    },
    'should remove multiple null-valued items': function() {
        var h = $H({a:null, b:2, c:null}).compact();
        value_of('a' in h).should_be(false);
        value_of('c' in h).should_be(false);
    },
    'should leave 0-valued items': function() {
        var h = $H({a:0, b:2}).compact();
        value_of('a' in h).should_be(true);
    },
});

describe('Hash.items', {
    'should return a list of items': function() {
        var items = $H({a:1, b:2}).items();
        value_of(items.length).should_be(2);
        value_of(items[0].key).should_be('a');
        value_of(items[0].value).should_be(1);
        value_of(items[1].key).should_be('b');
        value_of(items[1].value).should_be(2);
    }
});

describe('Hash.map', {
    'should apply the function to each item': function() {
        var results = $H({a:1, b:2}).map(function(item) {
            return [item.key, '->', item.value].join('');
        });
        value_of(results).should_be(['a->1', 'b->2']);
    }
});

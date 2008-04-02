describe('String.capitalize', {
    'should capitalize the first letter': function() {
        value_of('some Text'.capitalize()).should_be('Some Text');
    },
    'should be identity on an empty string': function() {
        value_of(''.capitalize()).should_be('');
    }
});

describe('String.escapeHTML', {
    'should quote &': function() {
        value_of('a & b'.escapeHTML()).should_be('a &amp; b');
    }
});

describe('String.pluralize', {
    'should add s': function() {
        value_of('dog'.pluralize()).should_be('dogs');
    },
    'should pluralize when count == 0': function() {
        value_of('dog'.pluralize(0)).should_be('dogs');
    },
    'should pluralize when count > 1': function() {
        value_of('dog'.pluralize(2)).should_be('dogs');
    },
    'should not pluralize when count == 1': function() {
        value_of('dog'.pluralize(1)).should_be('dog');
    }
});

describe('String.strip', {
    'should remove initial and final spaces': function() {
        value_of('   a  b '.strip()).should_be('a  b');
    },
    'should remove \\n': function() {
        value_of('\na  b \n'.strip()).should_be('a  b');
    },
    'should apply to the left side': function() {
        value_of('\na  b'.strip()).should_be('a  b');
    },
    'should apply to the right side': function() {
        value_of('a  b \n'.strip()).should_be('a  b');
    },
    "should be identity when there is no terminal ws": function() {
        value_of('a  b \n'.strip()).should_be('a  b');
    },
    'should be identity on the empty string': function() {
        value_of(''.strip()).should_be('');
    }
});

describe('String.truncate', {
    'should return a list of values': function() {
        value_of($H({a:1, b:2}).values()).should_be([1, 2]);
    }
});

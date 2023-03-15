(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = {$: 'GT'};
var $author$project$FinalPrototype$Tick = F2(
	function (a, b) {
		return {$: 'Tick', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$InitTime = function (a) {
	return {$: 'InitTime', a: a};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$UserMsg = function (a) {
	return {$: 'UserMsg', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $MacCASOutreach$graphicsvg$GraphicSVG$Graphics = function (a) {
	return {$: 'Graphics', a: a};
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$document = _Browser_document;
var $elm$core$Basics$not = _Basics_not;
var $MacCASOutreach$graphicsvg$GraphicSVG$convertCoords = F2(
	function (_v0, gModel) {
		var x = _v0.a;
		var y = _v0.b;
		var sw = gModel.sw;
		var sh = gModel.sh;
		var cw = gModel.cw;
		var ch = gModel.ch;
		var aspectout = (!(!sh)) ? (sw / sh) : (4 / 3);
		var aspectin = (!(!ch)) ? (cw / ch) : (4 / 3);
		var scaledInX = _Utils_cmp(aspectout, aspectin) < 0;
		var scaledInY = _Utils_cmp(aspectout, aspectin) > 0;
		var cscale = scaledInX ? (sw / cw) : (scaledInY ? (sh / ch) : 1);
		return _Utils_Tuple2((x - (sw / 2)) / cscale, (y + (sh / 2)) / cscale);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$NoOp = {$: 'NoOp'};
var $MacCASOutreach$graphicsvg$GraphicSVG$WindowResize = function (a) {
	return {$: 'WindowResize', a: a};
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Err),
					A2(
						$elm$core$Task$andThen,
						A2(
							$elm$core$Basics$composeL,
							A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
							$elm$core$Result$Ok),
						task))));
	});
var $elm$browser$Browser$Dom$getViewportOf = _Browser_getViewportOf;
var $elm$core$Basics$round = _Basics_round;
var $MacCASOutreach$graphicsvg$GraphicSVG$getViewportSize = A2(
	$elm$core$Task$attempt,
	function (rvp) {
		if (rvp.$ === 'Ok') {
			var vp = rvp.a;
			return $MacCASOutreach$graphicsvg$GraphicSVG$WindowResize(
				$elm$core$Maybe$Just(
					_Utils_Tuple2(
						$elm$core$Basics$round(vp.viewport.width),
						$elm$core$Basics$round(vp.viewport.height))));
		} else {
			return $MacCASOutreach$graphicsvg$GraphicSVG$NoOp;
		}
	},
	$elm$browser$Browser$Dom$getViewportOf('render'));
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $MacCASOutreach$graphicsvg$GraphicSVG$hiddenAppUpdate = F4(
	function (userView, userUpdate, msg, _v0) {
		var userModel = _v0.a;
		var gModel = _v0.b;
		var mapUserCmd = function (cmd) {
			return A2($elm$core$Platform$Cmd$map, $MacCASOutreach$graphicsvg$GraphicSVG$Graphics, cmd);
		};
		var _v1 = userView(userModel).body;
		var cw = _v1.a;
		var ch = _v1.b;
		switch (msg.$) {
			case 'Graphics':
				var message = msg.a;
				var _v3 = A2(userUpdate, message, userModel);
				var newModel = _v3.a;
				var userCmds = _v3.b;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						newModel,
						_Utils_update(
							gModel,
							{ch: ch, cw: cw})),
					mapUserCmd(userCmds));
			case 'WindowResize':
				var mWH = msg.a;
				if (mWH.$ === 'Just') {
					var _v5 = mWH.a;
					var w = _v5.a;
					var h = _v5.b;
					return _Utils_Tuple2(
						_Utils_Tuple2(
							userModel,
							_Utils_update(
								gModel,
								{sh: h, sw: w})),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_Tuple2(userModel, gModel),
						$MacCASOutreach$graphicsvg$GraphicSVG$getViewportSize);
				}
			case 'ReturnPosition':
				var message = msg.a;
				var _v6 = msg.b;
				var x = _v6.a;
				var y = _v6.b;
				var _v7 = A2(
					userUpdate,
					message(
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$convertCoords,
							_Utils_Tuple2(x, y),
							gModel)),
					userModel);
				var newModel = _v7.a;
				var userCmds = _v7.b;
				return _Utils_Tuple2(
					_Utils_Tuple2(newModel, gModel),
					mapUserCmd(userCmds));
			default:
				return _Utils_Tuple2(
					_Utils_Tuple2(userModel, gModel),
					$elm$core$Platform$Cmd$none);
		}
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$ReturnPosition = F2(
	function (a, b) {
		return {$: 'ReturnPosition', a: a, b: b};
	});
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$clipPath = $elm$svg$Svg$trustedNode('clipPath');
var $elm$svg$Svg$defs = $elm$svg$Svg$trustedNode('defs');
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $MacCASOutreach$graphicsvg$GraphicSVG$cPath = F2(
	function (w, h) {
		return A2(
			$elm$svg$Svg$defs,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$clipPath,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$id('cPath')
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$rect,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$width(
									$elm$core$String$fromFloat(w)),
									$elm$svg$Svg$Attributes$height(
									$elm$core$String$fromFloat(h)),
									$elm$svg$Svg$Attributes$x(
									$elm$core$String$fromFloat((-w) / 2)),
									$elm$svg$Svg$Attributes$y(
									$elm$core$String$fromFloat((-h) / 2))
								]),
							_List_Nil)
						]))
				]));
	});
var $elm$svg$Svg$Attributes$clipPath = _VirtualDom_attribute('clip-path');
var $MacCASOutreach$graphicsvg$GraphicSVG$Everything = {$: 'Everything'};
var $MacCASOutreach$graphicsvg$GraphicSVG$Group = function (a) {
	return {$: 'Group', a: a};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$Notathing = {$: 'Notathing'};
var $elm$svg$Svg$a = $elm$svg$Svg$trustedNode('a');
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Solid = function (a) {
	return {$: 'Solid', a: a};
};
var $avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 'RgbaSpace', a: a, b: b, c: c, d: d};
	});
var $avh4$elm_color$Color$fromRgba = function (components) {
	return A4($avh4$elm_color$Color$RgbaSpace, components.red, components.green, components.blue, components.alpha);
};
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$ssa = function (n) {
	return A3($elm$core$Basics$clamp, 0, 1, n);
};
var $MacCASOutreach$graphicsvg$GraphicSVG$ssc = function (n) {
	return A3($elm$core$Basics$clamp, 0, 255, n);
};
var $MacCASOutreach$graphicsvg$GraphicSVG$rgba = F4(
	function (r, g, b, a) {
		return $MacCASOutreach$graphicsvg$GraphicSVG$Solid(
			$avh4$elm_color$Color$fromRgba(
				{
					alpha: $MacCASOutreach$graphicsvg$GraphicSVG$ssa(a),
					blue: $MacCASOutreach$graphicsvg$GraphicSVG$ssc(b),
					green: $MacCASOutreach$graphicsvg$GraphicSVG$ssc(g),
					red: $MacCASOutreach$graphicsvg$GraphicSVG$ssc(r)
				}));
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$black = A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 1);
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$contenteditable = $elm$html$Html$Attributes$boolProperty('contentEditable');
var $MacCASOutreach$graphicsvg$GraphicSVG$pairToString = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	return $elm$core$String$fromFloat(x) + (',' + $elm$core$String$fromFloat(y));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$bezierStringHelper = function (_v0) {
	var _v1 = _v0.a;
	var a = _v1.a;
	var b = _v1.b;
	var _v2 = _v0.b;
	var c = _v2.a;
	var d = _v2.b;
	return ' Q ' + ($MacCASOutreach$graphicsvg$GraphicSVG$pairToString(
		_Utils_Tuple2(a, b)) + (' ' + $MacCASOutreach$graphicsvg$GraphicSVG$pairToString(
		_Utils_Tuple2(c, d))));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$createBezierString = F2(
	function (first, list) {
		return 'M ' + ($MacCASOutreach$graphicsvg$GraphicSVG$pairToString(first) + $elm$core$String$concat(
			A2($elm$core$List$map, $MacCASOutreach$graphicsvg$GraphicSVG$bezierStringHelper, list)));
	});
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$svg$Svg$Attributes$gradientTransform = _VirtualDom_attribute('gradientTransform');
var $elm$svg$Svg$Attributes$gradientUnits = _VirtualDom_attribute('gradientUnits');
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$svg$Svg$linearGradient = $elm$svg$Svg$trustedNode('linearGradient');
var $elm$svg$Svg$Attributes$mask = _VirtualDom_attribute('mask');
var $avh4$elm_color$Color$toRgba = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	return {alpha: a, blue: b, green: g, red: r};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$mkRGB = function (colour) {
	var col = $avh4$elm_color$Color$toRgba(colour);
	return 'rgba(' + ($elm$core$String$fromFloat(col.red) + (',' + ($elm$core$String$fromFloat(col.green) + (',' + ($elm$core$String$fromFloat(col.blue) + (',' + ($elm$core$String$fromFloat(col.alpha) + ')')))))));
};
var $elm$svg$Svg$Attributes$offset = _VirtualDom_attribute('offset');
var $elm$core$Basics$pi = _Basics_pi;
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$radialGradient = $elm$svg$Svg$trustedNode('radialGradient');
var $elm$svg$Svg$stop = $elm$svg$Svg$trustedNode('stop');
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $MacCASOutreach$graphicsvg$GraphicSVG$createGradientSVG = F3(
	function (id, _v0, grad) {
		var wid = _v0.a;
		var hei = _v0.b;
		var w = function () {
			if (grad.$ === 'RadialGradient') {
				var stops = grad.a;
				var _v6 = $elm$core$List$head(
					$elm$core$List$reverse(stops));
				if (_v6.$ === 'Just') {
					var _v7 = _v6.a;
					var pos = _v7.a;
					return pos;
				} else {
					return 0;
				}
			} else {
				var stops = grad.b;
				var _v8 = $elm$core$List$head(
					$elm$core$List$reverse(stops));
				if (_v8.$ === 'Just') {
					var _v9 = _v8.a;
					var pos = _v9.a;
					return pos;
				} else {
					return 0;
				}
			}
		}();
		var squareSize = (_Utils_cmp(wid, hei) > 0) ? (2 * wid) : (2 * hei);
		var rotation = function () {
			if (grad.$ === 'LinearGradient') {
				var rot = grad.a;
				var stops = grad.b;
				return (rot * 180) / $elm$core$Basics$pi;
			} else {
				return 0;
			}
		}();
		var isRadial = function () {
			if (grad.$ === 'RadialGradient') {
				return true;
			} else {
				return false;
			}
		}();
		var createStop = function (_v2) {
			var pos = _v2.a;
			var trans = _v2.b;
			var colour = _v2.c;
			var start = isRadial ? 0 : (((1 - (w / squareSize)) / 2) * 100);
			var percent = isRadial ? ((pos / w) * 100) : (start + ((pos / squareSize) * 100));
			var percentTxt = $elm$core$String$fromFloat(percent) + '%';
			var opacityTxt = 'stop-opacity:' + ($elm$core$String$fromFloat(trans) + ';');
			var colourTxt = 'stop-color:' + ($MacCASOutreach$graphicsvg$GraphicSVG$mkRGB(colour) + ';');
			return A2(
				$elm$svg$Svg$stop,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$offset(percentTxt),
						$elm$svg$Svg$Attributes$style(
						_Utils_ap(colourTxt, opacityTxt))
					]),
				_List_Nil);
		};
		var defs = A2(
			$elm$svg$Svg$defs,
			_List_Nil,
			_List_fromArray(
				[
					function () {
					if (grad.$ === 'LinearGradient') {
						var stops = grad.b;
						return A2(
							$elm$svg$Svg$linearGradient,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$id(id + 'gradient'),
									$elm$svg$Svg$Attributes$gradientTransform(
									'rotate(' + ($elm$core$String$fromFloat(rotation) + 'rad)')),
									$elm$svg$Svg$Attributes$gradientTransform(
									'rotate(' + ($elm$core$String$fromFloat(rotation) + 'rad)'))
								]),
							A2($elm$core$List$map, createStop, stops));
					} else {
						var stops = grad.a;
						return A2(
							$elm$svg$Svg$radialGradient,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$id(id + 'gradient'),
									$elm$svg$Svg$Attributes$cx('0'),
									$elm$svg$Svg$Attributes$cy('0'),
									$elm$svg$Svg$Attributes$r(
									$elm$core$String$fromFloat(w)),
									$elm$svg$Svg$Attributes$gradientUnits('userSpaceOnUse')
								]),
							A2($elm$core$List$map, createStop, stops));
					}
				}()
				]));
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$mask('url(#' + (id + 'mask)'))
				]),
			_List_fromArray(
				[
					defs,
					A2(
					$elm$svg$Svg$rect,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x(
							$elm$core$String$fromFloat((-squareSize) / 2)),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromFloat((-squareSize) / 2)),
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromFloat(squareSize)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromFloat(squareSize)),
							$elm$svg$Svg$Attributes$fill('url(#' + (id + 'gradient)')),
							$elm$svg$Svg$Attributes$id(id + 'grad'),
							$elm$svg$Svg$Attributes$transform(
							'rotate(' + ($elm$core$String$fromFloat(rotation) + ')'))
						]),
					_List_Nil)
				]));
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Inked = F3(
	function (a, b, c) {
		return {$: 'Inked', a: a, b: b, c: c};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$filled = F2(
	function (color, stencil) {
		return A3(
			$MacCASOutreach$graphicsvg$GraphicSVG$Inked,
			$elm$core$Maybe$Just(color),
			$elm$core$Maybe$Nothing,
			stencil);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Move = F2(
	function (a, b) {
		return {$: 'Move', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$move = F2(
	function (disp, shape) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$Move, disp, shape);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Rect = F2(
	function (a, b) {
		return {$: 'Rect', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$rect = F2(
	function (w, h) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$Rect, w, h);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$createGraphX = F5(
	function (h, s, th, c, x) {
		return A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(x * s, 0),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				c,
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, th, h)));
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$createGraphY = F5(
	function (w, s, th, c, y) {
		return A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(0, y * s),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				c,
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, w, th)));
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$group = function (shapes) {
	return $MacCASOutreach$graphicsvg$GraphicSVG$Group(shapes);
};
var $MacCASOutreach$graphicsvg$GraphicSVG$createGraph = F4(
	function (_v0, s, th, c) {
		var w = _v0.a;
		var h = _v0.b;
		var syi = $elm$core$Basics$ceiling(h / (s * 2));
		var ylisti = A2($elm$core$List$range, -syi, syi);
		var sxi = $elm$core$Basics$ceiling(w / (s * 2));
		var xlisti = A2($elm$core$List$range, -sxi, sxi);
		return $MacCASOutreach$graphicsvg$GraphicSVG$group(
			_Utils_ap(
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeL,
						A4($MacCASOutreach$graphicsvg$GraphicSVG$createGraphX, h, s, th, c),
						$elm$core$Basics$toFloat),
					xlisti),
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeL,
						A4($MacCASOutreach$graphicsvg$GraphicSVG$createGraphY, w, s, th, c),
						$elm$core$Basics$toFloat),
					ylisti)));
	});
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$ellipse = $elm$svg$Svg$trustedNode('ellipse');
var $elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
var $elm$svg$Svg$Attributes$fontSize = _VirtualDom_attribute('font-size');
var $elm$svg$Svg$foreignObject = $elm$svg$Svg$trustedNode('foreignObject');
var $MacCASOutreach$graphicsvg$GraphicSVG$getAlpha = function (colour) {
	return $avh4$elm_color$Color$toRgba(colour).alpha;
};
var $MacCASOutreach$graphicsvg$GraphicSVG$ident = _Utils_Tuple2(
	_Utils_Tuple3(1, 0, 0),
	_Utils_Tuple3(0, 1, 0));
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $elm$svg$Svg$mask = $elm$svg$Svg$trustedNode('mask');
var $MacCASOutreach$graphicsvg$GraphicSVG$matrixMult = F2(
	function (_v0, _v3) {
		var _v1 = _v0.a;
		var a = _v1.a;
		var c = _v1.b;
		var e = _v1.c;
		var _v2 = _v0.b;
		var b = _v2.a;
		var d = _v2.b;
		var f = _v2.c;
		var _v4 = _v3.a;
		var a1 = _v4.a;
		var c1 = _v4.b;
		var e1 = _v4.c;
		var _v5 = _v3.b;
		var b1 = _v5.a;
		var d1 = _v5.b;
		var f1 = _v5.c;
		return _Utils_Tuple2(
			_Utils_Tuple3((a * a1) + (c * b1), (a * c1) + (c * d1), (e + (a * e1)) + (c * f1)),
			_Utils_Tuple3((b * a1) + (d * b1), (b * c1) + (d * d1), (f + (b * e1)) + (d * f1)));
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$mkAlpha = A2($elm$core$Basics$composeL, $elm$core$String$fromFloat, $MacCASOutreach$graphicsvg$GraphicSVG$getAlpha);
var $MacCASOutreach$graphicsvg$GraphicSVG$moveT = F2(
	function (_v0, _v1) {
		var u = _v0.a;
		var v = _v0.b;
		var _v2 = _v1.a;
		var a = _v2.a;
		var c = _v2.b;
		var tx = _v2.c;
		var _v3 = _v1.b;
		var b = _v3.a;
		var d = _v3.b;
		var ty = _v3.c;
		return _Utils_Tuple2(
			_Utils_Tuple3(a, c, (tx + (a * u)) + (c * v)),
			_Utils_Tuple3(b, d, (ty + (b * u)) + (d * v)));
	});
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $MacCASOutreach$graphicsvg$GraphicSVG$mousePosDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (x, y) {
			return _Utils_Tuple2(x, -y);
		}),
	A2($elm$json$Json$Decode$field, 'offsetX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'offsetY', $elm$json$Json$Decode$float));
var $MacCASOutreach$graphicsvg$GraphicSVG$onEnterAt = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseover',
		A2($elm$json$Json$Decode$map, msg, $MacCASOutreach$graphicsvg$GraphicSVG$mousePosDecoder));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$onLeaveAt = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseleave',
		A2($elm$json$Json$Decode$map, msg, $MacCASOutreach$graphicsvg$GraphicSVG$mousePosDecoder));
};
var $elm$html$Html$Events$onMouseDown = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mousedown',
		$elm$json$Json$Decode$succeed(msg));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$onMouseDownAt = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mousedown',
		A2($elm$json$Json$Decode$map, msg, $MacCASOutreach$graphicsvg$GraphicSVG$mousePosDecoder));
};
var $elm$html$Html$Events$onMouseEnter = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseenter',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onMouseLeave = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseleave',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onMouseUp = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseup',
		$elm$json$Json$Decode$succeed(msg));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$onMouseUpAt = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseup',
		A2($elm$json$Json$Decode$map, msg, $MacCASOutreach$graphicsvg$GraphicSVG$mousePosDecoder));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$onMoveAt = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mousemove',
		A2($elm$json$Json$Decode$map, msg, $MacCASOutreach$graphicsvg$GraphicSVG$mousePosDecoder));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$onTapAt = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		A2($elm$json$Json$Decode$map, msg, $MacCASOutreach$graphicsvg$GraphicSVG$mousePosDecoder));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$onTouchEnd = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'touchend',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$TouchPos = F2(
	function (a, b) {
		return {$: 'TouchPos', a: a, b: b};
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $MacCASOutreach$graphicsvg$GraphicSVG$touchDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['touches', '0']),
			A3(
				$elm$json$Json$Decode$map2,
				$MacCASOutreach$graphicsvg$GraphicSVG$TouchPos,
				A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float),
				A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float))),
			A3(
			$elm$json$Json$Decode$map2,
			$MacCASOutreach$graphicsvg$GraphicSVG$TouchPos,
			A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float))
		]));
var $MacCASOutreach$graphicsvg$GraphicSVG$touchToPair = function (tp) {
	var x = tp.a;
	var y = tp.b;
	return _Utils_Tuple2(x, -y);
};
var $MacCASOutreach$graphicsvg$GraphicSVG$onTouchMove = function (msg) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'touchmove',
		A2(
			$elm$json$Json$Decode$map,
			function (a) {
				return _Utils_Tuple2(
					A2($elm$core$Basics$composeL, msg, $MacCASOutreach$graphicsvg$GraphicSVG$touchToPair)(a),
					true);
			},
			$MacCASOutreach$graphicsvg$GraphicSVG$touchDecoder));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$onTouchStart = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'touchstart',
		$elm$json$Json$Decode$succeed(msg));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$onTouchStartAt = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'touchstart',
		A2(
			$elm$json$Json$Decode$map,
			A2($elm$core$Basics$composeL, msg, $MacCASOutreach$graphicsvg$GraphicSVG$touchToPair),
			$MacCASOutreach$graphicsvg$GraphicSVG$touchDecoder));
};
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$polygon = $elm$svg$Svg$trustedNode('polygon');
var $elm$svg$Svg$polyline = $elm$svg$Svg$trustedNode('polyline');
var $MacCASOutreach$graphicsvg$GraphicSVG$AlphaMask = F2(
	function (a, b) {
		return {$: 'AlphaMask', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Clip = F2(
	function (a, b) {
		return {$: 'Clip', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$EnterAt = F2(
	function (a, b) {
		return {$: 'EnterAt', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$EnterShape = F2(
	function (a, b) {
		return {$: 'EnterShape', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Exit = F2(
	function (a, b) {
		return {$: 'Exit', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$ExitAt = F2(
	function (a, b) {
		return {$: 'ExitAt', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$ForeignObject = F3(
	function (a, b, c) {
		return {$: 'ForeignObject', a: a, b: b, c: c};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$GraphPaper = F3(
	function (a, b, c) {
		return {$: 'GraphPaper', a: a, b: b, c: c};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$GroupOutline = function (a) {
	return {$: 'GroupOutline', a: a};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$Link = F2(
	function (a, b) {
		return {$: 'Link', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$MouseDown = F2(
	function (a, b) {
		return {$: 'MouseDown', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$MouseDownAt = F2(
	function (a, b) {
		return {$: 'MouseDownAt', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$MouseUp = F2(
	function (a, b) {
		return {$: 'MouseUp', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$MouseUpAt = F2(
	function (a, b) {
		return {$: 'MouseUpAt', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$MoveOverAt = F2(
	function (a, b) {
		return {$: 'MoveOverAt', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Rotate = F2(
	function (a, b) {
		return {$: 'Rotate', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Scale = F3(
	function (a, b, c) {
		return {$: 'Scale', a: a, b: b, c: c};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Skew = F3(
	function (a, b, c) {
		return {$: 'Skew', a: a, b: b, c: c};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Tap = F2(
	function (a, b) {
		return {$: 'Tap', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$TapAt = F2(
	function (a, b) {
		return {$: 'TapAt', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$TouchEnd = F2(
	function (a, b) {
		return {$: 'TouchEnd', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$TouchEndAt = F2(
	function (a, b) {
		return {$: 'TouchEndAt', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$TouchMoveAt = F2(
	function (a, b) {
		return {$: 'TouchMoveAt', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$TouchStart = F2(
	function (a, b) {
		return {$: 'TouchStart', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$TouchStartAt = F2(
	function (a, b) {
		return {$: 'TouchStartAt', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Transformed = F2(
	function (a, b) {
		return {$: 'Transformed', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$repaint = F2(
	function (color, shape) {
		switch (shape.$) {
			case 'Inked':
				if (shape.b.$ === 'Nothing') {
					var _v1 = shape.b;
					var st = shape.c;
					return A3(
						$MacCASOutreach$graphicsvg$GraphicSVG$Inked,
						$elm$core$Maybe$Just(color),
						$elm$core$Maybe$Nothing,
						st);
				} else {
					var _v2 = shape.b.a;
					var lt = _v2.a;
					var st = shape.c;
					return A3(
						$MacCASOutreach$graphicsvg$GraphicSVG$Inked,
						$elm$core$Maybe$Just(color),
						$elm$core$Maybe$Just(
							_Utils_Tuple2(lt, color)),
						st);
				}
			case 'Move':
				var s = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Move,
					s,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'Rotate':
				var r = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Rotate,
					r,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'Scale':
				var sx = shape.a;
				var sy = shape.b;
				var sh = shape.c;
				return A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$Scale,
					sx,
					sy,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'Skew':
				var skx = shape.a;
				var sky = shape.b;
				var sh = shape.c;
				return A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$Skew,
					skx,
					sky,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'Transformed':
				var tm = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Transformed,
					tm,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'Group':
				var shapes = shape.a;
				return $MacCASOutreach$graphicsvg$GraphicSVG$Group(
					A2(
						$elm$core$List$map,
						$MacCASOutreach$graphicsvg$GraphicSVG$repaint(color),
						shapes));
			case 'GroupOutline':
				var cmbndshp = shape.a;
				return $MacCASOutreach$graphicsvg$GraphicSVG$GroupOutline(
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, cmbndshp));
			case 'Link':
				var s = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Link,
					s,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'AlphaMask':
				var reg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$AlphaMask,
					reg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'Clip':
				var reg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Clip,
					reg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'Tap':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Tap,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'TapAt':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$TapAt,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'EnterShape':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$EnterShape,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'EnterAt':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$EnterAt,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'Exit':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Exit,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'ExitAt':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$ExitAt,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'MouseDown':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$MouseDown,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'MouseDownAt':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$MouseDownAt,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'MouseUp':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$MouseUp,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'MouseUpAt':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$MouseUpAt,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'MoveOverAt':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$MoveOverAt,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'TouchStart':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$TouchStart,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'TouchEnd':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$TouchEnd,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'TouchStartAt':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$TouchStartAt,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'TouchEndAt':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$TouchEndAt,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'TouchMoveAt':
				var userMsg = shape.a;
				var sh = shape.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$TouchMoveAt,
					userMsg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, color, sh));
			case 'ForeignObject':
				var w = shape.a;
				var h = shape.b;
				var htm = shape.c;
				return A3($MacCASOutreach$graphicsvg$GraphicSVG$ForeignObject, w, h, htm);
			case 'Everything':
				return $MacCASOutreach$graphicsvg$GraphicSVG$Everything;
			case 'Notathing':
				return $MacCASOutreach$graphicsvg$GraphicSVG$Notathing;
			default:
				var s = shape.a;
				var th = shape.b;
				return A3($MacCASOutreach$graphicsvg$GraphicSVG$GraphPaper, s, th, color);
		}
	});
var $avh4$elm_color$Color$rgb = F3(
	function (r, g, b) {
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, 1.0);
	});
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$sin = _Basics_sin;
var $MacCASOutreach$graphicsvg$GraphicSVG$rotateT = F2(
	function (rad, _v0) {
		var _v1 = _v0.a;
		var a = _v1.a;
		var c = _v1.b;
		var tx = _v1.c;
		var _v2 = _v0.b;
		var b = _v2.a;
		var d = _v2.b;
		var ty = _v2.c;
		var sinX = $elm$core$Basics$sin(rad);
		var cosX = $elm$core$Basics$cos(rad);
		return _Utils_Tuple2(
			_Utils_Tuple3((a * cosX) + (c * sinX), (c * cosX) - (a * sinX), tx),
			_Utils_Tuple3((b * cosX) + (d * sinX), (d * cosX) - (b * sinX), ty));
	});
var $elm$svg$Svg$Attributes$rx = _VirtualDom_attribute('rx');
var $elm$svg$Svg$Attributes$ry = _VirtualDom_attribute('ry');
var $MacCASOutreach$graphicsvg$GraphicSVG$scaleT = F3(
	function (sx, sy, _v0) {
		var _v1 = _v0.a;
		var a = _v1.a;
		var c = _v1.b;
		var tx = _v1.c;
		var _v2 = _v0.b;
		var b = _v2.a;
		var d = _v2.b;
		var ty = _v2.c;
		return _Utils_Tuple2(
			_Utils_Tuple3(a * sx, c * sy, tx),
			_Utils_Tuple3(b * sx, d * sy, ty));
	});
var $elm$core$Basics$tan = _Basics_tan;
var $MacCASOutreach$graphicsvg$GraphicSVG$skewT = F3(
	function (skx, sky, _v0) {
		var _v1 = _v0.a;
		var a = _v1.a;
		var c = _v1.b;
		var tx = _v1.c;
		var _v2 = _v0.b;
		var b = _v2.a;
		var d = _v2.b;
		var ty = _v2.c;
		var tanY = $elm$core$Basics$tan(-sky);
		var tanX = $elm$core$Basics$tan(-skx);
		return _Utils_Tuple2(
			_Utils_Tuple3(a + (c * tanY), c + (a * tanX), tx),
			_Utils_Tuple3(b + (d * tanY), d + (b * tanX), ty));
	});
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeDasharray = _VirtualDom_attribute('stroke-dasharray');
var $elm$svg$Svg$Attributes$strokeOpacity = _VirtualDom_attribute('stroke-opacity');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$Attributes$target = _VirtualDom_attribute('target');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $MacCASOutreach$graphicsvg$GraphicSVG$white = A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 255, 255, 255, 1);
var $elm$svg$Svg$Attributes$xlinkHref = function (value) {
	return A3(
		_VirtualDom_attributeNS,
		'http://www.w3.org/1999/xlink',
		'xlink:href',
		_VirtualDom_noJavaScriptUri(value));
};
var $elm$svg$Svg$Attributes$xmlSpace = A2(_VirtualDom_attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
var $MacCASOutreach$graphicsvg$GraphicSVG$createSVG = F7(
	function (id, w, h, trans, msgWrapper, positionWrapper, shape) {
		createSVG:
		while (true) {
			switch (shape.$) {
				case 'Inked':
					var fillClr = shape.a;
					var lt = shape.b;
					var stencil = shape.c;
					var strokeAttrs = function () {
						_v13$3:
						while (true) {
							if (lt.$ === 'Nothing') {
								return _List_Nil;
							} else {
								if (lt.a.b.$ === 'Solid') {
									switch (lt.a.a.$) {
										case 'Unbroken':
											var _v14 = lt.a;
											var th = _v14.a.a;
											var strokeClr = _v14.b.a;
											var nonStroke = function () {
												var opcty = $MacCASOutreach$graphicsvg$GraphicSVG$getAlpha(strokeClr);
												return (th <= 0) || (opcty <= 0);
											}();
											return nonStroke ? _List_Nil : _List_fromArray(
												[
													$elm$svg$Svg$Attributes$strokeWidth(
													$elm$core$String$fromFloat(th)),
													$elm$svg$Svg$Attributes$stroke(
													$MacCASOutreach$graphicsvg$GraphicSVG$mkRGB(strokeClr)),
													$elm$svg$Svg$Attributes$strokeOpacity(
													$MacCASOutreach$graphicsvg$GraphicSVG$mkAlpha(strokeClr))
												]);
										case 'Broken':
											var _v15 = lt.a;
											var _v16 = _v15.a;
											var dashes = _v16.a;
											var th = _v16.b;
											var strokeClr = _v15.b.a;
											var nonStroke = function () {
												var opcty = $MacCASOutreach$graphicsvg$GraphicSVG$getAlpha(strokeClr);
												return (th <= 0) || ((opcty <= 0) || A2(
													$elm$core$List$all,
													function (_v17) {
														var on = _v17.a;
														return !on;
													},
													dashes));
											}();
											return nonStroke ? _List_Nil : _Utils_ap(
												_List_fromArray(
													[
														$elm$svg$Svg$Attributes$strokeWidth(
														$elm$core$String$fromFloat(th)),
														$elm$svg$Svg$Attributes$stroke(
														$MacCASOutreach$graphicsvg$GraphicSVG$mkRGB(strokeClr)),
														$elm$svg$Svg$Attributes$strokeOpacity(
														$MacCASOutreach$graphicsvg$GraphicSVG$mkAlpha(strokeClr))
													]),
												_List_fromArray(
													[
														$elm$svg$Svg$Attributes$strokeDasharray(
														$elm$core$String$concat(
															A2(
																$elm$core$List$intersperse,
																',',
																A2($elm$core$List$map, $MacCASOutreach$graphicsvg$GraphicSVG$pairToString, dashes))))
													]));
										default:
											break _v13$3;
									}
								} else {
									break _v13$3;
								}
							}
						}
						var _v18 = lt.a;
						return _List_Nil;
					}();
					var nonexistBody = function () {
						if (fillClr.$ === 'Nothing') {
							return true;
						} else {
							return false;
						}
					}();
					var gradientDefs = function () {
						if ((fillClr.$ === 'Just') && (fillClr.a.$ === 'Gradient')) {
							var gr = fillClr.a.a;
							return $elm$core$Maybe$Just(
								A3(
									$MacCASOutreach$graphicsvg$GraphicSVG$createGradientSVG,
									id,
									_Utils_Tuple2(w, h),
									gr));
						} else {
							return $elm$core$Maybe$Nothing;
						}
					}();
					var clrAttrs = function () {
						if (fillClr.$ === 'Nothing') {
							return _List_fromArray(
								[
									$elm$svg$Svg$Attributes$fill('none')
								]);
						} else {
							if (fillClr.a.$ === 'Solid') {
								var bodyClr = fillClr.a.a;
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$fill(
										$MacCASOutreach$graphicsvg$GraphicSVG$mkRGB(bodyClr)),
										$elm$svg$Svg$Attributes$fillOpacity(
										$MacCASOutreach$graphicsvg$GraphicSVG$mkAlpha(bodyClr))
									]);
							} else {
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$id(id),
										$elm$svg$Svg$Attributes$fill(
										$MacCASOutreach$graphicsvg$GraphicSVG$mkRGB(
											A3($avh4$elm_color$Color$rgb, 255, 255, 255)))
									]);
							}
						}
					}();
					var _v1 = trans;
					var _v2 = _v1.a;
					var a = _v2.a;
					var c = _v2.b;
					var tx = _v2.c;
					var _v3 = _v1.b;
					var b = _v3.a;
					var d = _v3.b;
					var ty = _v3.c;
					var transAttrs = _List_fromArray(
						[
							$elm$svg$Svg$Attributes$transform(
							'matrix(' + ($elm$core$String$concat(
								A2(
									$elm$core$List$intersperse,
									',',
									A2(
										$elm$core$List$map,
										$elm$core$String$fromFloat,
										_List_fromArray(
											[a, -b, c, -d, tx, -ty])))) + ')'))
						]);
					var attrs = function () {
						if ((fillClr.$ === 'Just') && (fillClr.a.$ === 'Gradient')) {
							return _Utils_ap(clrAttrs, strokeAttrs);
						} else {
							return _Utils_ap(
								transAttrs,
								_Utils_ap(clrAttrs, strokeAttrs));
						}
					}();
					var basicShape = function () {
						switch (stencil.$) {
							case 'Circle':
								var r = stencil.a;
								return A2(
									$elm$svg$Svg$circle,
									_Utils_ap(
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$cx('0'),
												$elm$svg$Svg$Attributes$cy('0'),
												$elm$svg$Svg$Attributes$r(
												$elm$core$String$fromFloat(r))
											]),
										attrs),
									_List_Nil);
							case 'Rect':
								var rw = stencil.a;
								var rh = stencil.b;
								return A2(
									$elm$svg$Svg$rect,
									_Utils_ap(
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$x(
												$elm$core$String$fromFloat((-rw) / 2)),
												$elm$svg$Svg$Attributes$y(
												$elm$core$String$fromFloat((-rh) / 2)),
												$elm$svg$Svg$Attributes$width(
												$elm$core$String$fromFloat(rw)),
												$elm$svg$Svg$Attributes$height(
												$elm$core$String$fromFloat(rh))
											]),
										attrs),
									_List_Nil);
							case 'RoundRect':
								var rw = stencil.a;
								var rh = stencil.b;
								var r = stencil.c;
								return A2(
									$elm$svg$Svg$rect,
									_Utils_ap(
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$x(
												$elm$core$String$fromFloat((-rw) / 2)),
												$elm$svg$Svg$Attributes$y(
												$elm$core$String$fromFloat((-rh) / 2)),
												$elm$svg$Svg$Attributes$rx(
												$elm$core$String$fromFloat(r)),
												$elm$svg$Svg$Attributes$ry(
												$elm$core$String$fromFloat(r)),
												$elm$svg$Svg$Attributes$width(
												$elm$core$String$fromFloat(rw)),
												$elm$svg$Svg$Attributes$height(
												$elm$core$String$fromFloat(rh))
											]),
										attrs),
									_List_Nil);
							case 'Oval':
								var ow = stencil.a;
								var oh = stencil.b;
								return A2(
									$elm$svg$Svg$ellipse,
									_Utils_ap(
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$cx('0'),
												$elm$svg$Svg$Attributes$cy('0'),
												$elm$svg$Svg$Attributes$rx(
												$elm$core$String$fromFloat(0.5 * ow)),
												$elm$svg$Svg$Attributes$ry(
												$elm$core$String$fromFloat(0.5 * oh))
											]),
										attrs),
									_List_Nil);
							case 'Polygon':
								var vertices = stencil.a;
								return A2(
									$elm$svg$Svg$polygon,
									_Utils_ap(
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$points(
												$elm$core$String$concat(
													A2(
														$elm$core$List$intersperse,
														' ',
														A2($elm$core$List$map, $MacCASOutreach$graphicsvg$GraphicSVG$pairToString, vertices))))
											]),
										attrs),
									_List_Nil);
							case 'Path':
								var vertices = stencil.a;
								return A2(
									$elm$svg$Svg$polyline,
									_Utils_ap(
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$points(
												$elm$core$String$concat(
													A2(
														$elm$core$List$intersperse,
														' ',
														A2($elm$core$List$map, $MacCASOutreach$graphicsvg$GraphicSVG$pairToString, vertices))))
											]),
										attrs),
									_List_Nil);
							case 'BezierPath':
								var start = stencil.a;
								var pts = stencil.b;
								return A2(
									$elm$svg$Svg$path,
									_Utils_ap(
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$d(
												A2($MacCASOutreach$graphicsvg$GraphicSVG$createBezierString, start, pts))
											]),
										attrs),
									_List_Nil);
							default:
								var _v6 = stencil.a;
								var si = _v6.a;
								var bo = _v6.b;
								var i = _v6.c;
								var u = _v6.d;
								var s = _v6.e;
								var sel = _v6.f;
								var f = _v6.g;
								var align = _v6.h;
								var str = stencil.b;
								var txtDec = (u && s) ? 'text-decoration: underline line-through;' : (u ? 'text-decoration: underline;' : (s ? 'text-decoration: line-through;' : ''));
								var select = (!sel) ? '-webkit-touch-callout: none;\n-webkit-user-select: none;\n-khtml-user-select: none;\n-moz-user-select: none;\n-ms-user-select: none;\nuser-select: none;cursor: default;' : '';
								var it = i ? 'font-style: italic;' : '';
								var font = function () {
									switch (f.$) {
										case 'Sansserif':
											return 'sans-serif;';
										case 'Serif':
											return 'serif;';
										case 'FixedWidth':
											return 'monospace;';
										default:
											var fStr = f.a;
											return fStr + ';';
									}
								}();
								var bol = bo ? 'font-weight: bold;' : '';
								var sty = bol + (it + (txtDec + ('font-family: ' + (font + select))));
								var anchor = function () {
									switch (align.$) {
										case 'AlignCentred':
											return 'middle';
										case 'AlignLeft':
											return 'start';
										default:
											return 'end';
									}
								}();
								return A2(
									$elm$svg$Svg$text_,
									_Utils_ap(
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$x('0'),
												$elm$svg$Svg$Attributes$y('0'),
												$elm$svg$Svg$Attributes$style(sty),
												$elm$svg$Svg$Attributes$fontSize(
												$elm$core$String$fromFloat(si)),
												$elm$svg$Svg$Attributes$textAnchor(anchor),
												$elm$html$Html$Attributes$contenteditable(true)
											]),
										_Utils_ap(
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$transform(
													'matrix(' + ($elm$core$String$concat(
														A2(
															$elm$core$List$intersperse,
															',',
															A2(
																$elm$core$List$map,
																$elm$core$String$fromFloat,
																_List_fromArray(
																	[a, -b, -c, d, tx, -ty])))) + ')'))
												]),
											_Utils_ap(
												_List_fromArray(
													[
														$elm$svg$Svg$Attributes$xmlSpace('preserve')
													]),
												_Utils_ap(clrAttrs, strokeAttrs)))),
									_List_fromArray(
										[
											$elm$svg$Svg$text(str)
										]));
						}
					}();
					if (nonexistBody && $elm$core$List$isEmpty(strokeAttrs)) {
						return A2($elm$svg$Svg$g, _List_Nil, _List_Nil);
					} else {
						if (gradientDefs.$ === 'Just') {
							var gDefs = gradientDefs.a;
							return A2(
								$elm$svg$Svg$g,
								transAttrs,
								_List_fromArray(
									[
										A2(
										$elm$svg$Svg$mask,
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$id(id + 'mask')
											]),
										_List_fromArray(
											[basicShape])),
										gDefs
									]));
						} else {
							return basicShape;
						}
					}
				case 'ForeignObject':
					var fw = shape.a;
					var fh = shape.b;
					var htm = shape.c;
					var _v19 = trans;
					var _v20 = _v19.a;
					var a = _v20.a;
					var c = _v20.b;
					var tx = _v20.c;
					var _v21 = _v19.b;
					var b = _v21.a;
					var d = _v21.b;
					var ty = _v21.c;
					return A2(
						$elm$svg$Svg$foreignObject,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$width(
								$elm$core$String$fromFloat(fw)),
								$elm$svg$Svg$Attributes$height(
								$elm$core$String$fromFloat(fh)),
								$elm$svg$Svg$Attributes$transform(
								'matrix(' + ($elm$core$String$concat(
									A2(
										$elm$core$List$intersperse,
										',',
										A2(
											$elm$core$List$map,
											$elm$core$String$fromFloat,
											_List_fromArray(
												[a, -b, -c, d, tx, -ty])))) + ')'))
							]),
						_List_fromArray(
							[
								A2($elm$html$Html$map, msgWrapper, htm)
							]));
				case 'Move':
					var v = shape.a;
					var sh = shape.b;
					var $temp$id = id,
						$temp$w = w,
						$temp$h = h,
						$temp$trans = A2($MacCASOutreach$graphicsvg$GraphicSVG$moveT, v, trans),
						$temp$msgWrapper = msgWrapper,
						$temp$positionWrapper = positionWrapper,
						$temp$shape = sh;
					id = $temp$id;
					w = $temp$w;
					h = $temp$h;
					trans = $temp$trans;
					msgWrapper = $temp$msgWrapper;
					positionWrapper = $temp$positionWrapper;
					shape = $temp$shape;
					continue createSVG;
				case 'Everything':
					var $temp$id = id,
						$temp$w = w,
						$temp$h = h,
						$temp$trans = $MacCASOutreach$graphicsvg$GraphicSVG$ident,
						$temp$msgWrapper = msgWrapper,
						$temp$positionWrapper = positionWrapper,
						$temp$shape = A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$filled,
						$MacCASOutreach$graphicsvg$GraphicSVG$white,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, w, h));
					id = $temp$id;
					w = $temp$w;
					h = $temp$h;
					trans = $temp$trans;
					msgWrapper = $temp$msgWrapper;
					positionWrapper = $temp$positionWrapper;
					shape = $temp$shape;
					continue createSVG;
				case 'Notathing':
					var $temp$id = id,
						$temp$w = w,
						$temp$h = h,
						$temp$trans = $MacCASOutreach$graphicsvg$GraphicSVG$ident,
						$temp$msgWrapper = msgWrapper,
						$temp$positionWrapper = positionWrapper,
						$temp$shape = A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$filled,
						$MacCASOutreach$graphicsvg$GraphicSVG$black,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, w, h));
					id = $temp$id;
					w = $temp$w;
					h = $temp$h;
					trans = $temp$trans;
					msgWrapper = $temp$msgWrapper;
					positionWrapper = $temp$positionWrapper;
					shape = $temp$shape;
					continue createSVG;
				case 'Rotate':
					var deg = shape.a;
					var sh = shape.b;
					var $temp$id = id,
						$temp$w = w,
						$temp$h = h,
						$temp$trans = A2($MacCASOutreach$graphicsvg$GraphicSVG$rotateT, deg, trans),
						$temp$msgWrapper = msgWrapper,
						$temp$positionWrapper = positionWrapper,
						$temp$shape = sh;
					id = $temp$id;
					w = $temp$w;
					h = $temp$h;
					trans = $temp$trans;
					msgWrapper = $temp$msgWrapper;
					positionWrapper = $temp$positionWrapper;
					shape = $temp$shape;
					continue createSVG;
				case 'Scale':
					var sx = shape.a;
					var sy = shape.b;
					var sh = shape.c;
					var $temp$id = id,
						$temp$w = w,
						$temp$h = h,
						$temp$trans = A3($MacCASOutreach$graphicsvg$GraphicSVG$scaleT, sx, sy, trans),
						$temp$msgWrapper = msgWrapper,
						$temp$positionWrapper = positionWrapper,
						$temp$shape = sh;
					id = $temp$id;
					w = $temp$w;
					h = $temp$h;
					trans = $temp$trans;
					msgWrapper = $temp$msgWrapper;
					positionWrapper = $temp$positionWrapper;
					shape = $temp$shape;
					continue createSVG;
				case 'Skew':
					var sx = shape.a;
					var sy = shape.b;
					var sh = shape.c;
					var $temp$id = id,
						$temp$w = w,
						$temp$h = h,
						$temp$trans = A3($MacCASOutreach$graphicsvg$GraphicSVG$skewT, sx, sy, trans),
						$temp$msgWrapper = msgWrapper,
						$temp$positionWrapper = positionWrapper,
						$temp$shape = sh;
					id = $temp$id;
					w = $temp$w;
					h = $temp$h;
					trans = $temp$trans;
					msgWrapper = $temp$msgWrapper;
					positionWrapper = $temp$positionWrapper;
					shape = $temp$shape;
					continue createSVG;
				case 'Transformed':
					var tm = shape.a;
					var sh = shape.b;
					var $temp$id = id,
						$temp$w = w,
						$temp$h = h,
						$temp$trans = A2($MacCASOutreach$graphicsvg$GraphicSVG$matrixMult, trans, tm),
						$temp$msgWrapper = msgWrapper,
						$temp$positionWrapper = positionWrapper,
						$temp$shape = sh;
					id = $temp$id;
					w = $temp$w;
					h = $temp$h;
					trans = $temp$trans;
					msgWrapper = $temp$msgWrapper;
					positionWrapper = $temp$positionWrapper;
					shape = $temp$shape;
					continue createSVG;
				case 'Link':
					var href = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$a,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$xlinkHref(href),
								$elm$svg$Svg$Attributes$target('_blank')
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'AlphaMask':
					var region = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$defs,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$svg$Svg$mask,
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$id('m' + id)
											]),
										_List_fromArray(
											[
												A7(
												$MacCASOutreach$graphicsvg$GraphicSVG$createSVG,
												id + 'm',
												w,
												h,
												trans,
												msgWrapper,
												positionWrapper,
												$MacCASOutreach$graphicsvg$GraphicSVG$Group(
													_List_fromArray(
														[
															$MacCASOutreach$graphicsvg$GraphicSVG$Everything,
															A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, $MacCASOutreach$graphicsvg$GraphicSVG$black, region)
														])))
											]))
									])),
								A2(
								$elm$svg$Svg$g,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$mask('url(#m' + (id + ')'))
									]),
								_List_fromArray(
									[
										A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id + 'mm', w, h, trans, msgWrapper, positionWrapper, sh)
									]))
							]));
				case 'Clip':
					var region = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$defs,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$svg$Svg$mask,
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$id('c' + id)
											]),
										_List_fromArray(
											[
												A7(
												$MacCASOutreach$graphicsvg$GraphicSVG$createSVG,
												id + 'c',
												w,
												h,
												trans,
												msgWrapper,
												positionWrapper,
												$MacCASOutreach$graphicsvg$GraphicSVG$Group(
													_List_fromArray(
														[
															$MacCASOutreach$graphicsvg$GraphicSVG$Notathing,
															A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, $MacCASOutreach$graphicsvg$GraphicSVG$white, region)
														])))
											]))
									])),
								A2(
								$elm$svg$Svg$g,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$mask('url(#c' + (id + ')'))
									]),
								_List_fromArray(
									[
										A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id + 'cc', w, h, trans, msgWrapper, positionWrapper, sh)
									]))
							]));
				case 'Tap':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								msgWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'TapAt':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$onTapAt(
								positionWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'EnterShape':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$html$Html$Events$onMouseEnter(
								msgWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'EnterAt':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$onEnterAt(
								positionWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'Exit':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$html$Html$Events$onMouseLeave(
								msgWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'ExitAt':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$onLeaveAt(
								positionWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'MouseDown':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$html$Html$Events$onMouseDown(
								msgWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'MouseDownAt':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$onMouseDownAt(
								positionWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'MouseUp':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$html$Html$Events$onMouseUp(
								msgWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'MouseUpAt':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$onMouseUpAt(
								positionWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'MoveOverAt':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$onMoveAt(
								positionWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'TouchStart':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$onTouchStart(
								msgWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'TouchEnd':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$onTouchEnd(
								msgWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'TouchStartAt':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$onTouchStartAt(
								positionWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'TouchEndAt':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$onTouchStartAt(
								positionWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'TouchMoveAt':
					var msg = shape.a;
					var sh = shape.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$onTouchMove(
								positionWrapper(msg))
							]),
						_List_fromArray(
							[
								A7($MacCASOutreach$graphicsvg$GraphicSVG$createSVG, id, w, h, trans, msgWrapper, positionWrapper, sh)
							]));
				case 'Group':
					var shapes = shape.a;
					return A2(
						$elm$svg$Svg$g,
						_List_Nil,
						A2(
							$elm$core$List$indexedMap,
							function (n) {
								return A6(
									$MacCASOutreach$graphicsvg$GraphicSVG$createSVG,
									id + ('g' + $elm$core$String$fromInt(n)),
									w,
									h,
									trans,
									msgWrapper,
									positionWrapper);
							},
							shapes));
				case 'GroupOutline':
					var cmbndshp = shape.a;
					var $temp$id = id,
						$temp$w = w,
						$temp$h = h,
						$temp$trans = trans,
						$temp$msgWrapper = msgWrapper,
						$temp$positionWrapper = positionWrapper,
						$temp$shape = cmbndshp;
					id = $temp$id;
					w = $temp$w;
					h = $temp$h;
					trans = $temp$trans;
					msgWrapper = $temp$msgWrapper;
					positionWrapper = $temp$positionWrapper;
					shape = $temp$shape;
					continue createSVG;
				default:
					var s = shape.a;
					var th = shape.b;
					var c = shape.c;
					return ((th <= 0) || (_Utils_cmp(s, 2 * th) < 0)) ? A2($elm$svg$Svg$g, _List_Nil, _List_Nil) : A7(
						$MacCASOutreach$graphicsvg$GraphicSVG$createSVG,
						id,
						w,
						h,
						trans,
						msgWrapper,
						positionWrapper,
						A4(
							$MacCASOutreach$graphicsvg$GraphicSVG$createGraph,
							_Utils_Tuple2(w, h),
							s,
							th,
							c));
			}
		}
	});
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $MacCASOutreach$graphicsvg$GraphicSVG$createCollage = F3(
	function (w, h, shapes) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width('100%'),
					$elm$svg$Svg$Attributes$height('100%'),
					$elm$svg$Svg$Attributes$style('position:absolute;top:0px;left:0px;'),
					$elm$svg$Svg$Attributes$viewBox(
					$elm$core$String$fromFloat((-w) / 2) + (' ' + ($elm$core$String$fromFloat((-h) / 2) + (' ' + ($elm$core$String$fromFloat(w) + (' ' + $elm$core$String$fromFloat(h))))))),
					$elm$svg$Svg$Attributes$id('render')
				]),
			A2(
				$elm$core$List$cons,
				A2($MacCASOutreach$graphicsvg$GraphicSVG$cPath, w, h),
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$clipPath('url(#cPath)')
							]),
						A2(
							$elm$core$List$indexedMap,
							function (n) {
								return A6(
									$MacCASOutreach$graphicsvg$GraphicSVG$createSVG,
									$elm$core$String$fromInt(n),
									w,
									h,
									$MacCASOutreach$graphicsvg$GraphicSVG$ident,
									$MacCASOutreach$graphicsvg$GraphicSVG$Graphics,
									$MacCASOutreach$graphicsvg$GraphicSVG$ReturnPosition);
							},
							shapes))
					])));
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$hiddenAppView = F2(
	function (userView, _v0) {
		var userModel = _v0.a;
		var userViewEval = userView(userModel);
		var title = userViewEval.title;
		var _v1 = userViewEval.body;
		var w = _v1.a;
		var h = _v1.b;
		var shapes = _v1.c;
		return {
			body: _List_fromArray(
				[
					A3($MacCASOutreach$graphicsvg$GraphicSVG$createCollage, w, h, shapes)
				]),
			title: title
		};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$initHiddenModel = {ch: 0, cw: 0, sh: 0, sw: 0};
var $MacCASOutreach$graphicsvg$GraphicSVG$initialCmd = function (userCmd) {
	return $elm$core$Platform$Cmd$batch(
		_List_fromArray(
			[$MacCASOutreach$graphicsvg$GraphicSVG$getViewportSize, userCmd]));
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$Platform$Sub$map = _Platform_map;
var $elm$browser$Browser$Events$Window = {$: 'Window'};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		$elm$browser$Browser$Events$Window,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$subs = F2(
	function (userSubs, _v0) {
		var userModel = _v0.a;
		return $elm$core$Platform$Sub$batch(
			_Utils_ap(
				_List_fromArray(
					[
						$elm$browser$Browser$Events$onResize(
						F2(
							function (_v1, _v2) {
								return $MacCASOutreach$graphicsvg$GraphicSVG$WindowResize($elm$core$Maybe$Nothing);
							}))
					]),
				_List_fromArray(
					[
						A2(
						$elm$core$Platform$Sub$map,
						$MacCASOutreach$graphicsvg$GraphicSVG$Graphics,
						userSubs(userModel))
					])));
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$ellieApp = function (input) {
	return $elm$browser$Browser$document(
		{
			init: function (flags) {
				var userInitCmd = input.init(flags).b;
				var userInit = input.init(flags).a;
				var userView = input.view(userInit).body;
				var _v0 = userView;
				var initW = _v0.a;
				var initH = _v0.b;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						userInit,
						_Utils_update(
							$MacCASOutreach$graphicsvg$GraphicSVG$initHiddenModel,
							{ch: initH, cw: initW})),
					$MacCASOutreach$graphicsvg$GraphicSVG$initialCmd(
						A2($elm$core$Platform$Cmd$map, $MacCASOutreach$graphicsvg$GraphicSVG$Graphics, userInitCmd)));
			},
			subscriptions: $MacCASOutreach$graphicsvg$GraphicSVG$subs(input.subscriptions),
			update: A2($MacCASOutreach$graphicsvg$GraphicSVG$hiddenAppUpdate, input.view, input.update),
			view: $MacCASOutreach$graphicsvg$GraphicSVG$hiddenAppView(input.view)
		});
};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$DownArrow = {$: 'DownArrow'};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Key = function (a) {
	return {$: 'Key', a: a};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$LeftArrow = {$: 'LeftArrow'};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$RightArrow = {$: 'RightArrow'};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$UpArrow = {$: 'UpArrow'};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$WentDown = {$: 'WentDown'};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$WentUp = {$: 'WentUp'};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$arrowChecker = F5(
	function (checker, up, down, left, right) {
		return _Utils_Tuple2(
			function () {
				var _v0 = _Utils_Tuple2(
					checker(left),
					checker(right));
				_v0$8:
				while (true) {
					switch (_v0.a.$) {
						case 'Down':
							switch (_v0.b.$) {
								case 'Up':
									var _v1 = _v0.a;
									var _v2 = _v0.b;
									return -1;
								case 'JustUp':
									var _v3 = _v0.a;
									var _v4 = _v0.b;
									return -1;
								default:
									break _v0$8;
							}
						case 'JustDown':
							switch (_v0.b.$) {
								case 'Up':
									var _v5 = _v0.a;
									var _v6 = _v0.b;
									return -1;
								case 'JustUp':
									var _v7 = _v0.a;
									var _v8 = _v0.b;
									return -1;
								default:
									break _v0$8;
							}
						case 'Up':
							switch (_v0.b.$) {
								case 'Down':
									var _v9 = _v0.a;
									var _v10 = _v0.b;
									return 1;
								case 'JustDown':
									var _v13 = _v0.a;
									var _v14 = _v0.b;
									return 1;
								default:
									break _v0$8;
							}
						default:
							switch (_v0.b.$) {
								case 'Down':
									var _v11 = _v0.a;
									var _v12 = _v0.b;
									return 1;
								case 'JustDown':
									var _v15 = _v0.a;
									var _v16 = _v0.b;
									return 1;
								default:
									break _v0$8;
							}
					}
				}
				return 0;
			}(),
			function () {
				var _v17 = _Utils_Tuple2(
					checker(down),
					checker(up));
				_v17$8:
				while (true) {
					switch (_v17.a.$) {
						case 'Down':
							switch (_v17.b.$) {
								case 'Up':
									var _v18 = _v17.a;
									var _v19 = _v17.b;
									return -1;
								case 'JustUp':
									var _v20 = _v17.a;
									var _v21 = _v17.b;
									return -1;
								default:
									break _v17$8;
							}
						case 'JustDown':
							switch (_v17.b.$) {
								case 'Up':
									var _v22 = _v17.a;
									var _v23 = _v17.b;
									return -1;
								case 'JustUp':
									var _v24 = _v17.a;
									var _v25 = _v17.b;
									return -1;
								default:
									break _v17$8;
							}
						case 'Up':
							switch (_v17.b.$) {
								case 'Down':
									var _v26 = _v17.a;
									var _v27 = _v17.b;
									return 1;
								case 'JustDown':
									var _v30 = _v17.a;
									var _v31 = _v17.b;
									return 1;
								default:
									break _v17$8;
							}
						default:
							switch (_v17.b.$) {
								case 'Down':
									var _v28 = _v17.a;
									var _v29 = _v17.b;
									return 1;
								case 'JustDown':
									var _v32 = _v17.a;
									var _v33 = _v17.b;
									return 1;
								default:
									break _v17$8;
							}
					}
				}
				return 0;
			}());
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Down = {$: 'Down'};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustDown = {$: 'JustDown'};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustUp = {$: 'JustUp'};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$insertKeyDict = F3(
	function (dict, key, action) {
		var currState = A2($elm$core$Dict$get, key, dict);
		if (currState.$ === 'Just') {
			if (!currState.a.b) {
				switch (currState.a.a.$) {
					case 'JustDown':
						var _v1 = currState.a;
						var _v2 = _v1.a;
						return A3(
							$elm$core$Dict$insert,
							key,
							function () {
								if (action.$ === 'WentDown') {
									return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustDown, false);
								} else {
									return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustDown, true);
								}
							}(),
							dict);
					case 'Down':
						var _v4 = currState.a;
						var _v5 = _v4.a;
						return A3(
							$elm$core$Dict$insert,
							key,
							function () {
								if (action.$ === 'WentDown') {
									return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Down, false);
								} else {
									return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustUp, false);
								}
							}(),
							dict);
					case 'Up':
						var _v7 = currState.a;
						var _v8 = _v7.a;
						return A3(
							$elm$core$Dict$insert,
							key,
							function () {
								if (action.$ === 'WentDown') {
									return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustDown, false);
								} else {
									return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustUp, false);
								}
							}(),
							dict);
					default:
						var _v10 = currState.a;
						var _v11 = _v10.a;
						return A3(
							$elm$core$Dict$insert,
							key,
							function () {
								if (action.$ === 'WentDown') {
									return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustUp, true);
								} else {
									return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustUp, false);
								}
							}(),
							dict);
				}
			} else {
				var _v13 = currState.a;
				var state = _v13.a;
				return A3(
					$elm$core$Dict$insert,
					key,
					function () {
						if (action.$ === 'WentDown') {
							return _Utils_Tuple2(state, true);
						} else {
							return _Utils_Tuple2(state, true);
						}
					}(),
					dict);
			}
		} else {
			return A3(
				$elm$core$Dict$insert,
				key,
				function () {
					if (action.$ === 'WentDown') {
						return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustDown, false);
					} else {
						return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustUp, false);
					}
				}(),
				dict);
		}
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Up = {$: 'Up'};
var $elm$core$Char$toUpper = _Char_toUpper;
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$keyCheckerFunction = F2(
	function (dict, key) {
		var kc = function () {
			switch (key.$) {
				case 'Key':
					var str = key.a;
					return $elm$core$Char$toCode(
						$elm$core$Char$toUpper(
							function () {
								var _v10 = $elm$core$String$uncons(str);
								if (_v10.$ === 'Just') {
									var _v11 = _v10.a;
									var a = _v11.a;
									return a;
								} else {
									return _Utils_chr('z');
								}
							}()));
				case 'Backspace':
					return 8;
				case 'Tab':
					return 9;
				case 'Enter':
					return 13;
				case 'Shift':
					return 16;
				case 'Ctrl':
					return 17;
				case 'Alt':
					return 18;
				case 'Caps':
					return 20;
				case 'Space':
					return 32;
				case 'LeftArrow':
					return 37;
				case 'UpArrow':
					return 38;
				case 'RightArrow':
					return 39;
				case 'DownArrow':
					return 40;
				default:
					return 46;
			}
		}();
		var state = A2($elm$core$Dict$get, kc, dict);
		if (state.$ === 'Just') {
			switch (state.a.a.$) {
				case 'JustDown':
					var _v1 = state.a;
					var _v2 = _v1.a;
					return $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustDown;
				case 'Down':
					var _v3 = state.a;
					var _v4 = _v3.a;
					return $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Down;
				case 'JustUp':
					var _v5 = state.a;
					var _v6 = _v5.a;
					return $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustUp;
				default:
					var _v7 = state.a;
					var _v8 = _v7.a;
					return $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Up;
			}
		} else {
			return $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Up;
		}
	});
var $elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3($elm$core$Dict$insert, k, v, d) : d;
				}),
			$elm$core$Dict$empty,
			dict);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$filterHelper = F2(
	function (key, action) {
		if (action.a.$ === 'Up') {
			var _v1 = action.a;
			return false;
		} else {
			return true;
		}
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$maintainHelper = F2(
	function (key, action) {
		if (!action.b) {
			switch (action.a.$) {
				case 'JustUp':
					var _v1 = action.a;
					return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Up, false);
				case 'Up':
					var _v3 = action.a;
					return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Up, false);
				case 'JustDown':
					var _v5 = action.a;
					return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Down, false);
				default:
					var _v7 = action.a;
					return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Down, false);
			}
		} else {
			switch (action.a.$) {
				case 'JustUp':
					var _v2 = action.a;
					return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustDown, false);
				case 'Up':
					var _v4 = action.a;
					return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Up, false);
				case 'JustDown':
					var _v6 = action.a;
					return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$JustUp, false);
				default:
					var _v8 = action.a;
					return _Utils_Tuple2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Down, false);
			}
		}
	});
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$maintainKeyDict = function (dict) {
	return A2(
		$elm$core$Dict$filter,
		$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$filterHelper,
		A2($elm$core$Dict$map, $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$maintainHelper, dict));
};
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$subtractTimeSeconds = F2(
	function (t1, t0) {
		return ($elm$time$Time$posixToMillis(t1) - $elm$time$Time$posixToMillis(t0)) / 1000;
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$hiddenTickUpdate = F3(
	function (userUpdate, msg, _v0) {
		var userModel = _v0.a;
		var hiddenModel = _v0.b;
		var updateTick = hiddenModel.tick;
		switch (msg.$) {
			case 'UserMsg':
				var userMsg = msg.a;
				var _v2 = A2(userUpdate, userMsg, userModel);
				var newUserModel = _v2.a;
				var newUserCmds = _v2.b;
				return _Utils_Tuple2(
					_Utils_Tuple2(newUserModel, hiddenModel),
					A2($elm$core$Platform$Cmd$map, $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$UserMsg, newUserCmds));
			case 'InitTime':
				var t = msg.a;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						userModel,
						_Utils_update(
							hiddenModel,
							{initT: t})),
					$elm$core$Platform$Cmd$none);
			case 'TickTime':
				var t = msg.a;
				var timeInSeconds = A2($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$subtractTimeSeconds, t, hiddenModel.initT);
				var keyChecker = $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$keyCheckerFunction(hiddenModel.keys);
				var wasd = A5(
					$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$arrowChecker,
					keyChecker,
					$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Key('w'),
					$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Key('s'),
					$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Key('a'),
					$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Key('d'));
				var arrowKeys = A5($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$arrowChecker, keyChecker, $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$UpArrow, $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$DownArrow, $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$LeftArrow, $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$RightArrow);
				var _v3 = A2(
					userUpdate,
					A2(
						hiddenModel.tick,
						timeInSeconds,
						_Utils_Tuple3(keyChecker, arrowKeys, wasd)),
					userModel);
				var newUserModel = _v3.a;
				var newUserCmds = _v3.b;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						newUserModel,
						_Utils_update(
							hiddenModel,
							{
								keys: $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$maintainKeyDict(hiddenModel.keys)
							})),
					A2($elm$core$Platform$Cmd$map, $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$UserMsg, newUserCmds));
			case 'KeyDown':
				var keyCode = msg.a;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						userModel,
						_Utils_update(
							hiddenModel,
							{
								keys: A3($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$insertKeyDict, hiddenModel.keys, keyCode, $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$WentDown)
							})),
					$elm$core$Platform$Cmd$none);
			default:
				var keyCode = msg.a;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						userModel,
						_Utils_update(
							hiddenModel,
							{
								keys: A3($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$insertKeyDict, hiddenModel.keys, keyCode, $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$WentUp)
							})),
					$elm$core$Platform$Cmd$none);
		}
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$initHiddenModel = function (tick) {
	return {
		initT: $elm$time$Time$millisToPosix(0),
		keys: $elm$core$Dict$empty,
		tick: tick
	};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$Collage = F3(
	function (a, b, c) {
		return {$: 'Collage', a: a, b: b, c: c};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$map = F2(
	function (f, sh) {
		switch (sh.$) {
			case 'Inked':
				var fillClr = sh.a;
				var lt = sh.b;
				var stencil = sh.c;
				return A3($MacCASOutreach$graphicsvg$GraphicSVG$Inked, fillClr, lt, stencil);
			case 'ForeignObject':
				var w = sh.a;
				var h = sh.b;
				var htm = sh.c;
				return A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$ForeignObject,
					w,
					h,
					A2($elm$html$Html$map, f, htm));
			case 'Move':
				var v = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Move,
					v,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'Rotate':
				var deg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Rotate,
					deg,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'Scale':
				var sx = sh.a;
				var sy = sh.b;
				var shape = sh.c;
				return A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$Scale,
					sx,
					sy,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'Skew':
				var skx = sh.a;
				var sky = sh.b;
				var shape = sh.c;
				return A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$Skew,
					skx,
					sky,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'Transformed':
				var tm = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Transformed,
					tm,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'Link':
				var href = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Link,
					href,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'AlphaMask':
				var sh1 = sh.a;
				var sh2 = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$AlphaMask,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, sh1),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, sh2));
			case 'Clip':
				var sh1 = sh.a;
				var sh2 = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Clip,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, sh1),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, sh2));
			case 'Everything':
				return $MacCASOutreach$graphicsvg$GraphicSVG$Everything;
			case 'Notathing':
				return $MacCASOutreach$graphicsvg$GraphicSVG$Notathing;
			case 'Tap':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Tap,
					f(msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'TapAt':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$TapAt,
					A2($elm$core$Basics$composeL, f, msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'EnterShape':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$EnterShape,
					f(msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'EnterAt':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$EnterAt,
					A2($elm$core$Basics$composeL, f, msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'Exit':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$Exit,
					f(msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'ExitAt':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$ExitAt,
					A2($elm$core$Basics$composeL, f, msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'MouseDown':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$MouseDown,
					f(msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'MouseDownAt':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$MouseDownAt,
					A2($elm$core$Basics$composeL, f, msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'MouseUp':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$MouseUp,
					f(msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'MouseUpAt':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$MouseUpAt,
					A2($elm$core$Basics$composeL, f, msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'MoveOverAt':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$MoveOverAt,
					A2($elm$core$Basics$composeL, f, msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'TouchStart':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$TouchStart,
					f(msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'TouchEnd':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$TouchEnd,
					f(msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'TouchStartAt':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$TouchStartAt,
					A2($elm$core$Basics$composeL, f, msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'TouchEndAt':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$TouchEndAt,
					A2($elm$core$Basics$composeL, f, msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'TouchMoveAt':
				var msg = sh.a;
				var shape = sh.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$TouchMoveAt,
					A2($elm$core$Basics$composeL, f, msg),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, shape));
			case 'Group':
				var shapes = sh.a;
				return $MacCASOutreach$graphicsvg$GraphicSVG$Group(
					A2(
						$elm$core$List$map,
						$MacCASOutreach$graphicsvg$GraphicSVG$map(f),
						shapes));
			case 'GroupOutline':
				var cmbndshp = sh.a;
				return $MacCASOutreach$graphicsvg$GraphicSVG$GroupOutline(
					A2($MacCASOutreach$graphicsvg$GraphicSVG$map, f, cmbndshp));
			default:
				var s = sh.a;
				var th = sh.b;
				var c = sh.c;
				return A3($MacCASOutreach$graphicsvg$GraphicSVG$GraphPaper, s, th, c);
		}
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$mapCollage = F2(
	function (f, _v0) {
		var w = _v0.a;
		var h = _v0.b;
		var shapes = _v0.c;
		return A3(
			$MacCASOutreach$graphicsvg$GraphicSVG$Collage,
			w,
			h,
			A2(
				$elm$core$List$map,
				$MacCASOutreach$graphicsvg$GraphicSVG$map(f),
				shapes));
	});
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$KeyDown = function (a) {
	return {$: 'KeyDown', a: a};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$KeyUp = function (a) {
	return {$: 'KeyUp', a: a};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$TickTime = function (a) {
	return {$: 'TickTime', a: a};
};
var $elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 'Time', a: a};
};
var $elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {oldTime: oldTime, request: request, subs: subs};
	});
var $elm$browser$Browser$AnimationManager$init = $elm$core$Task$succeed(
	A3($elm$browser$Browser$AnimationManager$State, _List_Nil, $elm$core$Maybe$Nothing, 0));
var $elm$browser$Browser$AnimationManager$now = _Browser_now(_Utils_Tuple0);
var $elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(_Utils_Tuple0);
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _v0) {
		var request = _v0.request;
		var oldTime = _v0.oldTime;
		var _v1 = _Utils_Tuple2(request, subs);
		if (_v1.a.$ === 'Nothing') {
			if (!_v1.b.b) {
				var _v2 = _v1.a;
				return $elm$browser$Browser$AnimationManager$init;
			} else {
				var _v4 = _v1.a;
				return A2(
					$elm$core$Task$andThen,
					function (pid) {
						return A2(
							$elm$core$Task$andThen,
							function (time) {
								return $elm$core$Task$succeed(
									A3(
										$elm$browser$Browser$AnimationManager$State,
										subs,
										$elm$core$Maybe$Just(pid),
										time));
							},
							$elm$browser$Browser$AnimationManager$now);
					},
					$elm$core$Process$spawn(
						A2(
							$elm$core$Task$andThen,
							$elm$core$Platform$sendToSelf(router),
							$elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_v1.b.b) {
				var pid = _v1.a.a;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $elm$browser$Browser$AnimationManager$init;
					},
					$elm$core$Process$kill(pid));
			} else {
				return $elm$core$Task$succeed(
					A3($elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var $elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _v0) {
		var subs = _v0.subs;
		var oldTime = _v0.oldTime;
		var send = function (sub) {
			if (sub.$ === 'Time') {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(
						$elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			$elm$core$Task$andThen,
			function (pid) {
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$core$Task$succeed(
							A3(
								$elm$browser$Browser$AnimationManager$State,
								subs,
								$elm$core$Maybe$Just(pid),
								newTime));
					},
					$elm$core$Task$sequence(
						A2($elm$core$List$map, send, subs)));
			},
			$elm$core$Process$spawn(
				A2(
					$elm$core$Task$andThen,
					$elm$core$Platform$sendToSelf(router),
					$elm$browser$Browser$AnimationManager$rAF)));
	});
var $elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 'Delta', a: a};
};
var $elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (sub.$ === 'Time') {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Time(
				A2($elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Delta(
				A2($elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager($elm$browser$Browser$AnimationManager$init, $elm$browser$Browser$AnimationManager$onEffects, $elm$browser$Browser$AnimationManager$onSelfMsg, 0, $elm$browser$Browser$AnimationManager$subMap);
var $elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var $elm$browser$Browser$AnimationManager$onAnimationFrame = function (tagger) {
	return $elm$browser$Browser$AnimationManager$subscription(
		$elm$browser$Browser$AnimationManager$Time(tagger));
};
var $elm$browser$Browser$Events$onAnimationFrame = $elm$browser$Browser$AnimationManager$onAnimationFrame;
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $elm$browser$Browser$Events$onKeyUp = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keyup');
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$subs = _List_fromArray(
	[
		$elm$browser$Browser$Events$onKeyUp(
		A2(
			$elm$json$Json$Decode$map,
			$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$KeyUp,
			A2($elm$json$Json$Decode$field, 'keyCode', $elm$json$Json$Decode$int))),
		$elm$browser$Browser$Events$onKeyDown(
		A2(
			$elm$json$Json$Decode$map,
			$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$KeyDown,
			A2($elm$json$Json$Decode$field, 'keyCode', $elm$json$Json$Decode$int))),
		$elm$browser$Browser$Events$onAnimationFrame($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$TickTime)
	]);
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$ellieAppWithTick = F2(
	function (tickMsg, userApp) {
		var userView = userApp.view;
		var userUpdate = userApp.update;
		var userSubs = userApp.subscriptions;
		var userInit = userApp.init;
		return $MacCASOutreach$graphicsvg$GraphicSVG$ellieApp(
			{
				init: function (flags) {
					var userInitModel = userInit(flags).a;
					var userInitCmds = userInit(flags).b;
					return _Utils_Tuple2(
						_Utils_Tuple2(
							userInitModel,
							$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$initHiddenModel(tickMsg)),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									A2($elm$core$Task$perform, $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$InitTime, $elm$time$Time$now),
									A2($elm$core$Platform$Cmd$map, $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$UserMsg, userInitCmds)
								])));
				},
				subscriptions: function (_v0) {
					var userModel = _v0.a;
					return $elm$core$Platform$Sub$batch(
						A2(
							$elm$core$List$cons,
							A2(
								$elm$core$Platform$Sub$map,
								$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$UserMsg,
								userSubs(userModel)),
							$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$subs));
				},
				update: $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$hiddenTickUpdate(userUpdate),
				view: function (_v1) {
					var userModel = _v1.a;
					var userViewE = userView(userModel);
					return {
						body: A2($MacCASOutreach$graphicsvg$GraphicSVG$mapCollage, $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$UserMsg, userViewE.body),
						title: userViewE.title
					};
				}
			});
	});
var $author$project$FinalPrototype$Waiting = {$: 'Waiting'};
var $author$project$ICONS$emptyDict = $elm$core$Dict$fromList(_List_Nil);
var $author$project$L03G1State1$AddingShapeState = {$: 'AddingShapeState'};
var $author$project$L03G1State1$GridWaiting = {$: 'GridWaiting'};
var $author$project$L03G1State1$Waiting1 = {$: 'Waiting1'};
var $author$project$L03G1State1$Waiting2 = {$: 'Waiting2'};
var $author$project$L03G1State1$init = {
	btnScaleDict: $author$project$ICONS$emptyDict,
	currentChangedID: 0,
	globalX: 0,
	globalY: 0,
	gridDX: 0,
	gridDY: 0,
	gridState: $author$project$L03G1State1$GridWaiting,
	highLightShape: {
		name: '',
		outputColor: _Utils_Tuple3(255, 0, 0),
		points: _List_Nil,
		shapeColor: _Utils_Tuple3(0, 0, 0)
	},
	historyList: _List_Nil,
	indexedShapeList: _List_Nil,
	isCtrl: false,
	isShift: false,
	oldSettingsDict: $elm$core$Dict$fromList(_List_Nil),
	palette1State: $author$project$L03G1State1$Waiting1,
	palette1X: -97.5,
	palette2State: $author$project$L03G1State1$Waiting2,
	palette2X: -97.5,
	perGridDX: 0,
	perGridDY: 0,
	scaleGrid: 1,
	settingsDict: $elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2('RotateMode', 1.0),
				_Utils_Tuple2('SPSWE', 0.0)
			])),
	shapeList: _List_Nil,
	state: $author$project$L03G1State1$AddingShapeState,
	tempColor: _Utils_Tuple3(0, 0, 0),
	tempShape: {
		name: '',
		outputColor: _Utils_Tuple3(255, 0, 0),
		points: _List_Nil,
		shapeColor: _Utils_Tuple3(0, 0, 0)
	},
	time: 0,
	x: 0,
	y: 0
};
var $author$project$L03G1State2$GridWaiting = {$: 'GridWaiting'};
var $author$project$L03G1State2$TransState = {$: 'TransState'};
var $author$project$L03G1State2$init = {
	btnScaleDict: $author$project$ICONS$emptyDict,
	displayMatricesList: _List_Nil,
	globalX: 0,
	globalY: 0,
	gridDX: 0,
	gridDY: 0,
	gridState: $author$project$L03G1State2$GridWaiting,
	isKeyDown: false,
	isMouseDown: false,
	oldSettingsDict: $elm$core$Dict$fromList(_List_Nil),
	perGridDX: 0,
	perGridDY: 0,
	reflectX: false,
	reflectY: false,
	reflecto: false,
	reflectynx: false,
	reflectyx: false,
	rotate: 0,
	scaleGrid: 1,
	scaleX: 1,
	scaleY: 1,
	settingsDict: $elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2('RotateMode', 1.0),
				_Utils_Tuple2('SPSWE', 0.0)
			])),
	shapeList: _List_Nil,
	shearX: 0,
	shearY: 0,
	startTime: 0,
	state: $author$project$L03G1State2$TransState,
	time: 0,
	transList: _List_Nil,
	x: 0,
	y: 0
};
var $author$project$L03G1State3$GridWaiting = {$: 'GridWaiting'};
var $author$project$L03G1State3$TransState = {$: 'TransState'};
var $author$project$L03G1State3$init = {
	btnScaleDict: $author$project$ICONS$emptyDict,
	displayMatricesList: _List_Nil,
	globalX: 0,
	globalY: 0,
	gridDX: 0,
	gridDY: 0,
	gridState: $author$project$L03G1State3$GridWaiting,
	page: 1,
	perGridDX: 0,
	perGridDY: 0,
	scaleGrid: 1,
	shapeList: _List_fromArray(
		[
			{
			name: '',
			outputColor: _Utils_Tuple3(255, 0, 0),
			points: _List_fromArray(
				[
					_Utils_Tuple2(1.48849, 2)
				]),
			shapeColor: _Utils_Tuple3(0, 0, 0)
		}
		]),
	startTime: 0,
	state: $author$project$L03G1State3$TransState,
	time: 0,
	transList: _List_Nil,
	x: 0,
	y: 0
};
var $author$project$FinalPrototype$init = {btnScaleDict: $author$project$ICONS$emptyDict, editingShapeModel: $author$project$L03G1State1$init, resultPageModel: $author$project$L03G1State3$init, state: $author$project$FinalPrototype$Waiting, time: 0, transformShapeModel: $author$project$L03G1State2$init};
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$FinalPrototype$EditingShape = {$: 'EditingShape'};
var $author$project$FinalPrototype$EditingShapeMsg = function (a) {
	return {$: 'EditingShapeMsg', a: a};
};
var $author$project$FinalPrototype$ResultPage = {$: 'ResultPage'};
var $author$project$FinalPrototype$ResultPageMsg = function (a) {
	return {$: 'ResultPageMsg', a: a};
};
var $author$project$L03G1State1$Tick = F2(
	function (a, b) {
		return {$: 'Tick', a: a, b: b};
	});
var $author$project$L03G1State2$Tick = F2(
	function (a, b) {
		return {$: 'Tick', a: a, b: b};
	});
var $author$project$FinalPrototype$TransformShape = {$: 'TransformShape'};
var $author$project$L03G1State3$UpdateDisplayMList = function (a) {
	return {$: 'UpdateDisplayMList', a: a};
};
var $author$project$L03G1State1$UpdateGridProps = F3(
	function (a, b, c) {
		return {$: 'UpdateGridProps', a: a, b: b, c: c};
	});
var $author$project$L03G1State2$UpdateGridProps = F3(
	function (a, b, c) {
		return {$: 'UpdateGridProps', a: a, b: b, c: c};
	});
var $author$project$L03G1State3$UpdateGridProps = F3(
	function (a, b, c) {
		return {$: 'UpdateGridProps', a: a, b: b, c: c};
	});
var $author$project$L03G1State1$UpdateSetting = function (a) {
	return {$: 'UpdateSetting', a: a};
};
var $author$project$L03G1State2$UpdateSetting = function (a) {
	return {$: 'UpdateSetting', a: a};
};
var $author$project$L03G1State2$UpdateShapeList = function (a) {
	return {$: 'UpdateShapeList', a: a};
};
var $author$project$L03G1State3$UpdateShapeList = function (a) {
	return {$: 'UpdateShapeList', a: a};
};
var $author$project$L03G1State3$UpdateTransList = function (a) {
	return {$: 'UpdateTransList', a: a};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Ctrl = {$: 'Ctrl'};
var $author$project$L03G1State1$EidtingShapeState = {$: 'EidtingShapeState'};
var $author$project$L03G1State1$Grabbed1 = {$: 'Grabbed1'};
var $author$project$L03G1State1$Grabbed2 = {$: 'Grabbed2'};
var $author$project$L03G1State1$GridDragged = {$: 'GridDragged'};
var $author$project$L03G1State1$SettingState = {$: 'SettingState'};
var $MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Shift = {$: 'Shift'};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $author$project$L03G1Palette$fromColorToPaletteX = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	return (($elm$core$Basics$abs(g - 0) < 0.0000001) && ($elm$core$Basics$abs(b - 0) < 0.0000001)) ? ((((r / 255) + 0) * 8.5) - 97.5) : ((($elm$core$Basics$abs(r - 255) < 0.0000001) && ($elm$core$Basics$abs(b - 0) < 0.0000001)) ? ((((g / 255) + 1) * 8.5) - 97.5) : ((($elm$core$Basics$abs(g - 255) < 0.0000001) && ($elm$core$Basics$abs(b - 0) < 0.0000001)) ? (((((255 - r) / 255) + 2) * 8.5) - 97.5) : ((($elm$core$Basics$abs(r - 0) < 0.0000001) && ($elm$core$Basics$abs(g - 255) < 0.0000001)) ? ((((b / 255) + 3) * 8.5) - 97.5) : ((($elm$core$Basics$abs(r - 0) < 0.0000001) && ($elm$core$Basics$abs(b - 255) < 0.0000001)) ? (((((255 - g) / 255) + 4) * 8.5) - 97.5) : ((($elm$core$Basics$abs(b - 255) < 0.0000001) && ($elm$core$Basics$abs(g - 0) < 0.0000001)) ? ((((r / 255) + 5) * 8.5) - 97.5) : ((($elm$core$Basics$abs(r - 255) < 0.0000001) && ($elm$core$Basics$abs(g - 0) < 0.0000001)) ? (((((255 - b) / 255) + 6) * 8.5) - 97.5) : (($elm$core$Basics$abs(r - 255) < 0.0000001) ? ((((b / 255) + 7) * 8.5) - 97.5) : (-29.5))))))));
};
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$L03G1Palette$fromPaletteXToColor = function (x) {
	var rX = x + 97.5;
	var scaleX = rX / 8.5;
	return ((rX >= 0) && (rX < 8.5)) ? _Utils_Tuple3(255 * scaleX, 0, 0) : (((rX >= 8.5) && (rX < 17)) ? _Utils_Tuple3(255, (scaleX - 1) * 255, 0) : (((rX >= 17) && (rX < 25.5)) ? _Utils_Tuple3(255 - ((scaleX - 2) * 255), 255, 0) : (((rX >= 25.5) && (rX < 34)) ? _Utils_Tuple3(0, 255, (scaleX - 3) * 255) : (((rX >= 34) && (rX < 42.5)) ? _Utils_Tuple3(0, 255 - ((scaleX - 4) * 255), 255) : (((rX >= 42.5) && (rX < 51)) ? _Utils_Tuple3((scaleX - 5) * 255, 0, 255) : (((rX >= 51) && (rX < 59.5)) ? _Utils_Tuple3(255, 0, 255 - ((scaleX - 6) * 255)) : (((rX >= 59.5) && (rX < 68)) ? _Utils_Tuple3(255, (scaleX - 7) * 255, (scaleX - 7) * 255) : ((rX === 68) ? _Utils_Tuple3(255, 255, 255) : _Utils_Tuple3(0, 0, 0)))))))));
};
var $author$project$L03G1State1$getElement = F2(
	function (id, list) {
		var maybeElm = $elm$core$List$head(
			A2($elm$core$List$drop, id, list));
		if (maybeElm.$ === 'Just') {
			var elm = maybeElm.a;
			return elm;
		} else {
			return {
				name: 'ERROR!',
				outputColor: _Utils_Tuple3(255, 0, 0),
				points: _List_Nil,
				shapeColor: _Utils_Tuple3(0, 0, 0)
			};
		}
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$L03G1State1$roundFloatTo05 = F2(
	function (num, scale) {
		var dp = num - ($elm$core$Basics$floor(num / (scale / 2.0)) * (scale / 2.0));
		return (_Utils_cmp(dp, 0.25 * scale) < 0) ? ($elm$core$Basics$floor(num / (scale / 2.0)) * (scale / 2.0)) : ((_Utils_cmp(dp, 0.75 * scale) < 0) ? (($elm$core$Basics$floor(num / (scale / 2.0)) * (scale / 2.0)) + (0.5 * scale)) : ((_Utils_cmp(dp, 0.75 * scale) > 0) ? (($elm$core$Basics$floor(num / (scale / 2.0)) * (scale / 2.0)) + (1.0 * scale)) : num));
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$L03G1State1$setElement = F3(
	function (id, elm, list) {
		return A2(
			$elm$core$List$append,
			A2($elm$core$List$take, id, list),
			A2(
				$elm$core$List$cons,
				elm,
				A2($elm$core$List$drop, id + 1, list)));
	});
var $author$project$L03G1State1$toGirdX = F3(
	function (scale, x, dx) {
		return scale * (((2 * (x - dx)) / 15) - 6);
	});
var $author$project$L03G1State1$toGirdY = F3(
	function (scale, y, dy) {
		return scale * ((2 * (y - dy)) / 15);
	});
var $author$project$L03G1State1$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Tick':
				var t = msg.a;
				var _v1 = msg.b;
				var keys = _v1.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							indexedShapeList: A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, model.shapeList),
							isCtrl: _Utils_eq(
								keys($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Ctrl),
								$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Down) ? true : (_Utils_eq(
								keys($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Ctrl),
								$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Up) ? false : model.isCtrl),
							isShift: _Utils_eq(
								keys($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Shift),
								$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Down) ? true : (_Utils_eq(
								keys($MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Shift),
								$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$Up) ? false : model.isShift),
							time: t
						}),
					$elm$core$Platform$Cmd$none);
			case 'SPMsg':
				var spMsg = msg.a;
				switch (spMsg.$) {
					case 'AddShape':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									shapeList: ($elm$core$List$length(model.shapeList) < 4) ? $elm$core$List$reverse(
										A2(
											$elm$core$List$cons,
											{
												name: 'Shape\u205F\u202F\u200B',
												outputColor: _Utils_Tuple3(255, 0, 0),
												points: _List_Nil,
												shapeColor: _Utils_Tuple3(0, 0, 0)
											},
											$elm$core$List$reverse(model.shapeList))) : model.shapeList
								}),
							$elm$core$Platform$Cmd$none);
					case 'DelShape':
						var id = spMsg.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									shapeList: A2(
										$elm$core$List$append,
										A2($elm$core$List$take, id, model.shapeList),
										A2($elm$core$List$drop, id + 1, model.shapeList))
								}),
							$elm$core$Platform$Cmd$none);
					case 'EditShape':
						var id = spMsg.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									currentChangedID: id,
									palette1X: $author$project$L03G1Palette$fromColorToPaletteX(
										A2($author$project$L03G1State1$getElement, id, model.shapeList).shapeColor),
									palette2X: $author$project$L03G1Palette$fromColorToPaletteX(
										A2($author$project$L03G1State1$getElement, id, model.shapeList).outputColor),
									state: $author$project$L03G1State1$EidtingShapeState,
									tempShape: A2($author$project$L03G1State1$getElement, id, model.shapeList)
								}),
							$elm$core$Platform$Cmd$none);
					case 'ToSetting':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{oldSettingsDict: model.settingsDict, state: $author$project$L03G1State1$SettingState}),
							$elm$core$Platform$Cmd$none);
					case 'ChangeSetting':
						var key = spMsg.a;
						var value = spMsg.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									settingsDict: A3(
										$elm$core$Dict$insert,
										key,
										(value === 0.0) ? 1.0 : 0.0,
										model.settingsDict)
								}),
							$elm$core$Platform$Cmd$none);
					case 'ConfirmChangeE':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									shapeList: A3($author$project$L03G1State1$setElement, model.currentChangedID, model.tempShape, model.shapeList),
									state: $author$project$L03G1State1$AddingShapeState
								}),
							$elm$core$Platform$Cmd$none);
					case 'DiscardChangeE':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{state: $author$project$L03G1State1$AddingShapeState}),
							$elm$core$Platform$Cmd$none);
					case 'ConfirmChangeS':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{state: $author$project$L03G1State1$AddingShapeState}),
							$elm$core$Platform$Cmd$none);
					case 'DiscardChangeS':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{settingsDict: model.oldSettingsDict, state: $author$project$L03G1State1$AddingShapeState}),
							$elm$core$Platform$Cmd$none);
					case 'DataChanged':
						var newName = spMsg.a;
						var newPoints = spMsg.b;
						var newC1 = spMsg.c;
						var newC2 = spMsg.d;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									historyList: newPoints,
									tempShape: {name: newName, outputColor: newC2, points: newPoints, shapeColor: newC1}
								}),
							$elm$core$Platform$Cmd$none);
					case 'GetBaseColor1':
						var _v3 = spMsg.a;
						var rX = model.palette1X + 97.5;
						var scaleX = rX / 8.5;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									tempColor: $author$project$L03G1Palette$fromPaletteXToColor(model.palette1X)
								}),
							$elm$core$Platform$Cmd$none);
					case 'Grabbing1':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{palette1State: $author$project$L03G1State1$Grabbed1}),
							$elm$core$Platform$Cmd$none);
					case 'MoveFloater1':
						var _v4 = spMsg.a;
						var x = _v4.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									palette1X: (_Utils_cmp(x, -97.5) < 0) ? (-97.5) : ((_Utils_cmp(x, -29.5) > 0) ? (-29.5) : x)
								}),
							$elm$core$Platform$Cmd$none);
					case 'Stop1':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{palette1State: $author$project$L03G1State1$Waiting1}),
							$elm$core$Platform$Cmd$none);
					case 'GetBaseColor2':
						var _v5 = spMsg.a;
						var rX = model.palette2X + 97.5;
						var scaleX = rX / 8.5;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									tempColor: $author$project$L03G1Palette$fromPaletteXToColor(model.palette2X)
								}),
							$elm$core$Platform$Cmd$none);
					case 'Grabbing2':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{palette2State: $author$project$L03G1State1$Grabbed2}),
							$elm$core$Platform$Cmd$none);
					case 'MoveFloater2':
						var _v6 = spMsg.a;
						var x = _v6.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									palette2X: (_Utils_cmp(x, -97.5) < 0) ? (-97.5) : ((_Utils_cmp(x, -29.5) > 0) ? (-29.5) : x)
								}),
							$elm$core$Platform$Cmd$none);
					case 'Stop2':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{palette2State: $author$project$L03G1State1$Waiting2}),
							$elm$core$Platform$Cmd$none);
					case 'Hignlighting':
						var id = spMsg.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									highLightShape: A2($author$project$L03G1State1$getElement, id, model.shapeList)
								}),
							$elm$core$Platform$Cmd$none);
					case 'CleanHignlighting':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									highLightShape: {
										name: '',
										outputColor: _Utils_Tuple3(255, 0, 0),
										points: _List_Nil,
										shapeColor: _Utils_Tuple3(0, 0, 0)
									}
								}),
							$elm$core$Platform$Cmd$none);
					case 'Undo':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									tempShape: {
										name: model.tempShape.name,
										outputColor: model.tempShape.outputColor,
										points: $elm$core$List$reverse(
											A2(
												$elm$core$List$drop,
												1,
												$elm$core$List$reverse(model.tempShape.points))),
										shapeColor: model.tempShape.shapeColor
									}
								}),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									tempShape: {
										name: model.tempShape.name,
										outputColor: model.tempShape.outputColor,
										points: A2(
											$elm$core$List$append,
											model.tempShape.points,
											A2(
												$elm$core$List$take,
												1,
												A2(
													$elm$core$List$drop,
													$elm$core$List$length(model.tempShape.points),
													model.historyList))),
										shapeColor: model.tempShape.shapeColor
									}
								}),
							$elm$core$Platform$Cmd$none);
				}
			case 'ShowingCoordinate':
				var _v7 = msg.a;
				var newX = _v7.a;
				var newY = _v7.b;
				return model.isCtrl ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							x: A2(
								$author$project$L03G1State1$roundFloatTo05,
								A3($author$project$L03G1State1$toGirdX, model.scaleGrid, newX, model.gridDX),
								model.scaleGrid),
							y: A2(
								$author$project$L03G1State1$roundFloatTo05,
								A3($author$project$L03G1State1$toGirdY, model.scaleGrid, newY, model.gridDY),
								model.scaleGrid)
						}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							x: A3($author$project$L03G1State1$toGirdX, model.scaleGrid, newX, model.gridDX),
							y: A3($author$project$L03G1State1$toGirdY, model.scaleGrid, newY, model.gridDY)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ScaleBtn':
				var name = msg.a;
				var scale = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							btnScaleDict: A3($elm$core$Dict$insert, name, scale, model.btnScaleDict)
						}),
					$elm$core$Platform$Cmd$none);
			case 'CancelScale':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{btnScaleDict: $author$project$ICONS$emptyDict}),
					$elm$core$Platform$Cmd$none);
			case 'GPMsg':
				var gpMsg = msg.a;
				switch (gpMsg.$) {
					case 'GridDraggedAt':
						var _v9 = gpMsg.a;
						var nx = _v9.a;
						var ny = _v9.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{globalX: nx, globalY: ny, gridState: $author$project$L03G1State1$GridDragged}),
							$elm$core$Platform$Cmd$none);
					case 'GridDragging':
						var _v10 = gpMsg.a;
						var x = _v10.a;
						var y = _v10.b;
						var _v11 = model.gridState;
						if (_v11.$ === 'GridWaiting') {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{gridDX: (model.perGridDX + x) - model.globalX, gridDY: (model.perGridDY + y) - model.globalY}),
								$elm$core$Platform$Cmd$none);
						}
					case 'GridReleasing':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{gridState: $author$project$L03G1State1$GridWaiting, perGridDX: model.gridDX, perGridDY: model.gridDY}),
							$elm$core$Platform$Cmd$none);
					case 'ClearGridDelta':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{globalX: 0, globalY: 0, gridDX: 0, gridDY: 0, gridState: $author$project$L03G1State1$GridWaiting, perGridDX: 0, perGridDY: 0, scaleGrid: 1}),
							$elm$core$Platform$Cmd$none);
					default:
						var scale = gpMsg.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									scaleGrid: (scale > 32) ? 32 : ((_Utils_cmp(scale, 1 / 32) < 0) ? (1 / 32) : scale)
								}),
							$elm$core$Platform$Cmd$none);
				}
			case 'UpdateSetting':
				var settings = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{settingsDict: settings}),
					$elm$core$Platform$Cmd$none);
			default:
				var dx = msg.a;
				var dy = msg.b;
				var scale = msg.c;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{gridDX: dx, gridDY: dy, scaleGrid: scale}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$L03G1State2$GridDragged = {$: 'GridDragged'};
var $author$project$L03G1State2$SettingState = {$: 'SettingState'};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$L03G1State2$getFromDict = F2(
	function (key, dict) {
		return A2(
			$elm$core$Maybe$withDefault,
			1.0,
			A2($elm$core$Dict$get, key, dict));
	});
var $author$project$L03G1MatrixModel2$Coef = function (a) {
	return {$: 'Coef', a: a};
};
var $author$project$L03G1MatrixModel2$horiShear = function (k) {
	return _List_fromArray(
		[
			_List_fromArray(
			[
				$author$project$L03G1MatrixModel2$Coef(1),
				$author$project$L03G1MatrixModel2$Coef(k)
			]),
			_List_fromArray(
			[
				$author$project$L03G1MatrixModel2$Coef(0),
				$author$project$L03G1MatrixModel2$Coef(1)
			])
		]);
};
var $author$project$L03G1MatrixModel2$identityMatrix = _List_fromArray(
	[
		_List_fromArray(
		[
			$author$project$L03G1MatrixModel2$Coef(1),
			$author$project$L03G1MatrixModel2$Coef(0)
		]),
		_List_fromArray(
		[
			$author$project$L03G1MatrixModel2$Coef(0),
			$author$project$L03G1MatrixModel2$Coef(1)
		])
	]);
var $author$project$L03G1MatrixModel2$reflectOrigin = _List_fromArray(
	[
		_List_fromArray(
		[
			$author$project$L03G1MatrixModel2$Coef(-1),
			$author$project$L03G1MatrixModel2$Coef(0)
		]),
		_List_fromArray(
		[
			$author$project$L03G1MatrixModel2$Coef(0),
			$author$project$L03G1MatrixModel2$Coef(-1)
		])
	]);
var $author$project$L03G1MatrixModel2$reflectX = _List_fromArray(
	[
		_List_fromArray(
		[
			$author$project$L03G1MatrixModel2$Coef(1),
			$author$project$L03G1MatrixModel2$Coef(0)
		]),
		_List_fromArray(
		[
			$author$project$L03G1MatrixModel2$Coef(0),
			$author$project$L03G1MatrixModel2$Coef(-1)
		])
	]);
var $author$project$L03G1MatrixModel2$reflectY = _List_fromArray(
	[
		_List_fromArray(
		[
			$author$project$L03G1MatrixModel2$Coef(-1),
			$author$project$L03G1MatrixModel2$Coef(0)
		]),
		_List_fromArray(
		[
			$author$project$L03G1MatrixModel2$Coef(0),
			$author$project$L03G1MatrixModel2$Coef(1)
		])
	]);
var $author$project$L03G1MatrixModel2$reflectYeqNegX = _List_fromArray(
	[
		_List_fromArray(
		[
			$author$project$L03G1MatrixModel2$Coef(0),
			$author$project$L03G1MatrixModel2$Coef(-1)
		]),
		_List_fromArray(
		[
			$author$project$L03G1MatrixModel2$Coef(-1),
			$author$project$L03G1MatrixModel2$Coef(0)
		])
	]);
var $author$project$L03G1MatrixModel2$reflectYeqX = _List_fromArray(
	[
		_List_fromArray(
		[
			$author$project$L03G1MatrixModel2$Coef(0),
			$author$project$L03G1MatrixModel2$Coef(1)
		]),
		_List_fromArray(
		[
			$author$project$L03G1MatrixModel2$Coef(1),
			$author$project$L03G1MatrixModel2$Coef(0)
		])
	]);
var $author$project$L03G1MatrixModel2$CosD = {$: 'CosD'};
var $author$project$L03G1MatrixModel2$Func1 = F2(
	function (a, b) {
		return {$: 'Func1', a: a, b: b};
	});
var $author$project$L03G1MatrixModel2$Func2 = F3(
	function (a, b, c) {
		return {$: 'Func2', a: a, b: b, c: c};
	});
var $author$project$L03G1MatrixModel2$Mult = {$: 'Mult'};
var $author$project$L03G1MatrixModel2$SinD = {$: 'SinD'};
var $author$project$L03G1MatrixModel2$rotateMatrixD = function (degrees) {
	return _List_fromArray(
		[
			_List_fromArray(
			[
				A2(
				$author$project$L03G1MatrixModel2$Func1,
				$author$project$L03G1MatrixModel2$CosD,
				$author$project$L03G1MatrixModel2$Coef(degrees)),
				A3(
				$author$project$L03G1MatrixModel2$Func2,
				$author$project$L03G1MatrixModel2$Mult,
				$author$project$L03G1MatrixModel2$Coef(-1),
				A2(
					$author$project$L03G1MatrixModel2$Func1,
					$author$project$L03G1MatrixModel2$SinD,
					$author$project$L03G1MatrixModel2$Coef(degrees)))
			]),
			_List_fromArray(
			[
				A2(
				$author$project$L03G1MatrixModel2$Func1,
				$author$project$L03G1MatrixModel2$SinD,
				$author$project$L03G1MatrixModel2$Coef(degrees)),
				A2(
				$author$project$L03G1MatrixModel2$Func1,
				$author$project$L03G1MatrixModel2$CosD,
				$author$project$L03G1MatrixModel2$Coef(degrees))
			])
		]);
};
var $author$project$L03G1MatrixModel2$CosR = {$: 'CosR'};
var $author$project$L03G1MatrixModel2$SinR = {$: 'SinR'};
var $author$project$L03G1MatrixModel2$rotateMatrixR = function (a) {
	return _List_fromArray(
		[
			_List_fromArray(
			[
				A2(
				$author$project$L03G1MatrixModel2$Func1,
				$author$project$L03G1MatrixModel2$CosR,
				$author$project$L03G1MatrixModel2$Coef(a)),
				A3(
				$author$project$L03G1MatrixModel2$Func2,
				$author$project$L03G1MatrixModel2$Mult,
				$author$project$L03G1MatrixModel2$Coef(-1),
				A2(
					$author$project$L03G1MatrixModel2$Func1,
					$author$project$L03G1MatrixModel2$SinR,
					$author$project$L03G1MatrixModel2$Coef(a)))
			]),
			_List_fromArray(
			[
				A2(
				$author$project$L03G1MatrixModel2$Func1,
				$author$project$L03G1MatrixModel2$SinR,
				$author$project$L03G1MatrixModel2$Coef(a)),
				A2(
				$author$project$L03G1MatrixModel2$Func1,
				$author$project$L03G1MatrixModel2$CosR,
				$author$project$L03G1MatrixModel2$Coef(a))
			])
		]);
};
var $author$project$L03G1MatrixModel2$scaleMatrix = F2(
	function (x, y) {
		return _List_fromArray(
			[
				_List_fromArray(
				[
					$author$project$L03G1MatrixModel2$Coef(x),
					$author$project$L03G1MatrixModel2$Coef(0)
				]),
				_List_fromArray(
				[
					$author$project$L03G1MatrixModel2$Coef(0),
					$author$project$L03G1MatrixModel2$Coef(y)
				])
			]);
	});
var $elm$core$String$toFloat = _String_toFloat;
var $author$project$L03G1State2$toGirdX = F3(
	function (scale, x, dx) {
		return scale * (((2 * (x - dx)) / 15) - 6);
	});
var $author$project$L03G1State2$toGirdY = F3(
	function (scale, y, dy) {
		return scale * ((2 * (y - dy)) / 15);
	});
var $author$project$L03G1MatrixModel2$vertShear = function (k) {
	return _List_fromArray(
		[
			_List_fromArray(
			[
				$author$project$L03G1MatrixModel2$Coef(1),
				$author$project$L03G1MatrixModel2$Coef(0)
			]),
			_List_fromArray(
			[
				$author$project$L03G1MatrixModel2$Coef(k),
				$author$project$L03G1MatrixModel2$Coef(1)
			])
		]);
};
var $author$project$L03G1State2$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Tick':
				var t = msg.a;
				var newShearY = model.shearY;
				var newShearX = model.shearX;
				var newScaleY = model.scaleY;
				var newScaleX = model.scaleX;
				var newRotate = model.rotate;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							displayMatricesList: _Utils_ap(
								((!model.isMouseDown) && (!model.isKeyDown)) ? _List_fromArray(
									[
										A2($author$project$L03G1MatrixModel2$scaleMatrix, newScaleX, 1),
										A2($author$project$L03G1MatrixModel2$scaleMatrix, 1, newScaleY),
										$author$project$L03G1MatrixModel2$horiShear(newShearX),
										$author$project$L03G1MatrixModel2$vertShear(newShearY),
										((A2($author$project$L03G1State2$getFromDict, 'RotateMode', model.settingsDict) === 1.0) ? $author$project$L03G1MatrixModel2$rotateMatrixD : $author$project$L03G1MatrixModel2$rotateMatrixR)(newRotate)
									]) : model.displayMatricesList,
								_List_fromArray(
									[
										model.reflectX ? $author$project$L03G1MatrixModel2$reflectX : $author$project$L03G1MatrixModel2$identityMatrix,
										model.reflectY ? $author$project$L03G1MatrixModel2$reflectY : $author$project$L03G1MatrixModel2$identityMatrix,
										model.reflectyx ? $author$project$L03G1MatrixModel2$reflectYeqX : $author$project$L03G1MatrixModel2$identityMatrix,
										model.reflectynx ? $author$project$L03G1MatrixModel2$reflectYeqNegX : $author$project$L03G1MatrixModel2$identityMatrix,
										model.reflecto ? $author$project$L03G1MatrixModel2$reflectOrigin : $author$project$L03G1MatrixModel2$identityMatrix
									])),
							startTime: model.time,
							time: t
						}),
					$elm$core$Platform$Cmd$none);
			case 'DataChanging':
				var i = msg.a;
				var numberStr = msg.b;
				var newShearY = (i === 3) ? A2(
					$elm$core$Maybe$withDefault,
					0,
					$elm$core$String$toFloat(numberStr)) : model.shearY;
				var newShearX = (i === 2) ? A2(
					$elm$core$Maybe$withDefault,
					0,
					$elm$core$String$toFloat(numberStr)) : model.shearX;
				var newScaleY = (i === 1) ? A2(
					$elm$core$Maybe$withDefault,
					0,
					$elm$core$String$toFloat(numberStr)) : model.scaleY;
				var newScaleX = (!i) ? A2(
					$elm$core$Maybe$withDefault,
					0,
					$elm$core$String$toFloat(numberStr)) : model.scaleX;
				var newRotate = (i === 4) ? A2(
					$elm$core$Maybe$withDefault,
					0,
					$elm$core$String$toFloat(numberStr)) : model.rotate;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							rotate: newRotate,
							scaleX: newScaleX,
							scaleY: newScaleY,
							shearX: newShearX,
							shearY: newShearY,
							transList: _List_fromArray(
								[
									A2($author$project$L03G1MatrixModel2$scaleMatrix, newScaleX, 1),
									A2($author$project$L03G1MatrixModel2$scaleMatrix, 1, newScaleY),
									$author$project$L03G1MatrixModel2$horiShear(newShearX),
									$author$project$L03G1MatrixModel2$vertShear(newShearY),
									((A2($author$project$L03G1State2$getFromDict, 'RotateMode', model.settingsDict) === 1.0) ? $author$project$L03G1MatrixModel2$rotateMatrixD : $author$project$L03G1MatrixModel2$rotateMatrixR)(newRotate),
									model.reflectX ? $author$project$L03G1MatrixModel2$reflectX : $author$project$L03G1MatrixModel2$identityMatrix,
									model.reflectY ? $author$project$L03G1MatrixModel2$reflectY : $author$project$L03G1MatrixModel2$identityMatrix,
									model.reflectyx ? $author$project$L03G1MatrixModel2$reflectYeqX : $author$project$L03G1MatrixModel2$identityMatrix,
									model.reflectynx ? $author$project$L03G1MatrixModel2$reflectYeqNegX : $author$project$L03G1MatrixModel2$identityMatrix,
									model.reflecto ? $author$project$L03G1MatrixModel2$reflectOrigin : $author$project$L03G1MatrixModel2$identityMatrix
								])
						}),
					$elm$core$Platform$Cmd$none);
			case 'Reverse':
				var i = msg.a;
				switch (i) {
					case 5:
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{reflecto: !model.reflecto}),
							$elm$core$Platform$Cmd$none);
					case 6:
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{reflectX: !model.reflectX}),
							$elm$core$Platform$Cmd$none);
					case 7:
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{reflectY: !model.reflectY}),
							$elm$core$Platform$Cmd$none);
					case 8:
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{reflectyx: !model.reflectyx}),
							$elm$core$Platform$Cmd$none);
					case 9:
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{reflectynx: !model.reflectynx}),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'UpdateTransMatrix':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							transList: _List_fromArray(
								[
									A2($author$project$L03G1MatrixModel2$scaleMatrix, model.scaleX, 1),
									A2($author$project$L03G1MatrixModel2$scaleMatrix, 1, model.scaleY),
									$author$project$L03G1MatrixModel2$horiShear(model.shearX),
									$author$project$L03G1MatrixModel2$vertShear(model.shearY),
									((A2($author$project$L03G1State2$getFromDict, 'RotateMode', model.settingsDict) === 1.0) ? $author$project$L03G1MatrixModel2$rotateMatrixD : $author$project$L03G1MatrixModel2$rotateMatrixR)(model.rotate),
									model.reflectX ? $author$project$L03G1MatrixModel2$reflectX : $author$project$L03G1MatrixModel2$identityMatrix,
									model.reflectY ? $author$project$L03G1MatrixModel2$reflectY : $author$project$L03G1MatrixModel2$identityMatrix,
									model.reflectyx ? $author$project$L03G1MatrixModel2$reflectYeqX : $author$project$L03G1MatrixModel2$identityMatrix,
									model.reflectynx ? $author$project$L03G1MatrixModel2$reflectYeqNegX : $author$project$L03G1MatrixModel2$identityMatrix,
									model.reflecto ? $author$project$L03G1MatrixModel2$reflectOrigin : $author$project$L03G1MatrixModel2$identityMatrix
								])
						}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateShapeList':
				var spList = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{shapeList: spList}),
					$elm$core$Platform$Cmd$none);
			case 'MouseStateChanging':
				var l = msg.a;
				var i = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							isMouseDown: (!i) ? (!l) : model.isMouseDown
						}),
					$elm$core$Platform$Cmd$none);
			case 'KeyboardStateChanging':
				var isDown = msg.a;
				var key = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							isKeyDown: ((key === 40) || (key === 38)) ? (isDown === 1) : false
						}),
					$elm$core$Platform$Cmd$none);
			case 'ToSetting':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{oldSettingsDict: model.settingsDict, state: $author$project$L03G1State2$SettingState}),
					$elm$core$Platform$Cmd$none);
			case 'ChangeSetting':
				var key = msg.a;
				var value = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							settingsDict: A3(
								$elm$core$Dict$insert,
								key,
								(value === 0.0) ? 1.0 : 0.0,
								model.settingsDict)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ConfirmChangeS':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{state: $author$project$L03G1State2$TransState}),
					$elm$core$Platform$Cmd$none);
			case 'DiscardChangeS':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{settingsDict: model.oldSettingsDict, state: $author$project$L03G1State2$TransState}),
					$elm$core$Platform$Cmd$none);
			case 'ResetMatraix':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{displayMatricesList: _List_Nil, reflectX: false, reflectY: false, reflecto: false, reflectynx: false, reflectyx: false, rotate: 0, scaleX: 1, scaleY: 1, shearX: 0, shearY: 0, transList: _List_Nil}),
					$elm$core$Platform$Cmd$none);
			case 'ShowingCoordinate':
				var _v2 = msg.a;
				var newX = _v2.a;
				var newY = _v2.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							x: A3($author$project$L03G1State2$toGirdX, model.scaleGrid, newX, model.gridDX),
							y: A3($author$project$L03G1State2$toGirdY, model.scaleGrid, newY, model.gridDY)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ScaleBtn':
				var name = msg.a;
				var scale = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							btnScaleDict: A3($elm$core$Dict$insert, name, scale, model.btnScaleDict)
						}),
					$elm$core$Platform$Cmd$none);
			case 'CancelScale':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{btnScaleDict: $author$project$ICONS$emptyDict}),
					$elm$core$Platform$Cmd$none);
			case 'GPMsg':
				var gpMsg = msg.a;
				switch (gpMsg.$) {
					case 'GridDraggedAt':
						var _v4 = gpMsg.a;
						var nx = _v4.a;
						var ny = _v4.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{globalX: nx, globalY: ny, gridState: $author$project$L03G1State2$GridDragged}),
							$elm$core$Platform$Cmd$none);
					case 'GridDragging':
						var _v5 = gpMsg.a;
						var x = _v5.a;
						var y = _v5.b;
						var _v6 = model.gridState;
						if (_v6.$ === 'GridWaiting') {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{gridDX: (model.perGridDX + x) - model.globalX, gridDY: (model.perGridDY + y) - model.globalY}),
								$elm$core$Platform$Cmd$none);
						}
					case 'GridReleasing':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{gridState: $author$project$L03G1State2$GridWaiting, perGridDX: model.gridDX, perGridDY: model.gridDY}),
							$elm$core$Platform$Cmd$none);
					case 'ClearGridDelta':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{globalX: 0, globalY: 0, gridDX: 0, gridDY: 0, gridState: $author$project$L03G1State2$GridWaiting, perGridDX: 0, perGridDY: 0, scaleGrid: 1}),
							$elm$core$Platform$Cmd$none);
					default:
						var scale = gpMsg.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									scaleGrid: (scale > 32) ? 32 : ((_Utils_cmp(scale, 1 / 32) < 0) ? (1 / 32) : scale)
								}),
							$elm$core$Platform$Cmd$none);
				}
			case 'UpdateSetting':
				var settings = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{settingsDict: settings}),
					$elm$core$Platform$Cmd$none);
			default:
				var dx = msg.a;
				var dy = msg.b;
				var scale = msg.c;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{gridDX: dx, gridDY: dy, scaleGrid: scale}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$L03G1State3$GridDragged = {$: 'GridDragged'};
var $author$project$L03G1State3$toGirdX = F3(
	function (scale, x, dx) {
		return scale * (((2 * (x - dx)) / 15) - 6);
	});
var $author$project$L03G1State3$toGirdY = F3(
	function (scale, y, dy) {
		return scale * ((2 * (y - dy)) / 15);
	});
var $author$project$L03G1State3$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Tick':
				var t = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{startTime: model.time, time: t}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateShapeList':
				var spList = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{shapeList: spList}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateTransList':
				var list = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{transList: list}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateDisplayMList':
				var list = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{displayMatricesList: list}),
					$elm$core$Platform$Cmd$none);
			case 'ShowingCoordinate':
				var _v1 = msg.a;
				var newX = _v1.a;
				var newY = _v1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							x: A3($author$project$L03G1State3$toGirdX, model.scaleGrid, newX, model.gridDX),
							y: A3($author$project$L03G1State3$toGirdY, model.scaleGrid, newY, model.gridDY)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ScaleBtn':
				var name = msg.a;
				var scale = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							btnScaleDict: A3($elm$core$Dict$insert, name, scale, model.btnScaleDict)
						}),
					$elm$core$Platform$Cmd$none);
			case 'CancelScale':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{btnScaleDict: $author$project$ICONS$emptyDict}),
					$elm$core$Platform$Cmd$none);
			case 'GPMsg':
				var gpMsg = msg.a;
				switch (gpMsg.$) {
					case 'GridDraggedAt':
						var _v3 = gpMsg.a;
						var nx = _v3.a;
						var ny = _v3.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{globalX: nx, globalY: ny, gridState: $author$project$L03G1State3$GridDragged}),
							$elm$core$Platform$Cmd$none);
					case 'GridDragging':
						var _v4 = gpMsg.a;
						var x = _v4.a;
						var y = _v4.b;
						var _v5 = model.gridState;
						if (_v5.$ === 'GridWaiting') {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{gridDX: (model.perGridDX + x) - model.globalX, gridDY: (model.perGridDY + y) - model.globalY}),
								$elm$core$Platform$Cmd$none);
						}
					case 'GridReleasing':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{gridState: $author$project$L03G1State3$GridWaiting, perGridDX: model.gridDX, perGridDY: model.gridDY}),
							$elm$core$Platform$Cmd$none);
					case 'ClearGridDelta':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{globalX: 0, globalY: 0, gridDX: 0, gridDY: 0, gridState: $author$project$L03G1State3$GridWaiting, perGridDX: 0, perGridDY: 0, scaleGrid: 1}),
							$elm$core$Platform$Cmd$none);
					default:
						var scale = gpMsg.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									scaleGrid: (scale > 32) ? 32 : ((_Utils_cmp(scale, 1 / 32) < 0) ? (1 / 32) : scale)
								}),
							$elm$core$Platform$Cmd$none);
				}
			case 'ForwardPage':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{page: model.page + 1}),
					$elm$core$Platform$Cmd$none);
			case 'BackwardPage':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{page: model.page - 1}),
					$elm$core$Platform$Cmd$none);
			default:
				var dx = msg.a;
				var dy = msg.b;
				var scale = msg.c;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{gridDX: dx, gridDY: dy, scaleGrid: scale}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$FinalPrototype$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Tick':
				var t = msg.a;
				var keyboardStuff = msg.b;
				var _v1 = A2(
					$author$project$L03G1State2$update,
					A2($author$project$L03G1State2$Tick, t, keyboardStuff),
					model.transformShapeModel);
				var newTransformShapeModel = _v1.a;
				var newTSCmd = _v1.b;
				var _v2 = A2(
					$author$project$L03G1State1$update,
					A2($author$project$L03G1State1$Tick, t, keyboardStuff),
					model.editingShapeModel);
				var newEditingShapeModel = _v2.a;
				var newESCmd = _v2.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editingShapeModel: newEditingShapeModel, time: t, transformShapeModel: newTransformShapeModel}),
					$elm$core$Platform$Cmd$none);
			case 'ToTransformShape':
				var _v3 = A2(
					$author$project$L03G1State2$update,
					$author$project$L03G1State2$UpdateShapeList(model.editingShapeModel.shapeList),
					model.transformShapeModel);
				var newTransformShapeModelU = _v3.a;
				var newTSCmd = _v3.b;
				var _v4 = A2(
					$author$project$L03G1State2$update,
					$author$project$L03G1State2$UpdateSetting(model.editingShapeModel.settingsDict),
					newTransformShapeModelU);
				var newTransformShapeModelUS = _v4.a;
				var newCmd = _v4.b;
				var _v5 = A2(
					$author$project$L03G1State2$update,
					A3($author$project$L03G1State2$UpdateGridProps, model.editingShapeModel.gridDX, model.editingShapeModel.gridDY, model.editingShapeModel.scaleGrid),
					newTransformShapeModelUS);
				var newTransformShapeModel = _v5.a;
				var newCmd4 = _v5.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{state: $author$project$FinalPrototype$TransformShape, transformShapeModel: newTransformShapeModel}),
					$elm$core$Platform$Cmd$none);
			case 'ToEditingShape':
				var _v6 = A2(
					$author$project$L03G1State1$update,
					$author$project$L03G1State1$UpdateSetting(model.transformShapeModel.settingsDict),
					model.editingShapeModel);
				var newEditingShapeModel = _v6.a;
				var newCmd = _v6.b;
				var _v7 = A2(
					$author$project$L03G1State1$update,
					A3($author$project$L03G1State1$UpdateGridProps, model.transformShapeModel.gridDX, model.transformShapeModel.gridDY, model.transformShapeModel.scaleGrid),
					newEditingShapeModel);
				var newEditingShapeModel2 = _v7.a;
				var newCmd4 = _v7.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editingShapeModel: newEditingShapeModel2, state: $author$project$FinalPrototype$EditingShape}),
					$elm$core$Platform$Cmd$none);
			case 'ToResultPage':
				var _v8 = A2(
					$author$project$L03G1State3$update,
					$author$project$L03G1State3$UpdateTransList(model.transformShapeModel.transList),
					model.resultPageModel);
				var newResultPageModel1 = _v8.a;
				var newCmd1 = _v8.b;
				var _v9 = A2(
					$author$project$L03G1State3$update,
					$author$project$L03G1State3$UpdateDisplayMList(model.transformShapeModel.displayMatricesList),
					newResultPageModel1);
				var newResultPageModel2 = _v9.a;
				var newCmd2 = _v9.b;
				var _v10 = A2(
					$author$project$L03G1State3$update,
					$author$project$L03G1State3$UpdateShapeList(model.transformShapeModel.shapeList),
					newResultPageModel2);
				var newResultPageModel3 = _v10.a;
				var newCmd3 = _v10.b;
				var _v11 = A2(
					$author$project$L03G1State3$update,
					A3($author$project$L03G1State3$UpdateGridProps, model.transformShapeModel.gridDX, model.transformShapeModel.gridDY, model.transformShapeModel.scaleGrid),
					newResultPageModel3);
				var newResultPageModel4 = _v11.a;
				var newCmd4 = _v11.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{resultPageModel: newResultPageModel4, state: $author$project$FinalPrototype$ResultPage}),
					$elm$core$Platform$Cmd$none);
			case 'EditingShapeMsg':
				var esMsg = msg.a;
				var _v12 = A2($author$project$L03G1State1$update, esMsg, model.editingShapeModel);
				var newModel = _v12.a;
				var newCmd = _v12.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editingShapeModel: newModel}),
					A2($elm$core$Platform$Cmd$map, $author$project$FinalPrototype$EditingShapeMsg, newCmd));
			case 'TransformShapeMsg':
				var tsMsg = msg.a;
				var _v13 = A2($author$project$L03G1State2$update, tsMsg, model.transformShapeModel);
				var newModel = _v13.a;
				var newCmd = _v13.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{transformShapeModel: newModel}),
					A2($elm$core$Platform$Cmd$map, $author$project$FinalPrototype$EditingShapeMsg, newCmd));
			case 'ResultPageMsg':
				var rpMsg = msg.a;
				var _v14 = A2($author$project$L03G1State3$update, rpMsg, model.resultPageModel);
				var newModel = _v14.a;
				var newCmd = _v14.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{resultPageModel: newModel}),
					A2($elm$core$Platform$Cmd$map, $author$project$FinalPrototype$ResultPageMsg, newCmd));
			case 'ScaleBtn':
				var name = msg.a;
				var scale = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							btnScaleDict: A3($elm$core$Dict$insert, name, scale, model.btnScaleDict)
						}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{btnScaleDict: $author$project$ICONS$emptyDict}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$FinalPrototype$TransformShapeMsg = function (a) {
	return {$: 'TransformShapeMsg', a: a};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$collage = F3(
	function (w, h, shapes) {
		return A3($MacCASOutreach$graphicsvg$GraphicSVG$Collage, w, h, shapes);
	});
var $author$project$FinalPrototype$CancelScale = {$: 'CancelScale'};
var $author$project$FinalPrototype$ScaleBtn = F2(
	function (a, b) {
		return {$: 'ScaleBtn', a: a, b: b};
	});
var $author$project$FinalPrototype$ToEditingShape = {$: 'ToEditingShape'};
var $MacCASOutreach$graphicsvg$GraphicSVG$AlignLeft = {$: 'AlignLeft'};
var $MacCASOutreach$graphicsvg$GraphicSVG$Face = F8(
	function (a, b, c, d, e, f, g, h) {
		return {$: 'Face', a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Text = F2(
	function (a, b) {
		return {$: 'Text', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$alignLeft = function (stencil) {
	if (stencil.$ === 'Text') {
		var _v1 = stencil.a;
		var si = _v1.a;
		var bo = _v1.b;
		var i = _v1.c;
		var u = _v1.d;
		var s = _v1.e;
		var sel = _v1.f;
		var f = _v1.g;
		var c = _v1.h;
		var str = stencil.b;
		return A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$Text,
			A8($MacCASOutreach$graphicsvg$GraphicSVG$Face, si, bo, i, u, s, sel, f, $MacCASOutreach$graphicsvg$GraphicSVG$AlignLeft),
			str);
	} else {
		var a = stencil;
		return a;
	}
};
var $MacCASOutreach$graphicsvg$GraphicSVG$AlignCentred = {$: 'AlignCentred'};
var $MacCASOutreach$graphicsvg$GraphicSVG$centered = function (stencil) {
	if (stencil.$ === 'Text') {
		var _v1 = stencil.a;
		var si = _v1.a;
		var bo = _v1.b;
		var i = _v1.c;
		var u = _v1.d;
		var s = _v1.e;
		var sel = _v1.f;
		var f = _v1.g;
		var c = _v1.h;
		var str = stencil.b;
		return A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$Text,
			A8($MacCASOutreach$graphicsvg$GraphicSVG$Face, si, bo, i, u, s, sel, f, $MacCASOutreach$graphicsvg$GraphicSVG$AlignCentred),
			str);
	} else {
		var a = stencil;
		return a;
	}
};
var $author$project$FinalPrototype$getFromDict = F2(
	function (key, dict) {
		return A2(
			$elm$core$Maybe$withDefault,
			1.0,
			A2($elm$core$Dict$get, key, dict));
	});
var $author$project$FinalPrototype$introduction = _List_fromArray(
	['Linear Transformation Math Visualizer is a online tool help people who first learn linear ', 'transformation to understand how is it works. Users can customize their own shapes and ', 'apply 10 basic linear transformations to the shapes']);
var $MacCASOutreach$graphicsvg$GraphicSVG$darkGray = A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 186, 189, 182, 1);
var $MacCASOutreach$graphicsvg$GraphicSVG$gray = A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 211, 215, 207, 1);
var $MacCASOutreach$graphicsvg$GraphicSVG$lightGray = A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 238, 238, 236, 1);
var $MacCASOutreach$graphicsvg$GraphicSVG$outlined = F3(
	function (style, outlineClr, stencil) {
		var lineStyle = function () {
			if (style.$ === 'NoLine') {
				return $elm$core$Maybe$Nothing;
			} else {
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(style, outlineClr));
			}
		}();
		return A3($MacCASOutreach$graphicsvg$GraphicSVG$Inked, $elm$core$Maybe$Nothing, lineStyle, stencil);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$RoundRect = F3(
	function (a, b, c) {
		return {$: 'RoundRect', a: a, b: b, c: c};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$roundedRect = F3(
	function (w, h, r) {
		return A3($MacCASOutreach$graphicsvg$GraphicSVG$RoundRect, w, h, r);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Sansserif = {$: 'Sansserif'};
var $MacCASOutreach$graphicsvg$GraphicSVG$sansserif = function (stencil) {
	if (stencil.$ === 'Text') {
		var _v1 = stencil.a;
		var si = _v1.a;
		var bo = _v1.b;
		var i = _v1.c;
		var u = _v1.d;
		var s = _v1.e;
		var sel = _v1.f;
		var f = _v1.g;
		var c = _v1.h;
		var str = stencil.b;
		return A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$Text,
			A8($MacCASOutreach$graphicsvg$GraphicSVG$Face, si, bo, i, u, s, sel, $MacCASOutreach$graphicsvg$GraphicSVG$Sansserif, c),
			str);
	} else {
		var a = stencil;
		return a;
	}
};
var $MacCASOutreach$graphicsvg$GraphicSVG$size = F2(
	function (sze, stencil) {
		if (stencil.$ === 'Text') {
			var _v1 = stencil.a;
			var si = _v1.a;
			var bo = _v1.b;
			var i = _v1.c;
			var u = _v1.d;
			var s = _v1.e;
			var sel = _v1.f;
			var f = _v1.g;
			var c = _v1.h;
			var str = stencil.b;
			return A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$Text,
				A8($MacCASOutreach$graphicsvg$GraphicSVG$Face, sze, bo, i, u, s, sel, f, c),
				str);
		} else {
			var a = stencil;
			return a;
		}
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Unbroken = function (a) {
	return {$: 'Unbroken', a: a};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$solid = function (th) {
	return $MacCASOutreach$graphicsvg$GraphicSVG$Unbroken(th);
};
var $MacCASOutreach$graphicsvg$GraphicSVG$Serif = {$: 'Serif'};
var $MacCASOutreach$graphicsvg$GraphicSVG$text = function (str) {
	return A2(
		$MacCASOutreach$graphicsvg$GraphicSVG$Text,
		A8($MacCASOutreach$graphicsvg$GraphicSVG$Face, 12, false, false, false, false, false, $MacCASOutreach$graphicsvg$GraphicSVG$Serif, $MacCASOutreach$graphicsvg$GraphicSVG$AlignLeft),
		str);
};
var $author$project$L03G1Border$myShapes = function (model) {
	return _List_fromArray(
		[
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(0, 66.9),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$lightGray,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 230, 10, 2))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(0, 63),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 230, 3))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(0, 64.5),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$gray,
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 230, 0.5))),
			A3(
			$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
			$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
			$MacCASOutreach$graphicsvg$GraphicSVG$darkGray,
			A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 230, 144, 2)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(0, 66),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					6,
					$MacCASOutreach$graphicsvg$GraphicSVG$centered(
						$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Linear Transformation Math Visualizer Ver 1.0'))))))
		]);
};
var $MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter = F2(
	function (msg, shape) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$EnterShape, msg, shape);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave = F2(
	function (msg, shape) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$Exit, msg, shape);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$notifyTap = F2(
	function (msg, shape) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$Tap, msg, shape);
	});
var $author$project$FinalPrototype$ps = _List_fromArray(
	['- The graph on the right side can always', '  be dragged and scaled', '- When you are editing the shape hold shift ', '  key to drag the graph', '- Try holding ctrl while editing shape! ']);
var $MacCASOutreach$graphicsvg$GraphicSVG$scale = F2(
	function (s, shape) {
		return A3($MacCASOutreach$graphicsvg$GraphicSVG$Scale, s, s, shape);
	});
var $author$project$FinalPrototype$step1 = _List_fromArray(
	['- Using plus button add a shape', '- Click pen to customize the shape', '- There are some useful settings in', '  the settings', '- Press Right Arrow to continue']);
var $author$project$FinalPrototype$step2 = _List_fromArray(
	['- Try each transformation', '- Change Rad/Deg Mode in settings', '- Moving mouse to each point to check', '  coordinate']);
var $author$project$FinalPrototype$step3 = _List_fromArray(
	['- Check out the calculation process!']);
var $author$project$FinalPrototype$textBlock = function (textList) {
	return $MacCASOutreach$graphicsvg$GraphicSVG$group(
		A2(
			$elm$core$List$map,
			function (_v0) {
				var i = _v0.a;
				var t = _v0.b;
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$move,
					_Utils_Tuple2(0, i * (-6)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$filled,
						$MacCASOutreach$graphicsvg$GraphicSVG$black,
						$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$size,
								6,
								$MacCASOutreach$graphicsvg$GraphicSVG$text(t)))));
			},
			A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, textList)));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$union = F2(
	function (shape1, shape2) {
		return $MacCASOutreach$graphicsvg$GraphicSVG$Group(
			_List_fromArray(
				[shape1, shape2]));
	});
var $author$project$FinalPrototype$myShapes = function (model) {
	return _List_fromArray(
		[
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			$author$project$L03G1Border$myShapes(model)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-110, 50),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
					$MacCASOutreach$graphicsvg$GraphicSVG$text('Introduction')))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-110, 40),
			$author$project$FinalPrototype$textBlock($author$project$FinalPrototype$introduction)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-110, 15),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
					$MacCASOutreach$graphicsvg$GraphicSVG$text('Usage')))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-110, 5),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					8,
					$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
						$MacCASOutreach$graphicsvg$GraphicSVG$text('Step 1'))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-105, -5),
			$author$project$FinalPrototype$textBlock($author$project$FinalPrototype$step1)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-110, -38),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					8,
					$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
						$MacCASOutreach$graphicsvg$GraphicSVG$text('Step 2'))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-105, -48),
			$author$project$FinalPrototype$textBlock($author$project$FinalPrototype$step2)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(0, 5),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					8,
					$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
						$MacCASOutreach$graphicsvg$GraphicSVG$text('Step 3'))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(0, -5),
			$author$project$FinalPrototype$textBlock($author$project$FinalPrototype$step3)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(0, -15),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					8,
					$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
						$MacCASOutreach$graphicsvg$GraphicSVG$text('PS'))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(0, -25),
			$author$project$FinalPrototype$textBlock($author$project$FinalPrototype$ps)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$FinalPrototype$ToEditingShape,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
				$author$project$FinalPrototype$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
					$author$project$FinalPrototype$CancelScale,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
						A2($author$project$FinalPrototype$ScaleBtn, 'gobtn', 1.2),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(90, -62),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$scale,
								A2($author$project$FinalPrototype$getFromDict, 'gobtn', model.btnScaleDict),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$union,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										$MacCASOutreach$graphicsvg$GraphicSVG$black,
										A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 30, 15, 3)),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$move,
										_Utils_Tuple2(0, -1.5),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$filled,
											$MacCASOutreach$graphicsvg$GraphicSVG$white,
											$MacCASOutreach$graphicsvg$GraphicSVG$centered(
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$size,
													6,
													$MacCASOutreach$graphicsvg$GraphicSVG$text('Let\'s GO!!!'))))))))))))
		]);
};
var $author$project$L03G1State1$AddShape = {$: 'AddShape'};
var $author$project$L03G1State1$CancelScale = {$: 'CancelScale'};
var $author$project$L03G1State1$ClearGridDelta = {$: 'ClearGridDelta'};
var $author$project$L03G1State1$ConfirmChangeE = {$: 'ConfirmChangeE'};
var $author$project$L03G1State1$ConfirmChangeS = {$: 'ConfirmChangeS'};
var $author$project$L03G1State1$DataChanged = F4(
	function (a, b, c, d) {
		return {$: 'DataChanged', a: a, b: b, c: c, d: d};
	});
var $author$project$L03G1State1$DiscardChangeE = {$: 'DiscardChangeE'};
var $author$project$L03G1State1$DiscardChangeS = {$: 'DiscardChangeS'};
var $author$project$L03G1State1$GPMsg = function (a) {
	return {$: 'GPMsg', a: a};
};
var $author$project$L03G1State1$GetBaseColor1 = function (a) {
	return {$: 'GetBaseColor1', a: a};
};
var $author$project$L03G1State1$GetBaseColor2 = function (a) {
	return {$: 'GetBaseColor2', a: a};
};
var $author$project$L03G1State1$Grabbing1 = {$: 'Grabbing1'};
var $author$project$L03G1State1$Grabbing2 = {$: 'Grabbing2'};
var $author$project$L03G1State1$GridDraggedAt = function (a) {
	return {$: 'GridDraggedAt', a: a};
};
var $author$project$L03G1State1$GridDragging = function (a) {
	return {$: 'GridDragging', a: a};
};
var $author$project$L03G1State1$GridReleasing = {$: 'GridReleasing'};
var $author$project$L03G1State1$GridScale = function (a) {
	return {$: 'GridScale', a: a};
};
var $author$project$L03G1State1$MoveFloater1 = function (a) {
	return {$: 'MoveFloater1', a: a};
};
var $author$project$L03G1State1$MoveFloater2 = function (a) {
	return {$: 'MoveFloater2', a: a};
};
var $author$project$L03G1State1$Redo = {$: 'Redo'};
var $author$project$L03G1State1$SPMsg = function (a) {
	return {$: 'SPMsg', a: a};
};
var $author$project$L03G1State1$ScaleBtn = F2(
	function (a, b) {
		return {$: 'ScaleBtn', a: a, b: b};
	});
var $author$project$L03G1State1$ShowingCoordinate = function (a) {
	return {$: 'ShowingCoordinate', a: a};
};
var $author$project$L03G1State1$Stop1 = {$: 'Stop1'};
var $author$project$L03G1State1$Stop2 = {$: 'Stop2'};
var $author$project$L03G1State1$ToSetting = {$: 'ToSetting'};
var $author$project$L03G1State1$Undo = {$: 'Undo'};
var $MacCASOutreach$graphicsvg$GraphicSVG$NoLine = {$: 'NoLine'};
var $MacCASOutreach$graphicsvg$GraphicSVG$blank = A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0);
var $MacCASOutreach$graphicsvg$GraphicSVG$subtract = F2(
	function (shape1, shape2) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$AlphaMask, shape1, shape2);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$addOutline = F3(
	function (style, outlineClr, shape) {
		addOutline:
		while (true) {
			var lineStyle = function () {
				if (style.$ === 'NoLine') {
					return $elm$core$Maybe$Nothing;
				} else {
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(style, outlineClr));
				}
			}();
			switch (shape.$) {
				case 'Inked':
					var clr = shape.a;
					var st = shape.c;
					return A3($MacCASOutreach$graphicsvg$GraphicSVG$Inked, clr, lineStyle, st);
				case 'Move':
					var s = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$Move,
						s,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'Rotate':
					var r = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$Rotate,
						r,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'Scale':
					var sx = shape.a;
					var sy = shape.b;
					var sh = shape.c;
					return A3(
						$MacCASOutreach$graphicsvg$GraphicSVG$Scale,
						sx,
						sy,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'Skew':
					var skx = shape.a;
					var sky = shape.b;
					var sh = shape.c;
					return A3(
						$MacCASOutreach$graphicsvg$GraphicSVG$Skew,
						skx,
						sky,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'Transformed':
					var tm = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$Transformed,
						tm,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'Group':
					var list = shape.a;
					var innerlist = A2(
						$elm$core$List$filterMap,
						function (shp) {
							if (shp.$ === 'GroupOutline') {
								return $elm$core$Maybe$Nothing;
							} else {
								return $elm$core$Maybe$Just(
									A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, $MacCASOutreach$graphicsvg$GraphicSVG$NoLine, $MacCASOutreach$graphicsvg$GraphicSVG$black, shp));
							}
						},
						list);
					if (!innerlist.b) {
						return $MacCASOutreach$graphicsvg$GraphicSVG$Group(_List_Nil);
					} else {
						if (!innerlist.b.b) {
							var hd = innerlist.a;
							var $temp$style = style,
								$temp$outlineClr = outlineClr,
								$temp$shape = hd;
							style = $temp$style;
							outlineClr = $temp$outlineClr;
							shape = $temp$shape;
							continue addOutline;
						} else {
							if (_Utils_eq(lineStyle, $elm$core$Maybe$Nothing)) {
								return $MacCASOutreach$graphicsvg$GraphicSVG$Group(innerlist);
							} else {
								var outlnshp = $MacCASOutreach$graphicsvg$GraphicSVG$GroupOutline(
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$subtract,
										$MacCASOutreach$graphicsvg$GraphicSVG$Group(innerlist),
										$MacCASOutreach$graphicsvg$GraphicSVG$Group(
											A2(
												$elm$core$List$map,
												A2($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr),
												innerlist))));
								return $MacCASOutreach$graphicsvg$GraphicSVG$Group(
									_Utils_ap(
										innerlist,
										_List_fromArray(
											[outlnshp])));
							}
						}
					}
				case 'GroupOutline':
					var cmbndshp = shape.a;
					return $MacCASOutreach$graphicsvg$GraphicSVG$GroupOutline(cmbndshp);
				case 'AlphaMask':
					var reg = shape.a;
					var sh = shape.b;
					var ptrn = A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, $MacCASOutreach$graphicsvg$GraphicSVG$NoLine, $MacCASOutreach$graphicsvg$GraphicSVG$black, reg);
					var inside = A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, $MacCASOutreach$graphicsvg$GraphicSVG$NoLine, $MacCASOutreach$graphicsvg$GraphicSVG$black, sh);
					if (_Utils_eq(lineStyle, $elm$core$Maybe$Nothing)) {
						return A2($MacCASOutreach$graphicsvg$GraphicSVG$AlphaMask, ptrn, inside);
					} else {
						var ptrnlnd = A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, reg);
						var ptrnoutln = A2($MacCASOutreach$graphicsvg$GraphicSVG$Clip, inside, ptrnlnd);
						var newshp = A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh);
						var shpoutln = A2($MacCASOutreach$graphicsvg$GraphicSVG$Clip, inside, newshp);
						return A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$AlphaMask,
							ptrn,
							$MacCASOutreach$graphicsvg$GraphicSVG$Group(
								_List_fromArray(
									[
										inside,
										$MacCASOutreach$graphicsvg$GraphicSVG$GroupOutline(
										$MacCASOutreach$graphicsvg$GraphicSVG$Group(
											_List_fromArray(
												[shpoutln, ptrnoutln])))
									])));
					}
				case 'Clip':
					var reg = shape.a;
					var sh = shape.b;
					var ptrn = A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, $MacCASOutreach$graphicsvg$GraphicSVG$NoLine, $MacCASOutreach$graphicsvg$GraphicSVG$black, reg);
					var inside = A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, $MacCASOutreach$graphicsvg$GraphicSVG$NoLine, $MacCASOutreach$graphicsvg$GraphicSVG$black, sh);
					if (_Utils_eq(lineStyle, $elm$core$Maybe$Nothing)) {
						return A2($MacCASOutreach$graphicsvg$GraphicSVG$Clip, ptrn, inside);
					} else {
						var ptrnlnd = A3(
							$MacCASOutreach$graphicsvg$GraphicSVG$addOutline,
							style,
							outlineClr,
							A2($MacCASOutreach$graphicsvg$GraphicSVG$repaint, $MacCASOutreach$graphicsvg$GraphicSVG$blank, reg));
						var ptrnoutln = A2($MacCASOutreach$graphicsvg$GraphicSVG$Clip, inside, ptrnlnd);
						var newshp = A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh);
						var shpoutln = A2($MacCASOutreach$graphicsvg$GraphicSVG$Clip, inside, newshp);
						return A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Clip,
							ptrn,
							$MacCASOutreach$graphicsvg$GraphicSVG$Group(
								_List_fromArray(
									[
										inside,
										$MacCASOutreach$graphicsvg$GraphicSVG$GroupOutline(
										$MacCASOutreach$graphicsvg$GraphicSVG$Group(
											_List_fromArray(
												[shpoutln, ptrnoutln])))
									])));
					}
				case 'Link':
					var s = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$Link,
						s,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'Tap':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$Tap,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'TapAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$TapAt,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'EnterShape':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$EnterShape,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'EnterAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$EnterAt,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'Exit':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$Exit,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'ExitAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$ExitAt,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'MouseDown':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$MouseDown,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'MouseDownAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$MouseDownAt,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'MouseUp':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$MouseUp,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'MouseUpAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$MouseUpAt,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'MoveOverAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$MoveOverAt,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'TouchStart':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$TouchStart,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'TouchEnd':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$TouchEnd,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'TouchStartAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$TouchStartAt,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'TouchEndAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$TouchEndAt,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'TouchMoveAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$TouchMoveAt,
						userMsg,
						A3($MacCASOutreach$graphicsvg$GraphicSVG$addOutline, style, outlineClr, sh));
				case 'ForeignObject':
					var w = shape.a;
					var h = shape.b;
					var htm = shape.c;
					return A3($MacCASOutreach$graphicsvg$GraphicSVG$ForeignObject, w, h, htm);
				case 'Everything':
					return $MacCASOutreach$graphicsvg$GraphicSVG$Everything;
				case 'Notathing':
					return $MacCASOutreach$graphicsvg$GraphicSVG$Notathing;
				default:
					var s = shape.a;
					var th = shape.b;
					var clr = shape.c;
					return A3($MacCASOutreach$graphicsvg$GraphicSVG$GraphPaper, s, th, clr);
			}
		}
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$AlignRight = {$: 'AlignRight'};
var $MacCASOutreach$graphicsvg$GraphicSVG$alignRight = function (stencil) {
	if (stencil.$ === 'Text') {
		var _v1 = stencil.a;
		var si = _v1.a;
		var bo = _v1.b;
		var i = _v1.c;
		var u = _v1.d;
		var s = _v1.e;
		var sel = _v1.f;
		var f = _v1.g;
		var c = _v1.h;
		var str = stencil.b;
		return A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$Text,
			A8($MacCASOutreach$graphicsvg$GraphicSVG$Face, si, bo, i, u, s, sel, f, $MacCASOutreach$graphicsvg$GraphicSVG$AlignRight),
			str);
	} else {
		var a = stencil;
		return a;
	}
};
var $MacCASOutreach$graphicsvg$GraphicSVG$bold = function (stencil) {
	if (stencil.$ === 'Text') {
		var _v1 = stencil.a;
		var si = _v1.a;
		var bo = _v1.b;
		var i = _v1.c;
		var u = _v1.d;
		var s = _v1.e;
		var sel = _v1.f;
		var f = _v1.g;
		var c = _v1.h;
		var str = stencil.b;
		return A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$Text,
			A8($MacCASOutreach$graphicsvg$GraphicSVG$Face, si, true, i, u, s, sel, f, c),
			str);
	} else {
		var a = stencil;
		return a;
	}
};
var $MacCASOutreach$graphicsvg$GraphicSVG$Pull = F2(
	function (a, b) {
		return {$: 'Pull', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$BezierPath = F2(
	function (a, b) {
		return {$: 'BezierPath', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$curveListHelper = function (_v0) {
	var _v1 = _v0.a;
	var a = _v1.a;
	var b = _v1.b;
	var _v2 = _v0.b;
	var c = _v2.a;
	var d = _v2.b;
	return _Utils_Tuple2(
		_Utils_Tuple2(a, b),
		_Utils_Tuple2(c, d));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$curve = F2(
	function (_v0, list) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$BezierPath,
			_Utils_Tuple2(a, b),
			A2($elm$core$List$map, $MacCASOutreach$graphicsvg$GraphicSVG$curveListHelper, list));
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$mirrorY = function (shape) {
	return A3($MacCASOutreach$graphicsvg$GraphicSVG$Scale, 1, -1, shape);
};
var $author$project$ICONS$check = $MacCASOutreach$graphicsvg$GraphicSVG$group(
	_List_fromArray(
		[
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(0.6050680000000028, 6.677248000000006),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-0.4637309999999957, 5.900316000000004),
							_Utils_Tuple2(-3.2928150000000045, 3.0880850000000066)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-6.927674999999994, -0.6146200000000022),
							_Utils_Tuple2(-7.013122999999993, -0.8125649999999993)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-6.467584000000002, -3.398926000000003),
							_Utils_Tuple2(-5.093975999999998, -3.0274220000000014)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-4.128952999999996, -2.349654000000001),
							_Utils_Tuple2(-1.8555570000000046, -0.03400299999999845)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-0.4403169999999932, 1.4075420000000065),
							_Utils_Tuple2(0.974923000000004, 2.8490869999999973)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.051611500000007, -0.21787249999999858),
							_Utils_Tuple2(7.128299999999996, -3.2848320000000015)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(13.390020000000007, -9.47352),
							_Utils_Tuple2(13.522450000000006, -9.540461)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(14.757850000000005, -9.687534),
							_Utils_Tuple2(15.159030000000001, -9.439591)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(15.914289999999994, -8.459100999999997),
							_Utils_Tuple2(15.817359999999994, -7.791420000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(15.567409999999995, -7.114283999999998),
							_Utils_Tuple2(8.946600000000004, -0.4776200000000017)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.0242960000000068, 6.400771000000006),
							_Utils_Tuple2(1.872727999999995, 6.478769)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(1.0349369999999993, 6.733435),
							_Utils_Tuple2(0.6050680000000028, 6.677248000000006))
						]))))
		]));
var $MacCASOutreach$graphicsvg$GraphicSVG$Circle = function (a) {
	return {$: 'Circle', a: a};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$circle = function (r) {
	return $MacCASOutreach$graphicsvg$GraphicSVG$Circle(r);
};
var $MacCASOutreach$graphicsvg$GraphicSVG$clip = F2(
	function (shape1, shape2) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$Clip, shape1, shape2);
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$ICONS$gear = $MacCASOutreach$graphicsvg$GraphicSVG$group(
	_List_fromArray(
		[
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(2.2539139999999946, 10.491878),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.937653999999995, 10.237865),
							_Utils_Tuple2(4.186869999999999, 9.779764999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.433329999999998, 8.961337),
							_Utils_Tuple2(4.635859999999994, 8.027123000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.802969999999988, 7.256285500000004),
							_Utils_Tuple2(4.970079999999996, 6.485448000000005)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(5.260159999999999, 6.340976000000012),
							_Utils_Tuple2(5.550240000000002, 6.1965040000000045)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.386870000000002, 5.740461999999994),
							_Utils_Tuple2(6.700339999999997, 5.536230000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.315939999999998, 5.164904000000007),
							_Utils_Tuple2(7.371750000000006, 5.164904000000007)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(8.1387, 5.378506000000002),
							_Utils_Tuple2(8.952060000000003, 5.639573999999996)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(10.495679999999993, 6.114114999999998),
							_Utils_Tuple2(10.574889999999996, 6.113951999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.13928, 6.001267999999996),
							_Utils_Tuple2(11.435299999999998, 5.693279000000004)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(13.69878, 2.221073000000004),
							_Utils_Tuple2(13.69878, 1.5357759999999985)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(13.571889999999996, 0.9318880000000007),
							_Utils_Tuple2(12.273679999999999, -0.24778500000000037)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.668369999999996, -0.7978219999999965),
							_Utils_Tuple2(11.063059999999993, -1.3478589999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.08251, -1.5722069999999988),
							_Utils_Tuple2(11.101960000000005, -1.796554999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.151560000000003, -2.9468630000000005),
							_Utils_Tuple2(11.114459999999994, -3.6209909999999965)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.101259999999996, -3.8605604999999983),
							_Utils_Tuple2(11.088059999999999, -4.10013)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.685249999999996, -4.644282000000004),
							_Utils_Tuple2(12.282439999999994, -5.188434000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(13.698750000000004, -6.526741000000001),
							_Utils_Tuple2(13.698750000000004, -6.962524999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(12.64591, -9.606749),
							_Utils_Tuple2(11.717560000000006, -10.795625000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.155109999999993, -11.435253000000003),
							_Utils_Tuple2(10.7864, -11.509849000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(10.476749999999996, -11.556229000000002),
							_Utils_Tuple2(8.918949999999995, -11.058017999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(8.12447499999999, -10.803930999999999),
							_Utils_Tuple2(7.329999999999998, -10.549844)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.074134999999998, -10.720911999999998),
							_Utils_Tuple2(6.818269999999998, -10.891979999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.005830000000003, -11.387141),
							_Utils_Tuple2(5.638300000000001, -11.574170000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(5.304180000000002, -11.744196500000001),
							_Utils_Tuple2(4.970060000000004, -11.914223)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.802044999999993, -12.687829),
							_Utils_Tuple2(4.634029999999996, -13.461435000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.255719999999997, -15.091715),
							_Utils_Tuple2(4.204049999999995, -15.193241999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.7206939999999946, -15.745311000000001),
							_Utils_Tuple2(2.8785139999999956, -15.858562999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-0.8208259999999967, -15.928753),
							_Utils_Tuple2(-1.3195259999999962, -15.636493000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-1.775186000000005, -15.264741999999998),
							_Utils_Tuple2(-2.1609260000000035, -13.511254999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.3360959999999977, -12.714973999999998),
							_Utils_Tuple2(-2.511266000000006, -11.918692999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.825290999999993, -11.761499999999998),
							_Utils_Tuple2(-3.139315999999994, -11.604306999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-4.254075999999998, -10.984715000000001),
							_Utils_Tuple2(-4.713476, -10.645071999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-4.782145999999997, -10.594293999999998),
							_Utils_Tuple2(-4.850815999999995, -10.543515999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-5.6128109999999936, -10.7889415),
							_Utils_Tuple2(-6.374806000000007, -11.034367000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.256885999999994, -11.607719000000003),
							_Utils_Tuple2(-8.646985999999998, -11.405898999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.414035999999996, -9.224404),
							_Utils_Tuple2(-11.006816, -7.77308)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-11.417755999999997, -6.642462000000002),
							_Utils_Tuple2(-9.815296000000004, -5.190131999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.209025999999994, -4.640664000000001),
							_Utils_Tuple2(-8.602756, -4.0911959999999965)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.61875599999999, -3.9438549999999992),
							_Utils_Tuple2(-8.634755999999996, -3.796514000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.675855999999996, -2.018296999999997),
							_Utils_Tuple2(-8.632756, -1.6412090000000035)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.615955999999997, -1.492806999999999),
							_Utils_Tuple2(-8.599155999999994, -1.3444050000000018)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.195665999999989, -0.8048670000000016),
							_Utils_Tuple2(-9.792175999999998, -0.26532900000000126)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-11.459215999999998, 1.2835869999999971),
							_Utils_Tuple2(-10.966335999999998, 2.4491289999999992)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.201976000000002, 5.639227000000005),
							_Utils_Tuple2(-8.695425999999998, 5.952292)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.147496000000004, 6.169880000000006),
							_Utils_Tuple2(-6.501195999999993, 5.644452000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-4.955535999999995, 5.164904000000007),
							_Utils_Tuple2(-4.902856, 5.164904000000007)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-4.5532460000000015, 5.333111000000002),
							_Utils_Tuple2(-4.243015999999997, 5.538698999999994)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-3.416325999999998, 6.041683000000006),
							_Utils_Tuple2(-3.095336000000003, 6.199579999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.8035210000000035, 6.3431209999999965),
							_Utils_Tuple2(-2.5117060000000038, 6.4866619999999955)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.3464759999999956, 7.244011499999999),
							_Utils_Tuple2(-2.1812460000000016, 8.001361000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-1.803516000000002, 9.616157000000001),
							_Utils_Tuple2(-1.7457260000000048, 9.738498000000007)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-1.2950459999999993, 10.259298000000001),
							_Utils_Tuple2(-1.016686000000007, 10.331208000000004)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-0.1031459999999953, 10.470382),
							_Utils_Tuple2(0.3821140000000014, 10.509693999999996)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(1.6845639999999946, 10.540493999999995),
							_Utils_Tuple2(2.2544340000000034, 10.491883999999999))
						])))),
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(2.052753999999993, 1.2909640000000024),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.900180000000006, -0.31171799999999905),
							_Utils_Tuple2(5.229349999999997, -1.9133939999999967)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(5.090779999999995, -4.656139000000003),
							_Utils_Tuple2(4.110990000000001, -5.635930999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.425854000000001, -6.229852000000001),
							_Utils_Tuple2(2.9260539999999935, -6.465890000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(1.9461040000000054, -6.832068999999997),
							_Utils_Tuple2(1.2254539999999992, -6.829357000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(0.10919400000000223, -6.742497),
							_Utils_Tuple2(-0.5941260000000028, -6.399059000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-1.1655559999999952, -6.083897999999998),
							_Utils_Tuple2(-1.6249360000000053, -5.623835)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.1901160000000033, -5.021835000000003),
							_Utils_Tuple2(-2.403015999999994, -4.592238999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.806755999999993, -3.609333999999997),
							_Utils_Tuple2(-2.845246000000003, -2.957258000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-1.5687759999999997, 0.8661550000000062),
							_Utils_Tuple2(0.3744839999999954, 1.288776999999996)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(1.6162939999999963, 1.383466999999996),
							_Utils_Tuple2(2.052753999999993, 1.290976999999998))
						]))))
		]));
var $MacCASOutreach$graphicsvg$GraphicSVG$rgb = F3(
	function (r, g, b) {
		return A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, r, g, b, 1);
	});
var $author$project$L03G1State1$getColor = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	return A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, r, g, b);
};
var $author$project$L03G1State1$getFromDict = F2(
	function (key, dict) {
		return A2(
			$elm$core$Maybe$withDefault,
			1.0,
			A2($elm$core$Dict$get, key, dict));
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$ghost = function (stencil) {
	return A3(
		$MacCASOutreach$graphicsvg$GraphicSVG$Inked,
		$elm$core$Maybe$Just($MacCASOutreach$graphicsvg$GraphicSVG$blank),
		$elm$core$Maybe$Nothing,
		stencil);
};
var $author$project$ICONS$home = $MacCASOutreach$graphicsvg$GraphicSVG$group(
	_List_fromArray(
		[
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(-8.069232, 4.865551999999994),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.739757999999995, 4.288894999999997),
							_Utils_Tuple2(-8.841797999999997, 4.018241000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.928668000000002, 2.5077349999999967),
							_Utils_Tuple2(-8.928668000000002, 0.12175100000000327)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.928668000000002, -1.7112834999999933),
							_Utils_Tuple2(-8.928668000000002, -3.544317999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.33699150000001, -3.566817999999998),
							_Utils_Tuple2(-9.745315000000005, -3.5893179999999987)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.624731999999995, -3.673107999999999),
							_Utils_Tuple2(-10.841590999999994, -3.8071369999999973)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-11.497341000000006, -4.692464000000001),
							_Utils_Tuple2(-11.294377999999995, -5.274684000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.021805999999998, -6.569262000000002),
							_Utils_Tuple2(-6.699661000000006, -9.481769)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-0.9636220000000009, -14.512262999999997),
							_Utils_Tuple2(-0.5773999999999972, -14.577514999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(0.3282289999999932, -14.428790999999997),
							_Utils_Tuple2(0.9066810000000061, -13.911575999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.128774000000007, -12.825296000000002),
							_Utils_Tuple2(4.044740000000004, -11.135554999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.453950000000006, -8.129444999999997),
							_Utils_Tuple2(8.803219999999996, -6.942210000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(10.661940000000001, -5.281708000000002),
							_Utils_Tuple2(10.614990000000006, -4.793089000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(10.319810000000004, -3.949016999999998),
							_Utils_Tuple2(9.952479999999994, -3.759062)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(9.407039999999995, -3.610090999999997),
							_Utils_Tuple2(8.938860000000005, -3.5856020000000015)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(8.561610000000002, -3.565871999999999),
							_Utils_Tuple2(8.184359999999998, -3.5461420000000032)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(8.172609999999992, -1.6555970000000002),
							_Utils_Tuple2(8.16086, 0.23494800000000282)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(8.149110000000007, 2.125492500000007),
							_Utils_Tuple2(8.137360000000001, 4.016036999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(8.020070000000004, 4.169758999999999),
							_Utils_Tuple2(7.902780000000007, 4.323481000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.397959999999998, 4.943742),
							_Utils_Tuple2(5.164869999999993, 4.944085000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.004559999999998, 4.934385000000006),
							_Utils_Tuple2(2.5848960000000005, 4.545597000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.164524, 4.125401999999994),
							_Utils_Tuple2(2.121294000000006, 1.8301799999999986)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.064943999999997, -0.6223079999999968),
							_Utils_Tuple2(1.5234279999999956, -0.9524919999999995)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(1.1025759999999991, -1.112009999999998),
							_Utils_Tuple2(-0.43027399999999716, -1.112287000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-1.276339500000006, -1.1124399999999994),
							_Utils_Tuple2(-2.1224050000000005, -1.1125929999999968)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.249792999999997, -1.0054039999999986),
							_Utils_Tuple2(-2.377180999999993, -0.8982150000000004)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.8716260000000062, -0.40900800000000004),
							_Utils_Tuple2(-2.8716260000000062, 1.7507609999999971)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.909226000000004, 4.097178999999997),
							_Utils_Tuple2(-3.305250000000001, 4.521333999999996)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-3.7930379999999957, 4.944740999999993),
							_Utils_Tuple2(-5.916516000000001, 4.939204000000004)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-7.979138000000006, 4.903204000000002),
							_Utils_Tuple2(-8.069174000000004, 4.865544))
						]))))
		]));
var $MacCASOutreach$graphicsvg$GraphicSVG$html = F3(
	function (w, h, htm) {
		return A3($MacCASOutreach$graphicsvg$GraphicSVG$ForeignObject, w, h, htm);
	});
var $elm$html$Html$input = _VirtualDom_node('input');
var $MacCASOutreach$graphicsvg$GraphicSVG$Gradient = function (a) {
	return {$: 'Gradient', a: a};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$multAlpha = F2(
	function (color, n) {
		var colRec = $avh4$elm_color$Color$toRgba(color);
		return $avh4$elm_color$Color$fromRgba(
			_Utils_update(
				colRec,
				{alpha: colRec.alpha * n}));
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent = F2(
	function (alpha, shape) {
		_v0$3:
		while (true) {
			switch (shape.$) {
				case 'Inked':
					if (shape.a.$ === 'Nothing') {
						if ((shape.b.$ === 'Just') && (shape.b.a.b.$ === 'Solid')) {
							var _v1 = shape.a;
							var _v2 = shape.b.a;
							var lineType = _v2.a;
							var colour = _v2.b.a;
							var st = shape.c;
							return A3(
								$MacCASOutreach$graphicsvg$GraphicSVG$Inked,
								$elm$core$Maybe$Nothing,
								$elm$core$Maybe$Just(
									_Utils_Tuple2(
										lineType,
										$MacCASOutreach$graphicsvg$GraphicSVG$Solid(
											A2($MacCASOutreach$graphicsvg$GraphicSVG$multAlpha, colour, alpha)))),
								st);
						} else {
							break _v0$3;
						}
					} else {
						if (shape.a.a.$ === 'Solid') {
							if (shape.b.$ === 'Just') {
								if (shape.b.a.b.$ === 'Solid') {
									var colour = shape.a.a.a;
									var _v3 = shape.b.a;
									var lineType = _v3.a;
									var sColour = _v3.b.a;
									var st = shape.c;
									return A3(
										$MacCASOutreach$graphicsvg$GraphicSVG$Inked,
										$elm$core$Maybe$Just(
											$MacCASOutreach$graphicsvg$GraphicSVG$Solid(
												A2($MacCASOutreach$graphicsvg$GraphicSVG$multAlpha, colour, alpha))),
										$elm$core$Maybe$Just(
											_Utils_Tuple2(
												lineType,
												$MacCASOutreach$graphicsvg$GraphicSVG$Solid(
													A2($MacCASOutreach$graphicsvg$GraphicSVG$multAlpha, sColour, alpha)))),
										st);
								} else {
									break _v0$3;
								}
							} else {
								var colour = shape.a.a.a;
								var _v4 = shape.b;
								var st = shape.c;
								return A3(
									$MacCASOutreach$graphicsvg$GraphicSVG$Inked,
									$elm$core$Maybe$Just(
										$MacCASOutreach$graphicsvg$GraphicSVG$Solid(
											A2($MacCASOutreach$graphicsvg$GraphicSVG$multAlpha, colour, alpha))),
									$elm$core$Maybe$Nothing,
									st);
							}
						} else {
							break _v0$3;
						}
					}
				case 'ForeignObject':
					var w = shape.a;
					var h = shape.b;
					var htm = shape.c;
					return A3($MacCASOutreach$graphicsvg$GraphicSVG$ForeignObject, w, h, htm);
				case 'Move':
					var s = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$Move,
						s,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'Rotate':
					var r = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$Rotate,
						r,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'Scale':
					var sx = shape.a;
					var sy = shape.b;
					var sh = shape.c;
					return A3(
						$MacCASOutreach$graphicsvg$GraphicSVG$Scale,
						sx,
						sy,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'Skew':
					var skx = shape.a;
					var sky = shape.b;
					var sh = shape.c;
					return A3(
						$MacCASOutreach$graphicsvg$GraphicSVG$Skew,
						skx,
						sky,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'Transformed':
					var tm = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$Transformed,
						tm,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'Group':
					var list = shape.a;
					return $MacCASOutreach$graphicsvg$GraphicSVG$Group(
						A2(
							$elm$core$List$map,
							$MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent(alpha),
							list));
				case 'GroupOutline':
					var cmbndshp = shape.a;
					return $MacCASOutreach$graphicsvg$GraphicSVG$GroupOutline(
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, cmbndshp));
				case 'Link':
					var s = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$Link,
						s,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'AlphaMask':
					var reg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$AlphaMask,
						reg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'Clip':
					var reg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$Clip,
						reg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'Everything':
					return $MacCASOutreach$graphicsvg$GraphicSVG$Everything;
				case 'Notathing':
					return $MacCASOutreach$graphicsvg$GraphicSVG$Notathing;
				case 'Tap':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$Tap,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'TapAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$TapAt,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'EnterShape':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$EnterShape,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'EnterAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$EnterAt,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'Exit':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$Exit,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'ExitAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$ExitAt,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'MouseDown':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$MouseDown,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'MouseDownAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$MouseDownAt,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'MouseUp':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$MouseUp,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'MouseUpAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$MouseUpAt,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'MoveOverAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$MoveOverAt,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'TouchStart':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$TouchStart,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'TouchEnd':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$TouchEnd,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'TouchStartAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$TouchStartAt,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'TouchEndAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$TouchEndAt,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				case 'TouchMoveAt':
					var userMsg = shape.a;
					var sh = shape.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$TouchMoveAt,
						userMsg,
						A2($MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent, alpha, sh));
				default:
					if (shape.c.$ === 'Solid') {
						var s = shape.a;
						var th = shape.b;
						var colour = shape.c.a;
						return A3(
							$MacCASOutreach$graphicsvg$GraphicSVG$GraphPaper,
							s,
							th,
							$MacCASOutreach$graphicsvg$GraphicSVG$Solid(
								A2($MacCASOutreach$graphicsvg$GraphicSVG$multAlpha, colour, alpha)));
					} else {
						var s = shape.a;
						var th = shape.b;
						var gr = shape.c.a;
						return A3(
							$MacCASOutreach$graphicsvg$GraphicSVG$GraphPaper,
							s,
							th,
							$MacCASOutreach$graphicsvg$GraphicSVG$Gradient(gr));
					}
			}
		}
		var a = shape.a;
		var b = shape.b;
		var c = shape.c;
		return A3($MacCASOutreach$graphicsvg$GraphicSVG$Inked, a, b, c);
	});
var $elm$html$Html$Attributes$maxlength = function (n) {
	return A2(
		_VirtualDom_attribute,
		'maxlength',
		$elm$core$String$fromInt(n));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$L03G1EditShapePanel$myShapes = function (model) {
	return _List_fromArray(
		[
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-105, 60),
			A3(
				$MacCASOutreach$graphicsvg$GraphicSVG$html,
				90,
				130,
				A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'box-shadow', 'rgb(0 0 0 / 25%) 2px 2px 5px 0px'),
							A2($elm$html$Html$Attributes$style, 'width', '80px'),
							A2($elm$html$Html$Attributes$style, 'height', '120px'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '3px')
						]),
					_List_Nil))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-65, 0),
			A3(
				$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
				$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
				$MacCASOutreach$graphicsvg$GraphicSVG$gray,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 80, 120, 3))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-97.5, 40),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					5,
					$MacCASOutreach$graphicsvg$GraphicSVG$bold(
						$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
							$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
								$MacCASOutreach$graphicsvg$GraphicSVG$text('Cumstomize your shape!'))))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-97.5, 34),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					5,
					$MacCASOutreach$graphicsvg$GraphicSVG$bold(
						$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
							$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
								$MacCASOutreach$graphicsvg$GraphicSVG$text('(Click on the board)'))))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-97.5, -20),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					5,
					$MacCASOutreach$graphicsvg$GraphicSVG$bold(
						$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
							$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
								$MacCASOutreach$graphicsvg$GraphicSVG$text('(Picking up the color!)'))))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-97.5, -26),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					5,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Shape Color:')))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-97.5, -40),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					5,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Output Color:'))))))
		]);
};
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $MacCASOutreach$graphicsvg$GraphicSVG$rotate = F2(
	function (theta, shape) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$Rotate, theta, shape);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			$elm$core$List$any,
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr('0'))) && (!_Utils_eq(
					c,
					_Utils_chr('.')));
			},
			$elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$Char$fromCode = _Char_fromCode;
var $myrho$elm_round$Round$increaseNum = function (_v0) {
	var head = _v0.a;
	var tail = _v0.b;
	if (_Utils_eq(
		head,
		_Utils_chr('9'))) {
		var _v1 = $elm$core$String$uncons(tail);
		if (_v1.$ === 'Nothing') {
			return '01';
		} else {
			var headtail = _v1.a;
			return A2(
				$elm$core$String$cons,
				_Utils_chr('0'),
				$myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = $elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			$elm$core$String$cons,
			$elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $elm$core$String$reverse = _String_reverse;
var $myrho$elm_round$Round$splitComma = function (str) {
	var _v0 = A2($elm$core$String$split, '.', str);
	if (_v0.b) {
		if (_v0.b.b) {
			var before = _v0.a;
			var _v1 = _v0.b;
			var after = _v1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _v0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $myrho$elm_round$Round$toDecimal = function (fl) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(
			$elm$core$Basics$abs(fl)));
	if (_v0.b) {
		if (_v0.b.b) {
			var num = _v0.a;
			var _v1 = _v0.b;
			var exp = _v1.a;
			var e = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(
					A2($elm$core$String$startsWith, '+', exp) ? A2($elm$core$String$dropLeft, 1, exp) : exp));
			var _v2 = $myrho$elm_round$Round$splitComma(num);
			var before = _v2.a;
			var after = _v2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				$elm$core$Maybe$withDefault,
				'0',
				A2(
					$elm$core$Maybe$map,
					function (_v3) {
						var a = _v3.a;
						var b = _v3.b;
						return a + ('.' + b);
					},
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$mapFirst($elm$core$String$fromChar),
						$elm$core$String$uncons(
							_Utils_ap(
								A2(
									$elm$core$String$repeat,
									$elm$core$Basics$abs(e),
									'0'),
								total))))) : A3(
				$elm$core$String$padRight,
				e + 1,
				_Utils_chr('0'),
				total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _v0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var $myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if ($elm$core$Basics$isInfinite(fl) || $elm$core$Basics$isNaN(fl)) {
			return $elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _v0 = $myrho$elm_round$Round$splitComma(
				$myrho$elm_round$Round$toDecimal(
					$elm$core$Basics$abs(fl)));
			var before = _v0.a;
			var after = _v0.b;
			var r = $elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2($elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					$elm$core$String$padRight,
					r,
					_Utils_chr('0'),
					_Utils_ap(before, after)));
			var totalLen = $elm$core$String$length(normalized);
			var roundDigitIndex = A2($elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3($elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3($elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? $elm$core$String$reverse(
				A2(
					$elm$core$Maybe$withDefault,
					'1',
					A2(
						$elm$core$Maybe$map,
						$myrho$elm_round$Round$increaseNum,
						$elm$core$String$uncons(
							$elm$core$String$reverse(remains))))) : remains;
			var numLen = $elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					$elm$core$String$repeat,
					$elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				$elm$core$String$length(after)) < 0) ? (A3($elm$core$String$slice, 0, numLen - s, num) + ('.' + A3($elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3(
					$elm$core$String$padRight,
					s,
					_Utils_chr('0'),
					after))));
			return A2($myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var $myrho$elm_round$Round$round = $myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _v0 = $elm$core$String$uncons(str);
			if (_v0.$ === 'Nothing') {
				return false;
			} else {
				if ('5' === _v0.a.a.valueOf()) {
					if (_v0.a.b === '') {
						var _v1 = _v0.a;
						return !signed;
					} else {
						var _v2 = _v0.a;
						return true;
					}
				} else {
					var _v3 = _v0.a;
					var _int = _v3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						$elm$core$Char$toCode(_int));
				}
			}
		}));
var $author$project$L03G1GridPanel2$scaleNegativeNumberX = F2(
	function (scale, dx) {
		var maxNum = $elm$core$Basics$floor((((-60.0) - dx) / 7.5) / 2);
		return A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$move,
					_Utils_Tuple2(7.5 * x, 0),
					$MacCASOutreach$graphicsvg$GraphicSVG$group(
						_List_fromArray(
							[
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$filled,
								$MacCASOutreach$graphicsvg$GraphicSVG$white,
								A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 3.5, 5)),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(0, -1.5),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$filled,
									$MacCASOutreach$graphicsvg$GraphicSVG$black,
									$MacCASOutreach$graphicsvg$GraphicSVG$centered(
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$size,
											4.5,
											$MacCASOutreach$graphicsvg$GraphicSVG$text(
												A2($myrho$elm_round$Round$round, 2, x * scale))))))
							])));
			},
			A2(
				$elm$core$List$map,
				function (x) {
					return 2 * x;
				},
				A2(
					$elm$core$List$range,
					maxNum,
					(dx > 78.75) ? (maxNum + 8) : (-1))));
	});
var $author$project$L03G1GridPanel2$scaleNegativeNumberY = F2(
	function (scale, dy) {
		var maxNum = $elm$core$Basics$floor((((-60.0) - dy) / 7.5) / 2);
		return A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$move,
					_Utils_Tuple2(0, 7.5 * x),
					$MacCASOutreach$graphicsvg$GraphicSVG$group(
						_List_fromArray(
							[
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$filled,
								$MacCASOutreach$graphicsvg$GraphicSVG$white,
								A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 3.5, 5)),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(4, -2),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$filled,
									$MacCASOutreach$graphicsvg$GraphicSVG$black,
									$MacCASOutreach$graphicsvg$GraphicSVG$alignRight(
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$size,
											4.5,
											$MacCASOutreach$graphicsvg$GraphicSVG$text(
												A2($myrho$elm_round$Round$round, 2, x * scale))))))
							])));
			},
			A2(
				$elm$core$List$map,
				function (x) {
					return 2 * x;
				},
				A2(
					$elm$core$List$range,
					maxNum,
					(dy > 78.75) ? (maxNum + 8) : (-1))));
	});
var $author$project$L03G1GridPanel2$scalePositiveNumberX = F2(
	function (scale, dx) {
		var maxNum = $elm$core$Basics$ceiling(((60.0 - dx) / 7.5) / 2);
		return A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$move,
					_Utils_Tuple2(7.5 * x, 0),
					$MacCASOutreach$graphicsvg$GraphicSVG$group(
						_List_fromArray(
							[
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$filled,
								$MacCASOutreach$graphicsvg$GraphicSVG$white,
								A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 3.5, 5)),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(0, -1.5),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$filled,
									$MacCASOutreach$graphicsvg$GraphicSVG$black,
									$MacCASOutreach$graphicsvg$GraphicSVG$centered(
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$size,
											4.5,
											$MacCASOutreach$graphicsvg$GraphicSVG$text(
												A2($myrho$elm_round$Round$round, 2, x * scale))))))
							])));
			},
			A2(
				$elm$core$List$map,
				function (x) {
					return 2 * x;
				},
				A2(
					$elm$core$List$range,
					(_Utils_cmp(dx, -78.75) > 0) ? 1 : (maxNum - 8),
					maxNum)));
	});
var $author$project$L03G1GridPanel2$scalePositiveNumberY = F2(
	function (scale, dy) {
		var maxNum = $elm$core$Basics$ceiling(((60.0 - dy) / 7.5) / 2);
		return A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$move,
					_Utils_Tuple2(0, 7.5 * x),
					$MacCASOutreach$graphicsvg$GraphicSVG$group(
						_List_fromArray(
							[
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$filled,
								$MacCASOutreach$graphicsvg$GraphicSVG$white,
								A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 3.5, 5)),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(2, -2),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$filled,
									$MacCASOutreach$graphicsvg$GraphicSVG$black,
									$MacCASOutreach$graphicsvg$GraphicSVG$alignRight(
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$size,
											4.5,
											$MacCASOutreach$graphicsvg$GraphicSVG$text(
												A2($myrho$elm_round$Round$round, 2, x * scale))))))
							])));
			},
			A2(
				$elm$core$List$map,
				function (x) {
					return 2 * x;
				},
				A2(
					$elm$core$List$range,
					(_Utils_cmp(dy, -78.75) > 0) ? 1 : (maxNum - 8),
					maxNum)));
	});
var $author$project$L03G1GridPanel2$axis = F3(
	function (dx, dy, scale) {
		return $MacCASOutreach$graphicsvg$GraphicSVG$group(
			_List_fromArray(
				[
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$clip,
					$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
						A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(0, dy),
						A3(
							$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
							$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
							$MacCASOutreach$graphicsvg$GraphicSVG$black,
							A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 120, 0.01)))),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$clip,
					$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
						A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(dx, 0),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$rotate,
							$elm$core$Basics$degrees(90),
							A3(
								$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
								$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
								$MacCASOutreach$graphicsvg$GraphicSVG$black,
								A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 120, 0.01))))),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$clip,
					$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
						A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(dx, dy),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(0, -3),
							$MacCASOutreach$graphicsvg$GraphicSVG$group(
								A2($author$project$L03G1GridPanel2$scalePositiveNumberX, scale, dx))))),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$clip,
					$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
						A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(dx, dy),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(-1, -3),
							$MacCASOutreach$graphicsvg$GraphicSVG$group(
								A2($author$project$L03G1GridPanel2$scaleNegativeNumberX, scale, dx))))),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$clip,
					$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
						A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(dx, dy),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(-3, 0),
							$MacCASOutreach$graphicsvg$GraphicSVG$group(
								A2($author$project$L03G1GridPanel2$scalePositiveNumberY, scale, dy))))),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$clip,
					$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
						A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(dx, dy),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(-5, 0),
							$MacCASOutreach$graphicsvg$GraphicSVG$group(
								A2($author$project$L03G1GridPanel2$scaleNegativeNumberY, scale, dy)))))
				]));
	});
var $author$project$L03G1GridPanel2$getDelta = function (d) {
	return ((d / 7.5) - $elm$core$Basics$floor(d / 7.5)) * 7.5;
};
var $MacCASOutreach$graphicsvg$GraphicSVG$Path = function (a) {
	return {$: 'Path', a: a};
};
var $MacCASOutreach$graphicsvg$GraphicSVG$line = F2(
	function (p1, p2) {
		return $MacCASOutreach$graphicsvg$GraphicSVG$Path(
			_List_fromArray(
				[p1, p2]));
	});
var $author$project$L03G1GridPanel2$grid = F3(
	function (dx, dy, scale) {
		var gridVLinesS = A2(
			$elm$core$List$map,
			function (x) {
				return A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
					$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
					$MacCASOutreach$graphicsvg$GraphicSVG$lightGray,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$line,
						_Utils_Tuple2(
							((60 + $author$project$L03G1GridPanel2$getDelta(dx)) + 3.75) - (x * 7.5),
							67.5 + $author$project$L03G1GridPanel2$getDelta(dy)),
						_Utils_Tuple2(
							((60 + $author$project$L03G1GridPanel2$getDelta(dx)) + 3.75) - (x * 7.5),
							((-60) - 7.5) + $author$project$L03G1GridPanel2$getDelta(dy))));
			},
			A2($elm$core$List$range, 0, 17));
		var gridVLines = A2(
			$elm$core$List$map,
			function (x) {
				return A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
					$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
					$MacCASOutreach$graphicsvg$GraphicSVG$gray,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$line,
						_Utils_Tuple2(
							(60 + $author$project$L03G1GridPanel2$getDelta(dx)) - (x * 7.5),
							67.5 + $author$project$L03G1GridPanel2$getDelta(dy)),
						_Utils_Tuple2(
							(60 + $author$project$L03G1GridPanel2$getDelta(dx)) - (x * 7.5),
							((-60) - 7.5) + $author$project$L03G1GridPanel2$getDelta(dy))));
			},
			A2($elm$core$List$range, -1, 17));
		var gridHLinesS = A2(
			$elm$core$List$map,
			function (x) {
				return A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
					$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
					$MacCASOutreach$graphicsvg$GraphicSVG$lightGray,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$line,
						_Utils_Tuple2(
							((-60) - 7.5) + $author$project$L03G1GridPanel2$getDelta(dx),
							((60 + $author$project$L03G1GridPanel2$getDelta(dy)) + 3.75) - (x * 7.5)),
						_Utils_Tuple2(
							67.5 + $author$project$L03G1GridPanel2$getDelta(dx),
							((60 + $author$project$L03G1GridPanel2$getDelta(dy)) + 3.75) - (x * 7.5))));
			},
			A2($elm$core$List$range, 0, 17));
		var gridHLines = A2(
			$elm$core$List$map,
			function (x) {
				return A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
					$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
					$MacCASOutreach$graphicsvg$GraphicSVG$gray,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$line,
						_Utils_Tuple2(
							((-60) - 7.5) + $author$project$L03G1GridPanel2$getDelta(dx),
							(60 + $author$project$L03G1GridPanel2$getDelta(dy)) - (x * 7.5)),
						_Utils_Tuple2(
							67.5 + $author$project$L03G1GridPanel2$getDelta(dx),
							(60 + $author$project$L03G1GridPanel2$getDelta(dy)) - (x * 7.5))));
			},
			A2($elm$core$List$range, -1, 17));
		return $MacCASOutreach$graphicsvg$GraphicSVG$group(
			_List_fromArray(
				[
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$clip,
					$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
						A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)),
					$MacCASOutreach$graphicsvg$GraphicSVG$group(gridHLinesS)),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$clip,
					$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
						A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)),
					$MacCASOutreach$graphicsvg$GraphicSVG$group(gridVLinesS)),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$clip,
					$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
						A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)),
					$MacCASOutreach$graphicsvg$GraphicSVG$group(gridHLines)),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$clip,
					$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
						A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)),
					$MacCASOutreach$graphicsvg$GraphicSVG$group(gridVLines)),
					A3($author$project$L03G1GridPanel2$axis, dx, dy, scale)
				]));
	});
var $author$project$L03G1GridPanel2$myShapes = F4(
	function (model, dx, dy, scale) {
		return _List_fromArray(
			[
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-15, 60),
				A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$html,
					150,
					150,
					A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'box-shadow', 'rgb(0 0 0 / 25%) 2px 2px 5px 0px'),
								A2($elm$html$Html$Attributes$style, 'width', '120px'),
								A2($elm$html$Html$Attributes$style, 'height', '120px'),
								A2($elm$html$Html$Attributes$style, 'border-radius', '3px')
							]),
						_List_Nil))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(45, 0),
				A3($author$project$L03G1GridPanel2$grid, dx, dy, scale)),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(45, 0),
				A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
					$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
					$MacCASOutreach$graphicsvg$GraphicSVG$gray,
					A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)))
			]);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$LinearGradient = F2(
	function (a, b) {
		return {$: 'LinearGradient', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$gradient = function (stops) {
	return $MacCASOutreach$graphicsvg$GraphicSVG$Gradient(
		A2($MacCASOutreach$graphicsvg$GraphicSVG$LinearGradient, 0, stops));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$Stop = F3(
	function (a, b, c) {
		return {$: 'Stop', a: a, b: b, c: c};
	});
var $avh4$elm_color$Color$rgba = F4(
	function (r, g, b, a) {
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, a);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$stop = F2(
	function (col, pos) {
		if (col.$ === 'Solid') {
			var colour = col.a;
			return A3($MacCASOutreach$graphicsvg$GraphicSVG$Stop, pos, 1, colour);
		} else {
			return A3(
				$MacCASOutreach$graphicsvg$GraphicSVG$Stop,
				pos,
				1,
				A4($avh4$elm_color$Color$rgba, 0, 0, 0, 0));
		}
	});
var $author$project$L03G1Palette$stopList = _List_fromArray(
	[
		A2(
		$MacCASOutreach$graphicsvg$GraphicSVG$stop,
		A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 0, 0, 0),
		0),
		A2(
		$MacCASOutreach$graphicsvg$GraphicSVG$stop,
		A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 255, 0, 0),
		8.5),
		A2(
		$MacCASOutreach$graphicsvg$GraphicSVG$stop,
		A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 255, 255, 0),
		17),
		A2(
		$MacCASOutreach$graphicsvg$GraphicSVG$stop,
		A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 0, 255, 0),
		25.5),
		A2(
		$MacCASOutreach$graphicsvg$GraphicSVG$stop,
		A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 0, 255, 255),
		34),
		A2(
		$MacCASOutreach$graphicsvg$GraphicSVG$stop,
		A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 0, 0, 255),
		42.5),
		A2(
		$MacCASOutreach$graphicsvg$GraphicSVG$stop,
		A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 255, 0, 255),
		51),
		A2(
		$MacCASOutreach$graphicsvg$GraphicSVG$stop,
		A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 255, 0, 0),
		59.5),
		A2(
		$MacCASOutreach$graphicsvg$GraphicSVG$stop,
		A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 255, 255, 255),
		68)
	]);
var $author$project$L03G1Palette$colorPalette = $MacCASOutreach$graphicsvg$GraphicSVG$gradient($author$project$L03G1Palette$stopList);
var $author$project$L03G1Palette$myShapes = function (model) {
	return _List_fromArray(
		[
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-63.5, -31),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$author$project$L03G1Palette$colorPalette,
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 68, 7))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-63.5, -31),
			A3(
				$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
				$MacCASOutreach$graphicsvg$GraphicSVG$solid(1),
				$MacCASOutreach$graphicsvg$GraphicSVG$gray,
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 68, 7))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-63.5, -45),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$author$project$L03G1Palette$colorPalette,
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 68, 7))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-63.5, -45),
			A3(
				$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
				$MacCASOutreach$graphicsvg$GraphicSVG$solid(1),
				$MacCASOutreach$graphicsvg$GraphicSVG$gray,
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 68, 7)))
		]);
};
var $author$project$L03G1SettingPanel$myShapes = function (model) {
	return _List_fromArray(
		[
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-105, 60),
			A3(
				$MacCASOutreach$graphicsvg$GraphicSVG$html,
				90,
				130,
				A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'box-shadow', 'rgb(0 0 0 / 25%) 2px 2px 5px 0px'),
							A2($elm$html$Html$Attributes$style, 'width', '80px'),
							A2($elm$html$Html$Attributes$style, 'height', '120px'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '3px')
						]),
					_List_Nil))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-65, 0),
			A3(
				$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
				$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
				$MacCASOutreach$graphicsvg$GraphicSVG$gray,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 80, 120, 3))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-65, 49),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					8,
					$MacCASOutreach$graphicsvg$GraphicSVG$centered(
						$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Settings')))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-100, 37),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					6,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$text('Angle unit'))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-100, 27),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					4,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$text('Showing pervious'))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-100, 22),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					4,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$text('shapes while editting')))))
		]);
};
var $author$project$L03G1ShapesPanel$myShapes = function (model) {
	return _List_fromArray(
		[
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-105, 60),
			A3(
				$MacCASOutreach$graphicsvg$GraphicSVG$html,
				90,
				130,
				A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'box-shadow', 'rgb(0 0 0 / 25%) 2px 2px 5px 0px'),
							A2($elm$html$Html$Attributes$style, 'width', '80px'),
							A2($elm$html$Html$Attributes$style, 'height', '120px'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '3px')
						]),
					_List_Nil))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-65, 0),
			A3(
				$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
				$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
				$MacCASOutreach$graphicsvg$GraphicSVG$gray,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 80, 120, 3))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-77, 49),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					8,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$text('Shapes')))))
		]);
};
var $MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseDown = F2(
	function (msg, shape) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$MouseDown, msg, shape);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseDownAt = F2(
	function (msg, shape) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$MouseDownAt, msg, shape);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt = F2(
	function (msg, shape) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$MoveOverAt, msg, shape);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseUp = F2(
	function (msg, shape) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$MouseUp, msg, shape);
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$notifyTapAt = F2(
	function (msg, shape) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$TapAt, msg, shape);
	});
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$openPolygon = function (ptList) {
	return $MacCASOutreach$graphicsvg$GraphicSVG$Path(ptList);
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $author$project$ICONS$plus = $MacCASOutreach$graphicsvg$GraphicSVG$group(
	_List_fromArray(
		[
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$filled,
			$MacCASOutreach$graphicsvg$GraphicSVG$black,
			A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 25, 3.846, 2)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$rotate,
			$elm$core$Basics$degrees(90),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 25, 3.846, 2)))
		]));
var $author$project$ICONS$redo = $MacCASOutreach$graphicsvg$GraphicSVG$group(
	_List_fromArray(
		[
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(-0.9990970000000061, 4.572490999999999),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-3.9575729999999965, 3.7414700000000067),
							_Utils_Tuple2(-5.230784, 2.9246689999999944)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-5.547092499999991, 2.7217489999999884),
							_Utils_Tuple2(-5.863400999999996, 2.5188289999999967)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-6.359330999999997, 2.0390615000000025),
							_Utils_Tuple2(-6.855260999999999, 1.5592939999999942)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-7.351191, 1.0795265),
							_Utils_Tuple2(-7.847121000000001, 0.5997590000000059)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.129955499999994, 0.1746855000000096),
							_Utils_Tuple2(-8.412790000000001, -0.25038800000000094)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.69562400000001, -0.6754614999999973),
							_Utils_Tuple2(-8.978458000000003, -1.1005350000000007)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.1661505, -1.5390510000000006),
							_Utils_Tuple2(-9.353842999999998, -1.9775670000000005)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.834532999999993, -3.2687099999999987),
							_Utils_Tuple2(-9.963238000000004, -3.774847000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.080242499999997, -4.234970000000004),
							_Utils_Tuple2(-10.197247000000004, -4.695093)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.197247000000004, -5.515469499999995),
							_Utils_Tuple2(-10.197247000000004, -6.3358459999999965)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.197247000000004, -7.156222),
							_Utils_Tuple2(-10.197247000000004, -7.976598000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.082480500000003, -8.426482),
							_Utils_Tuple2(-9.967714, -8.876365999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.452393, -12.732501),
							_Utils_Tuple2(-6.806021999999999, -14.321708999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-3.592136999999994, -16.670802000000002),
							_Utils_Tuple2(-1.4754449999999935, -17.140518)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-1.0255609999999962, -17.240352),
							_Utils_Tuple2(-0.5756769999999989, -17.340186000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(0.06922449999999003, -17.341336),
							_Utils_Tuple2(0.7141259999999932, -17.342486)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(1.3590284999999938, -17.343636000000004),
							_Utils_Tuple2(2.0039309999999944, -17.344786)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.391114999999999, -17.264292999999995),
							_Utils_Tuple2(2.778299000000004, -17.183799999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.042519999999996, -16.145325999999997),
							_Utils_Tuple2(7.289659999999998, -15.202699000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.986419999999995, -14.698411),
							_Utils_Tuple2(8.022549999999995, -14.698411)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(8.694649999999996, -15.293846000000002),
							_Utils_Tuple2(9.435839999999999, -16.021599000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(10.109650000000002, -16.683192500000004),
							_Utils_Tuple2(10.783460000000005, -17.344786)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.058459999999997, -17.344786),
							_Utils_Tuple2(11.333460000000002, -17.344786)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.608460000000008, -17.344786),
							_Utils_Tuple2(11.88346, -17.344786)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(12.05866499999999, -17.1695815),
							_Utils_Tuple2(12.233869999999996, -16.994377)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(12.409075000000001, -16.8191725),
							_Utils_Tuple2(12.584280000000007, -16.643968)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(12.618830000000003, -16.408984500000003),
							_Utils_Tuple2(12.653379999999999, -16.174000999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(12.707579999999993, -14.108269999999997),
							_Utils_Tuple2(12.68938, -12.157891)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(12.672780000000003, -10.384819499999999),
							_Utils_Tuple2(12.656180000000006, -8.611747999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(12.576785000000001, -8.491304999999997),
							_Utils_Tuple2(12.497389999999996, -8.370862000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(12.418000000000006, -8.250419),
							_Utils_Tuple2(12.338610000000003, -8.129976)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(12.138255000000001, -8.075859999999999),
							_Utils_Tuple2(11.937899999999999, -8.021743999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.737544999999997, -7.967627),
							_Utils_Tuple2(11.537189999999995, -7.913510000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(9.699839999999995, -7.929290000000002),
							_Utils_Tuple2(7.862489999999994, -7.945070000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.02512999999999, -7.960844999999999),
							_Utils_Tuple2(4.18777, -7.976619999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.0223175, -8.067210000000003),
							_Utils_Tuple2(3.856864999999999, -8.157800000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.691411000000002, -8.248389500000002),
							_Utils_Tuple2(3.5259570000000053, -8.338979000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.437441000000007, -8.560199499999996),
							_Utils_Tuple2(3.348924999999994, -8.781419999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.260410500000006, -9.002640499999998),
							_Utils_Tuple2(3.171896000000004, -9.223861)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.2076959999999985, -9.386841000000004),
							_Utils_Tuple2(3.2434959999999933, -9.549821000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.2792910000000006, -9.7128005),
							_Utils_Tuple2(3.3150859999999938, -9.875779999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.9459829999999982, -10.519241999999998),
							_Utils_Tuple2(4.576880000000003, -11.162703999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(5.20778, -11.806165999999997),
							_Utils_Tuple2(5.8386799999999965, -12.449627999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(5.632554999999996, -12.612883999999994),
							_Utils_Tuple2(5.426429999999996, -12.776139999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.685329999999993, -13.268667999999998),
							_Utils_Tuple2(4.2834100000000035, -13.471547000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.9180279999999925, -13.6559825),
							_Utils_Tuple2(3.5526459999999958, -13.840418)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.143430499999994, -13.949067999999997),
							_Utils_Tuple2(2.734215000000006, -14.057718000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.325000000000003, -14.1663675),
							_Utils_Tuple2(1.9157849999999996, -14.275016999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(1.3458410000000072, -14.274117000000004),
							_Utils_Tuple2(0.7758970000000005, -14.273217000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(0.20595349999999257, -14.272317000000001),
							_Utils_Tuple2(-0.36399000000000115, -14.271417)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-0.7609460000000041, -14.168871499999995),
							_Utils_Tuple2(-1.157902000000007, -14.066325999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-1.5548584999999946, -13.963780499999999),
							_Utils_Tuple2(-1.9518149999999963, -13.861235)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.401699000000008, -13.636889499999995),
							_Utils_Tuple2(-2.851583000000005, -13.412543999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-3.3014670000000024, -13.188198999999997),
							_Utils_Tuple2(-3.7513509999999997, -12.963853999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-4.286965500000008, -12.431579499999998),
							_Utils_Tuple2(-4.822580000000002, -11.899304999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-5.358194999999995, -11.367030999999997),
							_Utils_Tuple2(-5.893810000000002, -10.834757000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-6.10892849999999, -10.384872999999999),
							_Utils_Tuple2(-6.324046999999993, -9.934989000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-6.837355000000002, -8.725596000000003),
							_Utils_Tuple2(-6.938885999999997, -8.347164)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-7.0311869999999885, -8.003135),
							_Utils_Tuple2(-7.123487999999995, -7.659106000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-7.124288000000007, -6.997512499999999),
							_Utils_Tuple2(-7.125088000000005, -6.335918999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-7.125888000000003, -5.674324999999996),
							_Utils_Tuple2(-7.1266880000000015, -5.012731000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-7.028449999999992, -4.668701999999996),
							_Utils_Tuple2(-6.930211999999997, -4.324672999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-5.904711000000006, -1.797466),
							_Utils_Tuple2(-4.855725000000007, -0.7353749999999977)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.1936879999999945, 1.2233729999999952),
							_Utils_Tuple2(-0.5730659999999972, 1.5055930000000046)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-0.20680450000000405, 1.5693745000000092),
							_Utils_Tuple2(0.1594570000000033, 1.6331559999999996)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(0.7695605000000114, 1.6017360000000025),
							_Utils_Tuple2(1.3796640000000053, 1.5703160000000054)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(1.989767999999998, 1.538895999999994),
							_Utils_Tuple2(2.599872000000005, 1.507475999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.893519999999995, 1.4056165000000078),
							_Utils_Tuple2(3.187168, 1.3037570000000045)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.539069999999995, 0.7356539999999967),
							_Utils_Tuple2(5.284549999999996, 0.24067999999999756)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(5.573785000000001, 0.048638999999994326),
							_Utils_Tuple2(5.863020000000006, -0.1434020000000018)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.185175000000001, -0.1434020000000018),
							_Utils_Tuple2(6.507329999999996, -0.1434020000000018)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.829485000000005, -0.1434020000000018),
							_Utils_Tuple2(7.15164, -0.1434020000000018)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.294665000000009, -0.03754700000000355),
							_Utils_Tuple2(7.4376900000000035, 0.06830800000000181)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.5807199999999995, 0.17416249999999422),
							_Utils_Tuple2(7.7237499999999955, 0.28001700000000085)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.791149999999988, 0.4387995000000018),
							_Utils_Tuple2(7.858549999999994, 0.5975820000000027)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.92595, 0.7563650000000024),
							_Utils_Tuple2(7.993350000000007, 0.9151480000000021)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.988050000000001, 1.118419000000003),
							_Utils_Tuple2(7.982749999999996, 1.3216900000000038)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.977450000000005, 1.5249615000000034),
							_Utils_Tuple2(7.972149999999999, 1.728233000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.818224999999998, 1.9483815000000106),
							_Utils_Tuple2(7.664299999999997, 2.168530000000004)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.510374999999996, 2.388678999999996),
							_Utils_Tuple2(7.356449999999995, 2.6088280000000026)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.067059999999998, 2.8045945000000074),
							_Utils_Tuple2(6.7776700000000005, 3.000360999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.677899999999994, 4.076171000000002),
							_Utils_Tuple2(3.6033610000000067, 4.365511999999995)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.207451500000005, 4.472117999999995),
							_Utils_Tuple2(2.811542000000003, 4.578723999999994)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(1.9911659999999927, 4.599254000000002),
							_Utils_Tuple2(1.1707899999999967, 4.619783999999996)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(0.35041350000000193, 4.640313999999989),
							_Utils_Tuple2(-0.469963000000007, 4.660843999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-0.7346004999999991, 4.616628999999989),
							_Utils_Tuple2(-0.9992380000000054, 4.572413999999995)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-0.9991674999999987, 4.572452499999997),
							_Utils_Tuple2(-0.9990970000000061, 4.572490999999999))
						]))))
		]));
var $author$project$L03G1State1$roundCoor = F2(
	function (d, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return '(' + (A2($myrho$elm_round$Round$round, d, x) + (',' + (A2($myrho$elm_round$Round$round, d, y) + ')')));
	});
var $author$project$L03G1State1$ChangeSetting = F2(
	function (a, b) {
		return {$: 'ChangeSetting', a: a, b: b};
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$Polygon = function (a) {
	return {$: 'Polygon', a: a};
};
var $elm$core$Basics$turns = function (angleInTurns) {
	return (2 * $elm$core$Basics$pi) * angleInTurns;
};
var $MacCASOutreach$graphicsvg$GraphicSVG$ptOnCircle = F3(
	function (r, n, cn) {
		var angle = $elm$core$Basics$turns(cn / n);
		return _Utils_Tuple2(
			r * $elm$core$Basics$cos(angle),
			r * $elm$core$Basics$sin(angle));
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$ngon = F2(
	function (n, r) {
		return $MacCASOutreach$graphicsvg$GraphicSVG$Polygon(
			A2(
				$elm$core$List$map,
				A2(
					$elm$core$Basics$composeL,
					A2($MacCASOutreach$graphicsvg$GraphicSVG$ptOnCircle, r, n),
					$elm$core$Basics$toFloat),
				A2($elm$core$List$range, 0, n)));
	});
var $MacCASOutreach$graphicsvg$GraphicSVG$triangle = function (r) {
	return A2($MacCASOutreach$graphicsvg$GraphicSVG$ngon, 3, r);
};
var $author$project$L03G1State1$settingChangeArrow = F3(
	function (key, btnScaleDict, settingsDict) {
		return $MacCASOutreach$graphicsvg$GraphicSVG$group(
			_List_fromArray(
				[
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
					$author$project$L03G1State1$SPMsg(
						A2(
							$author$project$L03G1State1$ChangeSetting,
							key,
							A2($author$project$L03G1State1$getFromDict, key, settingsDict))),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
						$author$project$L03G1State1$CancelScale,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
							A2($author$project$L03G1State1$ScaleBtn, key + 't1', 1.2),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-32, 39),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$scale,
									0.3 * A2($author$project$L03G1State1$getFromDict, key + 't1', btnScaleDict),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										$MacCASOutreach$graphicsvg$GraphicSVG$black,
										$MacCASOutreach$graphicsvg$GraphicSVG$triangle(10))))))),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
					$author$project$L03G1State1$SPMsg(
						A2(
							$author$project$L03G1State1$ChangeSetting,
							key,
							A2($author$project$L03G1State1$getFromDict, key, settingsDict))),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
						$author$project$L03G1State1$CancelScale,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
							A2($author$project$L03G1State1$ScaleBtn, key + 't2', 1.2),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-60, 39),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$rotate,
									$elm$core$Basics$degrees(60),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$scale,
										0.3 * A2($author$project$L03G1State1$getFromDict, key + 't2', btnScaleDict),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$filled,
											$MacCASOutreach$graphicsvg$GraphicSVG$black,
											$MacCASOutreach$graphicsvg$GraphicSVG$triangle(10))))))))
				]));
	});
var $elm$core$Debug$toString = _Debug_toString;
var $author$project$L03G1State1$shapeVertex = F3(
	function (coor, r, rscale) {
		return A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
			$author$project$L03G1State1$CancelScale,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
				$author$project$L03G1State1$ShowingCoordinate(coor),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
					A2(
						$author$project$L03G1State1$ScaleBtn,
						$elm$core$Debug$toString(coor),
						1.75),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						coor,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$scale,
							rscale,
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$filled,
								A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 94, 92, 230),
								$MacCASOutreach$graphicsvg$GraphicSVG$circle(r)))))));
	});
var $author$project$L03G1State1$CleanHignlighting = {$: 'CleanHignlighting'};
var $author$project$L03G1State1$DelShape = function (a) {
	return {$: 'DelShape', a: a};
};
var $author$project$L03G1State1$EditShape = function (a) {
	return {$: 'EditShape', a: a};
};
var $author$project$L03G1State1$Hignlighting = function (a) {
	return {$: 'Hignlighting', a: a};
};
var $author$project$ICONS$pen = $MacCASOutreach$graphicsvg$GraphicSVG$group(
	_List_fromArray(
		[
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(-9.29307, 7.7837260000000015),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.674250999999998, 7.139968999999994),
							_Utils_Tuple2(-9.263229999999993, 5.759468999999996)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.711253999999997, 3.886184),
							_Utils_Tuple2(-8.434820000000002, 2.933994999999996)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-7.805149, 0.9646939999999944),
							_Utils_Tuple2(-7.649846999999994, 0.6737470000000059)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-6.098883999999998, -1.1351020000000034),
							_Utils_Tuple2(-1.9357760000000042, -5.335161999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(0.780076500000007, -8.0751195),
							_Utils_Tuple2(3.495929000000004, -10.815077000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.949439500000011, -9.361566500000002),
							_Utils_Tuple2(6.402950000000004, -7.908056000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.8564599999999984, -6.454545500000002),
							_Utils_Tuple2(9.309970000000007, -5.001035000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.5727395000000115, -2.263488500000001),
							_Utils_Tuple2(3.835509000000002, 0.4740579999999994)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-1.8343440000000015, 6.225601999999995),
							_Utils_Tuple2(-3.9143669999999986, 6.8263510000000025)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-5.729709999999997, 7.355924000000002),
							_Utils_Tuple2(-6.596582999999995, 7.612735000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.877734000000004, 8.199082000000004),
							_Utils_Tuple2(-9.293092999999999, 7.7837260000000015))
						])))),
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(7.458420000000004, -8.968975999999998),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.6457400000000035, -11.818415000000002),
							_Utils_Tuple2(4.6457400000000035, -11.861866)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(5.175939999999997, -12.469757999999999),
							_Utils_Tuple2(5.82396, -13.116177999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.627610000000004, -14.738832000000002),
							_Utils_Tuple2(8.589150000000004, -14.793239999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(10.156080000000003, -14.603608999999999),
							_Utils_Tuple2(11.550399999999996, -13.237127000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(13.332269999999994, -11.247401000000004),
							_Utils_Tuple2(13.326980000000006, -10.216813000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(13.098879999999994, -8.807757000000002),
							_Utils_Tuple2(11.68983, -7.383690000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(10.428489999999996, -6.155087000000002),
							_Utils_Tuple2(10.372640000000004, -6.155087000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(9.005390000000006, -7.421337000000001),
							_Utils_Tuple2(7.458420000000004, -8.968975999999998))
						]))))
		]));
var $MacCASOutreach$graphicsvg$GraphicSVG$red = A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 204, 0, 0, 1);
var $author$project$ICONS$trash = $MacCASOutreach$graphicsvg$GraphicSVG$group(
	_List_fromArray(
		[
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$red,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(-5.608159999999998, 9.592320999999998),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-7.159267, 8.683498999999998),
							_Utils_Tuple2(-7.511807000000005, 7.982105000000004)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-7.922376999999997, 6.364046000000002),
							_Utils_Tuple2(-7.890842000000006, -1.8415170000000032)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-7.822721999999999, -9.904701000000003),
							_Utils_Tuple2(-7.777405000000002, -9.889592999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-3.292671999999996, -9.862122999999997),
							_Utils_Tuple2(2.087952999999999, -9.862122999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.979431500000004, -9.862122999999997),
							_Utils_Tuple2(11.870909999999995, -9.862122999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.855009999999993, -5.563406499999999),
							_Utils_Tuple2(11.839110000000005, -1.2646900000000016)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.823160000000001, 3.034027000000009),
							_Utils_Tuple2(11.807209999999998, 7.332744000000005)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.672219999999996, 7.596981499999998),
							_Utils_Tuple2(11.537229999999994, 7.8612190000000055)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(10.621499999999997, 9.119412999999994),
							_Utils_Tuple2(9.948319999999995, 9.432873)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(9.669179999999997, 9.562851999999992),
							_Utils_Tuple2(9.390039999999999, 9.692830999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(5.709350000000001, 9.688631),
							_Utils_Tuple2(2.028660000000002, 9.684431000000004)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-5.456649999999996, 9.638371000000006),
							_Utils_Tuple2(-5.608116999999993, 9.592291000000003))
						])))),
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$red,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(-8.216410999999994, -11.698141),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.304525999999996, -12.346649999999997),
							_Utils_Tuple2(-9.400882999999993, -12.860273999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.039427000000003, -14.712671999999998),
							_Utils_Tuple2(-8.073589999999996, -14.845053999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-6.506129999999999, -14.916204),
							_Utils_Tuple2(-5.224835999999996, -14.916204)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-4.060022000000004, -14.916204),
							_Utils_Tuple2(-2.8952079999999967, -14.916204)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.7656404999999893, -15.168127499999997),
							_Utils_Tuple2(-2.636072999999996, -15.420051)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-1.8116619999999983, -16.584769),
							_Utils_Tuple2(2.282317000000006, -16.542789999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(5.557860000000005, -16.50103),
							_Utils_Tuple2(5.937550000000002, -16.264887)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.458449999999999, -15.785544000000002),
							_Utils_Tuple2(6.626509999999996, -15.476751)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.774464999999992, -15.204908500000002),
							_Utils_Tuple2(6.9224200000000025, -14.933065999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(8.280945000000003, -14.915115999999998),
							_Utils_Tuple2(9.639470000000003, -14.897165999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(12.819460000000007, -14.816656000000002),
							_Utils_Tuple2(13.242710000000002, -14.180186999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(13.520979999999994, -12.774546999999998),
							_Utils_Tuple2(13.242710000000002, -12.356077999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(13.404420000000002, -11.676164),
							_Utils_Tuple2(2.2483569999999986, -11.663742)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.020278000000005, -11.673042000000002),
							_Utils_Tuple2(-8.216410999999994, -11.698132000000001))
						])))),
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(7.572829999999996, 6.268248999999997),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.796859999999995, 5.914837000000006),
							_Utils_Tuple2(7.796859999999995, -0.0835739999999987)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.792860000000005, -6.199379999999998),
							_Utils_Tuple2(7.572829999999996, -6.435395)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.593130000000002, -6.764997000000001),
							_Utils_Tuple2(6.303160000000005, -6.444595)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.093850000000003, -5.957220999999997),
							_Utils_Tuple2(6.093850000000003, -0.08358799999999889)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.102850000000004, 6.055800000000005),
							_Utils_Tuple2(6.303160000000005, 6.277417)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.270330000000001, 6.592937000000006),
							_Utils_Tuple2(7.572829999999996, 6.268217000000007))
						])))),
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(2.6329060000000055, 6.2889749999999935),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.8526449999999954, 5.922735000000003),
							_Utils_Tuple2(2.8526449999999954, -0.08356599999999759)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.8474449999999933, -6.241593999999999),
							_Utils_Tuple2(2.6329060000000055, -6.456105000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(1.6129530000000045, -6.755701000000002),
							_Utils_Tuple2(1.322422000000003, -6.386344999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(1.0947060000000022, -6.000677000000003),
							_Utils_Tuple2(1.0947060000000022, -0.08355900000000105)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(1.0985060000000004, 5.934359999999998),
							_Utils_Tuple2(1.322422000000003, 6.219226000000006)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.2969049999999953, 6.624982000000003),
							_Utils_Tuple2(2.6329060000000055, 6.288976000000005))
						])))),
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(-2.3558040000000062, 6.277431000000007),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.146500000000003, 5.790058000000002),
							_Utils_Tuple2(-2.146500000000003, -0.08357500000000329)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.1551999999999936, -6.2229639999999975),
							_Utils_Tuple2(-2.3558040000000062, -6.444578)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-3.326791, -6.761386999999999),
							_Utils_Tuple2(-3.621789000000007, -6.386358000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-3.8495049999999935, -6.000691000000003),
							_Utils_Tuple2(-3.8495049999999935, -0.08357300000000123)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-3.8457049999999953, 5.9343470000000025),
							_Utils_Tuple2(-3.621789000000007, 6.219211999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-2.669850999999994, 6.624449999999996),
							_Utils_Tuple2(-2.3558040000000062, 6.277432000000005))
						]))))
		]));
var $author$project$L03G1State1$shapeWidget = F5(
	function (id, name, _v0, _v1, model) {
		var r1 = _v0.a;
		var g1 = _v0.b;
		var b1 = _v0.c;
		var r2 = _v1.a;
		var g2 = _v1.b;
		var b2 = _v1.c;
		return $MacCASOutreach$graphicsvg$GraphicSVG$group(
			_List_fromArray(
				[
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
					$author$project$L03G1State1$SPMsg($author$project$L03G1State1$CleanHignlighting),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
						$author$project$L03G1State1$SPMsg(
							$author$project$L03G1State1$Hignlighting(id)),
						$MacCASOutreach$graphicsvg$GraphicSVG$group(
							_List_fromArray(
								[
									A3(
									$MacCASOutreach$graphicsvg$GraphicSVG$addOutline,
									$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.35),
									$MacCASOutreach$graphicsvg$GraphicSVG$darkGray,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
										A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 64, 22, 2))),
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(-28, 5),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										$MacCASOutreach$graphicsvg$GraphicSVG$black,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$size,
											5,
											$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
												$MacCASOutreach$graphicsvg$GraphicSVG$text(name))))),
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(-25, 1),
									A3(
										$MacCASOutreach$graphicsvg$GraphicSVG$addOutline,
										$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.2),
										$MacCASOutreach$graphicsvg$GraphicSVG$black,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$filled,
											A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, r1, g1, b1),
											A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 5, 5)))),
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(-20, -0.5),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, r1, g1, b1),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$size,
											5,
											$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
												$MacCASOutreach$graphicsvg$GraphicSVG$text(
													'(' + ($elm$core$String$fromInt(
														$elm$core$Basics$round(r1)) + (',' + ($elm$core$String$fromInt(
														$elm$core$Basics$round(g1)) + (',' + ($elm$core$String$fromInt(
														$elm$core$Basics$round(b1)) + ')')))))))))),
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(-25, -6),
									A3(
										$MacCASOutreach$graphicsvg$GraphicSVG$addOutline,
										$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.2),
										$MacCASOutreach$graphicsvg$GraphicSVG$black,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$filled,
											A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, r2, g2, b2),
											A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 5, 5)))),
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(-20, -7.5),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, r2, g2, b2),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$size,
											5,
											$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
												$MacCASOutreach$graphicsvg$GraphicSVG$text(
													'(' + ($elm$core$String$fromInt(
														$elm$core$Basics$round(r2)) + (',' + ($elm$core$String$fromInt(
														$elm$core$Basics$round(g2)) + (',' + ($elm$core$String$fromInt(
														$elm$core$Basics$round(b2)) + ')'))))))))))
								])))),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$move,
					_Utils_Tuple2(27, 5),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$scale,
						A2(
							$author$project$L03G1State1$getFromDict,
							'penScale' + $elm$core$String$fromInt(id),
							model.btnScaleDict),
						A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.25, $author$project$ICONS$pen))),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
					$author$project$L03G1State1$CancelScale,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
						$author$project$L03G1State1$CancelScale,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
							A2(
								$author$project$L03G1State1$ScaleBtn,
								'penScale' + $elm$core$String$fromInt(id),
								1.2),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
								$author$project$L03G1State1$SPMsg(
									$author$project$L03G1State1$EditShape(id)),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(27.5, 6),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
										A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 7, 7))))))),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$move,
					_Utils_Tuple2(27, -6.7),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$scale,
						A2(
							$author$project$L03G1State1$getFromDict,
							'trashScale' + $elm$core$String$fromInt(id),
							model.btnScaleDict),
						A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.25, $author$project$ICONS$trash))),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
					$author$project$L03G1State1$CancelScale,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
						$author$project$L03G1State1$CancelScale,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
							A2(
								$author$project$L03G1State1$ScaleBtn,
								'trashScale' + $elm$core$String$fromInt(id),
								1.2),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
								$author$project$L03G1State1$SPMsg(
									$author$project$L03G1State1$DelShape(id)),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(27.5, -6),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
										A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 7, 7)))))))
				]));
	});
var $author$project$L03G1State1$toGirdCoor = F4(
	function (scale, _v0, dx, dy) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(scale * (((2 * (x - dx)) / 15) - 6), scale * ((2 * (y - dy)) / 15));
	});
var $author$project$L03G1State1$toRoundedCoor = F4(
	function (scale, _v0, dx, dy) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			function (num) {
				return A2($author$project$L03G1State1$roundFloatTo05, num, scale);
			}(scale * (((2 * (x - dx)) / 15) - 6)),
			function (num) {
				return A2($author$project$L03G1State1$roundFloatTo05, num, scale);
			}(scale * ((2 * (y - dy)) / 15)));
	});
var $author$project$L03G1State1$toViewCoor = F4(
	function (scale, _v0, dx, dy) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(((((15 * x) / scale) / 2) + 45) + dx, (((15 * y) / scale) / 2) + dy);
	});
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $MacCASOutreach$graphicsvg$GraphicSVG$mirrorX = function (shape) {
	return A3($MacCASOutreach$graphicsvg$GraphicSVG$Scale, -1, 1, shape);
};
var $author$project$ICONS$undo = $MacCASOutreach$graphicsvg$GraphicSVG$mirrorX($author$project$ICONS$redo);
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$ICONS$xmark = $MacCASOutreach$graphicsvg$GraphicSVG$group(
	_List_fromArray(
		[
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(-5.030052999999995, 7.872078000000002),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-7.119878999999997, 6.208348999999998),
							_Utils_Tuple2(-6.608436999999995, 4.833584000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-4.662379000000001, 2.6109260000000063),
							_Utils_Tuple2(-2.4813999999999936, 0.4253219999999942)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-0.49869049999999504, -1.561591000000007),
							_Utils_Tuple2(1.4840190000000035, -3.548504000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-0.49869049999999504, -5.535417500000001),
							_Utils_Tuple2(-2.4813999999999936, -7.522331000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-6.519546000000005, -11.691653000000002),
							_Utils_Tuple2(-6.608436999999995, -11.930593000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-6.636556999999996, -14.154833000000004),
							_Utils_Tuple2(-5.814822000000007, -14.655830000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-4.044411999999994, -15.077254000000003),
							_Utils_Tuple2(-3.480538999999993, -14.806688999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-1.3923850000000044, -12.860062999999997),
							_Utils_Tuple2(0.7478140000000053, -10.678539999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.6934520000000077, -8.695336499999996),
							_Utils_Tuple2(4.639089999999996, -6.7121330000000015)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.628699999999995, -8.6908995),
							_Utils_Tuple2(8.618309999999994, -10.669666)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(12.749219999999994, -14.703975999999997),
							_Utils_Tuple2(12.934610000000006, -14.797815)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(14.619699999999995, -15.008001999999998),
							_Utils_Tuple2(15.150009999999995, -14.733764999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(16.22412, -13.485638000000002),
							_Utils_Tuple2(16.22412, -12.806387999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(16.11667, -12.107357),
							_Utils_Tuple2(15.985330000000005, -11.835718999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(13.961600000000004, -9.587029000000001),
							_Utils_Tuple2(11.780010000000004, -7.442270000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(9.796760000000006, -5.492489500000005),
							_Utils_Tuple2(7.813509999999994, -3.542709000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(9.797294999999991, -1.5958249999999978),
							_Utils_Tuple2(11.781080000000003, 0.35105900000000645)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(15.855630000000005, 4.467076000000006),
							_Utils_Tuple2(15.98639, 4.738714000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(16.22412, 5.447153),
							_Utils_Tuple2(16.22412, 5.709384)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(15.677890000000005, 7.363782999999998),
							_Utils_Tuple2(15.10387, 7.660621000000006)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(13.491079999999997, 7.984363999999999),
							_Utils_Tuple2(12.961119999999994, 7.715001000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(10.808189999999996, 5.749302),
							_Utils_Tuple2(8.62124, 3.572659999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.633094999999997, 1.5938935000000072),
							_Utils_Tuple2(4.644949999999994, -0.3848729999999989)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.6978479999999934, 1.5977955000000037),
							_Utils_Tuple2(0.7507460000000066, 3.5804640000000063)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-3.282347999999999, 7.609459999999999),
							_Utils_Tuple2(-3.4521040000000056, 7.687265999999994)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-4.512039999999999, 7.991168999999999),
							_Utils_Tuple2(-5.030052999999995, 7.872080999999994))
						]))))
		]));
var $author$project$ICONS$zoomIn = $MacCASOutreach$graphicsvg$GraphicSVG$group(
	_List_fromArray(
		[
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$filled,
			$MacCASOutreach$graphicsvg$GraphicSVG$black,
			$MacCASOutreach$graphicsvg$GraphicSVG$circle(10.2)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$filled,
			$MacCASOutreach$graphicsvg$GraphicSVG$white,
			$MacCASOutreach$graphicsvg$GraphicSVG$circle(6.4)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$filled,
			$MacCASOutreach$graphicsvg$GraphicSVG$black,
			A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 10.157, 2.346, 1)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$rotate,
			$elm$core$Basics$degrees(90),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 10.157, 2.346, 1))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(10, -10),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$rotate,
				$elm$core$Basics$degrees(-45),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 12.137, 3.905, 2))))
		]));
var $author$project$ICONS$zoomOut = $MacCASOutreach$graphicsvg$GraphicSVG$group(
	_List_fromArray(
		[
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$filled,
			$MacCASOutreach$graphicsvg$GraphicSVG$black,
			$MacCASOutreach$graphicsvg$GraphicSVG$circle(10.2)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$filled,
			$MacCASOutreach$graphicsvg$GraphicSVG$white,
			$MacCASOutreach$graphicsvg$GraphicSVG$circle(6.4)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$filled,
			$MacCASOutreach$graphicsvg$GraphicSVG$black,
			A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 10.157, 2.346, 1)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(10, -10),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$rotate,
				$elm$core$Basics$degrees(-45),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 12.137, 3.905, 2))))
		]));
var $author$project$L03G1State1$myShapes = function (model) {
	return _List_fromArray(
		[
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			$author$project$L03G1Border$myShapes(model)),
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			A4($author$project$L03G1GridPanel2$myShapes, model, model.gridDX, model.gridDY, model.scaleGrid)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
			$author$project$L03G1State1$GPMsg($author$project$L03G1State1$GridReleasing),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseUp,
				$author$project$L03G1State1$GPMsg($author$project$L03G1State1$GridReleasing),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
					function (x) {
						return $author$project$L03G1State1$GPMsg(
							$author$project$L03G1State1$GridDragging(x));
					},
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseDownAt,
						function (x) {
							return $author$project$L03G1State1$GPMsg(
								$author$project$L03G1State1$GridDraggedAt(x));
						},
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
							$author$project$L03G1State1$ShowingCoordinate,
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(45, 0),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$filled,
									A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
									A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)))))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(105, -69),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				$MacCASOutreach$graphicsvg$GraphicSVG$alignRight(
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						6,
						$MacCASOutreach$graphicsvg$GraphicSVG$text(
							A2(
								$author$project$L03G1State1$roundCoor,
								4,
								_Utils_Tuple2(model.x, model.y))))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-15, -66),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					5,
					$MacCASOutreach$graphicsvg$GraphicSVG$text(
						_Utils_eq(model.state, $author$project$L03G1State1$EidtingShapeState) ? 'Hold Ctrl Key to Snap the Point!' : 'Try Dragging the Graph!')))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-15, -70.5),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					5,
					$MacCASOutreach$graphicsvg$GraphicSVG$text(
						_Utils_eq(model.state, $author$project$L03G1State1$EidtingShapeState) ? 'Hold Shift Key and Drag the Graph!' : '')))),
			function () {
			var _v0 = model.state;
			switch (_v0.$) {
				case 'AddingShapeState':
					return $MacCASOutreach$graphicsvg$GraphicSVG$group(
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
								$author$project$L03G1ShapesPanel$myShapes(model)),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-96, 50),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
									$author$project$L03G1State1$SPMsg($author$project$L03G1State1$ToSetting),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
										$author$project$L03G1State1$CancelScale,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
											$author$project$L03G1State1$CancelScale,
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
												A2($author$project$L03G1State1$ScaleBtn, 'gearScale', 1.2),
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$scale,
													A2($author$project$L03G1State1$getFromDict, 'gearScale', model.btnScaleDict),
													A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.4, $author$project$ICONS$gear))))))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-33, 51.5),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$scale,
									A2($author$project$L03G1State1$getFromDict, 'plusScale', model.btnScaleDict),
									A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.4, $author$project$ICONS$plus))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
								$author$project$L03G1State1$CancelScale,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
									A2($author$project$L03G1State1$ScaleBtn, 'plusScale', 1.2),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
										$author$project$L03G1State1$SPMsg($author$project$L03G1State1$AddShape),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$move,
											_Utils_Tuple2(-33, 51.5),
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$filled,
												A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
												A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 10, 10)))))),
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
								A2(
									$elm$core$List$map,
									function (_v1) {
										var i = _v1.a;
										var s = _v1.b;
										return A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$move,
											_Utils_Tuple2(-65, (i * (-25)) + 32),
											A5($author$project$L03G1State1$shapeWidget, i, s.name, s.shapeColor, s.outputColor, model));
									},
									model.indexedShapeList)),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$clip,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(45, 0),
									$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
										A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
									A2(
										$elm$core$List$map,
										function (_v2) {
											var point = _v2.a;
											var color = _v2.b;
											return A3(
												$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
												$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.8),
												$author$project$L03G1State1$getColor(color),
												$MacCASOutreach$graphicsvg$GraphicSVG$openPolygon(
													A2(
														$elm$core$List$map,
														function (x) {
															return A4($author$project$L03G1State1$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
														},
														point)));
										},
										A2(
											$elm$core$List$map,
											function (x) {
												return _Utils_Tuple2(x.points, x.shapeColor);
											},
											model.shapeList)))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$clip,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(45, 0),
									$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
										A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
									A2(
										$elm$core$List$map,
										function (point) {
											return $MacCASOutreach$graphicsvg$GraphicSVG$group(
												A2(
													$elm$core$List$map,
													function (x) {
														return A3(
															$author$project$L03G1State1$shapeVertex,
															x,
															1,
															A2(
																$author$project$L03G1State1$getFromDict,
																$elm$core$Debug$toString(x),
																model.btnScaleDict));
													},
													A2(
														$elm$core$List$map,
														function (x) {
															return A4($author$project$L03G1State1$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
														},
														point)));
										},
										A2(
											$elm$core$List$map,
											function ($) {
												return $.points;
											},
											model.shapeList)))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$clip,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(45, 0),
									$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
										A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
								A3(
									$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
									$MacCASOutreach$graphicsvg$GraphicSVG$solid(2),
									$author$project$L03G1State1$getColor(model.highLightShape.shapeColor),
									$MacCASOutreach$graphicsvg$GraphicSVG$openPolygon(
										A2(
											$elm$core$List$map,
											function (x) {
												return A4($author$project$L03G1State1$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
											},
											model.highLightShape.points)))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$clip,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(45, 0),
									$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
										A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
									A2(
										$elm$core$List$map,
										function (x) {
											return A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$move,
												x,
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$filled,
													A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 94, 92, 230),
													$MacCASOutreach$graphicsvg$GraphicSVG$circle(2)));
										},
										A2(
											$elm$core$List$map,
											function (x) {
												return A4($author$project$L03G1State1$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
											},
											model.highLightShape.points))))
							]));
				case 'EidtingShapeState':
					return $MacCASOutreach$graphicsvg$GraphicSVG$group(
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
								$author$project$L03G1EditShapePanel$myShapes(model)),
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
								$author$project$L03G1Palette$myShapes(model)),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseDown,
								$author$project$L03G1State1$SPMsg($author$project$L03G1State1$Grabbing1),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(model.palette1X, -31),
									A3(
										$MacCASOutreach$graphicsvg$GraphicSVG$addOutline,
										$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
										A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 100, 100, 100),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$filled,
											$MacCASOutreach$graphicsvg$GraphicSVG$gray,
											A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 1, 9, 1))))),
								function () {
								var _v3 = model.palette1State;
								if (_v3.$ === 'Grabbed1') {
									return A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
										function (x) {
											return $author$project$L03G1State1$SPMsg(
												A4($author$project$L03G1State1$DataChanged, model.tempShape.name, model.tempShape.points, model.tempColor, model.tempShape.outputColor));
										},
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
											function (x) {
												return $author$project$L03G1State1$SPMsg(
													$author$project$L03G1State1$GetBaseColor1(x));
											},
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
												function (x) {
													return $author$project$L03G1State1$SPMsg(
														$author$project$L03G1State1$MoveFloater1(x));
												},
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
													$author$project$L03G1State1$SPMsg($author$project$L03G1State1$Stop1),
													A2(
														$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseUp,
														$author$project$L03G1State1$SPMsg($author$project$L03G1State1$Stop1),
														$MacCASOutreach$graphicsvg$GraphicSVG$group(
															_List_fromArray(
																[
																	A2(
																	$MacCASOutreach$graphicsvg$GraphicSVG$filled,
																	A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
																	A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 232, 142))
																])))))));
								} else {
									return $MacCASOutreach$graphicsvg$GraphicSVG$group(_List_Nil);
								}
							}(),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseDown,
								$author$project$L03G1State1$SPMsg($author$project$L03G1State1$Grabbing2),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(model.palette2X, -45),
									A3(
										$MacCASOutreach$graphicsvg$GraphicSVG$addOutline,
										$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
										A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 100, 100, 100),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$filled,
											$MacCASOutreach$graphicsvg$GraphicSVG$gray,
											A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 1, 9, 1))))),
								function () {
								var _v4 = model.palette2State;
								if (_v4.$ === 'Grabbed2') {
									return A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
										function (x) {
											return $author$project$L03G1State1$SPMsg(
												A4($author$project$L03G1State1$DataChanged, model.tempShape.name, model.tempShape.points, model.tempShape.shapeColor, model.tempColor));
										},
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
											function (x) {
												return $author$project$L03G1State1$SPMsg(
													$author$project$L03G1State1$GetBaseColor2(x));
											},
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
												function (x) {
													return $author$project$L03G1State1$SPMsg(
														$author$project$L03G1State1$MoveFloater2(x));
												},
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
													$author$project$L03G1State1$SPMsg($author$project$L03G1State1$Stop2),
													A2(
														$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseUp,
														$author$project$L03G1State1$SPMsg($author$project$L03G1State1$Stop2),
														$MacCASOutreach$graphicsvg$GraphicSVG$group(
															_List_fromArray(
																[
																	A2(
																	$MacCASOutreach$graphicsvg$GraphicSVG$filled,
																	A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
																	A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 232, 142))
																])))))));
								} else {
									return $MacCASOutreach$graphicsvg$GraphicSVG$group(_List_Nil);
								}
							}(),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-97, 57.5),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$scale,
									0.6,
									A3(
										$MacCASOutreach$graphicsvg$GraphicSVG$html,
										500,
										100,
										A2(
											$elm$html$Html$div,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$input,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$placeholder('Enter the name'),
																	(model.tempShape.name !== 'Shape\u205F\u202F\u200B') ? $elm$html$Html$Attributes$value(model.tempShape.name) : A2($elm$html$Html$Attributes$style, 'border', '0'),
																	$elm$html$Html$Events$onInput(
																	function (x) {
																		return $author$project$L03G1State1$SPMsg(
																			A4($author$project$L03G1State1$DataChanged, x, model.tempShape.points, model.tempShape.shapeColor, model.tempShape.outputColor));
																	}),
																	$elm$html$Html$Attributes$type_('text'),
																	A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
																	A2($elm$html$Html$Attributes$style, 'align', 'center'),
																	$elm$html$Html$Attributes$maxlength(15),
																	A2($elm$html$Html$Attributes$style, 'width', '100px'),
																	A2($elm$html$Html$Attributes$style, 'background-color', 'transparent'),
																	A2($elm$html$Html$Attributes$style, 'border', '0'),
																	A2($elm$html$Html$Attributes$style, 'outline', 'none'),
																	A2($elm$html$Html$Attributes$style, 'font-family', 'sans-serif')
																]),
															_List_Nil)
														]))
												]))))),
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
								A2(
									$elm$core$List$map,
									function (_v5) {
										var i = _v5.a;
										var point = _v5.b;
										return A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$move,
											_Utils_Tuple2(-97.5, 28 - (i * 8)),
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$filled,
												$MacCASOutreach$graphicsvg$GraphicSVG$black,
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$size,
													5,
													$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
														$MacCASOutreach$graphicsvg$GraphicSVG$text(
															$elm$core$String$fromInt(i + 1) + ('. ' + A2($author$project$L03G1State1$roundCoor, 2, point)))))));
									},
									A2(
										$elm$core$List$indexedMap,
										$elm$core$Tuple$pair,
										A2($elm$core$List$take, 6, model.tempShape.points)))),
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
								A2(
									$elm$core$List$map,
									function (_v6) {
										var i = _v6.a;
										var point = _v6.b;
										return A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$move,
											_Utils_Tuple2(-62.5, 28 - (i * 8)),
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$filled,
												$MacCASOutreach$graphicsvg$GraphicSVG$black,
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$size,
													5,
													$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
														$MacCASOutreach$graphicsvg$GraphicSVG$text(
															$elm$core$String$fromInt(i + 7) + ('. ' + A2($author$project$L03G1State1$roundCoor, 2, point)))))));
									},
									A2(
										$elm$core$List$indexedMap,
										$elm$core$Tuple$pair,
										A2(
											$elm$core$List$take,
											5,
											A2($elm$core$List$drop, 6, model.tempShape.points))))),
								($elm$core$List$length(model.tempShape.points) > 11) ? A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-62.5, -12),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$filled,
									$MacCASOutreach$graphicsvg$GraphicSVG$black,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$size,
										10,
										$MacCASOutreach$graphicsvg$GraphicSVG$text('...')))) : $MacCASOutreach$graphicsvg$GraphicSVG$group(_List_Nil),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-35, -54),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$scale,
									A2($author$project$L03G1State1$getFromDict, 'checkScale', model.btnScaleDict),
									A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.4, $author$project$ICONS$check))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
								$author$project$L03G1State1$CancelScale,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
									$author$project$L03G1State1$CancelScale,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
										A2($author$project$L03G1State1$ScaleBtn, 'checkScale', 1.2),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
											$author$project$L03G1State1$SPMsg($author$project$L03G1State1$ConfirmChangeE),
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$move,
												_Utils_Tuple2(-33, -53),
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$filled,
													A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
													A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 10, 8))))))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-96, -55),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$scale,
									A2($author$project$L03G1State1$getFromDict, 'xmarkScale', model.btnScaleDict),
									A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.3, $author$project$ICONS$xmark))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
								$author$project$L03G1State1$CancelScale,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
									$author$project$L03G1State1$CancelScale,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
										A2($author$project$L03G1State1$ScaleBtn, 'xmarkScale', 1.2),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
											$author$project$L03G1State1$SPMsg($author$project$L03G1State1$DiscardChangeE),
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$move,
												_Utils_Tuple2(-95, -54),
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$filled,
													A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
													A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 8, 8))))))),
								(A2($author$project$L03G1State1$getFromDict, 'SPSWE', model.settingsDict) === 1.0) ? $MacCASOutreach$graphicsvg$GraphicSVG$group(
								_List_fromArray(
									[
										A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$clip,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$move,
											_Utils_Tuple2(45, 0),
											$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
												A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
										$MacCASOutreach$graphicsvg$GraphicSVG$group(
											A2(
												$elm$core$List$map,
												function (_v7) {
													var point = _v7.a;
													var color = _v7.b;
													return A3(
														$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
														$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.8),
														$author$project$L03G1State1$getColor(color),
														$MacCASOutreach$graphicsvg$GraphicSVG$openPolygon(
															A2(
																$elm$core$List$map,
																function (x) {
																	return A4($author$project$L03G1State1$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
																},
																point)));
												},
												A2(
													$elm$core$List$map,
													function (x) {
														return _Utils_Tuple2(x.points, x.shapeColor);
													},
													model.shapeList)))),
										A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$clip,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$move,
											_Utils_Tuple2(45, 0),
											$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
												A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
										$MacCASOutreach$graphicsvg$GraphicSVG$group(
											A2(
												$elm$core$List$map,
												function (point) {
													return $MacCASOutreach$graphicsvg$GraphicSVG$group(
														A2(
															$elm$core$List$map,
															function (x) {
																return A3(
																	$author$project$L03G1State1$shapeVertex,
																	x,
																	1,
																	A2(
																		$author$project$L03G1State1$getFromDict,
																		$elm$core$Debug$toString(x),
																		model.btnScaleDict));
															},
															A2(
																$elm$core$List$map,
																function (x) {
																	return A4($author$project$L03G1State1$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
																},
																point)));
												},
												A2(
													$elm$core$List$map,
													function ($) {
														return $.points;
													},
													model.shapeList))))
									])) : $MacCASOutreach$graphicsvg$GraphicSVG$group(_List_Nil),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$clip,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(45, 0),
									$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
										A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
								A3(
									$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
									$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.8),
									$author$project$L03G1State1$getColor(model.tempShape.shapeColor),
									$MacCASOutreach$graphicsvg$GraphicSVG$openPolygon(
										A2(
											$elm$core$List$map,
											function (x) {
												return A4($author$project$L03G1State1$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
											},
											model.tempShape.points)))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$clip,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(45, 0),
									$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
										A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
									A2(
										$elm$core$List$map,
										function (x) {
											return A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$move,
												x,
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$filled,
													A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 94, 92, 230),
													$MacCASOutreach$graphicsvg$GraphicSVG$circle(1)));
										},
										A2(
											$elm$core$List$map,
											function (x) {
												return A4($author$project$L03G1State1$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
											},
											model.tempShape.points)))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								A4(
									$author$project$L03G1State1$toViewCoor,
									model.scaleGrid,
									_Utils_Tuple2(model.x, model.y),
									model.gridDX,
									model.gridDY),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$filled,
									A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 94, 92, 230),
									$MacCASOutreach$graphicsvg$GraphicSVG$circle(1))),
								(model.isShift ? $MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseDownAt(
								function (x) {
									return $author$project$L03G1State1$GPMsg(
										$author$project$L03G1State1$GridDraggedAt(x));
								}) : $MacCASOutreach$graphicsvg$GraphicSVG$notifyTapAt(
								function (x) {
									return $author$project$L03G1State1$SPMsg(
										A4(
											$author$project$L03G1State1$DataChanged,
											model.tempShape.name,
											$elm$core$List$reverse(
												A2(
													$elm$core$List$cons,
													model.isCtrl ? A4($author$project$L03G1State1$toRoundedCoor, model.scaleGrid, x, model.gridDX, model.gridDY) : A4($author$project$L03G1State1$toGirdCoor, model.scaleGrid, x, model.gridDX, model.gridDY),
													$elm$core$List$reverse(model.tempShape.points))),
											model.tempShape.shapeColor,
											model.tempShape.outputColor));
								}))(
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
									$author$project$L03G1State1$GPMsg($author$project$L03G1State1$GridReleasing),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseUp,
										$author$project$L03G1State1$GPMsg($author$project$L03G1State1$GridReleasing),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
											function (x) {
												return $author$project$L03G1State1$GPMsg(
													$author$project$L03G1State1$GridDragging(x));
											},
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
												$author$project$L03G1State1$ShowingCoordinate,
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$move,
													_Utils_Tuple2(45, 0),
													A2(
														$MacCASOutreach$graphicsvg$GraphicSVG$filled,
														A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
														A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)))))))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-3.5, 47),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$scale,
									A2($author$project$L03G1State1$getFromDict, 'undoScale', model.btnScaleDict),
									A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.3, $author$project$ICONS$undo))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
								$author$project$L03G1State1$CancelScale,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
									$author$project$L03G1State1$CancelScale,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
										A2($author$project$L03G1State1$ScaleBtn, 'undoScale', 1.2),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
											$author$project$L03G1State1$SPMsg($author$project$L03G1State1$Undo),
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$move,
												_Utils_Tuple2(-3.5, 49),
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$filled,
													A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
													A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 7, 7))))))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-4.5, 37),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$scale,
									A2($author$project$L03G1State1$getFromDict, 'redoScale', model.btnScaleDict),
									A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.3, $author$project$ICONS$redo))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
								$author$project$L03G1State1$CancelScale,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
									$author$project$L03G1State1$CancelScale,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
										A2($author$project$L03G1State1$ScaleBtn, 'redoScale', 1.2),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
											$author$project$L03G1State1$SPMsg($author$project$L03G1State1$Redo),
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$move,
												_Utils_Tuple2(-4.5, 39),
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$filled,
													A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
													A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 7, 7)))))))
							]));
				default:
					return $MacCASOutreach$graphicsvg$GraphicSVG$group(
						_List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
								$author$project$L03G1SettingPanel$myShapes(model)),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$clip,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(45, 0),
									$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
										A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
									A2(
										$elm$core$List$map,
										function (_v8) {
											var point = _v8.a;
											var color = _v8.b;
											return A3(
												$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
												$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.8),
												$author$project$L03G1State1$getColor(color),
												$MacCASOutreach$graphicsvg$GraphicSVG$openPolygon(
													A2(
														$elm$core$List$map,
														function (x) {
															return A4($author$project$L03G1State1$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
														},
														point)));
										},
										A2(
											$elm$core$List$map,
											function (x) {
												return _Utils_Tuple2(x.points, x.shapeColor);
											},
											model.shapeList)))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$clip,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(45, 0),
									$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
										A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
									A2(
										$elm$core$List$map,
										function (point) {
											return $MacCASOutreach$graphicsvg$GraphicSVG$group(
												A2(
													$elm$core$List$map,
													function (x) {
														return A3(
															$author$project$L03G1State1$shapeVertex,
															x,
															1,
															A2(
																$author$project$L03G1State1$getFromDict,
																$elm$core$Debug$toString(x),
																model.btnScaleDict));
													},
													A2(
														$elm$core$List$map,
														function (x) {
															return A4($author$project$L03G1State1$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
														},
														point)));
										},
										A2(
											$elm$core$List$map,
											function ($) {
												return $.points;
											},
											model.shapeList)))),
								A3($author$project$L03G1State1$settingChangeArrow, 'RotateMode', model.btnScaleDict, model.settingsDict),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-56.5, 37),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$scale,
									0.5,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										$MacCASOutreach$graphicsvg$GraphicSVG$black,
										$MacCASOutreach$graphicsvg$GraphicSVG$bold(
											$MacCASOutreach$graphicsvg$GraphicSVG$text(
												(A2($author$project$L03G1State1$getFromDict, 'RotateMode', model.settingsDict) === 1.0) ? 'Degrees' : 'Radians'))))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(0, -13),
								A3($author$project$L03G1State1$settingChangeArrow, 'SPSWE', model.btnScaleDict, model.settingsDict)),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-56.5, 24),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$scale,
									0.5,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										$MacCASOutreach$graphicsvg$GraphicSVG$black,
										$MacCASOutreach$graphicsvg$GraphicSVG$bold(
											$MacCASOutreach$graphicsvg$GraphicSVG$text(
												(A2($author$project$L03G1State1$getFromDict, 'SPSWE', model.settingsDict) === 1.0) ? 'Yes' : 'No'))))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-35, -54),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$scale,
									A2($author$project$L03G1State1$getFromDict, 'checkScale', model.btnScaleDict),
									A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.4, $author$project$ICONS$check))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
								$author$project$L03G1State1$CancelScale,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
									$author$project$L03G1State1$CancelScale,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
										A2($author$project$L03G1State1$ScaleBtn, 'checkScale', 1.2),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
											$author$project$L03G1State1$SPMsg($author$project$L03G1State1$ConfirmChangeS),
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$move,
												_Utils_Tuple2(-33, -53),
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$filled,
													A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
													A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 10, 8))))))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-96, -55),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$scale,
									A2($author$project$L03G1State1$getFromDict, 'xmarkScale', model.btnScaleDict),
									A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.3, $author$project$ICONS$xmark))),
								A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
								$author$project$L03G1State1$CancelScale,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
									$author$project$L03G1State1$CancelScale,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
										A2($author$project$L03G1State1$ScaleBtn, 'xmarkScale', 1.2),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
											$author$project$L03G1State1$SPMsg($author$project$L03G1State1$DiscardChangeS),
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$move,
												_Utils_Tuple2(-95, -54),
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$filled,
													A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
													A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 8, 8)))))))
							]));
			}
		}(),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent,
			_Utils_eq(model.scaleGrid, 1 / 32) ? 0 : 1,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(96, 50),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					A2($author$project$L03G1State1$getFromDict, 'zoomInScale', model.btnScaleDict),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.3, $author$project$ICONS$zoomIn)))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$L03G1State1$GPMsg(
				$author$project$L03G1State1$GridScale(model.scaleGrid * 0.5)),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				$author$project$L03G1State1$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
					A2($author$project$L03G1State1$ScaleBtn, 'zoomInScale', 1.2),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(97, 49),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
							A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 8, 8)))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent,
			(model.scaleGrid === 32) ? 0 : 1,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(96, 40),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					A2($author$project$L03G1State1$getFromDict, 'zoomOutScale', model.btnScaleDict),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.3, $author$project$ICONS$zoomOut)))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$L03G1State1$GPMsg(
				$author$project$L03G1State1$GridScale(model.scaleGrid * 2)),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				$author$project$L03G1State1$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
					A2($author$project$L03G1State1$ScaleBtn, 'zoomOutScale', 1.2),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(97, 39),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
							A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 8, 8)))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(97, 28),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$scale,
				A2($author$project$L03G1State1$getFromDict, 'homeScale', model.btnScaleDict),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.35, $author$project$ICONS$home))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$L03G1State1$GPMsg($author$project$L03G1State1$ClearGridDelta),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				$author$project$L03G1State1$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
					A2($author$project$L03G1State1$ScaleBtn, 'homeScale', 1.2),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(97, 29),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 1, 1, 11, 0),
							A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 8, 8))))))
		]);
};
var $author$project$L03G1State2$CancelScale = {$: 'CancelScale'};
var $author$project$L03G1State2$ClearGridDelta = {$: 'ClearGridDelta'};
var $author$project$L03G1State2$ConfirmChangeS = {$: 'ConfirmChangeS'};
var $author$project$L03G1State2$DiscardChangeS = {$: 'DiscardChangeS'};
var $author$project$L03G1State2$GPMsg = function (a) {
	return {$: 'GPMsg', a: a};
};
var $author$project$L03G1State2$GridDraggedAt = function (a) {
	return {$: 'GridDraggedAt', a: a};
};
var $author$project$L03G1State2$GridDragging = function (a) {
	return {$: 'GridDragging', a: a};
};
var $author$project$L03G1State2$GridReleasing = {$: 'GridReleasing'};
var $author$project$L03G1State2$GridScale = function (a) {
	return {$: 'GridScale', a: a};
};
var $author$project$L03G1State2$ResetMatraix = {$: 'ResetMatraix'};
var $author$project$L03G1State2$ScaleBtn = F2(
	function (a, b) {
		return {$: 'ScaleBtn', a: a, b: b};
	});
var $author$project$L03G1State2$ShowingCoordinate = function (a) {
	return {$: 'ShowingCoordinate', a: a};
};
var $author$project$L03G1State2$ToSetting = {$: 'ToSetting'};
var $author$project$L03G1State2$UpdateTransMatrix = {$: 'UpdateTransMatrix'};
var $author$project$L03G1MatrixModel2$getMatrixColCount = function (matrix) {
	var _v0 = $elm$core$List$head(matrix);
	if (_v0.$ === 'Just') {
		var m = _v0.a;
		return $elm$core$List$length(m);
	} else {
		return -1;
	}
};
var $author$project$L03G1MatrixModel2$getMatrixRowCount = function (matrix) {
	return $elm$core$List$length(matrix);
};
var $author$project$L03G1MatrixModel2$listPair = F2(
	function (listA, listB) {
		return A3(
			$elm$core$List$map2,
			F2(
				function (x, y) {
					return A2($elm$core$List$cons, x, y);
				}),
			listA,
			listB);
	});
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $author$project$L03G1MatrixModel2$matrixTranspose = F3(
	function (m, n, matrix) {
		if (matrix.b) {
			var ma = matrix.a;
			var mas = matrix.b;
			return A2(
				$author$project$L03G1MatrixModel2$listPair,
				ma,
				A3($author$project$L03G1MatrixModel2$matrixTranspose, m, n, mas));
		} else {
			var otherwise = matrix;
			return A2($elm$core$List$repeat, n, _List_Nil);
		}
	});
var $author$project$L03G1MatrixModel2$Add = {$: 'Add'};
var $author$project$L03G1MatrixModel2$fromJust = function (mathExpr) {
	if (mathExpr.$ === 'Just') {
		var expr = mathExpr.a;
		return expr;
	} else {
		return $author$project$L03G1MatrixModel2$Coef(0);
	}
};
var $author$project$L03G1MatrixModel2$sumRow = function (matrixList) {
	if (matrixList.b) {
		var m = matrixList.a;
		var mas = matrixList.b;
		return A3(
			$author$project$L03G1MatrixModel2$Func2,
			$author$project$L03G1MatrixModel2$Add,
			m,
			($elm$core$List$length(mas) === 1) ? $author$project$L03G1MatrixModel2$fromJust(
				$elm$core$List$head(mas)) : $author$project$L03G1MatrixModel2$sumRow(mas));
	} else {
		return $author$project$L03G1MatrixModel2$Coef(0);
	}
};
var $author$project$L03G1MatrixModel2$rowMultiple = F2(
	function (listA, listB) {
		return $author$project$L03G1MatrixModel2$sumRow(
			A3(
				$elm$core$List$map2,
				$author$project$L03G1MatrixModel2$Func2($author$project$L03G1MatrixModel2$Mult),
				listA,
				listB));
	});
var $author$project$L03G1MatrixModel2$applyTransformation = F2(
	function (transM, matrix) {
		var matrixT = A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$elm$core$List$map,
					function (y) {
						return A2($author$project$L03G1MatrixModel2$rowMultiple, x, y);
					},
					transM);
			},
			A3(
				$author$project$L03G1MatrixModel2$matrixTranspose,
				$author$project$L03G1MatrixModel2$getMatrixRowCount(matrix),
				$author$project$L03G1MatrixModel2$getMatrixColCount(matrix),
				matrix));
		return A3(
			$author$project$L03G1MatrixModel2$matrixTranspose,
			$author$project$L03G1MatrixModel2$getMatrixRowCount(matrixT),
			$author$project$L03G1MatrixModel2$getMatrixColCount(matrixT),
			matrixT);
	});
var $author$project$L03G1MatrixModel2$applyMutipleTransAux = function (transList) {
	if (transList.b) {
		var t = transList.a;
		var ts = transList.b;
		return A2(
			$author$project$L03G1MatrixModel2$applyTransformation,
			t,
			$author$project$L03G1MatrixModel2$applyMutipleTransAux(ts));
	} else {
		return $author$project$L03G1MatrixModel2$identityMatrix;
	}
};
var $author$project$L03G1MatrixModel2$applyMutipleTrans = F2(
	function (transList, matrix) {
		return A2(
			$author$project$L03G1MatrixModel2$applyTransformation,
			$author$project$L03G1MatrixModel2$applyMutipleTransAux(transList),
			matrix);
	});
var $author$project$L03G1State2$getColor = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	return A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, r, g, b);
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$L03G1MatrixModel2$options = $elm$json$Json$Encode$object(
	_List_fromArray(
		[
			_Utils_Tuple2(
			'displayMode',
			$elm$json$Json$Encode$bool(true))
		]));
var $author$project$L03G1MatrixModel2$latexgenerate = function (expr) {
	return A3(
		$elm$html$Html$node,
		'katex-expression',
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$attribute, 'expression', expr),
				A2(
				$elm$html$Html$Attributes$attribute,
				'katex-options',
				A2($elm$json$Json$Encode$encode, 0, $author$project$L03G1MatrixModel2$options))
			]),
		_List_Nil);
};
var $author$project$L03G1MatrixModel2$latex2Svg = function (latex) {
	return $MacCASOutreach$graphicsvg$GraphicSVG$group(
		_List_fromArray(
			[
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$scale,
				0.3,
				A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$html,
					500,
					500,
					$author$project$L03G1MatrixModel2$latexgenerate(latex)))
			]));
};
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $author$project$L03G1MatrixModel2$mathString = F2(
	function (expr, isDisplay) {
		switch (expr.$) {
			case 'Coef':
				var c = expr.a;
				return (c < 0) ? ('(' + ($elm$core$String$fromFloat(c) + ')')) : $elm$core$String$fromFloat(c);
			case 'PI':
				return 'pi';
			case 'Func2':
				var binOp = expr.a;
				var e1 = expr.b;
				var e2 = expr.c;
				if (binOp.$ === 'Add') {
					return '(' + (A2($author$project$L03G1MatrixModel2$mathString, e1, isDisplay) + (' + ' + (A2($author$project$L03G1MatrixModel2$mathString, e2, isDisplay) + ')')));
				} else {
					return '(' + (A2($author$project$L03G1MatrixModel2$mathString, e1, isDisplay) + (' * ' + (A2($author$project$L03G1MatrixModel2$mathString, e2, isDisplay) + ')')));
				}
			default:
				var unaryOp = expr.a;
				var e = expr.b;
				switch (unaryOp.$) {
					case 'CosR':
						return '\\cos((' + (A2($author$project$L03G1MatrixModel2$mathString, e, isDisplay) + (') * \\pi' + ')'));
					case 'SinR':
						return '\\sin((' + (A2($author$project$L03G1MatrixModel2$mathString, e, isDisplay) + (') * \\pi' + ')'));
					case 'CosD':
						return isDisplay ? ('\\cos(' + (A2($author$project$L03G1MatrixModel2$mathString, e, isDisplay) + ')')) : ('\\cos(' + (A2($author$project$L03G1MatrixModel2$mathString, e, isDisplay) + (' * \\pi/180' + ')')));
					default:
						return isDisplay ? ('\\sin(' + (A2($author$project$L03G1MatrixModel2$mathString, e, isDisplay) + ')')) : ('\\sin(' + (A2($author$project$L03G1MatrixModel2$mathString, e, isDisplay) + (' * \\pi/180' + ')')));
				}
		}
	});
var $author$project$L03G1MatrixModel2$matrixToStringList = F2(
	function (matrix, isDisplay) {
		return A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$elm$core$List$map,
					function (y) {
						return A2($author$project$L03G1MatrixModel2$mathString, y, isDisplay);
					},
					x);
			},
			matrix);
	});
var $author$project$L03G1MatrixModel2$matrixToLatex = function (matrix) {
	return '\\begin{bmatrix}' + (A3(
		$elm$core$List$foldr,
		$elm$core$Basics$append,
		'',
		$elm$core$List$concat(
			A2(
				$elm$core$List$map,
				function (x) {
					return A2(
						$elm$core$List$append,
						A2($elm$core$List$intersperse, ' & ', x),
						_List_fromArray(
							[' \\\\ ']));
				},
				A2($author$project$L03G1MatrixModel2$matrixToStringList, matrix, true)))) + '\\end{bmatrix}');
};
var $author$project$L03G1MatrixModel2$simMatrixSvg = function (matrix) {
	return $author$project$L03G1MatrixModel2$latex2Svg(
		$author$project$L03G1MatrixModel2$matrixToLatex(matrix));
};
var $author$project$L03G1State2$matrices = function (model) {
	return $MacCASOutreach$graphicsvg$GraphicSVG$group(
		_List_fromArray(
			[
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-145) + 43, 36.2),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.7,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 0, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-105) + 43, 36.2),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.7,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 1, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-145) + 43, 33.2 - (1 * 17)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.7,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 2, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-105) + 43, 33.2 - (1 * 17)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.7,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 3, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-145) + 43, 32.2 - (2.3 * 17)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.5,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 4, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-105) + 43, 33.2 - (2.2 * 17)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.7,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 9, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-145) + 43, 33.2 - (3.35 * 17)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.7,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 5, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-105) + 43, 33.2 - (3.35 * 17)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.7,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 6, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-145) + 43, 33.2 - (4.5 * 17)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.7,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 7, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-105) + 43, 33.2 - (4.5 * 17)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.7,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 8, model.displayMatricesList))))))
			]));
};
var $author$project$L03G1MatrixModel2$eval = function (expr) {
	switch (expr.$) {
		case 'Coef':
			var a = expr.a;
			return a;
		case 'PI':
			return $elm$core$Basics$pi;
		case 'Func1':
			var unaryOp = expr.a;
			var e = expr.b;
			switch (unaryOp.$) {
				case 'CosR':
					return $elm$core$Basics$cos(
						$author$project$L03G1MatrixModel2$eval(e) * $elm$core$Basics$pi);
				case 'SinR':
					return $elm$core$Basics$sin(
						$author$project$L03G1MatrixModel2$eval(e) * $elm$core$Basics$pi);
				case 'CosD':
					return $elm$core$Basics$cos(
						$elm$core$Basics$degrees(
							$author$project$L03G1MatrixModel2$eval(e)));
				default:
					return $elm$core$Basics$sin(
						$elm$core$Basics$degrees(
							$author$project$L03G1MatrixModel2$eval(e)));
			}
		default:
			var binOp = expr.a;
			var e1 = expr.b;
			var e2 = expr.c;
			if (binOp.$ === 'Add') {
				return $author$project$L03G1MatrixModel2$eval(e1) + $author$project$L03G1MatrixModel2$eval(e2);
			} else {
				return $author$project$L03G1MatrixModel2$eval(e1) * $author$project$L03G1MatrixModel2$eval(e2);
			}
	}
};
var $author$project$L03G1MatrixModel2$evalMatrix = function (matrix) {
	return A2(
		$elm$core$List$map,
		function (x) {
			return A2($elm$core$List$map, $author$project$L03G1MatrixModel2$eval, x);
		},
		matrix);
};
var $author$project$L03G1MatrixModel2$matrixToPoints = function (matrix) {
	return A3(
		$elm$core$List$map2,
		$elm$core$Tuple$pair,
		$elm$core$List$concat(
			A2(
				$elm$core$List$take,
				1,
				$author$project$L03G1MatrixModel2$evalMatrix(matrix))),
		$elm$core$List$concat(
			A2(
				$elm$core$List$drop,
				1,
				$author$project$L03G1MatrixModel2$evalMatrix(matrix))));
};
var $author$project$L03G1TransPanel$myShapes = function (model) {
	return _List_fromArray(
		[
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-105, 60),
			A3(
				$MacCASOutreach$graphicsvg$GraphicSVG$html,
				90,
				130,
				A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'box-shadow', 'rgb(0 0 0 / 25%) 2px 2px 5px 0px'),
							A2($elm$html$Html$Attributes$style, 'width', '80px'),
							A2($elm$html$Html$Attributes$style, 'height', '120px'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '3px')
						]),
					_List_Nil))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-65, 0),
			A3(
				$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
				$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
				$MacCASOutreach$graphicsvg$GraphicSVG$gray,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 80, 120, 3))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-65, 49),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					7,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$centered(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Transformation')))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-90, 40 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 26, 30, 35),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 22, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-76, 40 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-81, 40 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 4, 8))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-92, 38.5 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					4,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$centered(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Scale X')))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-50, 40 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 26, 30, 35),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 22, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2((-50) + 14, 40 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2((-50) + 9, 40 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 4, 8))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-52, 38.5 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					4,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$centered(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Scale Y')))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-90, 20 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 26, 30, 35),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 22, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-76, 20 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-81, 20 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 4, 8))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-92, 18.5 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					4,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$centered(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Shear X')))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-50, 20 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 26, 30, 35),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 22, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2((-50) + 14, 20 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2((-50) + 9, 20 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 4, 8))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-52, 18.5 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					4,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$centered(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Shear Y')))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-90, 0 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 26, 30, 35),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 22, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-76, 0 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-81, 0 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 4, 8))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-92, (-1.5) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					4,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$centered(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Rotate')))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-50, 0 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 26, 30, 35),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 22, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2((-50) + 14, 0 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2((-50) + 9, 0 - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 4, 8))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-52, (-1.5) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					3,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$centered(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Reflect Origin')))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-90, (-20) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 26, 30, 35),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 22, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-76, (-20) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-81, (-20) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 4, 8))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-92, (-21.5) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					4,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$centered(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Reflect X')))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-50, (-20) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 26, 30, 35),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 22, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2((-50) + 14, (-20) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2((-50) + 9, (-20) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 4, 8))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-52, (-21.5) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					4,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$centered(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Reflect Y')))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-90, (-40) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 26, 30, 35),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 22, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-76, (-40) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-81, (-40) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 4, 8))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-92, (-41.5) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					3,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$centered(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Reflect Y=X')))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-50, (-40) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 26, 30, 35),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 22, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2((-50) + 14, (-40) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 1.5))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2((-50) + 9, (-40) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 196, 196, 196),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 4, 8))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-52, (-41.5) - 2),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$white,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$size,
					3,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						$MacCASOutreach$graphicsvg$GraphicSVG$centered(
							$MacCASOutreach$graphicsvg$GraphicSVG$text('Reflect Y=-X'))))))
		]);
};
var $author$project$L03G1State2$DataChanging = F2(
	function (a, b) {
		return {$: 'DataChanging', a: a, b: b};
	});
var $author$project$L03G1State2$KeyboardStateChanging = F2(
	function (a, b) {
		return {$: 'KeyboardStateChanging', a: a, b: b};
	});
var $author$project$L03G1State2$MouseStateChanging = F2(
	function (a, b) {
		return {$: 'MouseStateChanging', a: a, b: b};
	});
var $author$project$L03G1State2$buttonPressDecoder = A2(
	$elm$json$Json$Decode$map,
	function (x) {
		return A2($author$project$L03G1State2$MouseStateChanging, 0, x);
	},
	A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int));
var $author$project$L03G1State2$buttonUpDecoder = A2(
	$elm$json$Json$Decode$map,
	function (x) {
		return A2($author$project$L03G1State2$MouseStateChanging, 1, x);
	},
	A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int));
var $elm$html$Html$Events$keyCode = A2($elm$json$Json$Decode$field, 'keyCode', $elm$json$Json$Decode$int);
var $author$project$L03G1State2$onKeyDown = function (tagger) {
	return A2(
		$elm$html$Html$Events$on,
		'keydown',
		A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$keyCode));
};
var $author$project$L03G1State2$onKeyUp = function (tagger) {
	return A2(
		$elm$html$Html$Events$on,
		'keyup',
		A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$keyCode));
};
var $elm$html$Html$Attributes$step = function (n) {
	return A2($elm$html$Html$Attributes$stringProperty, 'step', n);
};
var $author$project$L03G1State2$numbers = function (model) {
	return $MacCASOutreach$graphicsvg$GraphicSVG$group(
		_List_fromArray(
			[
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				A2($author$project$L03G1State2$MouseStateChanging, 1, 0),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$move,
					_Utils_Tuple2(-83, 42.2 - (0 * 20)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$scale,
						0.4,
						A3(
							$MacCASOutreach$graphicsvg$GraphicSVG$html,
							60,
							20,
							A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$input,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('number'),
														$elm$html$Html$Attributes$value(
														$elm$core$String$fromFloat(model.scaleX)),
														$elm$html$Html$Events$onInput(
														$author$project$L03G1State2$DataChanging(0)),
														A2($elm$html$Html$Events$on, 'mousedown', $author$project$L03G1State2$buttonPressDecoder),
														A2($elm$html$Html$Events$on, 'mouseup', $author$project$L03G1State2$buttonUpDecoder),
														$author$project$L03G1State2$onKeyDown(
														$author$project$L03G1State2$KeyboardStateChanging(1)),
														$author$project$L03G1State2$onKeyUp(
														$author$project$L03G1State2$KeyboardStateChanging(0)),
														$elm$html$Html$Attributes$step('0.1'),
														A2($elm$html$Html$Attributes$style, 'width', '50px'),
														A2($elm$html$Html$Attributes$style, 'height', '20px'),
														A2($elm$html$Html$Attributes$style, 'background-color', 'transparent'),
														A2($elm$html$Html$Attributes$style, 'border', '0'),
														A2($elm$html$Html$Attributes$style, 'outline', 'none')
													]),
												_List_Nil)
											]))
									])))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				A2($author$project$L03G1State2$MouseStateChanging, 1, 0),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$move,
					_Utils_Tuple2(-43, 42.2 - (0 * 20)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$scale,
						0.4,
						A3(
							$MacCASOutreach$graphicsvg$GraphicSVG$html,
							60,
							20,
							A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$input,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('number'),
														$elm$html$Html$Attributes$step('0.1'),
														$elm$html$Html$Attributes$value(
														$elm$core$String$fromFloat(model.scaleY)),
														$elm$html$Html$Events$onInput(
														$author$project$L03G1State2$DataChanging(1)),
														A2($elm$html$Html$Events$on, 'mousedown', $author$project$L03G1State2$buttonPressDecoder),
														A2($elm$html$Html$Events$on, 'mouseup', $author$project$L03G1State2$buttonUpDecoder),
														$author$project$L03G1State2$onKeyDown(
														$author$project$L03G1State2$KeyboardStateChanging(1)),
														$author$project$L03G1State2$onKeyUp(
														$author$project$L03G1State2$KeyboardStateChanging(0)),
														A2($elm$html$Html$Attributes$style, 'width', '50px'),
														A2($elm$html$Html$Attributes$style, 'height', '20px'),
														A2($elm$html$Html$Attributes$style, 'background-color', 'transparent'),
														A2($elm$html$Html$Attributes$style, 'border', '0'),
														A2($elm$html$Html$Attributes$style, 'outline', 'none')
													]),
												_List_Nil)
											]))
									])))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				A2($author$project$L03G1State2$MouseStateChanging, 1, 0),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$move,
					_Utils_Tuple2(-83, 42.2 - (1 * 20)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$scale,
						0.4,
						A3(
							$MacCASOutreach$graphicsvg$GraphicSVG$html,
							60,
							20,
							A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$input,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('number'),
														$elm$html$Html$Attributes$step('0.1'),
														$elm$html$Html$Attributes$value(
														$elm$core$String$fromFloat(model.shearX)),
														$elm$html$Html$Events$onInput(
														$author$project$L03G1State2$DataChanging(2)),
														A2($elm$html$Html$Events$on, 'mousedown', $author$project$L03G1State2$buttonPressDecoder),
														A2($elm$html$Html$Events$on, 'mouseup', $author$project$L03G1State2$buttonUpDecoder),
														$author$project$L03G1State2$onKeyDown(
														$author$project$L03G1State2$KeyboardStateChanging(1)),
														$author$project$L03G1State2$onKeyUp(
														$author$project$L03G1State2$KeyboardStateChanging(0)),
														A2($elm$html$Html$Attributes$style, 'width', '50px'),
														A2($elm$html$Html$Attributes$style, 'height', '20px'),
														A2($elm$html$Html$Attributes$style, 'background-color', 'transparent'),
														A2($elm$html$Html$Attributes$style, 'border', '0'),
														A2($elm$html$Html$Attributes$style, 'outline', 'none')
													]),
												_List_Nil)
											]))
									])))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				A2($author$project$L03G1State2$MouseStateChanging, 1, 0),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$move,
					_Utils_Tuple2(-43, 42.2 - (1 * 20)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$scale,
						0.4,
						A3(
							$MacCASOutreach$graphicsvg$GraphicSVG$html,
							60,
							20,
							A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$input,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('number'),
														$elm$html$Html$Attributes$step('0.1'),
														$elm$html$Html$Attributes$value(
														$elm$core$String$fromFloat(model.shearY)),
														$elm$html$Html$Events$onInput(
														$author$project$L03G1State2$DataChanging(3)),
														A2($elm$html$Html$Events$on, 'mousedown', $author$project$L03G1State2$buttonPressDecoder),
														A2($elm$html$Html$Events$on, 'mouseup', $author$project$L03G1State2$buttonUpDecoder),
														$author$project$L03G1State2$onKeyDown(
														$author$project$L03G1State2$KeyboardStateChanging(1)),
														$author$project$L03G1State2$onKeyUp(
														$author$project$L03G1State2$KeyboardStateChanging(0)),
														A2($elm$html$Html$Attributes$style, 'width', '50px'),
														A2($elm$html$Html$Attributes$style, 'height', '20px'),
														A2($elm$html$Html$Attributes$style, 'background-color', 'transparent'),
														A2($elm$html$Html$Attributes$style, 'border', '0'),
														A2($elm$html$Html$Attributes$style, 'outline', 'none')
													]),
												_List_Nil)
											]))
									])))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				A2($author$project$L03G1State2$MouseStateChanging, 1, 0),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$move,
					_Utils_Tuple2(-83, 42.2 - (2 * 20)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$scale,
						0.4,
						A3(
							$MacCASOutreach$graphicsvg$GraphicSVG$html,
							60,
							20,
							A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$input,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$type_('number'),
														$elm$html$Html$Attributes$step('1'),
														$elm$html$Html$Attributes$value(
														$elm$core$String$fromFloat(model.rotate)),
														$elm$html$Html$Events$onInput(
														$author$project$L03G1State2$DataChanging(4)),
														A2($elm$html$Html$Events$on, 'mousedown', $author$project$L03G1State2$buttonPressDecoder),
														A2($elm$html$Html$Events$on, 'mouseup', $author$project$L03G1State2$buttonUpDecoder),
														$author$project$L03G1State2$onKeyDown(
														$author$project$L03G1State2$KeyboardStateChanging(1)),
														$author$project$L03G1State2$onKeyUp(
														$author$project$L03G1State2$KeyboardStateChanging(0)),
														A2($elm$html$Html$Attributes$style, 'width', '50px'),
														A2($elm$html$Html$Attributes$style, 'height', '20px'),
														A2($elm$html$Html$Attributes$style, 'background-color', 'transparent'),
														A2($elm$html$Html$Attributes$style, 'border', '0'),
														A2($elm$html$Html$Attributes$style, 'outline', 'none')
													]),
												_List_Nil)
											]))
									]))))))
			]));
};
var $author$project$L03G1MatrixModel2$pointsToMatrix = function (pointList) {
	var matrix = A2(
		$elm$core$List$map,
		function (_v0) {
			var x = _v0.a;
			var y = _v0.b;
			return _List_fromArray(
				[
					$author$project$L03G1MatrixModel2$Coef(x),
					$author$project$L03G1MatrixModel2$Coef(y)
				]);
		},
		pointList);
	return A3(
		$author$project$L03G1MatrixModel2$matrixTranspose,
		$author$project$L03G1MatrixModel2$getMatrixRowCount(matrix),
		$author$project$L03G1MatrixModel2$getMatrixColCount(matrix),
		matrix);
};
var $author$project$L03G1State2$roundCoor = F2(
	function (d, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return '(' + (A2($myrho$elm_round$Round$round, d, x) + (',' + (A2($myrho$elm_round$Round$round, d, y) + ')')));
	});
var $author$project$L03G1State2$ChangeSetting = F2(
	function (a, b) {
		return {$: 'ChangeSetting', a: a, b: b};
	});
var $author$project$L03G1State2$settingChangeArrow = F3(
	function (key, btnScaleDict, settingsDict) {
		return $MacCASOutreach$graphicsvg$GraphicSVG$group(
			_List_fromArray(
				[
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
					A2(
						$author$project$L03G1State2$ChangeSetting,
						key,
						A2($author$project$L03G1State2$getFromDict, key, settingsDict)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
						$author$project$L03G1State2$CancelScale,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
							A2($author$project$L03G1State2$ScaleBtn, key + 't1', 1.2),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-32, 39),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$scale,
									0.3 * A2($author$project$L03G1State2$getFromDict, key + 't1', btnScaleDict),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										$MacCASOutreach$graphicsvg$GraphicSVG$black,
										$MacCASOutreach$graphicsvg$GraphicSVG$triangle(10))))))),
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
					A2(
						$author$project$L03G1State2$ChangeSetting,
						key,
						A2($author$project$L03G1State2$getFromDict, key, settingsDict)),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
						$author$project$L03G1State2$CancelScale,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
							A2($author$project$L03G1State2$ScaleBtn, key + 't2', 1.2),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(-60, 39),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$rotate,
									$elm$core$Basics$degrees(60),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$scale,
										0.3 * A2($author$project$L03G1State2$getFromDict, key + 't2', btnScaleDict),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$filled,
											$MacCASOutreach$graphicsvg$GraphicSVG$black,
											$MacCASOutreach$graphicsvg$GraphicSVG$triangle(10))))))))
				]));
	});
var $author$project$L03G1State2$shapeVertex = F3(
	function (coor, r, rscale) {
		return A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
			$author$project$L03G1State2$CancelScale,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
				$author$project$L03G1State2$ShowingCoordinate(coor),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
					A2(
						$author$project$L03G1State2$ScaleBtn,
						$elm$core$Debug$toString(coor),
						1.75),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						coor,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$scale,
							rscale,
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$filled,
								A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 94, 92, 230),
								$MacCASOutreach$graphicsvg$GraphicSVG$circle(r)))))));
	});
var $author$project$L03G1State2$Reverse = function (a) {
	return {$: 'Reverse', a: a};
};
var $author$project$L03G1State2$textTF = function (model) {
	return $MacCASOutreach$graphicsvg$GraphicSVG$group(
		_List_fromArray(
			[
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-42, 36.5 - (2 * 20)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$size,
							5,
							$MacCASOutreach$graphicsvg$GraphicSVG$text(
								$elm$core$Debug$toString(model.reflecto)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-82, 36.5 - (3 * 20)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$size,
							5,
							$MacCASOutreach$graphicsvg$GraphicSVG$text(
								$elm$core$Debug$toString(model.reflectX)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-42, 36.5 - (3 * 20)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$size,
							5,
							$MacCASOutreach$graphicsvg$GraphicSVG$text(
								$elm$core$Debug$toString(model.reflectY)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-82, 36.5 - (4 * 20)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$size,
							5,
							$MacCASOutreach$graphicsvg$GraphicSVG$text(
								$elm$core$Debug$toString(model.reflectyx)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-42, 36.5 - (4 * 20)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$size,
							5,
							$MacCASOutreach$graphicsvg$GraphicSVG$text(
								$elm$core$Debug$toString(model.reflectynx)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
				$author$project$L03G1State2$UpdateTransMatrix,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
					$author$project$L03G1State2$Reverse(5),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(-36, ((-1) * (0 * 20)) - 2),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
							A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 3))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
				$author$project$L03G1State2$UpdateTransMatrix,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
					$author$project$L03G1State2$Reverse(6),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(-76, ((-1) * (1 * 20)) - 2),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
							A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 3))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
				$author$project$L03G1State2$UpdateTransMatrix,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
					$author$project$L03G1State2$Reverse(7),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(-36, ((-1) * (1 * 20)) - 2),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
							A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 3))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
				$author$project$L03G1State2$UpdateTransMatrix,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
					$author$project$L03G1State2$Reverse(8),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(-76, ((-1) * (2 * 20)) - 2),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
							A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 3))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
				$author$project$L03G1State2$UpdateTransMatrix,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
					$author$project$L03G1State2$Reverse(9),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(-36, ((-1) * (2 * 20)) - 2),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
							A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 14, 8, 3)))))
			]));
};
var $author$project$L03G1State2$toViewCoor = F4(
	function (scale, _v0, dx, dy) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(((((15 * x) / scale) / 2) + 45) + dx, (((15 * y) / scale) / 2) + dy);
	});
var $author$project$L03G1State2$myShapes = function (model) {
	return _List_fromArray(
		[
			function () {
			var _v0 = model.state;
			if (_v0.$ === 'TransState') {
				return $MacCASOutreach$graphicsvg$GraphicSVG$group(
					_List_fromArray(
						[
							$author$project$L03G1State2$matrices(model),
							$MacCASOutreach$graphicsvg$GraphicSVG$group(
							$author$project$L03G1TransPanel$myShapes(model)),
							$author$project$L03G1State2$numbers(model),
							$author$project$L03G1State2$textTF(model),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(-96, 50),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
								$author$project$L03G1State2$ToSetting,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
									$author$project$L03G1State2$CancelScale,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
										$author$project$L03G1State2$CancelScale,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
											A2($author$project$L03G1State2$ScaleBtn, 'gearScale', 1.2),
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$scale,
												A2($author$project$L03G1State2$getFromDict, 'gearScale', model.btnScaleDict),
												A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.4, $author$project$ICONS$gear))))))),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(-35, 50),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
								$author$project$L03G1State2$ResetMatraix,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
									$author$project$L03G1State2$CancelScale,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
										A2($author$project$L03G1State2$ScaleBtn, 'trashScale', 1.2),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$scale,
											A2($author$project$L03G1State2$getFromDict, 'trashScale', model.btnScaleDict),
											A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.4, $author$project$ICONS$trash))))))
						]));
			} else {
				return $MacCASOutreach$graphicsvg$GraphicSVG$group(
					_List_fromArray(
						[
							$MacCASOutreach$graphicsvg$GraphicSVG$group(
							$author$project$L03G1SettingPanel$myShapes(model)),
							A3($author$project$L03G1State2$settingChangeArrow, 'RotateMode', model.btnScaleDict, model.settingsDict),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(-56.5, 37),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$scale,
								0.5,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$filled,
									$MacCASOutreach$graphicsvg$GraphicSVG$black,
									$MacCASOutreach$graphicsvg$GraphicSVG$bold(
										$MacCASOutreach$graphicsvg$GraphicSVG$text(
											(A2($author$project$L03G1State2$getFromDict, 'RotateMode', model.settingsDict) === 1.0) ? 'Degrees' : 'Radians'))))),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(0, -13),
							A3($author$project$L03G1State2$settingChangeArrow, 'SPSWE', model.btnScaleDict, model.settingsDict)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(-56.5, 24),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$scale,
								0.5,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$filled,
									$MacCASOutreach$graphicsvg$GraphicSVG$black,
									$MacCASOutreach$graphicsvg$GraphicSVG$bold(
										$MacCASOutreach$graphicsvg$GraphicSVG$text(
											(A2($author$project$L03G1State2$getFromDict, 'SPSWE', model.settingsDict) === 1.0) ? 'Yes' : 'No'))))),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(-35, -54),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$scale,
								A2($author$project$L03G1State2$getFromDict, 'checkScale', model.btnScaleDict),
								A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.4, $author$project$ICONS$check))),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
							$author$project$L03G1State2$UpdateTransMatrix,
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
								$author$project$L03G1State2$CancelScale,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
									$author$project$L03G1State2$CancelScale,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
										A2($author$project$L03G1State2$ScaleBtn, 'checkScale', 1.2),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
											$author$project$L03G1State2$ConfirmChangeS,
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$move,
												_Utils_Tuple2(-33, -53),
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$filled,
													A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
													A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 10, 8)))))))),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(-96, -55),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$scale,
								A2($author$project$L03G1State2$getFromDict, 'xmarkScale', model.btnScaleDict),
								A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.3, $author$project$ICONS$xmark))),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
							$author$project$L03G1State2$UpdateTransMatrix,
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
								$author$project$L03G1State2$CancelScale,
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
									$author$project$L03G1State2$CancelScale,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
										A2($author$project$L03G1State2$ScaleBtn, 'xmarkScale', 1.2),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
											$author$project$L03G1State2$DiscardChangeS,
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$move,
												_Utils_Tuple2(-95, -54),
												A2(
													$MacCASOutreach$graphicsvg$GraphicSVG$filled,
													A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
													A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 8, 8))))))))
						]));
			}
		}(),
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			$author$project$L03G1Border$myShapes(model)),
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			A4($author$project$L03G1GridPanel2$myShapes, model, model.gridDX, model.gridDY, model.scaleGrid)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
			$author$project$L03G1State2$GPMsg($author$project$L03G1State2$GridReleasing),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseUp,
				$author$project$L03G1State2$GPMsg($author$project$L03G1State2$GridReleasing),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
					function (x) {
						return $author$project$L03G1State2$GPMsg(
							$author$project$L03G1State2$GridDragging(x));
					},
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseDownAt,
						function (x) {
							return $author$project$L03G1State2$GPMsg(
								$author$project$L03G1State2$GridDraggedAt(x));
						},
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
							$author$project$L03G1State2$ShowingCoordinate,
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(45, 0),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$filled,
									A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
									A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)))))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(105, -69),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				$MacCASOutreach$graphicsvg$GraphicSVG$alignRight(
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						6,
						$MacCASOutreach$graphicsvg$GraphicSVG$text(
							A2(
								$author$project$L03G1State2$roundCoor,
								4,
								_Utils_Tuple2(model.x, model.y))))))),
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			A2(
				$elm$core$List$map,
				function (_v1) {
					var point = _v1.a;
					var color = _v1.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$clip,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(45, 0),
							$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
								A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
						A3(
							$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
							$MacCASOutreach$graphicsvg$GraphicSVG$solid(1),
							$author$project$L03G1State2$getColor(color),
							$MacCASOutreach$graphicsvg$GraphicSVG$openPolygon(
								A2(
									$elm$core$List$map,
									function (x) {
										return A4($author$project$L03G1State2$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
									},
									point))));
				},
				A2(
					$elm$core$List$map,
					function (x) {
						return _Utils_Tuple2(x.points, x.shapeColor);
					},
					model.shapeList))),
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			A2(
				$elm$core$List$map,
				function (_v2) {
					var point = _v2.a;
					var color = _v2.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$clip,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(45, 0),
							$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
								A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
						A3(
							$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
							$MacCASOutreach$graphicsvg$GraphicSVG$solid(1),
							$author$project$L03G1State2$getColor(color),
							$MacCASOutreach$graphicsvg$GraphicSVG$openPolygon(
								A2(
									$elm$core$List$map,
									function (x) {
										return A4($author$project$L03G1State2$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
									},
									$author$project$L03G1MatrixModel2$matrixToPoints(
										A2(
											$author$project$L03G1MatrixModel2$applyMutipleTrans,
											model.transList,
											$author$project$L03G1MatrixModel2$pointsToMatrix(point)))))));
				},
				A2(
					$elm$core$List$map,
					function (x) {
						return _Utils_Tuple2(x.points, x.outputColor);
					},
					model.shapeList))),
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var point = _v3.a;
					var color = _v3.b;
					return $MacCASOutreach$graphicsvg$GraphicSVG$group(
						A2(
							$elm$core$List$map,
							function (pos) {
								return A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$clip,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$move,
										_Utils_Tuple2(45, 0),
										$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
											A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
									A3(
										$author$project$L03G1State2$shapeVertex,
										pos,
										1,
										A2(
											$author$project$L03G1State2$getFromDict,
											$elm$core$Debug$toString(pos),
											model.btnScaleDict)));
							},
							A2(
								$elm$core$List$map,
								function (x) {
									return A4($author$project$L03G1State2$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
								},
								$author$project$L03G1MatrixModel2$matrixToPoints(
									A2(
										$author$project$L03G1MatrixModel2$applyMutipleTrans,
										model.transList,
										$author$project$L03G1MatrixModel2$pointsToMatrix(point))))));
				},
				A2(
					$elm$core$List$map,
					function (x) {
						return _Utils_Tuple2(x.points, x.outputColor);
					},
					model.shapeList))),
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			A2(
				$elm$core$List$map,
				function (point) {
					return $MacCASOutreach$graphicsvg$GraphicSVG$group(
						A2(
							$elm$core$List$map,
							function (pos) {
								return A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$clip,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$move,
										_Utils_Tuple2(45, 0),
										$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
											A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
									A3(
										$author$project$L03G1State2$shapeVertex,
										pos,
										1,
										A2(
											$author$project$L03G1State2$getFromDict,
											$elm$core$Debug$toString(pos),
											model.btnScaleDict)));
							},
							A2(
								$elm$core$List$map,
								function (x) {
									return A4($author$project$L03G1State2$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
								},
								point)));
				},
				A2(
					$elm$core$List$map,
					function ($) {
						return $.points;
					},
					model.shapeList))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent,
			_Utils_eq(model.scaleGrid, 1 / 32) ? 0 : 1,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(96, 50),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					A2($author$project$L03G1State2$getFromDict, 'zoomInScale', model.btnScaleDict),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.3, $author$project$ICONS$zoomIn)))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$L03G1State2$GPMsg(
				$author$project$L03G1State2$GridScale(model.scaleGrid * 0.5)),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				$author$project$L03G1State2$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
					A2($author$project$L03G1State2$ScaleBtn, 'zoomInScale', 1.2),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(97, 49),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
							A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 8, 8)))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent,
			(model.scaleGrid === 32) ? 0 : 1,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(96, 40),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					A2($author$project$L03G1State2$getFromDict, 'zoomOutScale', model.btnScaleDict),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.3, $author$project$ICONS$zoomOut)))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$L03G1State2$GPMsg(
				$author$project$L03G1State2$GridScale(model.scaleGrid * 2)),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				$author$project$L03G1State2$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
					A2($author$project$L03G1State2$ScaleBtn, 'zoomOutScale', 1.2),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(97, 39),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
							A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 8, 8)))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(97, 28),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$scale,
				A2($author$project$L03G1State2$getFromDict, 'homeScale', model.btnScaleDict),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.35, $author$project$ICONS$home))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$L03G1State2$GPMsg($author$project$L03G1State2$ClearGridDelta),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				$author$project$L03G1State2$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
					A2($author$project$L03G1State2$ScaleBtn, 'homeScale', 1.2),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(97, 29),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 1, 1, 11, 0),
							A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 8, 8)))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(105, -69),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				$MacCASOutreach$graphicsvg$GraphicSVG$alignRight(
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						6,
						$MacCASOutreach$graphicsvg$GraphicSVG$text(
							A2(
								$author$project$L03G1State2$roundCoor,
								4,
								_Utils_Tuple2(model.x, model.y)))))))
		]);
};
var $author$project$L03G1State3$BackwardPage = {$: 'BackwardPage'};
var $author$project$L03G1State3$CancelScale = {$: 'CancelScale'};
var $author$project$L03G1State3$ClearGridDelta = {$: 'ClearGridDelta'};
var $author$project$L03G1State3$ForwardPage = {$: 'ForwardPage'};
var $author$project$L03G1State3$GPMsg = function (a) {
	return {$: 'GPMsg', a: a};
};
var $author$project$L03G1State3$GridDraggedAt = function (a) {
	return {$: 'GridDraggedAt', a: a};
};
var $author$project$L03G1State3$GridDragging = function (a) {
	return {$: 'GridDragging', a: a};
};
var $author$project$L03G1State3$GridReleasing = {$: 'GridReleasing'};
var $author$project$L03G1State3$GridScale = function (a) {
	return {$: 'GridScale', a: a};
};
var $author$project$L03G1State3$ScaleBtn = F2(
	function (a, b) {
		return {$: 'ScaleBtn', a: a, b: b};
	});
var $author$project$L03G1State3$ShowingCoordinate = function (a) {
	return {$: 'ShowingCoordinate', a: a};
};
var $author$project$L03G1State3$getColor = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	return A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, r, g, b);
};
var $author$project$L03G1State3$getFromDict = F2(
	function (key, dict) {
		return A2(
			$elm$core$Maybe$withDefault,
			1.0,
			A2($elm$core$Dict$get, key, dict));
	});
var $author$project$L03G1MatrixModel2$evalMatrixSvg = function (matrix) {
	return $author$project$L03G1MatrixModel2$latex2Svg(
		$author$project$L03G1MatrixModel2$matrixToLatex(matrix));
};
var $myrho$elm_round$Round$funNum = F3(
	function (fun, s, fl) {
		return A2(
			$elm$core$Maybe$withDefault,
			0 / 0,
			$elm$core$String$toFloat(
				A2(fun, s, fl)));
	});
var $myrho$elm_round$Round$roundNum = $myrho$elm_round$Round$funNum($myrho$elm_round$Round$round);
var $author$project$L03G1MatrixModel2$roundMatrix = F2(
	function (num, matrix) {
		return A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$elm$core$List$map,
					function (y) {
						return $author$project$L03G1MatrixModel2$Coef(
							A2(
								$myrho$elm_round$Round$roundNum,
								num,
								$author$project$L03G1MatrixModel2$eval(y)));
					},
					x);
			},
			matrix);
	});
var $author$project$L03G1State3$matrices = function (model) {
	return $MacCASOutreach$graphicsvg$GraphicSVG$group(
		_List_fromArray(
			[
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-120) + 37, 48),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.6,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 0, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-90) + 37, 48),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.6,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 1, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-120) + 37, 48 - (1 * 13)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.6,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 2, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-90) + 37, 48 - (1 * 13)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.6,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 3, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-120) + 37, 48 - (2 * 13)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.6,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 4, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-120) + 37, 48 - (3 * 13)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.6,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 9, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-90) + 37, 48 - (3 * 13)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.6,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 5, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-120) + 37, 48 - (4 * 13)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.6,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 6, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-90) + 37, 48 - (4 * 13)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.6,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 7, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-120) + 37, 48 - (5 * 13)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.6,
					$author$project$L03G1MatrixModel2$simMatrixSvg(
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$L03G1MatrixModel2$identityMatrix,
							$elm$core$List$head(
								A2($elm$core$List$drop, 8, model.displayMatricesList)))))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-135) + 46, 50 - (1 * 13)),
				$author$project$L03G1MatrixModel2$latex2Svg(' \\times ')),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-135) + 46, 50 - (2 * 13)),
				$author$project$L03G1MatrixModel2$latex2Svg(' \\times ')),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-135) + 46, 50 - (3 * 13)),
				$author$project$L03G1MatrixModel2$latex2Svg(' \\times ')),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-135) + 46, 50 - (4 * 13)),
				$author$project$L03G1MatrixModel2$latex2Svg(' \\times ')),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-107) + 49, 50 - (0 * 13)),
				$author$project$L03G1MatrixModel2$latex2Svg(' \\times ')),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-107) + 49, 50 - (1 * 13)),
				$author$project$L03G1MatrixModel2$latex2Svg(' \\times ')),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-135) + 46, 50 - (5 * 13)),
				$author$project$L03G1MatrixModel2$latex2Svg(' \\times ')),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-107) + 49, 50 - (4 * 13)),
				$author$project$L03G1MatrixModel2$latex2Svg(' \\times ')),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-107) + 49, 50 - (3 * 13)),
				$author$project$L03G1MatrixModel2$latex2Svg(' \\times ')),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-100, 50 - (6.2 * 13)),
				$author$project$L03G1MatrixModel2$latex2Svg(' \\ A = ')),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-120) + 37, 48 - (6.2 * 13)),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					0.6,
					$author$project$L03G1MatrixModel2$evalMatrixSvg(
						A2(
							$author$project$L03G1MatrixModel2$roundMatrix,
							2,
							$author$project$L03G1MatrixModel2$pointsToMatrix(
								$author$project$L03G1MatrixModel2$matrixToPoints(
									A2($author$project$L03G1MatrixModel2$applyMutipleTrans, model.displayMatricesList, $author$project$L03G1MatrixModel2$identityMatrix)))))))
			]));
};
var $author$project$L03ResultPanel$myShapes = F2(
	function (model, page) {
		return _List_fromArray(
			[
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-105, 60),
				A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$html,
					90,
					130,
					A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'box-shadow', 'rgb(0 0 0 / 25%) 2px 2px 5px 0px'),
								A2($elm$html$Html$Attributes$style, 'width', '80px'),
								A2($elm$html$Html$Attributes$style, 'height', '120px'),
								A2($elm$html$Html$Attributes$style, 'border-radius', '3px')
							]),
						_List_Nil))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-65, 0),
				A3(
					$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
					$MacCASOutreach$graphicsvg$GraphicSVG$solid(0.5),
					$MacCASOutreach$graphicsvg$GraphicSVG$gray,
					A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 80, 120, 3))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-65, 49),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						7,
						$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
							$MacCASOutreach$graphicsvg$GraphicSVG$centered(
								$MacCASOutreach$graphicsvg$GraphicSVG$text('Calculation')))))),
				function () {
				switch (page) {
					case 1:
						return $MacCASOutreach$graphicsvg$GraphicSVG$group(
							_List_fromArray(
								[
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(-100.5, 40),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										$MacCASOutreach$graphicsvg$GraphicSVG$black,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$size,
											5,
											$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
												$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
													$MacCASOutreach$graphicsvg$GraphicSVG$text('We know the formula of matrix')))))),
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(-100.5, 35),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										$MacCASOutreach$graphicsvg$GraphicSVG$black,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$size,
											5,
											$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
												$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
													$MacCASOutreach$graphicsvg$GraphicSVG$text('transformation is')))))),
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2((-140) + 63, 38),
									$author$project$L03G1MatrixModel2$latex2Svg('T(x)=Ax')),
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(-100.5, 20),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										$MacCASOutreach$graphicsvg$GraphicSVG$black,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$size,
											5,
											$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
												$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
													$MacCASOutreach$graphicsvg$GraphicSVG$text('Ax is the mutiple of two matrix')))))),
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2((-140) + 43, 20),
									$author$project$L03G1MatrixModel2$latex2Svg('\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}\\begin{bmatrix}e&f\\\\g&h\\end{bmatrix} =')),
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2((-140) + 43, 3),
									$author$project$L03G1MatrixModel2$latex2Svg('\\small\\begin{bmatrix}a*e+b*g & a*f+b*h\\\\c*e+d*g & c*f+d*h\\end{bmatrix}')),
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(-100.5, -25),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										$MacCASOutreach$graphicsvg$GraphicSVG$black,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$size,
											5,
											$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
												$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
													$MacCASOutreach$graphicsvg$GraphicSVG$text('Now let calculate all the ')))))),
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(-100.5, -30),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$filled,
										$MacCASOutreach$graphicsvg$GraphicSVG$black,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$size,
											5,
											$MacCASOutreach$graphicsvg$GraphicSVG$sansserif(
												$MacCASOutreach$graphicsvg$GraphicSVG$alignLeft(
													$MacCASOutreach$graphicsvg$GraphicSVG$text('transformation matrices we have '))))))
								]));
					case 2:
						return $MacCASOutreach$graphicsvg$GraphicSVG$group(
							_List_fromArray(
								[
									A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(-100, 50),
									$author$project$L03G1MatrixModel2$latex2Svg('A = '))
								]));
					default:
						return $MacCASOutreach$graphicsvg$GraphicSVG$group(_List_Nil);
				}
			}()
			]);
	});
var $author$project$L03G1State3$page3 = function (model) {
	return $MacCASOutreach$graphicsvg$GraphicSVG$group(
		_List_fromArray(
			[
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-100, 40),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						5,
						$MacCASOutreach$graphicsvg$GraphicSVG$text('The matrix use to desrible the ')))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-100, 35),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						5,
						$MacCASOutreach$graphicsvg$GraphicSVG$text('shape will be ')))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-145) + 50, 37 - 5),
				$author$project$L03G1MatrixModel2$latex2Svg('\r\n            s=\\left[ \\begin{matrix}\r\n                        x_1 &		x_2 & \\dots &x_n\\\\\r\n                        y_1 &		y_2 & \\dots &y_n\\\\\r\n                    \\end{matrix} \\right] \r\n            \r\n            ')),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-100, 13 - 10),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						5,
						$MacCASOutreach$graphicsvg$GraphicSVG$text('Where n is the number of vertexes')))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-100, 8 - 10),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						5,
						$MacCASOutreach$graphicsvg$GraphicSVG$text('x, y are the coordinate of the ')))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-100, 3 - 10),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						5,
						$MacCASOutreach$graphicsvg$GraphicSVG$text('vertexes.  ')))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2((-140) + 57, 13 - 15),
				$author$project$L03G1MatrixModel2$latex2Svg('s_1,s_2,s_3,s_4,...')),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-100, (-2) - 10),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						5,
						$MacCASOutreach$graphicsvg$GraphicSVG$text('We use ')))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-45, (-2) - 10),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						5,
						$MacCASOutreach$graphicsvg$GraphicSVG$text('to ')))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-100, (-2) - 15),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						5,
						$MacCASOutreach$graphicsvg$GraphicSVG$text('repersent the different shapes')))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-100, -29),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						5,
						$MacCASOutreach$graphicsvg$GraphicSVG$text('Now Let us do the linear ')))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-100, -34),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						5,
						$MacCASOutreach$graphicsvg$GraphicSVG$text('transformation for each shape '))))
			]));
};
var $MacCASOutreach$graphicsvg$GraphicSVG$addHyperlink = F2(
	function (link, shape) {
		return A2($MacCASOutreach$graphicsvg$GraphicSVG$Link, link, shape);
	});
var $author$project$L03G1MatrixModel2$calcMatrix = function (matrix) {
	return A2(
		$elm$core$List$map,
		function (x) {
			return A2(
				$elm$core$List$map,
				function (y) {
					return $author$project$L03G1MatrixModel2$Coef(
						$author$project$L03G1MatrixModel2$eval(y));
				},
				x);
		},
		matrix);
};
var $author$project$L03G1State3$page4 = function (model) {
	return $MacCASOutreach$graphicsvg$GraphicSVG$group(
		_List_fromArray(
			[
				function () {
				var xList = A2(
					$elm$core$List$map,
					function (_v1) {
						var i = _v1.a;
						var s = _v1.b;
						return _Utils_Tuple2(i, s.points);
					},
					A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, model.shapeList));
				return $MacCASOutreach$graphicsvg$GraphicSVG$group(
					A2(
						$elm$core$List$map,
						function (_v0) {
							var i = _v0.a;
							var p = _v0.b;
							var matrix = $author$project$L03G1MatrixModel2$calcMatrix(
								A2(
									$author$project$L03G1MatrixModel2$applyMutipleTrans,
									model.transList,
									$author$project$L03G1MatrixModel2$pointsToMatrix(p)));
							return $MacCASOutreach$graphicsvg$GraphicSVG$group(
								_List_fromArray(
									[
										A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$scale,
										0.8,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$move,
											_Utils_Tuple2(0, 0 - (i * 25)),
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$move,
												_Utils_Tuple2(-125, 60),
												$author$project$L03G1MatrixModel2$latex2Svg(
													'T(s_' + ($elm$core$String$fromInt(i + 1) + (')=As_' + ($elm$core$String$fromInt(i + 1) + '='))))))),
										A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$clip,
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$move,
											_Utils_Tuple2((-55) - 25, 35 - (i * 20)),
											$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
												A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 100, 20))),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$scale,
											0.8,
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$move,
												_Utils_Tuple2((-100) / 0.8, 51 - ((i * 20) / 0.8)),
												$author$project$L03G1MatrixModel2$evalMatrixSvg(
													A2($author$project$L03G1MatrixModel2$roundMatrix, 2, matrix))))),
										A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$addHyperlink,
										'http://latex.codecogs.com/svg.image?' + $author$project$L03G1MatrixModel2$matrixToLatex(
											A2($author$project$L03G1MatrixModel2$roundMatrix, 2, matrix)),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$move,
											_Utils_Tuple2(-65, 35 - (i * 20)),
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$filled,
												A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
												A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 70, 20))))
									]));
						},
						xList));
			}(),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-100, -38),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						4,
						$MacCASOutreach$graphicsvg$GraphicSVG$text('The matrix may not be displayed ')))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-100, -43),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						4,
						$MacCASOutreach$graphicsvg$GraphicSVG$text('completely, please click on it or ')))),
				A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(-100, -48),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$filled,
					$MacCASOutreach$graphicsvg$GraphicSVG$black,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						4,
						$MacCASOutreach$graphicsvg$GraphicSVG$text('check on the grid panel '))))
			]));
};
var $author$project$L03G1State3$roundCoor = F2(
	function (d, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return '(' + (A2($myrho$elm_round$Round$round, d, x) + (',' + (A2($myrho$elm_round$Round$round, d, y) + ')')));
	});
var $author$project$L03G1State3$shapeVertex = F3(
	function (coor, r, rscale) {
		return A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
			$author$project$L03G1State3$CancelScale,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
				$author$project$L03G1State3$ShowingCoordinate(coor),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
					A2(
						$author$project$L03G1State3$ScaleBtn,
						$elm$core$Debug$toString(coor),
						1.75),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						coor,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$scale,
							rscale,
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$filled,
								A3($MacCASOutreach$graphicsvg$GraphicSVG$rgb, 94, 92, 230),
								$MacCASOutreach$graphicsvg$GraphicSVG$circle(r)))))));
	});
var $author$project$L03G1State3$toViewCoor = F4(
	function (scale, _v0, dx, dy) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(((((15 * x) / scale) / 2) + 45) + dx, (((15 * y) / scale) / 2) + dy);
	});
var $author$project$L03G1State3$myShapes = function (model) {
	return _List_fromArray(
		[
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			A2($author$project$L03ResultPanel$myShapes, model, model.page)),
			function () {
			var _v0 = model.page;
			switch (_v0) {
				case 2:
					return $author$project$L03G1State3$matrices(model);
				case 3:
					return $author$project$L03G1State3$page3(model);
				case 4:
					return $author$project$L03G1State3$page4(model);
				default:
					return $MacCASOutreach$graphicsvg$GraphicSVG$group(_List_Nil);
			}
		}(),
			(model.page < 4) ? $MacCASOutreach$graphicsvg$GraphicSVG$group(
			_List_fromArray(
				[
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
					$author$project$L03G1State3$ForwardPage,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
						$author$project$L03G1State3$CancelScale,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
							$author$project$L03G1State3$CancelScale,
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
								A2($author$project$L03G1State3$ScaleBtn, 'rArrowScale', 1.2),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(-34, -52),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$scale,
										0.4 * A2($author$project$L03G1State3$getFromDict, 'rArrowScale', model.btnScaleDict),
										A2(
											$MacCASOutreach$graphicsvg$GraphicSVG$filled,
											$MacCASOutreach$graphicsvg$GraphicSVG$black,
											$MacCASOutreach$graphicsvg$GraphicSVG$triangle(10))))))))
				])) : $MacCASOutreach$graphicsvg$GraphicSVG$group(_List_Nil),
			(model.page > 1) ? $MacCASOutreach$graphicsvg$GraphicSVG$group(
			_List_fromArray(
				[
					A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
					$author$project$L03G1State3$BackwardPage,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
						$author$project$L03G1State3$CancelScale,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
							$author$project$L03G1State3$CancelScale,
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
								A2($author$project$L03G1State3$ScaleBtn, 'lArrowScale', 1.2),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$move,
									_Utils_Tuple2(-95, -52),
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$scale,
										0.4 * A2($author$project$L03G1State3$getFromDict, 'lArrowScale', model.btnScaleDict),
										$MacCASOutreach$graphicsvg$GraphicSVG$mirrorX(
											A2(
												$MacCASOutreach$graphicsvg$GraphicSVG$filled,
												$MacCASOutreach$graphicsvg$GraphicSVG$black,
												$MacCASOutreach$graphicsvg$GraphicSVG$triangle(10)))))))))
				])) : $MacCASOutreach$graphicsvg$GraphicSVG$group(_List_Nil),
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			$author$project$L03G1Border$myShapes(model)),
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			A4($author$project$L03G1GridPanel2$myShapes, model, model.gridDX, model.gridDY, model.scaleGrid)),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
			$author$project$L03G1State3$GPMsg($author$project$L03G1State3$GridReleasing),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseUp,
				$author$project$L03G1State3$GPMsg($author$project$L03G1State3$GridReleasing),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
					function (x) {
						return $author$project$L03G1State3$GPMsg(
							$author$project$L03G1State3$GridDragging(x));
					},
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseDownAt,
						function (x) {
							return $author$project$L03G1State3$GPMsg(
								$author$project$L03G1State3$GridDraggedAt(x));
						},
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$notifyMouseMoveAt,
							$author$project$L03G1State3$ShowingCoordinate,
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$move,
								_Utils_Tuple2(45, 0),
								A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$filled,
									A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
									A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 120, 120, 3)))))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(105, -69),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				$MacCASOutreach$graphicsvg$GraphicSVG$alignRight(
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						6,
						$MacCASOutreach$graphicsvg$GraphicSVG$text(
							A2(
								$author$project$L03G1State3$roundCoor,
								4,
								_Utils_Tuple2(model.x, model.y))))))),
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			A2(
				$elm$core$List$map,
				function (_v1) {
					var point = _v1.a;
					var color = _v1.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$clip,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(45, 0),
							$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
								A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
						A3(
							$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
							$MacCASOutreach$graphicsvg$GraphicSVG$solid(1),
							$author$project$L03G1State3$getColor(color),
							$MacCASOutreach$graphicsvg$GraphicSVG$openPolygon(
								A2(
									$elm$core$List$map,
									function (x) {
										return A4($author$project$L03G1State3$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
									},
									point))));
				},
				A2(
					$elm$core$List$map,
					function (x) {
						return _Utils_Tuple2(x.points, x.shapeColor);
					},
					model.shapeList))),
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			A2(
				$elm$core$List$map,
				function (_v2) {
					var point = _v2.a;
					var color = _v2.b;
					return A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$clip,
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(45, 0),
							$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
								A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
						A3(
							$MacCASOutreach$graphicsvg$GraphicSVG$outlined,
							$MacCASOutreach$graphicsvg$GraphicSVG$solid(1),
							$author$project$L03G1State3$getColor(color),
							$MacCASOutreach$graphicsvg$GraphicSVG$openPolygon(
								A2(
									$elm$core$List$map,
									function (x) {
										return A4($author$project$L03G1State3$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
									},
									$author$project$L03G1MatrixModel2$matrixToPoints(
										A2(
											$author$project$L03G1MatrixModel2$applyMutipleTrans,
											model.transList,
											$author$project$L03G1MatrixModel2$pointsToMatrix(point)))))));
				},
				A2(
					$elm$core$List$map,
					function (x) {
						return _Utils_Tuple2(x.points, x.outputColor);
					},
					model.shapeList))),
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var point = _v3.a;
					var color = _v3.b;
					return $MacCASOutreach$graphicsvg$GraphicSVG$group(
						A2(
							$elm$core$List$map,
							function (pos) {
								return A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$clip,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$move,
										_Utils_Tuple2(45, 0),
										$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
											A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
									A3(
										$author$project$L03G1State3$shapeVertex,
										pos,
										1,
										A2(
											$author$project$L03G1State3$getFromDict,
											$elm$core$Debug$toString(pos),
											model.btnScaleDict)));
							},
							A2(
								$elm$core$List$map,
								function (x) {
									return A4($author$project$L03G1State3$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
								},
								$author$project$L03G1MatrixModel2$matrixToPoints(
									A2(
										$author$project$L03G1MatrixModel2$applyMutipleTrans,
										model.transList,
										$author$project$L03G1MatrixModel2$pointsToMatrix(point))))));
				},
				A2(
					$elm$core$List$map,
					function (x) {
						return _Utils_Tuple2(x.points, x.outputColor);
					},
					model.shapeList))),
			$MacCASOutreach$graphicsvg$GraphicSVG$group(
			A2(
				$elm$core$List$map,
				function (point) {
					return $MacCASOutreach$graphicsvg$GraphicSVG$group(
						A2(
							$elm$core$List$map,
							function (pos) {
								return A2(
									$MacCASOutreach$graphicsvg$GraphicSVG$clip,
									A2(
										$MacCASOutreach$graphicsvg$GraphicSVG$move,
										_Utils_Tuple2(45, 0),
										$MacCASOutreach$graphicsvg$GraphicSVG$ghost(
											A3($MacCASOutreach$graphicsvg$GraphicSVG$roundedRect, 119.5, 119.5, 3))),
									A3(
										$author$project$L03G1State3$shapeVertex,
										pos,
										1,
										A2(
											$author$project$L03G1State3$getFromDict,
											$elm$core$Debug$toString(pos),
											model.btnScaleDict)));
							},
							A2(
								$elm$core$List$map,
								function (x) {
									return A4($author$project$L03G1State3$toViewCoor, model.scaleGrid, x, model.gridDX, model.gridDY);
								},
								point)));
				},
				A2(
					$elm$core$List$map,
					function ($) {
						return $.points;
					},
					model.shapeList))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent,
			_Utils_eq(model.scaleGrid, 1 / 32) ? 0 : 1,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(96, 50),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					A2($author$project$L03G1State3$getFromDict, 'zoomInScale', model.btnScaleDict),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.3, $author$project$ICONS$zoomIn)))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$L03G1State3$GPMsg(
				$author$project$L03G1State3$GridScale(model.scaleGrid * 0.5)),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				$author$project$L03G1State3$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
					A2($author$project$L03G1State3$ScaleBtn, 'zoomInScale', 1.2),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(97, 49),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
							A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 8, 8)))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$makeTransparent,
			(model.scaleGrid === 32) ? 0 : 1,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$move,
				_Utils_Tuple2(96, 40),
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$scale,
					A2($author$project$L03G1State3$getFromDict, 'zoomOutScale', model.btnScaleDict),
					A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.3, $author$project$ICONS$zoomOut)))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$L03G1State3$GPMsg(
				$author$project$L03G1State3$GridScale(model.scaleGrid * 2)),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				$author$project$L03G1State3$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
					A2($author$project$L03G1State3$ScaleBtn, 'zoomOutScale', 1.2),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(97, 39),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
							A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 8, 8)))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(97, 28),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$scale,
				A2($author$project$L03G1State3$getFromDict, 'homeScale', model.btnScaleDict),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.35, $author$project$ICONS$home))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$L03G1State3$GPMsg($author$project$L03G1State3$ClearGridDelta),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
				$author$project$L03G1State3$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
					A2($author$project$L03G1State3$ScaleBtn, 'homeScale', 1.2),
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$move,
						_Utils_Tuple2(97, 29),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$filled,
							A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 1, 1, 11, 0),
							A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 8, 8)))))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(105, -69),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				$MacCASOutreach$graphicsvg$GraphicSVG$alignRight(
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$size,
						6,
						$MacCASOutreach$graphicsvg$GraphicSVG$text(
							A2(
								$author$project$L03G1State3$roundCoor,
								4,
								_Utils_Tuple2(model.x, model.y)))))))
		]);
};
var $author$project$ICONS$rArrow = $MacCASOutreach$graphicsvg$GraphicSVG$group(
	_List_fromArray(
		[
			$MacCASOutreach$graphicsvg$GraphicSVG$mirrorY(
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$filled,
				$MacCASOutreach$graphicsvg$GraphicSVG$black,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$curve,
					_Utils_Tuple2(3.433349000000007, 3.9198279999999954),
					_List_fromArray(
						[
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.3498289999999997, 3.903638000000001),
							_Utils_Tuple2(3.266309000000007, 3.8874480000000062)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.133944000000014, 3.822225000000003),
							_Utils_Tuple2(3.0015790000000067, 3.757002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.869219000000001, 3.6917775000000006),
							_Utils_Tuple2(2.7368589999999955, 3.6265530000000012)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.625383999999997, 3.5073864999999955),
							_Utils_Tuple2(2.513908999999998, 3.388220000000004)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.4024339999999995, 3.269052000000002),
							_Utils_Tuple2(2.290959000000001, 3.149884)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.2431589999999915, 3.0488315000000057),
							_Utils_Tuple2(2.1953589999999963, 2.947778999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.147559000000001, 2.8467244999999934),
							_Utils_Tuple2(2.099759000000006, 2.745670000000004)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.0810089999999946, 2.6642259999999993),
							_Utils_Tuple2(2.0622589999999974, 2.5827819999999946)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.0434589999999986, 2.501338000000004),
							_Utils_Tuple2(2.0246589999999998, 2.4198939999999993)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.024174000000002, 2.298516500000005),
							_Utils_Tuple2(2.0236890000000045, 2.177138999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.0232090000000085, 2.0557614999999885),
							_Utils_Tuple2(2.0227289999999982, 1.9343839999999943)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.0511789999999905, 1.8251564999999914),
							_Utils_Tuple2(2.079628999999997, 1.7159290000000027)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.1080790000000036, 1.6067014999999998),
							_Utils_Tuple2(2.136528999999996, 1.4974739999999969)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.1859790000000032, 1.4032860000000085),
							_Utils_Tuple2(2.2354289999999963, 1.3090980000000059)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.2848789999999894, 1.214910500000002),
							_Utils_Tuple2(2.3343289999999968, 1.1207229999999981)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.8567045000000064, -0.40580599999999833),
							_Utils_Tuple2(5.379080000000002, -1.932335000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.901450000000011, -3.4588634999999996),
							_Utils_Tuple2(8.423820000000006, -4.985391999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.069379499999997, -4.985391999999997),
							_Utils_Tuple2(-0.2850609999999989, -4.985391999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-4.639505999999997, -4.985391999999997),
							_Utils_Tuple2(-8.993950999999996, -4.985391999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.114686000000006, -5.022682000000003),
							_Utils_Tuple2(-9.235421000000002, -5.059972000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.356155999999999, -5.097262000000001),
							_Utils_Tuple2(-9.476890999999995, -5.134551999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.589346000000006, -5.209645500000001),
							_Utils_Tuple2(-9.701801000000003, -5.284739000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.814256, -5.359833500000001),
							_Utils_Tuple2(-9.926710999999997, -5.434927999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.000475999999992, -5.527578500000004),
							_Utils_Tuple2(-10.074241, -5.620229000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.148010999999997, -5.7128795),
							_Utils_Tuple2(-10.221780999999993, -5.805529999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.259331000000003, -5.883527999999998),
							_Utils_Tuple2(-10.296880999999999, -5.961525999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.334430999999995, -6.039524499999999),
							_Utils_Tuple2(-10.371981000000005, -6.1175229999999985)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.400631000000004, -6.228139999999996),
							_Utils_Tuple2(-10.429281000000003, -6.338757000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.457931000000002, -6.449374500000005),
							_Utils_Tuple2(-10.486581000000001, -6.559992000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.486581000000001, -6.647976999999997),
							_Utils_Tuple2(-10.486581000000001, -6.735962000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.486581000000001, -6.823947000000004),
							_Utils_Tuple2(-10.486581000000001, -6.911932)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.466081000000003, -7.0102835),
							_Utils_Tuple2(-10.445581000000004, -7.108635)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.425081000000006, -7.206986499999999),
							_Utils_Tuple2(-10.404580999999993, -7.305337999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.347940999999992, -7.425975999999999),
							_Utils_Tuple2(-10.291301000000004, -7.546613999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.234661000000003, -7.667251),
							_Utils_Tuple2(-10.178021000000001, -7.787888000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-10.064515999999998, -7.899245500000006),
							_Utils_Tuple2(-9.951010999999994, -8.010603000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.83750599999999, -8.121960999999999),
							_Utils_Tuple2(-9.724001000000001, -8.233319000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.616281, -8.285623999999999),
							_Utils_Tuple2(-9.508561, -8.337929000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.400846000000001, -8.3902335),
							_Utils_Tuple2(-9.293131000000002, -8.442537999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-9.169271000000009, -8.468788000000004),
							_Utils_Tuple2(-9.045411000000001, -8.495038000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-8.921550999999994, -8.521287999999998),
							_Utils_Tuple2(-8.797691, -8.547538000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(-4.492010999999991, -8.547876000000002),
							_Utils_Tuple2(-0.18633099999999558, -8.548214000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.119344500000011, -8.548552),
							_Utils_Tuple2(8.425020000000004, -8.54889)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(6.900350000000003, -10.075417999999999),
							_Utils_Tuple2(5.375680000000003, -11.601945999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.8510095000000035, -13.128474499999996),
							_Utils_Tuple2(2.3263390000000044, -14.655003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.2715139999999963, -14.766361000000003),
							_Utils_Tuple2(2.2166890000000024, -14.877718999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.1618589999999926, -14.989076499999996),
							_Utils_Tuple2(2.107028999999997, -15.100434)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.0834289999999953, -15.200402499999996),
							_Utils_Tuple2(2.0598289999999935, -15.300370999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.0362289999999916, -15.40034),
							_Utils_Tuple2(2.012629000000004, -15.500309000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.0224290000000025, -15.650895000000006),
							_Utils_Tuple2(2.032229000000001, -15.801481000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.0420289999999994, -15.952067),
							_Utils_Tuple2(2.051828999999998, -16.102652999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.0913290000000018, -16.206943499999994),
							_Utils_Tuple2(2.1308290000000056, -16.311234)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.1703290000000095, -16.415524500000004),
							_Utils_Tuple2(2.209828999999999, -16.519815)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.285859000000002, -16.625991499999998),
							_Utils_Tuple2(2.361889000000005, -16.732168)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.4379240000000095, -16.838345000000004),
							_Utils_Tuple2(2.513959, -16.944522)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.623564000000002, -17.0252105),
							_Utils_Tuple2(2.7331690000000037, -17.105899)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(2.8427790000000073, -17.186588),
							_Utils_Tuple2(2.9523889999999966, -17.267277)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.0586389999999994, -17.307491999999996),
							_Utils_Tuple2(3.1648890000000023, -17.347707)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.271139000000005, -17.387922000000003),
							_Utils_Tuple2(3.3773889999999938, -17.428137)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.5266089999999934, -17.437852),
							_Utils_Tuple2(3.675828999999993, -17.447567)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.8250539999999944, -17.457282),
							_Utils_Tuple2(3.9742789999999957, -17.466997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.0744495, -17.445512),
							_Utils_Tuple2(4.174620000000004, -17.424027000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.274795000000012, -17.402541999999997),
							_Utils_Tuple2(4.374970000000005, -17.381057)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.496765000000011, -17.3226535),
							_Utils_Tuple2(4.618560000000002, -17.264249999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.74036000000001, -17.2058465),
							_Utils_Tuple2(4.862160000000003, -17.147443000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.132364999999993, -14.881804500000001),
							_Utils_Tuple2(9.402569999999997, -12.616166)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.672779999999989, -10.350529000000002),
							_Utils_Tuple2(13.942989999999995, -8.084892000000004)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(14.03452999999999, -7.964254500000003),
							_Utils_Tuple2(14.126069999999999, -7.843617000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(14.217614999999995, -7.722979500000001),
							_Utils_Tuple2(14.309160000000006, -7.602342)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(14.350610000000003, -7.500264000000001),
							_Utils_Tuple2(14.39206, -7.398186000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(14.433509999999998, -7.296108000000004),
							_Utils_Tuple2(14.474959999999996, -7.194029999999998)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(14.475285, -6.971314499999998),
							_Utils_Tuple2(14.475610000000003, -6.748598999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(14.475930000000005, -6.525883499999999),
							_Utils_Tuple2(14.476249999999993, -6.303167999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(14.412714999999992, -6.163971000000004),
							_Utils_Tuple2(14.349180000000004, -6.024774000000001)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(14.285645000000002, -5.885576999999998),
							_Utils_Tuple2(14.22211, -5.746380000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(11.894885000000002, -3.415698000000006),
							_Utils_Tuple2(9.567660000000004, -1.085016000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(7.240440000000007, 1.2456669999999974),
							_Utils_Tuple2(4.9132199999999955, 3.576350000000005)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.809214999999995, 3.6393825000000106),
							_Utils_Tuple2(4.705209999999994, 3.702415000000002)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.601204999999993, 3.7654474999999934),
							_Utils_Tuple2(4.4972000000000065, 3.828479999999999)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.375060000000005, 3.8603650000000016),
							_Utils_Tuple2(4.252920000000003, 3.892250000000004)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(4.130775, 3.924135000000007),
							_Utils_Tuple2(4.008629999999997, 3.956019999999995)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.906549499999997, 3.9550700000000063),
							_Utils_Tuple2(3.8044689999999974, 3.954120000000003)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.702393999999998, 3.95317),
							_Utils_Tuple2(3.600318999999999, 3.952219999999997)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.516798999999992, 3.936029999999988),
							_Utils_Tuple2(3.433278999999999, 3.9198399999999936)),
							A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$Pull,
							_Utils_Tuple2(3.4333139999999958, 3.9198339999999945),
							_Utils_Tuple2(3.433349000000007, 3.9198279999999954))
						]))))
		]));
var $author$project$ICONS$lArrow = $MacCASOutreach$graphicsvg$GraphicSVG$mirrorX($author$project$ICONS$rArrow);
var $author$project$FinalPrototype$toEditingShapeArrow = function (btnScaleDict) {
	return _List_fromArray(
		[
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-100, -67.5),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$scale,
				A2($author$project$FinalPrototype$getFromDict, 'tESA', btnScaleDict),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.4, $author$project$ICONS$lArrow))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$FinalPrototype$ToEditingShape,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
				$author$project$FinalPrototype$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
					$author$project$FinalPrototype$CancelScale,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
						A2($author$project$FinalPrototype$ScaleBtn, 'tESA', 1.2),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(-100, -65),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$filled,
								A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
								A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 12, 9)))))))
		]);
};
var $author$project$FinalPrototype$ToResultPage = {$: 'ToResultPage'};
var $author$project$FinalPrototype$toResultRArrow = function (btnScaleDict) {
	return _List_fromArray(
		[
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-30, -67.5),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$scale,
				A2($author$project$FinalPrototype$getFromDict, 'tRRA', btnScaleDict),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.4, $author$project$ICONS$rArrow))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$FinalPrototype$ToResultPage,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
				$author$project$FinalPrototype$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
					$author$project$FinalPrototype$CancelScale,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
						A2($author$project$FinalPrototype$ScaleBtn, 'tRRA', 1.2),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(-30, -65),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$filled,
								A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
								A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 12, 9)))))))
		]);
};
var $author$project$FinalPrototype$ToTransformShape = {$: 'ToTransformShape'};
var $author$project$FinalPrototype$toTransformShapeLArrow = function (btnScaleDict) {
	return _List_fromArray(
		[
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-100, -67.5),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$scale,
				A2($author$project$FinalPrototype$getFromDict, 'tTLA', btnScaleDict),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.4, $author$project$ICONS$lArrow))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$FinalPrototype$ToTransformShape,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
				$author$project$FinalPrototype$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
					$author$project$FinalPrototype$CancelScale,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
						A2($author$project$FinalPrototype$ScaleBtn, 'tTLA', 1.2),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(-100, -65),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$filled,
								A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
								A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 12, 9)))))))
		]);
};
var $author$project$FinalPrototype$toTransformShapeRArrow = function (btnScaleDict) {
	return _List_fromArray(
		[
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$move,
			_Utils_Tuple2(-30, -67.5),
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$scale,
				A2($author$project$FinalPrototype$getFromDict, 'tTRA', btnScaleDict),
				A2($MacCASOutreach$graphicsvg$GraphicSVG$scale, 0.4, $author$project$ICONS$rArrow))),
			A2(
			$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
			$author$project$FinalPrototype$ToTransformShape,
			A2(
				$MacCASOutreach$graphicsvg$GraphicSVG$notifyTap,
				$author$project$FinalPrototype$CancelScale,
				A2(
					$MacCASOutreach$graphicsvg$GraphicSVG$notifyLeave,
					$author$project$FinalPrototype$CancelScale,
					A2(
						$MacCASOutreach$graphicsvg$GraphicSVG$notifyEnter,
						A2($author$project$FinalPrototype$ScaleBtn, 'tTRA', 1.2),
						A2(
							$MacCASOutreach$graphicsvg$GraphicSVG$move,
							_Utils_Tuple2(-30, -65),
							A2(
								$MacCASOutreach$graphicsvg$GraphicSVG$filled,
								A4($MacCASOutreach$graphicsvg$GraphicSVG$rgba, 0, 0, 0, 0),
								A2($MacCASOutreach$graphicsvg$GraphicSVG$rect, 12, 9)))))))
		]);
};
var $author$project$FinalPrototype$view = function (model) {
	return A3(
		$MacCASOutreach$graphicsvg$GraphicSVG$collage,
		232,
		145,
		function () {
			var _v0 = model.state;
			switch (_v0.$) {
				case 'Waiting':
					return $author$project$FinalPrototype$myShapes(model);
				case 'EditingShape':
					return _Utils_ap(
						A2(
							$elm$core$List$map,
							$MacCASOutreach$graphicsvg$GraphicSVG$map($author$project$FinalPrototype$EditingShapeMsg),
							$author$project$L03G1State1$myShapes(model.editingShapeModel)),
						_Utils_eq(model.editingShapeModel.state, $author$project$L03G1State1$AddingShapeState) ? $author$project$FinalPrototype$toTransformShapeRArrow(model.btnScaleDict) : _List_Nil);
				case 'TransformShape':
					return _Utils_ap(
						A2(
							$elm$core$List$map,
							$MacCASOutreach$graphicsvg$GraphicSVG$map($author$project$FinalPrototype$TransformShapeMsg),
							$author$project$L03G1State2$myShapes(model.transformShapeModel)),
						_Utils_eq(model.transformShapeModel.state, $author$project$L03G1State2$TransState) ? _List_fromArray(
							[
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
								$author$project$FinalPrototype$toEditingShapeArrow(model.btnScaleDict)),
								$MacCASOutreach$graphicsvg$GraphicSVG$group(
								$author$project$FinalPrototype$toResultRArrow(model.btnScaleDict))
							]) : _List_Nil);
				default:
					return _Utils_ap(
						A2(
							$elm$core$List$map,
							$MacCASOutreach$graphicsvg$GraphicSVG$map($author$project$FinalPrototype$ResultPageMsg),
							$author$project$L03G1State3$myShapes(model.resultPageModel)),
						$author$project$FinalPrototype$toTransformShapeLArrow(model.btnScaleDict));
			}
		}());
};
var $author$project$FinalPrototype$main = A2(
	$MacCASOutreach$graphicsvg$GraphicSVG$EllieApp$ellieAppWithTick,
	$author$project$FinalPrototype$Tick,
	{
		init: function (_v0) {
			return _Utils_Tuple2($author$project$FinalPrototype$init, $elm$core$Platform$Cmd$none);
		},
		subscriptions: function (_v1) {
			return $elm$core$Platform$Sub$none;
		},
		update: $author$project$FinalPrototype$update,
		view: function (model) {
			return {
				body: $author$project$FinalPrototype$view(model),
				title: 'Linear Transformation Math Visualizer Ver1.0'
			};
		}
	});
_Platform_export({'FinalPrototype':{'init':$author$project$FinalPrototype$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));
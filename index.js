'use strict';

var Otto = require('@thewhodidthis/otto');

// # Otto 2d
// Helps create CA grids

var Otto2d = function Otto2d() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { size: 1 };

  var area = { size: data.size * data.size };
  var otto = Object.assign({
    rule: 614,
    ends: [-1, 1, -data.size, data.size],
    stat: function stat(hood, code, flag) {
      return code[flag + hood.reduce(function (a, b) {
        return a + b;
      }) * 2];
    }
  }, data, area);

  return Otto(otto);
};

module.exports = Otto2d;

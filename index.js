'use strict';

var Otto = require('@thewhodidthis/otto');

// # Otto 2d
// Helps create CA grids

var Otto2d = function Otto2d(opts) {
  var area = { size: opts.size * opts.size };
  var data = Object.assign({
    rule: 614,
    ends: [-1, 1, -opts.size, opts.size],
    stat: function stat(hood, code, flag) {
      return code[flag + hood.reduce(function (a, b) {
        return a + b;
      }) * 2];
    }
  }, opts, area);

  return Otto(data);
};

module.exports = Otto2d;

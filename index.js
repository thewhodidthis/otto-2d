'use strict';

var otto = require('@thewhodidthis/otto');

// # Otto 2d
// Helps create CA grids

var otto2d = function (from) {
  var size = (from && from.size) || 1;
  var grid = { size: size * size };

  var data = Object.assign({
    rule: 614,
    ends: [-1, 1, -size, size],
    stat: function (hood, code, flag) { return code[flag + (hood.reduce(function (a, b) { return a + b; }) * 2)]; }
  }, from, grid);

  return otto(data)
};

module.exports = otto2d;


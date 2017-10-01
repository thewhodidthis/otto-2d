'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var otto = _interopDefault(require('@thewhodidthis/otto'));

// # Otto 2d
// Helps create CA grids

var otto2d = function (data) {
  var size = (data && data.size) || 1;
  var area = { size: size * size };

  var t0to = Object.assign({
    rule: 614,
    ends: [-1, 1, -size, size],
    stat: function (hood, code, flag) { return code[flag + (hood.reduce(function (a, b) { return a + b; }) * 2)]; }
  }, data, area);

  return otto(t0to)
};

module.exports = otto2d;


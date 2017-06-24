var Otto2d = (function (Otto) {
'use strict';

// # Otto 2d
// Helps create CA grids

var Otto2d = function Otto2d(data) {
  var size = data && data.size || 1;
  var area = { size: size * size };

  var otto = Object.assign({
    rule: 614,
    ends: [-1, 1, -size, size],
    stat: function stat(hood, code, flag) {
      return code[flag + hood.reduce(function (a, b) {
        return a + b;
      }) * 2];
    }
  }, data, area);

  return Otto(otto);
};

return Otto2d;

}(Otto));

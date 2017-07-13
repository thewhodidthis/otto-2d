(function () {
'use strict';

// # Otto
// Helps deal CAs

// Wrap index round edges
// http://stackoverflow.com/questions/1082917/mod-of-negative-number-is-melting-my-brain
var myMod = function (a, b) { return a - (b * Math.floor(a / b)); };

// Rule to binary convert
var parseRule = function (rule) {
  // Base 2 digits
  var code = Number(rule).toString(2);

  var zeros = (1024).toString(2).split('').slice(1).join('');
  var zerosMax = zeros.length;

  // No padding past 10
  var diff = Math.max(zerosMax, zerosMax - code.length);

  // Zero pad ruleset if need be
  return ("" + zeros + code).substr(diff).split('').reverse()
};

// Maker
var Otto = function (data) {
  // Merge options and defaults
  var t0to = Object.assign({
    size: 1,
    rule: 30,

    // How far from center lie the neighbors
    ends: [-1, 0, 1],

    // Flip middle cell
    seed: function (v, i, view) { return i === Math.floor(view.length * 0.5); },

    // Index based lookup
    stat: function (hood, code) {
      var flags = hood.join('').toString(2);
      var stats = parseInt(flags, 2);

      return code[stats]
    }
  }, data);

  // Rule 90 would be
  // ```['0', '1', '0', '1', '1', '0', '1']```
  var code = parseRule(t0to.rule);

  // Calculate state
  var step = function (v, i, view) {
    // Collect neighboring flags
    var hood = t0to.ends.map(function (span) {
      // The index for each neighbor
      var site = myMod(span + i, view.length);

      // The state of each neighbor
      return view[site]
    });

    return t0to.stat(hood, code, v)
  };

  // Clipboard, zero filled
  var grid = new Uint8Array(t0to.size);
  var next = t0to.seed;

  // Tick
  return function () {
    grid = grid.map(next);
    next = step;

    return grid
  }
};

// # Otto 2d
// Helps create CA grids

var Otto2d = function (data) {
  var size = (data && data.size) || 1;
  var area = { size: size * size };

  var t0to = Object.assign({
    rule: 614,
    ends: [-1, 1, -size, size],
    stat: function (hood, code, flag) { return code[flag + (hood.reduce(function (a, b) { return a + b; }) * 2)]; }
  }, data, area);

  return Otto(t0to)
};

var white = [478, 486, 494, 614, 942];
var black = [451, 473, 475, 483, 485, 491, 497];
var rules = white.concat(black);

var size = 179;
var seed = Math.floor(Math.random() * rules.length);
var rule = rules[seed];

var plot = document.querySelector('canvas').getContext('2d');
var otto = Otto2d({ rule: rule, size: size });

var frames = -1;

var tick = function (fn) { return window.requestAnimationFrame(fn); };
var stop = function (id) { return window.cancelAnimationFrame(id); };
var draw = function () {
  var grid = otto();

  if (frames % 4 === 0) {
    for (var i = 0, total = grid.length; i < total; i += 1) {
      var x = i % size;
      var y = Math.floor(i / size);

      if (grid[i]) {
        plot.fillStyle = 'black';
      } else {
        plot.fillStyle = 'white';
      }

      plot.fillRect(x + 160, y + 60, 1, 1);
    }
  }

  frames = frames > 72 ? stop(frames) : tick(draw);
};

if (window !== window.top) {
  document.documentElement.className += ' is-iframe';
}

plot.canvas.classList.add((black.indexOf(rule) === -1) ? 'white' : 'black');
document.getElementById('label').innerHTML = rule;

window.addEventListener('load', function () {
  frames = tick(draw);
});

}());


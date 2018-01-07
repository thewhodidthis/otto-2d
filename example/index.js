(function () {
'use strict';

// # Otto
// Helps create elementary Cellular Automata

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

// Master grid maker
var otto = function (data) {
  // Merge options and defaults
  var papa = Object.assign({
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
  var code = parseRule(papa.rule);

  // Calculate state
  var step = function (v, i, view) {
    // Collect neighboring flags
    var hood = papa.ends.map(function (span) {
      // The index for each neighbor
      var site = myMod(span + i, view.length);

      // The state of each neighbor
      return view[site]
    });

    return papa.stat(hood, code, v)
  };

  // Clipboard, zero filled
  var grid = new Uint8Array(papa.size);
  var next = papa.seed;

  // Tick
  return function () {
    grid = grid.map(next);
    next = step;

    return grid
  }
};

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

var list = [451, 473, 475, 478, 483, 485, 486, 491, 494, 497, 614, 942];

var size = 219;
var area = size * size;
var drop = Math.ceil(size * 0.5);

var tick = function (fn) { return window.requestAnimationFrame(fn); };
var stop = function (id) { return window.cancelAnimationFrame(id); };

var seed = function () {
  try {
    var search = new URLSearchParams(window.location.search);
    var choice = search.get('rule');

    if (choice) {
      return parseInt(choice, 10)
    }

    throw Error()
  } catch (e) {
    var random = Math.floor(Math.random() * list.length);

    return list[random]
  }
};

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe');
}

var rule = seed();

var plot = document.querySelector('canvas').getContext('2d');
var grid = otto2d({ rule: rule, size: size });

var ref = plot.canvas;
var w = ref.width;
var h = ref.height;

var l = (w - size + 1) * 0.5;
var t = (h - size + 1) * 0.5;

var frames = -1;

var draw = function () {
  var data = grid();

  // Do this once
  if (frames === 4 && data[0]) {
    plot.canvas.classList.add('black');
  }

  if (frames % 4 === 0) {
    for (var i = 0; i < area; i += 1) {
      var x = i % size;
      var y = Math.floor(i / size);

      plot.fillStyle = data[i] ? 'black' : 'white';
      plot.fillRect(x + l, y + t, 1, 1);
    }
  }

  frames = frames > drop ? stop(frames) : tick(draw);
};

frames = tick(draw);

window.addEventListener('load', function () {
  var mark = document.getElementById('label');
  var note = document.createTextNode(rule);

  mark.replaceChild(note, mark.firstChild);
});

}());


'use strict';

var html = document.documentElement;

var label = document.getElementById('label');
var rules = [1022, 451, 452, 491, 614, 942];

var size = 179;
var seed = Math.floor(Math.random() * rules.length);
var rule = rules[seed];

var plot = document.querySelector('canvas').getContext('2d');
var papa = {
  rule: rule,
  size: size,
};

var otto = Otto2d(papa);

var framesN = 22 - 1;
var frameId;

var frame = function frame(r) {
  var grid = otto();

  for (var j = 0; j < grid.length; j += 1) {
    var x = j % size;
    var y = Math.floor(j / size);

    if (grid[j]) {
      plot.fillStyle = 'black';
    } else {
      plot.fillStyle = 'white';
    }

    plot.fillRect(x, y, 1, 1);
  }

  if (frameId > framesN) {
    frameId = window.cancelAnimationFrame(frameId);
  } else {
    frameId = window.requestAnimationFrame(frame);
  }
};

html.className = 'html';

if (window !== window.top) {
  html.className += ' is-iframe';
}

label.innerHTML = rule;

window.addEventListener('load', function(e) {
  frameId = window.requestAnimationFrame(frame);
}, false);


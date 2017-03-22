'use strict';

var html = document.documentElement;

var white = [478, 486, 494, 614, 942];
var black = [451, 473, 475, 483, 485, 491, 497];
var rules = white.concat(black);

var size = 179;
var seed = Math.floor(Math.random() * rules.length);
var rule = rules[seed];

var plot = document.querySelector('canvas').getContext('2d');
var papa = {
  rule: rule,
  size: size,
};

var otto = Otto2d(papa);

var framesN = 72;
var frameId;

var frame = function frame(r) {
  var grid = otto();

  if (frameId % 4 === 0) {
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
  }

  if (frameId > framesN) {
    frameId = window.cancelAnimationFrame(frameId);
  } else {
    frameId = window.requestAnimationFrame(frame);
  }
};

if (window !== window.top) {
  html.className += ' is-iframe';
}

var figure = document.getElementById('figure');

figure.setAttribute('data-rule', rule);
figure.classList.add((black.indexOf(rule) === -1) ? 'white' : 'black');

document.getElementById('label').innerHTML = rule;

window.addEventListener('load', function(e) {
  frameId = window.requestAnimationFrame(frame);
}, false);


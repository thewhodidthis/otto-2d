import Otto2d from '../index.es';

const white = [478, 486, 494, 614, 942];
const black = [451, 473, 475, 483, 485, 491, 497];
const rules = white.concat(black);

const size = 179;
const seed = Math.floor(Math.random() * rules.length);
const rule = rules[seed];

const plot = document.querySelector('canvas').getContext('2d');
const papa = { rule, size };

const otto = Otto2d(papa);

let frameId = -1;

const start = fn => window.requestAnimationFrame(fn);
const pause = id => window.cancelAnimationFrame(id);

const frame = () => {
  const grid = otto();

  if (frameId % 4 === 0) {
    for (let j = 0; j < grid.length; j += 1) {
      const x = j % size;
      const y = Math.floor(j / size);

      if (grid[j]) {
        plot.fillStyle = 'black';
      } else {
        plot.fillStyle = 'white';
      }

      plot.fillRect(x, y, 1, 1);
    }
  }

  frameId = frameId > 72 ? pause(frameId) : start(frame);
};

if (window !== window.top) {
  document.documentElement.className += ' is-iframe';
}

const figure = document.getElementById('figure');

figure.setAttribute('data-rule', rule);
figure.classList.add((black.indexOf(rule) === -1) ? 'white' : 'black');

document.getElementById('label').innerHTML = rule;

window.addEventListener('load', () => {
  frameId = start(frame);
});


import Otto2d from '../index.es';

const white = [478, 486, 494, 614, 942];
const black = [451, 473, 475, 483, 485, 491, 497];
const rules = white.concat(black);

const size = 179;
const seed = Math.floor(Math.random() * rules.length);
const rule = rules[seed];

const plot = document.querySelector('canvas').getContext('2d');
const otto = Otto2d({ rule, size });

let frames = -1;

const tick = fn => window.requestAnimationFrame(fn);
const stop = id => window.cancelAnimationFrame(id);
const draw = () => {
  const grid = otto();

  if (frames % 4 === 0) {
    for (let i = 0, total = grid.length; i < total; i += 1) {
      const x = i % size;
      const y = Math.floor(i / size);

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

window.addEventListener('load', () => {
  frames = tick(draw);
});


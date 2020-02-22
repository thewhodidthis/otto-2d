(function () {
  'use strict';

  // # Otto
  // Helps create elementary cellular automata

  // Wrap index round edges
  // http://stackoverflow.com/questions/1082917/mod-of-negative-number-is-melting-my-brain
  const myMod = (a, b) => a - (b * Math.floor(a / b));

  // Rule to binary convert
  const parseRule = (rule) => {
    // Base 2 digits
    const code = Number(rule).toString(2);

    const zeros = (1024).toString(2).split('').slice(1).join('');
    const zerosMax = zeros.length;

    // No padding past 10
    const diff = Math.max(zerosMax, zerosMax - code.length);

    // Zero pad ruleset if need be
    return `${zeros}${code}`.substr(diff).split('').reverse()
  };

  // Master grid maker
  const otto = (data) => {
    // Merge options and defaults
    const papa = Object.assign({
      size: 1,
      rule: 30,

      // How far from center lie the neighbors
      ends: [-1, 0, 1],

      // Flip middle cell
      seed: (v, i, view) => i === Math.floor(view.length * 0.5),

      // Index based lookup
      stat: (hood, code) => {
        const flags = hood.join('').toString(2);
        const stats = parseInt(flags, 2);

        return code[stats]
      }
    }, data);

    // Rule 90 would be
    // ```['0', '1', '0', '1', '1', '0', '1']```
    const code = parseRule(papa.rule);

    // Calculate state
    const step = (v, i, view) => {
      // Collect neighboring flags
      const hood = papa.ends.map((span) => {
        // The index for each neighbor
        const site = myMod(span + i, view.length);

        // The state of each neighbor
        return view[site]
      });

      return papa.stat(hood, code, v)
    };

    // Clipboard, zero filled
    let grid = new Uint8Array(papa.size);
    let next = papa.seed;

    // Tick
    return () => {
      grid = grid.map(next);
      next = step;

      return grid
    }
  };

  // # Otto 2d

  const otto2d = (from) => {
    const size = (from && from.size) || 1;
    const grid = { size: size * size };

    const data = Object.assign({
      rule: 614,
      ends: [-1, 1, -size, size],
      stat: (hood, code, flag) => code[flag + (hood.reduce((a, b) => a + b) * 2)]
    }, from, grid);

    return otto(data)
  };

  const list = [451, 473, 475, 478, 483, 485, 486, 491, 494, 497, 614, 942];

  const size = 219;
  const area = size * size;
  const drop = Math.ceil(size * 0.5);

  const tick = fn => window.requestAnimationFrame(fn);
  const stop = id => window.cancelAnimationFrame(id);

  const seed = () => {
    try {
      const search = new URLSearchParams(window.location.search);
      const choice = search.get('rule');

      if (choice) {
        return parseInt(choice, 10)
      }

      throw Error()
    } catch (e) {
      const random = Math.floor(Math.random() * list.length);

      return list[random]
    }
  };

  if (window !== window.top) {
    document.documentElement.classList.add('is-iframe');
  }

  const rule = seed();

  const plot = document.querySelector('canvas').getContext('2d');
  const grid = otto2d({ rule, size });

  const { width: w, height: h } = plot.canvas;

  const l = (w - size + 1) * 0.5;
  const t = (h - size + 1) * 0.5;

  let frames = -1;

  const draw = () => {
    const data = grid();

    // Do this once
    if (frames === 4 && data[0]) {
      plot.canvas.classList.add('black');
    }

    if (frames % 4 === 0) {
      for (let i = 0; i < area; i += 1) {
        const x = i % size;
        const y = Math.floor(i / size);

        plot.fillStyle = data[i] ? 'black' : 'white';
        plot.fillRect(x + l, y + t, 1, 1);
      }
    }

    frames = frames > drop ? stop(frames) : tick(draw);
  };

  frames = tick(draw);

  window.addEventListener('load', () => {
    const mark = document.getElementById('label');
    const note = document.createTextNode(rule);

    mark.replaceChild(note, mark.firstChild);
  });

}());

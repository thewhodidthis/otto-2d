// # Otto 2d
// Helps create CA grids

import Otto from '@thewhodidthis/otto';

const mySum = (a, b) => a + b;

const Otto2d = (opts) => {
  const area = { size: opts.size * opts.size };
  const data = Object.assign({
    rule: 614,
    ends: [-1, 1, -opts.size, opts.size],
    stat: (code, hood, v) => code[v + (hood.reduce(mySum) * 2)],
  }, opts, area);

  return Otto(data);
};

export default Otto2d;


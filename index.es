// # Otto 2d
// Helps create CA grids

import Otto from '@thewhodidthis/otto';

const Otto2d = (opts = { size: 1 }) => {
  const area = { size: opts.size * opts.size };
  const data = Object.assign({
    rule: 614,
    ends: [-1, 1, -opts.size, opts.size],
    stat: (hood, code, flag) => code[flag + (hood.reduce((a, b) => a + b) * 2)],
  }, opts, area);

  return Otto(data);
};

export default Otto2d;


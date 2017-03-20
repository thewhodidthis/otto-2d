// # Otto 2d
// Helps create CA grids

import Otto from '@thewhodidthis/otto';

const Otto2d = (data = { size: 1 }) => {
  const area = { size: data.size * data.size };
  const otto = Object.assign({
    rule: 614,
    ends: [-1, 1, -data.size, data.size],
    stat: (hood, code, flag) => code[flag + (hood.reduce((a, b) => a + b) * 2)],
  }, data, area);

  return Otto(otto);
};

export default Otto2d;


// # Otto 2d
// Helps create CA grids

import Otto from '@thewhodidthis/otto'

const Otto2d = (data) => {
  const size = (data && data.size) || 1
  const area = { size: size * size }

  const t0to = Object.assign({
    rule: 614,
    ends: [-1, 1, -size, size],
    stat: (hood, code, flag) => code[flag + (hood.reduce((a, b) => a + b) * 2)]
  }, data, area)

  return Otto(t0to)
}

export default Otto2d

'use strict'

const { ok, deepEqual } = require('tapeless')
const otto = require('./')

const getOdd = n => (2 * n) + 1
const getMid = n => Math.floor(n * 0.5)

// Expected matches
// https://oeis.org/wiki/Index_to_2D_5-Neighbor_Cellular_Automata
const lookup = {
  451: [1, 5, 9, 24, 21, 72, 45],
  491: [1, 5, 13, 32, 41, 76, 77],
  614: [1, 5, 5, 17, 5, 25, 17],
  942: [1, 5, 9, 21, 29, 41, 53]
}

// Compares with known integer sequence
Object.keys(lookup).forEach((rule, j) => {
  const series = lookup[rule]
  const size = (7 * 2) - 1

  // For collecting on cell counts
  const data = []

  // Setup 2d 5-neighbor CA
  const next = otto({ rule, size })

  for (let i = 0, { length } = series; i < length; i += 1) {
    const grid = next()

    const rangeR = getOdd(i)
    const rangeL = getMid(size - rangeR)

    const range = rangeL + rangeR
    const boxes = []

    for (let k = 0; k < size; k += 1) {
      const start = k * size
      const chunk = grid.slice(start, start + size)

      boxes.push(chunk)
    }

    const { length: count } = boxes.slice(rangeL, range).map((chunk) => {
      const start = getMid(size - rangeR)

      return chunk.slice(start, start + rangeR)
    }).reduce((a, b) => [...a, ...b]).filter(v => v === 1)

    data.push(count)
  }

  // Add test title
  const head = !j ? 'will compute' : undefined

  // Compare expected sequence with CA data
  deepEqual(data, series, `Rule ${rule} matches ${series}`, head)
})

const next = otto()
const grid = next()

ok(grid.length, 'size is a match', 'will default')

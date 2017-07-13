const test = require('tape')
const Otto = require('./')

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
test('will compute', (t) => {
  Object.keys(lookup).forEach((rule) => {
    const series = lookup[rule]
    const total = series.length
    const size = (7 * 2) - 1

    // For collecting on cell counts
    const data = []

    // Setup 2d 5-neighbor CA
    const otto = Otto({ rule, size })

    for (let i = 0; i < total; i += 1) {
      const grid = otto()

      const rangeR = getOdd(i)
      const rangeL = getMid(size - rangeR)

      const range = rangeL + rangeR
      const boxes = []

      for (let j = 0; j < size; j += 1) {
        const start = j * size
        const chunk = grid.slice(start, start + size)

        boxes.push(chunk)
      }

      const count = boxes.slice(rangeL, range).map((chunk) => {
        const start = getMid(size - rangeR)

        return chunk.slice(start, start + rangeR)
      }).reduce((a, b) => [...a, ...b]).filter(v => v === 1).length

      data.push(count)
    }

    // Compare expected sequence with CA data
    t.deepEqual(data, series, `Rule ${rule} matches ${series}`)
  })

  t.end()
})

test('will default', (t) => {
  const otto = Otto()
  const grid = otto()

  t.ok(grid.length)
  t.end()
})

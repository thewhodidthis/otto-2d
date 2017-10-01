import calculate from '../index.mjs'

const white = [478, 486, 494, 614, 942]
const black = [451, 473, 475, 483, 485, 491, 497]
const rules = white.concat(black)

const size = 179
const seed = Math.floor(Math.random() * rules.length)
const rule = rules[seed]

const plot = document.querySelector('canvas').getContext('2d')
const grid = calculate({ rule, size })

let frames = -1

const tick = fn => window.requestAnimationFrame(fn)
const stop = id => window.cancelAnimationFrame(id)

const draw = () => {
  const data = grid()

  if (frames % 4 === 0) {
    for (let i = 0, total = data.length; i < total; i += 1) {
      const x = i % size
      const y = Math.floor(i / size)

      if (data[i]) {
        plot.fillStyle = 'black'
      } else {
        plot.fillStyle = 'white'
      }

      plot.fillRect(x + 160, y + 60, 1, 1)
    }
  }

  frames = frames > 72 ? stop(frames) : tick(draw)
}

plot.canvas.classList.add((black.indexOf(rule) === -1) ? 'white' : 'black')

document.getElementById('label').innerHTML = rule

if (window !== window.top) {
  document.documentElement.className += ' is-iframe'
}

window.addEventListener('load', () => {
  frames = tick(draw)
})

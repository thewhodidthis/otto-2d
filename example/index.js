import otto2d from '../index.mjs'

const list = [451, 473, 475, 478, 483, 485, 486, 491, 494, 497, 614, 942]

const size = 219
const area = size * size
const drop = Math.ceil(size * 0.5)

const tick = fn => window.requestAnimationFrame(fn)
const stop = id => window.cancelAnimationFrame(id)

const seed = () => {
  try {
    const search = new URLSearchParams(window.location.search)
    const choice = search.get('rule')

    if (choice) {
      return parseInt(choice, 10)
    }

    throw Error()
  } catch (e) {
    const random = Math.floor(Math.random() * list.length)

    return list[random]
  }
}

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe')
}

const rule = seed()

const plot = document.querySelector('canvas').getContext('2d')
const grid = otto2d({ rule, size })

const { width: w, height: h } = plot.canvas

const l = (w - size + 1) * 0.5
const t = (h - size + 1) * 0.5

let frames = -1

const draw = () => {
  const data = grid()

  // Do this once
  if (frames === 4 && data[0]) {
    plot.canvas.classList.add('black')
  }

  if (frames % 4 === 0) {
    for (let i = 0; i < area; i += 1) {
      const x = i % size
      const y = Math.floor(i / size)

      plot.fillStyle = data[i] ? 'black' : 'white'
      plot.fillRect(x + l, y + t, 1, 1)
    }
  }

  frames = frames > drop ? stop(frames) : tick(draw)
}

frames = tick(draw)

window.addEventListener('load', () => {
  const mark = document.getElementById('label')
  const note = document.createTextNode(rule)

  mark.replaceChild(note, mark.firstChild)
})

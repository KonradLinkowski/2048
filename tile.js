import { Component } from './component.js'

export class Tile extends Component {
  constructor($parent, value) {
    super($parent, () => createElement(value))
  }

  move(x, y) {
    this.$el.style.setProperty('--x', x)
    this.$el.style.setProperty('--y', y)
  }
}

function createElement(value) {
  const $container = document.createElement('div')
  $container.classList.add('tile')
  $container.textContent = value
  $container.style.setProperty('--color', value)
  return $container
}

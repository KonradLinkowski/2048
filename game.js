import { Component } from './component.js'
import { Tile } from './tile.js'

export class Game extends Component {
  constructor($parent, size) {
    super($parent, () => createElement(size))
    this.size = size
    this.tiles = [...Array(size ** 2).keys()].map(i => ({ x: i % size, y: i / size | 0, tile: null }))
    console.log(this.tiles)
    this.respawnTiles(4)
    setTimeout(this.swipe.bind(this), 500)
  }

  swipe(direction) {
    console.log('nice')
    const rows = [...Array(this.size).keys()].map(i => this.tiles.filter(({ y, tile }) => tile && y == i))
    const columns = [...Array(this.size).keys()].map(i => this.tiles.filter(({ x, tile }) => tile && x == i))
    
    for (const row of rows) {
      const reversed = [...row].reverse()
      const rest = []
      for (let i = 0; i < reversed.length; i += 1) {
        const that = reversed[i]
        const next = reversed[i + 1]
        if (next && that.tile.value == next.tile.value) {
          const newTile = new Tile(this.$el, that.tile.value + next.tile.value)
          rest.push(newTile)
          that.tile = null
          next.tile = null
          i += 1
        } else {
          rest.push(that.tile)
          that.tile = null
        }
      }
      row.forEach(t => t.tile = null)
      rest.forEach((tile, i) => {
        row[i].tile = tile
        console.log('moving', row[i].x, row[i].y)
        tile.move(row[i].x, row[i].y)
      })
    }
  }

  respawnTiles(count = 2) {
    const empties = this.tiles.filter(tile => !tile.tile)
    for (let i = 0; i < count; i += 1) {
      if (!empties.length) return
      const index = Math.floor(Math.random() * empties.length)
      const obj = empties[index]
      const value = 2 ** Math.floor(Math.random() * 2 + 1)
      const tile = new Tile(this.$el, value)
      obj.tile = tile
      tile.move(obj.x, obj.y)
      empties.splice(index, 1)
    }
  }

  spawnTile(x, y) {
    const tile = new Tile(this.$el, 2 ** Math.floor(Math.random() * 10 + 1))
    tile.move(x, y)
    // this.tiles.push(x, y)
  }
}

function createElement(size) {
  const $container = document.createElement('div')
  $container.classList.add('board')
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const $backgroundTile = document.createElement('div')
      $backgroundTile.classList.add('background-tile')
      $container.appendChild($backgroundTile)
    }
  }
  return $container
}

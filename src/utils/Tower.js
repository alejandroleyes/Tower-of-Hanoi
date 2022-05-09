import Stack from "./Stack"
let saveSteps = []
class Tower extends Stack {
  constructor(name) {
    super()
    this.name = name
  }

  add(disk) {
    if (this.length === 0) {
      this.push(disk)
    }
    if (this.peek().value > disk) {
      this.push(disk)
    } else {
      return
    }
  }

  moveTopTo(towerDestination) {
    if (this.top === null || towerDestination.peek() === null) {
      if (this.top !== null) {
        towerDestination.add(this.peek().value)
        saveSteps.push([this.name, towerDestination.name]) // save steps
        this.pop()
      }

      return towerDestination
    } else {
      while (
        this.peek() === null
          ? 1 < 0
          : towerDestination.peek().value > this.peek().value
      ) {
        towerDestination.add(this.peek().value)
        saveSteps.push([this.name, towerDestination.name]) // save steps
        this.pop()
        return towerDestination
      }
    }
    return towerDestination
  }

  moveDisks(n, tower1, tower3, tower2) {
    if (n === 1) {
      if (tower1.top !== null) {
        tower1.moveTopTo(tower3)
        return tower3.traverse()
      }
      return tower3.traverse()
    }
    return (
      this.moveDisks(n - 1, tower1, tower2, tower3),
      tower1.moveTopTo(tower3),
      this.moveDisks(n - 1, tower2, tower3, tower1)
    )
  }

  steps() {
    return saveSteps
  }
  deleteSteps() {
    return (saveSteps = [])
  }
  resetTower() {
    let len = this.length
    for (let i = 0; i < len; i++) {
      this.pop()
    }

    return this.traverse()
  }
}

export default Tower

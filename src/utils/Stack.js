class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Stack {
  constructor() {
    this.top = null
    this.bottom = null
    this.maxLength = 20
    this.length = 0
  }

  push(value) {
    if (!this.isFull()) {
      const newNode = new Node(value)

      if (this.length === 0) {
        this.top = newNode
        this.bottom = newNode
      } else {
        const prevTop = this.top
        this.top = newNode
        this.top.next = prevTop
      }
      this.length++
      return this
    }
    return Error("The stack is full")
  }

  peek() {
    return this.top
  }

  isEmpty() {
    if (this.length === 0) {
      return true
    } else {
      return false
    }
  }

  isFull() {
    if (this.length === this.maxLength) {
      return true
    } else {
      return false
    }
  }

  pop() {
    if (this.length > 0) {
      let currentNode = this.top

      this.top = currentNode.next
      this.length--
      return currentNode
    } else {
      this.bottom = null
      return this.top
    }
  }

  traverse() {
    let list = []
    let temp = this.top

    for (let i = 0; i < this.length; i++) {
      list.push(temp.value)
      temp = temp.next
    }
    return list
  }
}
export default Stack

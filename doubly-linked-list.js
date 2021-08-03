class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  insertAtPosition(pos, value) {
    if (!this.head || pos < 0) {
      return;
    }
  
    let node = new Node(value);
    let curr = this.head;
    let i = 0;
  
    while (curr.next && i !== pos) {
      curr = curr.next;
    }
  
    if (i < pos) {
      return "Provided position is invalid";
    }
  
    node.prev = curr;
    node.next = curr.next;
    if (curr.next) {
      curr.next.prev = node;
    }
    curr.next = node;
  
    this.length++;
  }

  deleteAtPosition(pos) {
    if (!this.head || pos < 0) {
      return;
    }
  
    let curr = this.head;
    let i = 0;
  
    while (i !== pos) {
      if (!curr.next) {
        return "Position is invalid";
      }
  
      curr = curr.next;
      i++;
    }
  
    if (!curr.next && !curr.prev) {
      return null;
    }
  
    if (curr.next) {
        curr.next.prev = curr.prev;
    }
  
    if (curr.prev) {
        curr.prev.next = curr.next;
    }
  
    this.head = pos === 0 ? curr.next : this.head;
    this.length--;
  }

  reverse() {
    let temp = null;
    let curr = this.head;

    while (curr) {
      temp = curr.prev;

      curr.prev = curr.next;
      curr.next = temp;

      curr = curr.prev;
    }

    if (temp) {
      this.head = temp.prev;
    }
  }
}

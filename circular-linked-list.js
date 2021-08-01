class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const sortedCircularListInsert = (head, data) => {
  const node = new Node(data);

  if (!head) {
    node.next = node;
    head = node;
  } else if (node.value < head.value) {
    let curr = head;

    while (curr.next !== head) {
      curr = curr.next;
    }

    node.next = curr.hext;
    curr.next = node;
  } else {
    let curr = head;

    while (curr.next !== head && curr.next.value < node.value) {
      curr = curr.next;
    }

    node.next = curr.next;
    curr.next = node;
  }
};

// swaps first and last nodes in a circular linked list
const swapFirstAndLastNodes = (head) => {
  if (!head || !head.next) {
    return head;
  }

  let curr = head;

  while (curr.next.next !== head) {
    curr.next;
  }

  curr.next.next = head.next;
  head.next = curr.next;
  curr.next = head;

  head = head.next;
};

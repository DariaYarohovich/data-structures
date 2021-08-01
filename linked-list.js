class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(head) {
    this.head = head;
    this.length = 0;
  }

  getList() {
    return this.head;
  }

  isEmpty() {
    return this.length === 0;
  }

  addToTheEnd(value) {
    const node = new Node(value);

    if (this.length === 0) {
      this.head = node;
    } else {
      let current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this.length++;
  }

  insertAtPosition(position, value) {
    if (0 > position || position > this.length) {
      return "Position is no valid";
    }

    const node = new Node();

    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let prev = null;
      let curr = this.head;
      let i = 0;

      while (i < position) {
        prev = curr;
        curr = curr.next;
        i++;
      }

      node.next = curr;
      prev.next = node;
    }

    this.length++;
  }

  getNodeByPosition(position) {
    if (0 > position || position > this.length) {
      return "Position is not valid";
    }

    let curr = this.head;
    let i = 0;

    while (i < position) {
      curr = curr.next;
      i++;
    }

    return curr.value;
  }

  removeFromPosition(position) {
    if (0 > position || position > this.length) {
      return "Position is not valid";
    }

    if (position === 0) {
      this.head = this.head.next;
    } else {
      let prev = null;
      let curr = this.head;
      let i = 0;

      while (i < position) {
        prev = curr;
        curr = curr.next;
        i++;
      }

      prev.next = curr.next;
    }

    this.length--;
    return curr.value;
  }

  getIndexOf(value) {
    let curr = this.head;
    let i = 0;

    while (curr) {
      if (curr.value === value) {
        return i;
      }

      curr = curr.next;
      i++;
    }

    return -1; // not found
  }

  removeElementByValue(value) {
    const elementIndex = this.getIndexOf(value);

    if (elementIndex) {
      this.removeFromPosition(elementIndex);
    }
  }

  hasCycle() {
    if (!this.head || !this.head.next) {
      return false;
    }

    if (this.head === this.head.next) {
      return true;
    }

    let slow = this.head;
    let fast = this.head;

    while (fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;

      if (slow === fast) {
        return true;
      }
    }

    return false;
  }

  getCycleStartIndex() {
    if (!this.head || !this.head.next) {
      return false;
    }

    let slow = this.head;
    let fast = this.head;

    slow = slow.next;
    fast = fast.next.next;

    while (fast && fast.next) {
      if (slow === fast) break;

      slow = slow.next;
      fast = fast.next.next;
    }

    if (slow != fast) {
      return false;
    }

    slow = this.head;

    while (slow != fast) {
      slow = slow.next;
      fast = fast.next;
    }

    return slow;
  }

  removeAtNthIndexFromTheEnd(index) {
    let first = this.head;
    let second = this.head;

    for (let i = 0; i < index; i++) {
      if (!second.next) {
        if (i === index - 1) {
          this.head = this.head.next;
          break;
        }
      }

      second = second.next;
    }

    while (second.next) {
      second = second.next;
      first = first.next;
    }

    first.next = first.next.next;
  }

  reverseList(head) {
    if (!head || !head.next) {
      return head;
    }

    let curr = head;
    let prev = null;
    let next = null;

    while (curr) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    return prev;
  }

  isPalindrome(head) {
    if (!head || !head.next) {
      return true;
    }

    let second_half;
    let middle_node;
    let slow_pointer = head;
    let fast_pointer = head;
    let prev_of_slow_pointer = head;
    let isPalindrome = false;

    // divide list in two parts (keep the middle node if list length is odd)
    while (fast && fast.next) {
      prev_of_slow_pointer = slow_pointer;
      slow_pointer = slow_pointer.next;
      fast_pointer = fast_pointer.next.next;
    }

    if (fast_pointer) {
      middle_node = slow_pointer;
      slow_pointer = slow_pointer.next;
    }

    // second half
    second_half = slow_pointer;
    // first half
    prev_of_slow_pointer.next = null;

    // reverse the second half
    reverseSecondHalf();

    // compare two halfs
    isPalindrome = compareLists(head, second_half);

    // reverse the second half back and restore the initial list
    reverseSecondHalf();

    if (middle_node) {
      middle_node.next = second_half;
      prev_of_slow_pointer.next = middle_node;
    } else {
      prev_of_slow_pointer.next = second_half;
    }

    return isPalindrome;

    function reverseSecondHalf() {
      let curr = second_half;
      let next = null;
      let prev = null;

      while (curr) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
      }

      second_half = prev;
    }

    function compareLists(list1, list2) {
      let list1Curr = list1;
      let list2Curr = list2;
      let areEqual = 1;

      while (list1Curr) {
        if (list1Curr.value !== list2Curr.value) {
          areEqual = 0;
          break;
        }

        list1Curr = list1Curr.next;
        list2Curr = list2Curr.next;
      }

      return areEqual;
    }
  }
}

function removeDuplicatesFromSortedList(head) {
  if (!head || !head.next) {
    return head;
  }

  let curr = head;

  while (curr && curr.next) {
    if (curr.value === curr.next.value) {
      curr.next = curr.next.next;
      continue;
    }
    curr = curr.next;
  }

  return head;
}

function removeDuplicatesFromUnsortedList(head) {
  if (!head || !head.next) {
    return head;
  }

  // using set
  // let hash = new Set();
  // let curr = head;
  // let prev = null;

  // while (curr) {
  //     if (hash.has(curr.data)) {
  //         curr = curr.next;
  //         prev.next = curr;
  //         continue;
  //     }

  //     hash.add(curr.data);
  //     prev = curr;
  //     curr = curr.next;
  // }

  // using loops
  let pointer1 = head;
  let pointer2 = null;

  while (pointer1) {
    pointer2 = pointer1;

    while (pointer2.next) {
      if (pointer1.data === pointer2.next.data) {
        pointer2.next = pointer2.next.next;
        continue;
      }

      pointer2 = pointer2.next;
    }

    pointer1 = pointer1.next;
  }

  return head;
}

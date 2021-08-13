class Stack {
  constructor() {
    this.stack = [];
    this.peak = -1;
  }
  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    this.peak += 1;
    this.stack[this.peak] = x;
  }
  /**
   * @return {number}
   */
  pop() {
    if (this.peak === -1) {
      return -1;
    }

    return this.stack[this.peak--];
  }

  /**
   * @return {boolean}
   */

  isFull() {
    return true;
  }
  /**
   * @return {boolean}
   */
  isEmpty() {
    return this.peak === -1 ? true : false;
  }

  top() {
    if (this.isEmpty) {
      return;
    }

    return this.stack[this.peak];
  }
}

// array is used as stack here
function getMinValueInStack(s) {
  if (s.isEmpty()) {
    return -1;
  }

  const innerStack = new Stack();
  let minValue;

  while (!s.isEmpty()) {
    const popped = s.pop();

    if (minValue === undefined || popped < minValue) {
      minValue = popped;
    }

    innerStack.push(popped);
  }

  while (!innerStack.empty()) {
    const popped = innerStack.pop();
    s.push(popped);
  }

  return minValue;
}

// array is used as stack here
function sortStack(s) {
  if (s.length) {
    const temp = s.pop();
    sortStack(s);
    sortedInsert(s, temp);
  }
}

function sortedInsert(s, v) {
  if (!s.length || s[s.length-1] < v) {
    s.push(v);
  } else {
    const temp = s.pop();
    sortedInsert(s, v);
    s.push(temp);
  }
}

function ListNode(data) {
  this.data = data;
  this.next = null;
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToTail(data) {
    const node = new ListNode(data);

    if (!this.tail) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;

    return node;
  }

  traverse(fn) {
    let node = this.head;

    while (node) {
      fn(node.data);
      node = node.next;
    }
  }

  // For debugging
  print() {
    return this.traverse(console.log);
  }

  reverse() {
    let curr = this.head;
    let prev = null;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    const temp = this.head;
    this.head = this.tail;
    this.tail = temp;
  }
}

const ll = new LinkedList();
ll.addToTail(1);
ll.addToTail(2);
ll.addToTail(3);
ll.reverse();
ll.print();

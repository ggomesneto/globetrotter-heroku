class DLNode {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.previous = null;
    this.destination = null;
    this.leaving = null;
  }
}
class DoubleLinkedList {
  constuctor() {
    this.head = null;
    this.tail = null;
  }

  add(val) {
    let newNode = new DLNode(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      newNode.destination = val.coord_destination;
      newNode.leaving = val.coord_destination;
    } else {
      let temp = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
      newNode.previous = temp;

      newNode.destination = val.coord_destination;
      newNode.leaving = temp.destination;
    }
  }

  organize() {
    let current = this.head;
    let data = [];

    while (current) {
      data.push([current.leaving, current.destination]);
      current = current.next;
    }
    return data;
  }
}

export { DLNode, DoubleLinkedList };

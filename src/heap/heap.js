class Heap {
  constructor() {
    this.arr = [];
  }

  _getLeftIndex(i) {
    return i * 2 + 1;
  }

  _getRightIndex(i) {
    return i * 2 + 2;
  }

  _getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  _swap(i, j) {
    let temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  }
  
  _heapifyDown(i) {
    if (i >= this.arr.length / 2 && i <= this.arr.length) {
      return;
    }

    let left = this._getLeftIndex(i);
    let right = this._getRightIndex(i);

    let smallest = i;
    if (this.arr[left] < this.arr[smallest]) {
      smallest = left;
    }
    if (this.arr[right] < this.arr[smallest]) {
      smallest = right;
    }

    if (smallest != i) {
      this._swap(smallest, i);
      this._heapifyDown(smallest);
    }
  }

  _heapifyUp(i) {
    if (i == 0) {
      return;
    }

    let parent = this._getParentIndex(i);
    if (this.arr[i] < this.arr[parent]) {
      this._swap(parent, i);
      this._heapifyUp(parent);
    }
  }

  insert(elem) {
    this.arr.push(elem);
    this._heapifyUp(this.arr.length - 1);
  }

  extractMin() {
    this.arr[0] = this.arr[this.arr.length - 1];
    this.arr.length--;
    this._heapifyDown(0);
  }
}

function test() {
  let heap = new Heap();
  heap.insert(1);
  heap.insert(4);
  heap.insert(2);
  heap.insert(5);
  heap.insert(3);
  console.log(heap.arr);
  heap.extractMin();
  console.log(heap.arr);
  heap.extractMin();
  console.log(heap.arr);
  heap.extractMin();
  console.log(heap.arr);
  heap.extractMin();
  console.log(heap.arr);
  heap.extractMin();
}

test();

export class Heap {
  constructor() {
    this.arr = [];
    this.sortedHeap = [];
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
    let leftIndex = this._getLeftIndex(i);
    let rightIndex = this._getRightIndex(i);
    let left = this.arr[leftIndex];
    let right = this.arr[rightIndex];

    let highestPriorityIndex = i;
    if (left && left.compare(this.arr[highestPriorityIndex]) > 0) {
      highestPriorityIndex = leftIndex;
    }
    if (right && right.compare(this.arr[highestPriorityIndex]) > 0) {
      highestPriorityIndex = rightIndex;
    }

    if (highestPriorityIndex !== i) {
      this._swap(highestPriorityIndex, i);
      this._heapifyDown(highestPriorityIndex);
    }
  }

  _heapifyUp(i) {
    if (i === 0) {
      return;
    }

    let parent = this._getParentIndex(i);
    if (this.arr[i].compare(this.arr[parent]) > 0) {
      this._swap(parent, i);
      this._heapifyUp(parent);
    }
  }

  insert(elem) {
    this.arr.push(elem);
    this._heapifyUp(this.arr.length - 1);
    this._updateSortedHeap();
  }

  _updateSortedHeap() {
    let heapCopy = this.arr.slice(0);
    let sortedHeap = [];
    while (this.arr.length > 0) {
      sortedHeap.push(this.extractMin());
    }
    this.arr = heapCopy;
    this.sortedHeap = sortedHeap;
  }

  extractMin() {
    const root = this.arr[0];
    this.arr[0] = this.arr[this.arr.length - 1];
    this.arr.length--;
    this._heapifyDown(0);
    this._updateSortedHeap();
    return root;
  }
}

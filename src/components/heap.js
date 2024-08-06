import { formatDateToYYYYMMDD } from "../utils/index.js";

export class Heap {
  constructor(arr = [], sortedHeap = []) {
    this.arr = arr;
    this.sortedHeap = sortedHeap;
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

  indexOf(id) {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].getID() === id) {
        return i;
      }
    }
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

  insert(task) {
    this.arr.push(task);
    this._heapifyUp(this.arr.length - 1);
    this.updateSortedHeap();
  }

  insertMany(tasks) {
    for (let task of tasks) {
      this.arr.push(task);
      this._heapifyUp(this.arr.length - 1);
    }
    this.updateSortedHeap();
  }

  extractMin() {
    const root = this.arr[0];
    this.arr[0] = this.arr[this.arr.length - 1];
    this.arr.pop();
    this._heapifyDown(0);
    this.sortedHeap.shift();
    return root;
  }

  delete(task) {
    let i = 0;
    while (i < this.arr.length) {
      if (this.arr[i].getID() === task.getID()) {
        break;
      }
      i++;
    }
    if (i === this.arr.length) {
      console.log("Element not found in delete");
      return;
    } else {
      console.log("Element found in delete");
    }

    this._swap(i, this.arr.length - 1);
    this.arr.pop();
    if (i === this.arr.length - 1) {
      this.updateSortedHeap();
      return;
    }

    let parentIndex = this._getParentIndex(i);
    let parent = this.arr[parentIndex];
    if (parent && parent.compare(this.arr[i]) < 0) {
      this._swap(parentIndex, i);
      this._heapifyUp(parentIndex);
    } else {
      this._heapifyDown(i);
    }
    this.updateSortedHeap();
  }

  updateElement(task, newData) {
    console.log(newData)
    let i = this.indexOf(task.getID());
    if (i === -1) {
      console.log("Element not found in updateElement");
      return;
    }

    const { description, dueDate, priority } = newData;
    console.log(description, dueDate, priority)
    task.setDescription(description);
    if (formatDateToYYYYMMDD(task.getDueDate()) !== dueDate || task.getPriority() !== priority) {
      task.setDueDate(dueDate);
      task.setPriority(priority);
      let parentIndex = this._getParentIndex(i);
      let parent = this.arr[parentIndex];
      if (parent && parent.compare(task) < 0) {
        this._swap(parentIndex, i);
        this._heapifyUp(parentIndex);
      } else {
        this._heapifyDown(i);
      }
      this.updateSortedHeap();
    }
  }

  updateSortedHeap() {
    let heapCopy = this.arr.slice(0);
    let sortedHeap = [];
    while (this.arr.length > 0) {
      let root = this.extractMin();
      sortedHeap.push(root);
    }
    this.arr = heapCopy;
    this.sortedHeap = sortedHeap;
    return this.sortedHeap;
  }
}

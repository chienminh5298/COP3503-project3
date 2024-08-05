import { getRandomInt, getRandomPriority, getRandomFutureDate } from "../utils/index.js";
import { nouns, verbs, names, adverbs } from "../components/words";
import { Heap } from "../components/heap.js";

export class Task {
  constructor({ id, title, description, dueDate, priority }) {
    this.id = id || crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate instanceof Date ? dueDate : new Date(`${dueDate}T00:00:00.000`);
    this.priority = priority; // "High", "Medium", "Low"
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isResolved = false;
  }

  json() {
    return { ...this };
  }

  print() {
    console.log(`ID: ${this.id}`);
    console.log(`Title: ${this.title}`);
    console.log(`Description: ${this.description}`);
    console.log(`Priority: ${this.priority}`);
    console.log(`Due date: ${this.dueDate}`);
    console.log(`Created at: ${this.createdAt}`);
    console.log(`Updated at: ${this.updatedAt}`);
  }

  // Setter functions also update 'updatedAt' to the current time
  setID(id) {
    this.id = id;
    this.updatedAt = new Date();
  }

  setTitle(title) {
    this.title = title;
    this.updatedAt = new Date();
  }

  setDescription(description) {
    this.description = description;
    this.updatedAt = new Date();
  }

  setPriority(priority) {
    this.priority = priority;
    this.updatedAt = new Date();
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate instanceof Date ? dueDate : new Date(`${dueDate}T00:00:00.000`);
    this.updatedAt = new Date();
  }

  setResolved() {
    this.isResolved = true;
    this.updatedAt = new Date();
  }

  // Comparison method - returns 1 if 'this' is a higher overall priority, -1 if 'other' is higher, 0 if same
  // Considers priority first, then due date, then created date
  compare(otherTask) {
    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    // Prioritize earlier due dates
    if (this.dueDate < otherTask.dueDate) {
      return 1;
    } else if (this.dueDate > otherTask.dueDate) {
      return -1;
    }

    const thisPriority = priorityOrder[this.priority];
    const otherPriority = priorityOrder[otherTask.priority];

    if (thisPriority > otherPriority) {
      return 1;
    } else if (thisPriority < otherPriority) {
      return -1;
    }

    // Prioritize earlier creation dates
    if (this.createdAt < otherTask.createdAt) {
      return 1;
    } else if (this.createdAt > otherTask.createdAt) {
      return -1;
    }

    return 0;
  }
}

export function createRandomTask() {
  let verb = verbs[getRandomInt(0, verbs.length - 1)];
  let name = names[getRandomInt(0, names.length - 1)];
  let noun = nouns[getRandomInt(0, nouns.length - 1)].toLowerCase();
  let adverb = adverbs[getRandomInt(0, adverbs.length - 1)].toLowerCase();
  let determiner;
  let determinerInt = getRandomInt(0, 3);
  if (determinerInt === 0) {
    determiner = "the";
  } else if (determinerInt === 1) {
    determiner = "my";
  } else if (determinerInt === 2) {
    determiner = `${name}'s`;
  }

  let title = `${verb} ${determiner} ${noun} ${adverb}`;
  let description = `${title} and do it super well and on time, making everyone happy.`;
  let priority = getRandomPriority();
  let dueDate = getRandomFutureDate();
  let task = new Task({ title, description, dueDate, priority });
  return task;
}

export function createRandomTaskHeap(numTasks) {
  const heap = new Heap();
  for (let i = 0; i < numTasks; i++) {
    heap.insert(createRandomTask());
  }
  return heap;
}

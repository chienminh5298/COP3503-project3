import { getRandomInt, getRandomPriority, getRandomFutureDate } from "../utils/index.js";
import { nouns, verbs, names, adverbs } from "../components/words";
import { Heap } from "../components/heap.js";
import { HashMap } from "../components/hashmap.js";

export class Task {
  constructor({ id, title, description, dueDate, priority }) {
    this.hashMap = new HashMap();
    this.hashMap.set("id", id || crypto.randomUUID());
    this.hashMap.set("title", title);
    this.hashMap.set("description", description);
    this.hashMap.set("priority", priority);
    this.hashMap.set("dueDate", dueDate instanceof Date ? dueDate : new Date(`${dueDate}T00:00:00.000`));
    this.hashMap.set("createdAt", new Date());
    this.hashMap.set("updatedAt", new Date());
    this.hashMap.set("isResolved", false);
  }

  json() {
    return { ...this };
  }

  print() {
    console.log(`ID: ${this.getID()}`);
    console.log(`Title: ${this.getTitle()}`);
    console.log(`Description: ${this.getDescription()}`);
    console.log(`Priority: ${this.getPriority()}`);
    console.log(`Due date: ${this.getDueDate()}`);
    console.log(`Created at: ${this.getCreatedAt()}`);
    console.log(`Updated at: ${this.getUpdatedAt()}`);
    console.log(`Is resolved: ${this.getIsResolved()}`);
  }

  // Setter functions also update 'updatedAt' to the current time
  setID(id) {
    this.hashMap.set("id", id);
    this.setUpdatedAt();
  }

  setTitle(title) {
    this.hashMap.set("title", title);
    this.setUpdatedAt();
  }

  setDescription(description) {
    console.log(description);
    this.hashMap.set("description", description);
    console.log(this.hashMap.get("description"));
    this.setUpdatedAt();
  }

  setPriority(priority) {
    this.hashMap.set("priority", priority);
    this.setUpdatedAt();
  }

  setDueDate(dueDate) {
    this.hashMap.set("dueDate", dueDate instanceof Date ? dueDate : new Date(`${dueDate}T00:00:00.000`));
    this.setUpdatedAt();
  }

  setResolved() {
    this.hashMap.set("isResolved", true);
    this.setUpdatedAt();
  }

  setUpdatedAt() {
    this.hashMap.set("updatedAt", new Date());
  }

  getIsResolved() {
    return this.hashMap.get("isResolved");
  }

  getID() {
    return this.hashMap.get("id");
  }

  getTitle() {
    return this.hashMap.get("title");
  }

  getDescription() {
    return this.hashMap.get("description");
  }

  getDueDate() {
    return this.hashMap.get("dueDate");
  }

  getPriority() {
    return this.hashMap.get("priority");
  }

  getCreatedAt() {
    return this.hashMap.get("createdAt");
  }

  getUpdatedAt() {
    return this.hashMap.get("updatedAt");
  }

  // Comparison method - returns 1 if 'this' is a higher overall priority, -1 if 'other' is higher, 0 if same
  // Considers priority first, then due date, then created date
  compare(task) {
    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    // Prioritize earlier due dates
    if (this.getDueDate() < task.getDueDate()) {
      return 1;
    } else if (this.getDueDate() > task.getDueDate()) {
      return -1;
    }

    const thisPriority = priorityOrder[this.getPriority()];
    const otherPriority = priorityOrder[task.getPriority()];

    if (thisPriority > otherPriority) {
      return 1;
    } else if (thisPriority < otherPriority) {
      return -1;
    }

    // Prioritize earlier creation dates
    if (this.getCreatedAt() < task.getCreatedAt()) {
      return 1;
    } else if (this.getCreatedAt() > task.getCreatedAt()) {
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
  let determinerInt = getRandomInt(0, 2);
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

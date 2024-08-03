export class Task {
    constructor(
            id = null,
            title = '',
            description = '',
            priority = "standard",
            dueDate = null,
            createdAt = new Date(),
            updatedAt = new Date()
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate ? new Date(dueDate) : null;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
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
        this.dueDate = new Date(dueDate);
        this.updatedAt = new Date();
    }

    // Comparison method - returns 1 if 'this' is a higher overall priority, -1 if 'other' is higher, 0 if same
    // Considers priority first, then due date, then created date
    compare(otherTask) {
        const priorityOrder =  {
            high: 3,
            medium: 2,
            standard: 1,
        };

        if (priorityOrder[this.priority] > priorityOrder[otherTask.priority]) {
            return 1;
        } else if (priorityOrder[this.priority] < priorityOrder[otherTask.priority]) {
            return -1;
        }

        // Prioritize earlier due dates
        if (this.dueDate < otherTask.dueDate) {
            return 1;
        } else if (this.dueDate > otherTask.dueDate) {
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
import Jabber from "jabber";

const jabber = new Jabber();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPriority() {
    const priorities = ["High", "Medium", "Standard"];
    return priorities[Math.floor(Math.random() * priorities.length)];
}

function getRandomFutureDate() {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + getRandomInt(1, 365));
    return futureDate;
}

function createRandomTask() {
    return {
        id: getRandomInt(1000000, 9999999),
        title: jabber.createParagraph(getRandomInt(10, 20)),
        priority: getRandomPriority(),
        expDate: getRandomFutureDate(),
        createdDate: new Date(),
        description: jabber.createParagraph(getRandomInt(30, 100)),
    };
}

export function formatDateToMMDDYYYY(date) {
    // Get the month, day, and year from the date object
    let month = date.getMonth() + 1; // Months are zero-based, so add 1
    let day = date.getDate();
    let year = date.getFullYear();

    // Add leading zeros if the month or day is a single digit
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    // Combine the components into the desired format
    return `${month}-${day}-${year}`;
}

export function formateDateToYYYYMMDD(date) {
    let month = date.getMonth() + 1; // Months are zero-based, so add 1
    let day = date.getDate();
    let year = date.getFullYear();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    return `${year}-${month}-${day}`;
}

export function createRandomTasksArray(numTasks) {
    const tasks = [];
    for (let i = 0; i < numTasks; i++) {
        tasks.push(createRandomTask());
    }
    return tasks;
}

// HashMap using powers of 31 w/ ASCII as hash function
// Implemented w/ separate chaining

export class HashMap {
    constructor(keyMap = new Array(5), maxLoadFactor = 0.75, entries = 0) {
        this.keyMap = keyMap; // array of arrays of pairs (also array): 0 | [ (key, val), (key, val), ... ]
        this.maxLoadFactor = maxLoadFactor
        this.entries = entries; // buckets in use
    }

    // Private
    _hash(key) {
        // 1. Hash function: powers of 31 with ASCII - multiply ascii value with 31^(index)
        let hashCode = 0;
        const PRIME = 31;
        for (let i = 0; i < key.length; i++) {
            let char = key[i];
            let charValue = char.charCodeAt(0);
            hashCode = hashCode + charValue * (PRIME ** i);
        }
        let index = hashCode % this.keyMap.length;
        return index;
    }

    _resize(){ // Doubles array buckets when array is just below maxLoadFactor, rehashes according to new size.
        const prevMap = this.keyMap;
        const prevSize = this.keyMap.length;
        this.keyMap = new Array (prevSize * 2);
        this.entries = 0;

        for (let i = 0; i < prevMap.length; i++) {
            if (Array.isArray(prevMap[i])) {
                for (let j = 0; j < prevMap[i].length; j++) {
                    this.set(prevMap[i][j][0], prevMap[i][j][1]);
                }
            }
        }
    }

    // Public
    set(key, value) { // Add a new key, value pair if it doesn't already exist.
        let index = this._hash(key);
        if (!this.keyMap.hasOwnProperty(index)) { // Index never before used
            this.keyMap[index] = [ [key, value] ]; // First pair in nested array
            this.entries++;
        }
        else { // Index exists
            // Check if key exists. If key is new, create new entry
            if (!this.contains(key)) {
                this.keyMap[index].push([key, value]);
                this.entries++;
            }
        }

        if ((this.entries + 1)/this.keyMap.length > this.maxLoadFactor) {
            this._resize();
        }
    }

    get(key) { // Returns value associated with key. Throws RangeError if key does not exist.
        let index = this._hash(key);
        let keyFound = false;
        if (Array.isArray(this.keyMap[index])) { // Index exists, look for key
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    keyFound = true;
                    return this.keyMap[index][i][1];
                }
            }

            if (keyFound === false) {
                throw RangeError("RangeError: Key not found.");
            }
        }
        else {
            throw RangeError("RangeError: Key not found.");
        }
    }

    delete(key){ // Removes key value pair associated with key. Returns true if operation successful. Throws RangeError if key does not exist.
        let index = this._hash(key);
        let keyDeleted = false;
        if (Array.isArray(this.keyMap[index])) { // Index exists, look for key
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    this.keyMap[index].splice(i, 1); // Remove the pair
                    this.entries--;
                    keyDeleted = true;
                }
            }
        }
        return keyDeleted;
    }

    contains(key) { // Returns true if map contains element with specific key
        let index = this._hash(key);
        let keyFound = false;
        if (Array.isArray(this.keyMap[index])) { // Index exists, look for key
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    keyFound = true;
                }
            }
        }
        return keyFound;
    }

    clear(){ // Deletes all values from hashmap, size = 50 (default)
        for (let i = 0; i < this.keyMap.length; i++) {
            this.keyMap[i] = null;
        }
        this.keyMap = new Array(5);
        this.entries = 0;
    }

    getKeys() { // Returns an array of all keys
        let keyArray = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (Array.isArray(this.keyMap[i])) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    keyArray.push(this.keyMap[i][j][0]);
                }
            }
        }
        return keyArray;
    }

    getValues() { // Returns an array of all values
        let valArray = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (Array.isArray(this.keyMap[i])) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    valArray.push(this.keyMap[i][j][1]);
                }
            }
        }
        return valArray;
    }
}

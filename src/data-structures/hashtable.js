class HashTable {
  constructor() {
    this.capacity = 8;
    this.storage = new Array(this.capacity);
    this.size = 0;
    this._initializeStorage();
  }

  _initializeStorage() {
    for (let i = 0; i < this.capacity; i++) {
      this.storage[i] = [];
    }
  }

  set(key, value) {
    if (this.size / this.capacity > 0.75) {
      this._grow();
    }

    const index = this._hash(key);
    const exitingEntry = this._findInBucket(index, key);
    if (exitingEntry) {
      exitingEntry[1] = value;
    } else {
      this._insertAt(index, key, value);
    }
  }

  get(key) {
    const entry = this._findInBucket(this._hash(key), key);
    return (entry === undefined ? [, undefined] : entry)[1];
  }

  remove(key) {
    if (this.size / this.capacity < 0.25) {
      this._shrink();
    }

    const index = this._hash(key);
    const entryIndex = this.storage[index].findIndex(
      (entry) => entry[0] === key
    );
    if (entryIndex === -1) return false;
    this.storage[index].splice(entryIndex, 1);
    this.size--;

    return true;
  }

  entries() {
    let entries = [];
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.storage[i];
      if (bucket) {
        entries = [...entries, ...bucket];
      }
    }
    return entries;
  }

  _hash(string) {
    let result = 0;
    for (let char of string) {
      result += result ^ char.charCodeAt();
    }
    return result % this.capacity;
  }

  _findInBucket(index, key) {
    return this.storage[index].find((entry) => entry[0] === key);
  }

  _updateCapcity(newCapacity) {
    const entries = this.entries();
    this.capacity = newCapacity;
    this._initializeStorage();
    entries.forEach(([key, value]) => {
      this._insertAt(this._hash(key), key, value);
    });
  }

  _insertAt(index, key, value) {
    this.storage[index].push([key, value]);
    this.size++;
  }

  _grow() {
    this._updateCapcity(this.capacity * 2);
  }

  _shrink() {
    this._updateCapcity(Math.ceil(this.capacity / 2));
  }
}

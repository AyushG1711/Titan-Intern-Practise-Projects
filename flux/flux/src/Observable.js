// class bridge
// // callbacks => map("event", callback[]);
// trigger/emit("event", params)
// callbacks["event"].map(cb => cb(params))
// listen("event", cb) => this.callbacks[event].push(cb)
class Observable {
  constructor() {
    this.observers = new Map();
  }
  subscribe(event, cb) {
    if (!this.observers.has(event)) {
      this.observers[event] = new Set();
    }
    this.observers[event].add(cb);
  }
  unsubscribe(event, cb) {
    this.observers[event].delete(cb);
  }
  notify(event) {
    this.observers[event].forEach((cb) => {
      cb();
    });
  }
}
export default new Observable();

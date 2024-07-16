// import { Dispatcher } from "flux";
// import { EventEmitter } from "events";
// export const dispatcher = new Dispatcher();

// class MoviesStore extends EventEmitter {
//   movies = [{ name: "a" }, { name: "b" }];
//   constructor() {
//     super();
//     //when store is initiated, register the reducer whom to call whenever an action obj is dispatched
//     dispatcher.register((action) => {
//       if (action.type === "ADD_MOVIE") {
//         //update the movies list
//         const { newMovie } = action;
//         console.log(newMovie);
//         this.movies.push(newMovie);
//         console.log(this.movies);
//         //emit the event so that callback registered by different components will be called
//         bridge.emit("CHANGE");
//       } else if (action.type === "DELETE_MOVIE") {
//         const { idx } = action;
//         this.movies = this.movies.filter((obj, index) => {
//           return index !== idx;
//         });
//         this.emit("CHANGE");
//       }
//     });
//   }
//   getMovies() {
//     return this.movies;
//   }
//   addChangeListener(callback) {
//     this.on("CHANGE", callback);
//   }
//   removeChangeListener(callback) {
//     this.removeListener("CHANGE", callback);
//   }
// }
// export default new MoviesStore();
import observable from "./Observable";
class Store {
  constructor() {
    this.movies = [];
    this.isLoggedIn = false;
  }
  dispatch({ type, payload }) {
    //reducers
    switch (type) {
      case "ADD_MOVIE":
        this.movies.push(payload);
        observable.notify("MOVIES_CHANGE");
      default:
    }
  }
}
export default new Store();

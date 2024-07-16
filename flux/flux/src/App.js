import { useEffect, useRef, useState } from "react";
import "./App.css";
// import MovieStore, { dispatcher } from "./store";
import store from "./store";
import observable from "./Observable";
function App() {
  const [filteredMovies, setFilteredMovies] = useState([...store.movies]);
  const _onChange = () => {
    setFilteredMovies(() => [...store.movies]);
  };
  useEffect(() => {
    observable.subscribe("MOVIES_CHANGE", _onChange);
    return () => observable.unsubscribe("MOVIES_CHANGE", _onChange);
  }, []);
  return (
    <div className="App">
      <div>
        {filteredMovies.map((movie, index) => {
          return (
            <div>
              <div>{movie.name}</div>

              {/* <button
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  store.dispatch({
                    type: "DELETE_MOVIE",
                    idx: index,
                  });
                }}
              >
                Delete
              </button> */}
            </div>
          );
        })}
        <button
          style={{ backgroundColor: "green" }}
          onClick={() => {
            store.dispatch({
              type: "ADD_MOVIE",
              payload: { name: "c" },
            });
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;

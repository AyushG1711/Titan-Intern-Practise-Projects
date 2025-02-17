import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./vanguard/redux/store";
import { Provider } from "react-redux";
import registerTGSubscriptions from "./tailgate/subscriptions";

registerTGSubscriptions();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

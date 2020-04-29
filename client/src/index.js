import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/reducers/rootReducer";
import { setUser, logout } from "./redux/actions/authActions";
import jwt_decode from "jwt-decode";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//load user when refresh
if (localStorage.getItem("jwt")) {
  const currentTime = Date.now() / 1000;
  const token = localStorage.getItem("jwt");
  const decoded = jwt_decode(token);

  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/Login";
  } else {
    store.dispatch(setUser(token));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();

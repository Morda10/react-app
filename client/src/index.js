import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { setUser, logout, setToken } from "./redux/reducers/UserReducer";
import jwt_decode from "jwt-decode";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// // load user when refresh
// if (localStorage.getItem("jwt")) {
//   const currentTime = Date.now() / 1000;
//   const token = localStorage.getItem("jwt");
//   const decoded = jwt_decode(token);

//   if (decoded.exp < currentTime) {
//     store.dispatch(logout());
//     window.location.href = "/Login";
//   } else {
//     store.dispatch(setUser(token));
//   }
// }

const persistStorage = JSON.parse(localStorage.getItem("persist:root"));
// console.log(persistStorage);

//load user when refresh
if (persistStorage && persistStorage.token !== null) {
  try {
    const currentTime = Date.now() / 1000;
    const t = persistStorage.token;
    // console.log(persistStorage.token);
    let decoded;
    decoded = jwt_decode(persistStorage.token);
    if (decoded.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/Login";
    } else {
      // console.log(persistStorage.token)
      store.dispatch(setUser({user: persistStorage.token}));
      store.dispatch(setToken({token: t}));
    }
  } catch (e) {
    console.log(e.message);
  }
}

ReactDOM.render(
  <Provider store={store}>
  {/* <MuiThemeProvider theme={theme}>
      <CssBaseline /> */}
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    {/* </MuiThemeProvider> */}
  </Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();

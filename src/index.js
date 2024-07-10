import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./pages/router";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./storage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router />
        </Provider>
    </React.StrictMode>
);

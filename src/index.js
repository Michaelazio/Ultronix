import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Provider } from "react-redux";
import {store, persistor} from "./Redux/store";
import {ecommerceAPI}  from "./Redux/api";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApiProvider api={ecommerceAPI}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </ApiProvider>
);



import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import OverlayLoader from "./components/Spinner/OverlayLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <React.Suspense fallback={<OverlayLoader />}>
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer />
    </React.Suspense>
  </React.StrictMode>
);

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// import AppRoutes from "app.routes";

import "./app.css";
import PageAsideComp from "./components/aside.comp";
import ErrorBoundaryComp from "./components/error-boundary.comp";
import PageNavBarComp from "./components/navbar.comp";
import store from "./store";

function App() {
  return (
    <ErrorBoundaryComp>
      <Provider store={store}>
        <Router>
          {/* <AppRoutes /> */}
          <PageAsideComp />
        </Router>
      </Provider>
    </ErrorBoundaryComp>
  );
}

export default App;

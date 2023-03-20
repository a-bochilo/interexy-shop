// ========================== react ==========================
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

// ========================== mui ==========================
import { ThemeProvider } from "@mui/material";

// ========================== components ==========================
import ErrorBoundaryComp from "./components/error-boundary.comp";

import PageHeaderComp from "./components/page-header.comp";

import store from "./store";
import ProductsPage from "./app/products/products-page";

function App() {
  return (
    <ErrorBoundaryComp>
      <Provider store={store}>

        <Router>
          {/* <AppRoutes /> */}
          <PageHeaderComp />
        </Router>

      </Provider>
    </ErrorBoundaryComp>
  );
}

export default App;

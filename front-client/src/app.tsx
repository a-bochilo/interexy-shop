// ========================== react ==========================
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

// ========================== components ==========================
import ErrorBoundaryComp from "./components/error-boundary.comp";

// import AppRoutes from "app.routes";
import "./app.css";
import store from "./store";
import ProductsPage from "./app/products/products-page";

function App() {
  return (
    <ErrorBoundaryComp>
      <Provider store={store}>
        <Router>
          {/* <AppRoutes /> */}
          <ProductsPage />
        </Router>
      </Provider>
    </ErrorBoundaryComp>
  );
}

export default App;

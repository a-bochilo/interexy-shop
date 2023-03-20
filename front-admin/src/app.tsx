import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// import AppRoutes from "app.routes";

import "./app.css";
import ErrorBoundaryComp from "./components/error-boundary.comp";

import LoginForm from "./components/login-form.comp";

import store from "./store";

function App() {
  return (
    <ErrorBoundaryComp>
      <Provider store={store}>
        <Router>
          {/* <AppRoutes /> */}
          <div>Front-Admin</div>

          <LoginForm />

        </Router>
      </Provider>
    </ErrorBoundaryComp>
  );
}

export default App;

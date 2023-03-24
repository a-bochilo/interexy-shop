import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./app.routes";

// ========================== mui ==========================
import { ThemeProvider } from "@mui/material";
// ========================== etc ==========================
import theme from "./theme/mainTheme";

import "./app.css";
import ErrorBoundaryComp from "./components/error-boundary.comp";

import store from "./store";

function App() {
    return (
        <ErrorBoundaryComp>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Router>
                        <AppRoutes />
                    </Router>
                </ThemeProvider>
            </Provider>
        </ErrorBoundaryComp>
    );
}

export default App;

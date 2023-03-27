// ========================== react ==========================
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

// ========================== mui ==========================
import { ThemeProvider } from "@mui/material";

// ========================== components ==========================
import ErrorBoundaryComp from "./components/error-boundary.comp";

// ========================== etc ==========================
import theme from "./theme/mainTheme";
import store from "./store";
import AppRoutes from "./app.routes";
import "./app.css";

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

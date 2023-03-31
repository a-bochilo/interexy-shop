// ========================== react ==========================
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

// ========================== routes ==========================
import AppRoutes from "./app.routes";

// ========================== mui =============================
import { ThemeProvider } from "@mui/material";

// ========================== components ======================
import ErrorBoundaryComp from "./components/error-boundary.comp";

// ========================== store ==========================
import store from "./store";

// ========================== styles ==========================
import "./app.css";
import theme from "./theme/mainTheme";

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

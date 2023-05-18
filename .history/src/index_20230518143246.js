import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { AuthProvider } from "context/Auth";

ReactDOM.render(
  <BrowserRouter>
  <AuthProvider>
  </AuthProvider>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

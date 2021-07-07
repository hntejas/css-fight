import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import UserContextProvider from "./store/user/userContext";
import FightsContextProvider from "./store/fights/fightsContext";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <UserContextProvider>
      <FightsContextProvider>
        <Router>
          <App />
        </Router>
      </FightsContextProvider>
    </UserContextProvider>
  </StrictMode>,
  rootElement
);

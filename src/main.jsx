import { ClerkProvider } from "@clerk/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store/reduxStore.js";
import { DataProvider } from "./store/contextStore.jsx";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
        <Provider store={store}>
          <App />
        </Provider>
      </ClerkProvider>
    </DataProvider>
  </StrictMode>,
);

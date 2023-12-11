import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { AuthContextProvider } from "./contexts/AuthContextProvider";
import { NotificationContextProvider } from "./contexts/NotificationContextProvider";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { store } from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <BrowserRouter>
      <ThemeContextProvider>
        <Provider store={store}>
          <NotificationContextProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </NotificationContextProvider>
        </Provider>
      </ThemeContextProvider>
    </BrowserRouter>
  </>
);

serviceWorkerRegistration.register();

import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import ScrollToTop from "./components/feature/ScrollToTop";
import PasswordGate from "./components/feature/PasswordGate";

function App() {
  return (
    <PasswordGate>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter basename={__BASE_PATH__}>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </I18nextProvider>
    </PasswordGate>
  );
}

export default App;

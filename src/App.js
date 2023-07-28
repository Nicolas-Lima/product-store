import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";

import AuthProvider from "./contexts/auth";
import StoreProvider from "./contexts/store";

import "./css/app.css";
import "./css/bootstrap-utilities.css";
import "./css/pico-bootstrap-grid.css";

function App() {

  alert("Comitar arquivo por arquivo detalhadamente!")

  alert(`redirectTo="/login" redirectMessage="Faça login!" Ná pagina "Error"`)

  return (
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <RoutesApp />
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

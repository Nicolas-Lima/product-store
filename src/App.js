import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";

import "./css/app.css";
import "./css/bootstrap-utilities.css";
import "./css/pico-bootstrap-grid.css";

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}

export default App;

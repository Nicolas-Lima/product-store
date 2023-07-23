import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import Error from "../pages/Error";

function RoutesApp() {
  return (
    <Routes>
      <Route to="/" element={<Home />} />
      <Route to="*" element={<Error />} />
    </Routes>
  );
}

export default RoutesApp
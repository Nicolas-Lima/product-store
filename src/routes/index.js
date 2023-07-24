import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default RoutesApp
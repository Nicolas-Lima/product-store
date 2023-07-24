import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";
import Private from "./Private";

import FormProvider from "../contexts/form";

function RoutesApp() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Private>
            <Home />
          </Private>
        }
      />
      <Route
        path="/login"
        element={
          <FormProvider>
            <Login />
          </FormProvider>
        }
      />
      <Route
        path="/register"
        element={
          <FormProvider>
            <Register />
          </FormProvider>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default RoutesApp;

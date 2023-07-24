import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth"

function Private({ children }) {
  const { userSigned } = useContext(AuthContext);

  if (!userSigned) {
    <Navigate to="/" />
  }

  return children;
}

export default Private;

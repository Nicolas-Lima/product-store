import { Link } from "react-router-dom";

function ErrorComponent({ message, redirectTo, redirectMessage }) {
  return (
    <div className="d-flex flex-column align-items-center mt-5 ps-3 pe-2">
      <h1 className="text-secondary fw-semibold mt-1">{message}</h1>
      <Link
        to={redirectTo ? redirectTo : "/"}
        className="fs-5 p-3 rounded">
        {redirectMessage
          ? redirectMessage
          : "Voltar para a página inicial"}
      </Link>
    </div>
  );
}

export default ErrorComponent;

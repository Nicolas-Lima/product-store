import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="d-flex flex-column align-items-center mt-5 ps-3 pe-2">
      <h1 className="text-secondary fw-semibold mt-1">
        Não conseguimos encontrar esta página!
      </h1>
      <Link to="/" className="fs-5 p-3 rounded">
        Voltar para a página inicial
      </Link>
    </div>
  );
}

export default Error;

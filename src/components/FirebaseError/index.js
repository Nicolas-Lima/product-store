function FirebaseError() {
  return (
    <div className="d-flex flex-column align-items-center mt-5 ps-3 pe-2">
      <h1 className="text-danger fw-semibold mt-1">Problema de conexão</h1>
      <h4 className="w-auto text-center fw-normal">
        <span className="d-block mb-1">
          Não foi possível estabelecer conexão com o servidor.
        </span>
        <span className="text-decoration-underline">
          Por favor, verifique sua conexão com a internet e tente
          novamente!
        </span>
      </h4>
    </div>
  )
}

export default FirebaseError

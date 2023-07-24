import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

function Login() {
  return (
    <div className="container py-0">
      <div className="row justify-content-center gx-sm-5 mb-4 mt-2-3rem">
        <div className="col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">
          <article className="shadow-lg pt-0">
            <header className="text-center mb-4 d-flex justify-content-center">
              <strong className="me-3">Logar</strong>
            </header>
            <LoginForm />
            <div className="mb-2 mt-2-3rem">
              <span style={{ marginRight: "8px" }}>
                Não possui uma conta?
              </span>
              <Link to="/register">Registre-se agora</Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default Login;

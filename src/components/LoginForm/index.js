import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../contexts/form";
import { AuthContext } from "../../contexts/auth";
import PasswordToggle from "../PasswordToggle";

function LoginForm() {
  const [credentialsError, setCredentialsError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showingPassword } = useContext(FormContext);
  const { userSigned, signIn, loggingIn, setLoggingIn } =
    useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (userSigned) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoggingIn(true);
    const { credentialsError } = await signIn(email, password);
    if (credentialsError) {
      setCredentialsError(credentialsError);
    }
    setLoggingIn(false);
  };

  return (
    <form
      method="post"
      className="mb-0"
      id="login"
      noValidate
      onSubmit={handleSubmit}>
      <div className="d-flex flex-column mb-2">
        <label className="mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <div>
          <label className="my-2" htmlFor="password">
            Senha
          </label>
          <input
            type={showingPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {password.length > 0 && <PasswordToggle />}
        </div>
      </div>

      <div className="mt-1 mb-4 text-pico-danger">{credentialsError}</div>

      {loggingIn ? (
        <button type="submit mt-0" aria-busy="true" className="secondary">
          Logando
        </button>
      ) : (
        <button type="submit mt-0">Logar</button>
      )}
    </form>
  );
}

export default LoginForm;

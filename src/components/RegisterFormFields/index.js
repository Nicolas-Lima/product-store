import { useContext, useEffect } from "react";
import { FormContext } from "../../contexts/form";
import PasswordToggle from "../PasswordToggle";
import { capitalizeFirstLetter } from "../../utils/generalUtils";

function RegisterFormFields(props) {
  const { fullName, setFullName, email, setEmail, password, setPassword } =
    props;
  const {
    fullNameInputStarted,
    setFullNameInputStarted,
    fullNameError,
    emailInputStarted,
    setEmailInputStarted,
    emailError,
    formSubmitted,
    passwordInputStarted,
    setPasswordInputStarted,
    showingPassword,
    passwordError,
  } = useContext(FormContext);

  const handleFullNameInput = e => {
    setFullName(capitalizeFirstLetter(e.target.value));
    if (!fullNameInputStarted) {
      setFullNameInputStarted(true);
    }
  };

  return (
    <div className="d-flex flex-column mb-4">
      <label className="mb-2" htmlFor="fullName">
        Nome
      </label>
      <input
        type="text"
        id="fullName"
        placeholder="Digite seu nome e sobrenome"
        value={fullName}
        onChange={handleFullNameInput}
        aria-invalid={
          fullNameInputStarted || formSubmitted
            ? fullNameError
              ? "true"
              : "false"
            : ""
        }
      />
      <div
        className={`mt-1 mb-2 ${fullNameError ? "d-initial" : "d-none"}`}>
        <span className="name-error text-pico-danger">
          {fullNameError}
        </span>
      </div>

      <label className="mb-2 mt-2" htmlFor="email">
        Email
      </label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Digite seu email"
        value={email}
        onChange={e => {
          setEmail(e.target.value);
          if (!emailInputStarted) {
            setEmailInputStarted(true);
          }
        }}
        aria-invalid={
          emailInputStarted || formSubmitted
            ? emailError
              ? "true"
              : "false"
            : ""
        }
      />
      <div className={`mt-1 mb-2 ${emailError ? "d-initial" : "d-none"}`}>
        <span className="email-error text-pico-danger">{emailError}</span>
      </div>

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
          onChange={e => {
            setPassword(e.target.value);
            if (!passwordInputStarted) {
              setPasswordInputStarted(true);
            }
          }}
          aria-invalid={
            passwordInputStarted || formSubmitted
              ? passwordError
                ? "true"
                : "false"
              : ""
          }
        />
        {password.length > 0 && <PasswordToggle />}
      </div>
      <div
        className={`mt-1 mb-2 ${passwordError ? "d-initial" : "d-none"}`}>
        <span className="password-error text-pico-danger">
          {passwordError}
        </span>
      </div>
    </div>
  );
}

export default RegisterFormFields;

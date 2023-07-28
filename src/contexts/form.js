import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";

const FormContext = createContext({});

function FormProvider({ children }) {
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fullNameInputStarted, setFullNameInputStarted] = useState(false);
  const [emailInputStarted, setEmailInputStarted] = useState(false);
  const [passwordInputStarted, setPasswordInputStarted] = useState(false);
  const [showingPassword, setShowingPassword] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    setEmailInputStarted(false);
    setPasswordInputStarted(false);
    setFullNameInputStarted(false);
    setFormSubmitted(false);
  }, [location.pathname]);

  const contextValue = {
    fullNameError,
    setFullNameError,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    formSubmitted,
    setFormSubmitted,
    fullNameInputStarted,
    setFullNameInputStarted,
    emailInputStarted,
    setEmailInputStarted,
    passwordInputStarted,
    setPasswordInputStarted,
    showingPassword,
    setShowingPassword,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
}

export { FormContext };
export default FormProvider;

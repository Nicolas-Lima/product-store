import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FormContext } from '../../contexts/form'
import { AuthContext } from '../../contexts/auth'

import {
  validateEmailWithMessage,
  validatePasswordWithMessage,
  validateFullNameWithMessage
} from '../../utils/validationUtils'

import RegisterFormFields from '../../components/RegisterFormFields'

function RegisterForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    setFullNameError,
    fullNameInputStarted,
    setEmailError,
    emailInputStarted,
    setFormSubmitted,
    setPasswordError,
    passwordInputStarted
  } = useContext(FormContext)

  const { userSigned, signUp, registering, setRegistering } =
    useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (userSigned) {
      navigate('/')
    }
  }, [userSigned])

  useEffect(() => {
    if (emailInputStarted) {
      validateEmail()
    }
  }, [email])

  useEffect(() => {
    if (passwordInputStarted) {
      validatePassword()
    }
  }, [password])

  useEffect(() => {
    if (fullNameInputStarted) {
      validateFullName()
    }
  }, [fullName])

  const validateEmail = () => {
    const { isValid, errorMessage } = validateEmailWithMessage(email)
    setEmailError(errorMessage)
    return isValid
  }

  const validatePassword = () => {
    const { isValid, errorMessage } = validatePasswordWithMessage(password)
    setPasswordError(errorMessage)
    return isValid
  }

  const validateFullName = () => {
    const { isValid, errorMessage } = validateFullNameWithMessage(fullName)
    setFullNameError(errorMessage)
    return isValid
  }

  const handleSubmit = async e => {
    e.preventDefault()

    setFormSubmitted(true)

    const isFullNameValid = validateFullName()
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()

    if (!isEmailValid || !isPasswordValid || !isFullNameValid) {
      return
    }

    setRegistering(true)
    const { emailError, passwordError } = await signUp(
      email,
      password,
      fullName
    )
    setEmailError(emailError)
    setPasswordError(passwordError)
    setRegistering(false)
  }

  return (
    <div className="container py-0">
      <div className="row justify-content-center gx-sm-5 mb-4 mt-5 mt-sm-4 mt-md-3 mt-lg-0">
        <div className="col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">
          <article className="shadow-lg pt-0">
            <header className="text-center mb-4 d-flex justify-content-center">
              <strong className="me-3">Registrar</strong>
            </header>
            <form
              method="post"
              className="form-register mb-0"
              onSubmit={handleSubmit}
              id="register"
              noValidate>
              <RegisterFormFields
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
              {registering ? (
                <button
                  type="submit mt-0"
                  aria-busy="true"
                  className="secondary">
                  Registrando
                </button>
              ) : (
                <button type="submit mt-0">Registrar</button>
              )}
            </form>
            <div className="mb-2 mt-2-3rem">
              <span style={{ marginRight: '8px' }}>
                Você já tem uma conta?
              </span>
              <Link to="/login">Fazer login</Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm

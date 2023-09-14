import FormRegister from '../../components/RegisterForm'
import Nav from '../../components/Nav'

function Register() {
  document.title = 'Registrar'
  return (
    <>
      <Nav />
      <FormRegister />
    </>
  )
}

export default Register

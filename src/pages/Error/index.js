import ErrorComponent from '../../components/ErrorComponent'

function Error() {
  document.title = 'Página não encontrada!'

  return (
    <ErrorComponent message="Não conseguimos encontrar esta página!" />
  )
}

export default Error

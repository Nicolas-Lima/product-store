import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  validateCnpjWithMessage,
  validateBrandNameWithMessage
} from '../../utils/validationUtils'
import { IMaskInput } from 'react-imask'

function RegisterSellerForm({
  newSeller,
  setNewSeller,
  newSellerErrorMessages,
  formSubmitted,
  handleRegisterSeller,
  termsAgreed,
  setTermsAgreed,
  registering,
  updateNewSellerErrorMessages
}) {
  const [cnpjInputStarted, setCnpjInputStarted] = useState(false)
  const [brandNameInputStarted, setBrandNameInputStarted] = useState(false)

  const locationOrigin = window.location.origin

  useEffect(() => {
    const { errorMessage: cnpjErrorMessage } = validateCnpjWithMessage(
      newSeller?.cnpj
    )
    updateNewSellerErrorMessages({ cnpj: cnpjErrorMessage })
  }, [newSeller?.cnpj])

  useEffect(() => {
    const { errorMessage: brandNameErrorMessage } =
      validateBrandNameWithMessage(newSeller?.brandName)
    updateNewSellerErrorMessages({
      brandName: brandNameErrorMessage
    })
  }, [newSeller?.brandName])

  useEffect(() => {
    updateNewSellerErrorMessages({
      sellerTermsAndConditions: termsAgreed
        ? ''
        : 'Você precisa de aceitar os termos e condições!'
    })
  }, [newSeller?.sellerTermsAndConditions, termsAgreed])

  return (
    <form onSubmit={handleRegisterSeller}>
      <label htmlFor="cnpj" className="w-100">
        CNPJ
        <IMaskInput
          mask="00.000.000/0001-00"
          aria-invalid={
            cnpjInputStarted || formSubmitted
              ? !!newSellerErrorMessages?.cnpj
              : ''
          }
          type="text"
          value={newSeller?.cnpj}
          onAccept={value => {
            setNewSeller(prevState => {
              return { ...prevState, cnpj: value }
            })
            setCnpjInputStarted(true)
          }}
          placeholder="Digite seu CNPJ"
          id="cnpj"
          className="mb-2"
          maxLength={18}
        />
      </label>
      <div className="mb-3 mt-0 text-danger">
        {newSellerErrorMessages?.cnpj &&
          (cnpjInputStarted || formSubmitted) &&
          newSellerErrorMessages?.cnpj}
      </div>
      <label htmlFor="brandName" className="w-100">
        Nome da sua marca
        <input
          aria-invalid={
            brandNameInputStarted || formSubmitted
              ? !!newSellerErrorMessages?.brandName
              : ''
          }
          type="text"
          value={newSeller?.brandName}
          onChange={e => {
            setNewSeller(prevState => {
              return { ...prevState, brandName: e.target.value }
            })
            setBrandNameInputStarted(true)
          }}
          id="brandName"
          placeholder="Digite o nome da sua marca"
          className="mb-2"
          maxLength={20}
        />
      </label>
      <div className="mb-3 mt-0 text-danger">
        {newSellerErrorMessages?.brandName &&
          (brandNameInputStarted || formSubmitted) &&
          newSellerErrorMessages?.brandName}
      </div>
      <label htmlFor="sellerTermsAndConditions">
        <input
          type="checkbox"
          id="sellerTermsAndConditions"
          name="sellerTermsAndConditions"
          onChange={e => setTermsAgreed(e?.target?.checked)}
        />
        Eu concordo com os{' '}
        <Link
          to={`${locationOrigin}/sellerTermsAndConditions`}
          target="_blank">
          Termos e Condições
        </Link>
      </label>
      <div className="mb-3 mt-0 text-danger">
        {!termsAgreed &&
          formSubmitted &&
          newSellerErrorMessages?.sellerTermsAndConditions}
      </div>
      {registering ? (
        <button
          className="mt-2-3rem"
          type="submit"
          disabled
          aria-busy={true}>
          Cadastrando
        </button>
      ) : (
        <button className="mt-2-3rem" type="submit">
          Cadastrar como vendedor
        </button>
      )}
    </form>
  )
}

export default RegisterSellerForm

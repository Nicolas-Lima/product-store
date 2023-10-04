import { useState, useEffect } from 'react'
import CountrySelectOptions from '../CountrySelectOptions'
import { IMaskInput } from 'react-imask'

function NewCreditCardFormFields({
  newCreditCardInfo,
  fieldsErrorMessages,
  formSubmitted
}) {
  const [ownerName, setOwnerName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [cvv, setCVV] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('BR')

  useEffect(() => {
    Object.assign(newCreditCardInfo, {
      ownerName,
      cardNumber,
      expirationDate,
      cvv,
      billingAddress,
      city,
      state,
      postalCode,
      country
    })
  }, [
    newCreditCardInfo,
    ownerName,
    cardNumber,
    expirationDate,
    cvv,
    billingAddress,
    city,
    state,
    postalCode,
    country
  ])

  return (
    <>
      {/* Owner Name */}
      <label className="mb-0" htmlFor="ownerName">
        Nome no cartão
        <input
          {...(formSubmitted
            ? { 'aria-invalid': !!fieldsErrorMessages.ownerName }
            : {})}
          className="mb-0"
          type="text"
          id="ownerName"
          name="ownerName"
          placeholder="Nome no cartão"
          value={ownerName}
          onChange={e => setOwnerName(e.target.value)}
        />
      </label>
      <div className="mb-2 mt-2 text-danger">
        {fieldsErrorMessages.ownerName && fieldsErrorMessages.ownerName}
      </div>

      {/* Card Number */}
      <label className="mb-0" htmlFor="cardNumber">
        Número do Cartão
        <input
          {...(formSubmitted
            ? { 'aria-invalid': !!fieldsErrorMessages.cardNumber }
            : {})}
          className="mb-0"
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="Número do Cartão"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          maxLength={16}
        />
      </label>
      <div className="mb-2 mt-2 text-danger">
        {fieldsErrorMessages.cardNumber && fieldsErrorMessages.cardNumber}
      </div>

      {/* Expiration Date */}
      <label className="mb-0" htmlFor="expirationDate">
        Data de Validade
        <IMaskInput
          mask="00 / 00"
          {...(formSubmitted
            ? { 'aria-invalid': !!fieldsErrorMessages.expirationDate }
            : {})}
          className="mb-0"
          type="text"
          id="expirationDate"
          name="expirationDate"
          placeholder="MM / AA"
          value={expirationDate}
          onAccept={value => setExpirationDate(value)}
          maxLength={7}
        />
      </label>
      <div className="mb-2 mt-2 text-danger">
        {fieldsErrorMessages.expirationDate &&
          fieldsErrorMessages.expirationDate}
      </div>

      {/* CVV */}
      <label className="mb-0" htmlFor="cvv">
        CVV
        <input
          {...(formSubmitted
            ? { 'aria-invalid': !!fieldsErrorMessages.cvv }
            : {})}
          className="mb-0"
          type="password"
          id="cvv"
          name="cvv"
          placeholder="CVV"
          value={cvv}
          onChange={e => setCVV(e.target.value)}
          maxLength={4}
        />
      </label>
      <div className="mb-2 mt-2 text-danger">
        {fieldsErrorMessages.cvv && fieldsErrorMessages.cvv}
      </div>

      {/* Billing Address */}
      <label className="mb-0" htmlFor="billingAddress">
        Endereço de cobrança
        <input
          {...(formSubmitted
            ? { 'aria-invalid': !!fieldsErrorMessages.billingAddress }
            : {})}
          className="mb-0"
          type="text"
          id="billingAddress"
          name="billingAddress"
          placeholder="Endereço de cobrança"
          value={billingAddress}
          onChange={e => setBillingAddress(e.target.value)}
        />
      </label>
      <div className="mb-2 mt-2 text-danger">
        {fieldsErrorMessages.billingAddress &&
          fieldsErrorMessages.billingAddress}
      </div>

      {/* City */}
      <label className="mb-0" htmlFor="city">
        Cidade
        <input
          {...(formSubmitted
            ? { 'aria-invalid': !!fieldsErrorMessages.city }
            : {})}
          className="mb-0"
          type="text"
          id="city"
          name="city"
          placeholder="Cidade"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
      </label>
      <div className="mb-2 mt-2 text-danger">
        {fieldsErrorMessages.city && fieldsErrorMessages.city}
      </div>

      {/* State */}
      <label className="mb-0" htmlFor="state">
        Estado
        <input
          {...(formSubmitted
            ? { 'aria-invalid': !!fieldsErrorMessages.state }
            : {})}
          className="mb-0"
          type="text"
          id="state"
          name="state"
          placeholder="Estado"
          value={state}
          onChange={e => setState(e.target.value)}
        />
      </label>
      <div className="mb-2 mt-2 text-danger">
        {fieldsErrorMessages.state && fieldsErrorMessages.state}
      </div>

      {/* Postal Code */}
      <label
        htmlFor="postalCode"
        value={postalCode}
        onChange={e => setPostalCode(e.target.value)}>
        Código Postal
        <input
          {...(formSubmitted
            ? { 'aria-invalid': !!fieldsErrorMessages.postalCode }
            : {})}
          className="mb-0"
          type="text"
          id="postalCode"
          name="postalCode"
          placeholder="Código Postal"
        />
      </label>
      <div className="mb-2 mt-2 text-danger">
        {fieldsErrorMessages.postalCode && fieldsErrorMessages.postalCode}
      </div>

      {/* Country */}
      <label
        className="mb-0"
        htmlFor="country"
        onChange={e => setCountry(e.target.value)}>
        País
        <select id="country" name="country" defaultValue="BR">
          <CountrySelectOptions />
        </select>
      </label>
      <div className="mb-2 mt-2 text-danger">
        {fieldsErrorMessages.country && fieldsErrorMessages.country}
      </div>
    </>
  )
}

export default NewCreditCardFormFields

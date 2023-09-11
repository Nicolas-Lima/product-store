import { useEffect, useState } from 'react'

function UpdateDeliveryAddressForm({
  newDeliveryAddress,
  setNewDeliveryAddress,
  deliveryAddressErrorMessages,
  setStartedDeliveryForm
}) {
  const [streetAddressInputStarted, setStreetAddressInputStarted] =
    useState(false)
  const [cityInputStarted, setCityInputStarted] = useState(false)
  const [stateInputStarted, setStateInputStarted] = useState(false)
  const [postalCodeInputStarted, setPostalCodeInputStarted] =
    useState(false)

  useEffect(() => {
    if (
      streetAddressInputStarted ||
      cityInputStarted ||
      stateInputStarted ||
      postalCodeInputStarted
    ) {
      setStartedDeliveryForm(true)
    }
  }, [
    streetAddressInputStarted,
    cityInputStarted,
    stateInputStarted,
    postalCodeInputStarted,
    setStartedDeliveryForm
  ])

  return (
    <form onSubmit={e => e.preventDefault()} className="m-0">
      <div className="deliveryAddress">
        <label htmlFor="streetAddress" className="w-100">
          Logradouro
          <input
            className="mb-2"
            aria-invalid={
              streetAddressInputStarted
                ? !!deliveryAddressErrorMessages?.streetAddress
                : ''
            }
            type="text"
            value={newDeliveryAddress?.streetAddress}
            onChange={e => {
              setNewDeliveryAddress(prevState => {
                return {
                  ...prevState,
                  streetAddress: e.target.value
                }
              })
              setStreetAddressInputStarted(true)
            }}
            id="streetAddress"
            placeholder="Digite o logradouro"
          />
        </label>
        <div className="mb-3 mt-0 text-danger">
          {deliveryAddressErrorMessages?.streetAddress &&
            streetAddressInputStarted &&
            deliveryAddressErrorMessages?.streetAddress}
        </div>

        <label htmlFor="city" className="w-100">
          Cidade
          <input
            aria-invalid={
              cityInputStarted ? !!deliveryAddressErrorMessages?.city : ''
            }
            type="text"
            value={newDeliveryAddress?.city}
            onChange={e => {
              setNewDeliveryAddress(prevState => {
                return { ...prevState, city: e.target.value }
              })
              setCityInputStarted(true)
            }}
            id="city"
            placeholder="Digite a cidade"
            className="mb-2"
          />
        </label>
        <div className="mb-3 mt-0 text-danger">
          {deliveryAddressErrorMessages?.city &&
            cityInputStarted &&
            deliveryAddressErrorMessages?.city}
        </div>

        <label htmlFor="state" className="w-100">
          Estado
          <input
            aria-invalid={
              stateInputStarted
                ? !!deliveryAddressErrorMessages?.state
                : ''
            }
            type="text"
            value={newDeliveryAddress?.state}
            onChange={e => {
              setNewDeliveryAddress(prevState => {
                return { ...prevState, state: e.target.value }
              })
              setStateInputStarted(true)
            }}
            id="state"
            placeholder="Digite o estado"
            className="mb-2"
          />
        </label>
        <div className="mb-3 mt-0 text-danger">
          {deliveryAddressErrorMessages?.state &&
            stateInputStarted &&
            deliveryAddressErrorMessages?.state}
        </div>

        <label htmlFor="postalCode" className="w-100">
          Código Postal
          <input
            className="mb-2"
            aria-invalid={
              postalCodeInputStarted
                ? !!deliveryAddressErrorMessages?.postalCode
                : ''
            }
            type="text"
            value={newDeliveryAddress?.postalCode}
            onChange={e => {
              setNewDeliveryAddress(prevState => {
                return { ...prevState, postalCode: e.target.value }
              })
              setPostalCodeInputStarted(true)
            }}
            id="postalCode"
            placeholder="Digite o código postal"
          />
        </label>
        <div className="mb-3 mt-0 text-danger">
          {deliveryAddressErrorMessages?.postalCode &&
            postalCodeInputStarted &&
            deliveryAddressErrorMessages?.postalCode}
        </div>
      </div>
    </form>
  )
}

export default UpdateDeliveryAddressForm

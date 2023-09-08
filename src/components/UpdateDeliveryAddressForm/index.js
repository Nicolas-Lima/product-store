function UpdateDeliveryAddressForm({
  newDeliveryAddress,
  setNewDeliveryAddress,
  deliveryAddressErrorMessages
}) {
  return (
    <form onSubmit={e => e.preventDefault()} className="m-0">
      <div className="deliveryAddress">
        <label htmlFor="streetAddress" className="w-100">
          Logradouro
          <input
            className="mb-2"
            {...{
              'aria-invalid': !!deliveryAddressErrorMessages?.streetAddress
            }}
            type="text"
            value={newDeliveryAddress?.streetAddress}
            onChange={e =>
              setNewDeliveryAddress(prevState => {
                return { ...prevState, streetAddress: e.target.value }
              })
            }
            id="streetAddress"
            placeholder="Digite o logradouro"
          />
        </label>
        <div className="mb-3 mt-0 text-danger">
          {deliveryAddressErrorMessages?.streetAddress &&
            deliveryAddressErrorMessages?.streetAddress}
        </div>

        <label htmlFor="city" className="w-100">
          Cidade
          <input
            {...{
              'aria-invalid': !!deliveryAddressErrorMessages?.city
            }}
            type="text"
            value={newDeliveryAddress?.city}
            onChange={e =>
              setNewDeliveryAddress(prevState => {
                return { ...prevState, city: e.target.value }
              })
            }
            id="city"
            placeholder="Digite a cidade"
            className="mb-2"
          />
        </label>
        <div className="mb-3 mt-0 text-danger">
          {deliveryAddressErrorMessages?.city &&
            deliveryAddressErrorMessages?.city}
        </div>

        <label htmlFor="state" className="w-100">
          Estado
          <input
            {...{
              'aria-invalid': !!deliveryAddressErrorMessages?.state
            }}
            type="text"
            value={newDeliveryAddress?.state}
            onChange={e =>
              setNewDeliveryAddress(prevState => {
                return { ...prevState, state: e.target.value }
              })
            }
            id="state"
            placeholder="Digite o estado"
            className="mb-2"
          />
        </label>
        <div className="mb-3 mt-0 text-danger">
          {deliveryAddressErrorMessages?.state &&
            deliveryAddressErrorMessages?.state}
        </div>

        <label htmlFor="postalCode" className="w-100">
          Código Postal
          <input
            className="mb-2"
            {...{
              'aria-invalid': !!deliveryAddressErrorMessages?.postalCode
            }}
            type="text"
            value={newDeliveryAddress?.postalCode}
            onChange={e =>
              setNewDeliveryAddress(prevState => {
                return { ...prevState, postalCode: e.target.value }
              })
            }
            id="postalCode"
            placeholder="Digite o código postal"
          />
        </label>
        <div className="mb-3 mt-0 text-danger">
          {deliveryAddressErrorMessages?.postalCode &&
            deliveryAddressErrorMessages?.postalCode}
        </div>
      </div>
    </form>
  )
}

export default UpdateDeliveryAddressForm

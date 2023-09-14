import UpdateDeliveryAddressForm from '../UpdateDeliveryAddressForm'
import DeliveryAddress from '../DeliveryAddress'

function UpdateDeliveryAddress({
  userHasDeliveryAddress,
  deliveryAddress,
  updatingDeliveryAddress,
  setNewDeliveryAddress,
  newDeliveryAddress,
  showDeliveryAddressForm,
  setShowDeliveryAddressForm,
  deliveryAddressErrorMessages,
  areDeliveryAddressesEqual,
  setStartedDeliveryForm
}) {
  return (
    <div className="d-flex align-items-center w-100 pe-2 ps-3 py-0 rounded  mb-0">
      <label htmlFor="deliveryAddress" className="w-100">
        {!showDeliveryAddressForm && userHasDeliveryAddress && (
          <DeliveryAddress deliveryAddress={deliveryAddress} />
        )}
        <strong>
          {(!userHasDeliveryAddress || showDeliveryAddressForm) &&
            'Endereço de entrega'}
        </strong>
        <div className="mt-3">
          {!showDeliveryAddressForm &&
            userHasDeliveryAddress &&
            !updatingDeliveryAddress && (
              <button
                className="secondary mt-2"
                onClick={() =>
                  setShowDeliveryAddressForm(prevState => !prevState)
                }>
                Editar
              </button>
            )}
          {!showDeliveryAddressForm && !userHasDeliveryAddress && (
            <button
              className="outline"
              onClick={() =>
                setShowDeliveryAddressForm(prevState => !prevState)
              }>
              Adicionar endereço de entrega
            </button>
          )}
          {showDeliveryAddressForm && (
            <>
              <UpdateDeliveryAddressForm
                setNewDeliveryAddress={setNewDeliveryAddress}
                newDeliveryAddress={newDeliveryAddress}
                deliveryAddressErrorMessages={deliveryAddressErrorMessages}
                setStartedDeliveryForm={setStartedDeliveryForm}
              />

              <hr />
            </>
          )}
        </div>
      </label>
    </div>
  )
}

export default UpdateDeliveryAddress

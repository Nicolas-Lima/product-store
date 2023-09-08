function DeliveryAddress({ deliveryAddress, fromModalOrderInfo = false }) {
  if (typeof deliveryAddress === 'object') {
    return (
      <div>
        <strong>Endereço de entrega</strong>:{' '}
        {fromModalOrderInfo ? (
          <span className="text-dark">
            {deliveryAddress.streetAddress}, {deliveryAddress.city},{' '}
            {deliveryAddress.state} {deliveryAddress.postalCode}
          </span>
        ) : (
          <span className="text-dark">
            {deliveryAddress.streetAddress}, {deliveryAddress.city},{' '}
            {deliveryAddress.state} {deliveryAddress.postalCode}
          </span>
        )}
      </div>
    )
  }
}

export default DeliveryAddress

import { capitalizeFirstLetter } from '../../utils/generalUtils'

function toggleModalOrderInfo({
  modalInfoRef,
  modalInfoIsOpen,
  setModalInfoIsOpen
}) {
  if (modalInfoIsOpen) {
    document.body.classList.remove('modal-is-open', 'modal-is-opening')
    document.body.classList.add('modal-is-open', 'modal-is-closing')
    modalInfoRef?.current?.removeAttribute('open', '')
    document.body.classList.remove('modal-is-open', 'modal-is-closing')
    setModalInfoIsOpen(false)

    return
  }

  document.body.classList.add('modal-is-open', 'modal-is-opening')
  modalInfoRef?.current?.setAttribute('open', '')
  setModalInfoIsOpen(true)
}

function ModalOrderInfo({
  modalInfoRef,
  modalInfoIsOpen,
  setModalInfoIsOpen,
  currentOrderInfo
}) {
  const {
    amount,
    paymentMethod,
    price,
    productName,
    seller,
    rating,
    totalPrice,
    timestamp
  } = currentOrderInfo || {}

  const PaymentMethod = () => {
    return (
      <>
        {paymentMethod === 'credit_card' && (
          <div className="mt-3">
            <span className="fw-medium">Método de Pagamento: </span>
            <span>Cartão de crédito</span>

            {/* <BsCreditCardFill size={26} /> */}
          </div>
        )}
        {paymentMethod === 'ticket' && (
          <div className="mt-3">
            <span className="fw-medium">Método de Pagamento: </span>
            <span>Boleto bancário</span>

            {/* <BsTicketDetailedFill size={26} /> */}
          </div>
        )}
      </>
    )
  }

  const PurchaseTime = () => {
    const newDate = new Date(timestamp)
    const [day, month, year, hours, minutes] = [
      newDate.getDate(),
      newDate.getMonth(),
      String(newDate.getFullYear()).slice(-2),
      newDate.getHours(),
      newDate.getMinutes()
    ]

    return (
      <>
        {day}/{month >= 10 ? month : `0${month}`}/{year}
        <span className="fw-normal ms-1">as</span> {hours}:{minutes}
      </>
    )
  }

  return (
    <dialog id="modal-links" className="p-3" ref={modalInfoRef}>
      <article className="d-flex flex-column align-items-center">
        <a
          onClick={() =>
            toggleModalOrderInfo({
              modalInfoRef,
              modalInfoIsOpen,
              setModalInfoIsOpen
            })
          }
          aria-label="Close"
          className="close"
          style={{
            transform: 'scale(1.4)',
            marginRight: '5px'
          }}></a>

        <h3 id="projectName" className="text-center">
          Informações sobre a encomenda
        </h3>
        <div className="d-flex flex-column align-items-center w-100 px-5 py-2">
          <div>
            <span className="fw-medium">Quantidade:</span>{' '}
            <span>{amount}</span>{' '}
            <span>{amount > 1 ? 'unidades' : 'unidade'}</span>
          </div>
          <PaymentMethod />

          <div className="mt-3">
            <span className="fw-medium">Preço:</span>
            <span className="ms-1">
              R${price?.dollars}
              <sup className="me-1">
                {String(price?.cents).padStart(2, 0)}
              </sup>
              reais
            </span>
          </div>

          <div className="mt-3">
            <span className="fw-medium me-1">Nome do Produto:</span>
            {productName && capitalizeFirstLetter(productName)}
          </div>
          <div className="mt-3">
            <span className="fw-medium me-1">Vendedor:</span> {seller}
          </div>
          <div className="mt-3">
            <span className="fw-medium me-1">Avaliação:</span> {rating}
            <span className="ms-1">
              {rating >= 1 ? 'estrelas' : 'estrela'}
            </span>
          </div>
          <div className="mt-3">
            <span className="fw-medium me-1">Preço total:</span>
            {`R$${totalPrice?.toFixed(2)} reais`}
          </div>
          <div className="mt-3">
            <span className="fw-medium me-1">Data da compra:</span>
            <PurchaseTime />
          </div>
        </div>
      </article>
    </dialog>
  )
}

export default ModalOrderInfo
export { toggleModalOrderInfo }

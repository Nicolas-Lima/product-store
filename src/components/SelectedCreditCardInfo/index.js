import { BsCreditCardFill } from 'react-icons/bs'

function SelectedCreditCardInfo({ creditCardsInfo, selectedCardIndex }) {
  return (
    <>
      <article className="shadow-sm pt-0 mt-0 mb-4">
        <header className="text-center mb-4 d-flex justify-content-center">
          <strong className="me-3">
            Cartão de crédito
            <BsCreditCardFill size={26} className="ms-2" color="#546e7a" />
          </strong>
        </header>

        <div>
          <div>
            <strong className="me-2">Nome no cartão:</strong>
            {creditCardsInfo[selectedCardIndex].ownerName}
          </div>
          <div>
            <strong className="me-2">Últimos 4 dígitos:</strong>
            {creditCardsInfo[selectedCardIndex].cardNumberLastFoursDigits}
          </div>
          <div>
            <strong className="me-2">Marca do cartão:</strong>
            <span>{creditCardsInfo[selectedCardIndex].cardBrand}</span>
          </div>
        </div>
      </article>
    </>
  )
}

export default SelectedCreditCardInfo

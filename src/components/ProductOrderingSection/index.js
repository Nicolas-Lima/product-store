import { useContext, useEffect, useState, useMemo } from 'react'
import { StoreContext } from '../../contexts/store'
import { AuthContext } from '../../contexts/auth'
import StockMessage from '../../components/StockMessage'
import ProductAmountSelect from '../../components/ProductAmountSelect'
import NewCreditCardForm from '../../components/NewCreditCardForm'
import { BsCreditCardFill } from 'react-icons/bs'

import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

function ProductOrderingSection({ product, productPrice, productAmount }) {
  const [amount, setAmount] = useState(parseInt(productAmount))

  const [totalPrice, setTotalPrice] = useState(0)
  const { buyProduct } = useContext(StoreContext)
  const { addNewCreditCard, creditCardsInfo } = useContext(AuthContext)
  const [isAddingNewCreditCard, setIsAddingNewCreditCard] = useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = useState(0)
  const [finalizingPurchase, setFinalizingPurchase] = useState(false)

  const userHasCreditCard = creditCardsInfo.length > 0
  const [paymentMethod, setPaymentMethod] = useState(
    userHasCreditCard ? 'credit_card' : 'ticket'
  )

  const navigate = useNavigate()

  const handleFinalizePurchase = async () => {
    setFinalizingPurchase(true)
    if (paymentMethod === 'credit_card' && !userHasCreditCard) {
      toast.error('Cadastre um cartão de crédito!', {
        toastId: 'missingCreditCard'
      })

      return
    }

    const { status: purchaseStatus } = await buyProduct({
      productId: product.id,
      paymentMethod,
      cardId: creditCardsInfo[selectedCardIndex]?.id,
      totalPrice,
      amount
    })

    if (purchaseStatus === 'success') {
      toast.success('Produto comprado com sucesso!')
      return navigate('/orders')
    } else {
      toast.error('Um erro aconteceu, tente novamente mais tarde!')
    }

    setFinalizingPurchase(false)
  }

  const handleAddNewCreditCard = () => {
    setIsAddingNewCreditCard(true)
  }

  useEffect(() => {
    setTotalPrice(productPrice * amount)
  }, [productPrice, amount])

  useEffect(() => {
    setIsAddingNewCreditCard(false)
  }, [paymentMethod])

  const formattedTotalPrice = useMemo(
    () => (
      <span>
        R$
        {totalPrice - parseInt(totalPrice) > 0
          ? totalPrice?.toFixed(2)
          : totalPrice}{' '}
        reais
      </span>
    ),
    [totalPrice]
  )

  const showNewCreditForm = useMemo(() => {
    return (
      isAddingNewCreditCard ||
      (paymentMethod === 'credit_card' && !userHasCreditCard)
    )
  }, [paymentMethod, isAddingNewCreditCard, userHasCreditCard])

  const showSelectedCreditCard = useMemo(() => {
    return (
      userHasCreditCard &&
      !showNewCreditForm &&
      paymentMethod === 'credit_card'
    )
  }, [userHasCreditCard, showNewCreditForm, paymentMethod])

  return (
    <div>
      <article className="mb-0">
        <div>
          <div className="price text-start p-1 px-2 mt-2">
            <span>
              R${product?.price.dollars}
              <sup>{String(product?.price.cents).padStart(2, 0)}</sup>
            </span>
          </div>
          <div className="mt-2 mb-3">
            <StockMessage stock={product.stock} withBadge={true} />
          </div>
          {product.stock > 0 && (
            <div className="amount-container">
              <ProductAmountSelect
                productStock={product?.stock}
                amount={amount}
                setAmount={setAmount}
                maxPurchaseUnits={product?.maxPurchaseUnits}
                minPurchaseUnits={product?.minPurchaseUnits}
              />
            </div>
          )}
          <div className="about-container mb-3">
            <strong>Sobre este item</strong>: {product.description}
          </div>
          <div className="paymentMethod border rounded px-4 p-3 mb-4">
            <fieldset onChange={e => setPaymentMethod(e.target.value)}>
              <legend className="mb-4">
                <strong>Forma de pagamento</strong>
              </legend>
              <label htmlFor="ticket" className="mb-3 mb-sm-2 mb-md-1">
                <input
                  type="radio"
                  id="ticket"
                  name="payment_method"
                  value="ticket"
                  defaultChecked={paymentMethod === 'ticket'}
                />
                Boleto Bancário
              </label>
              <label htmlFor="credit_card">
                <input
                  type="radio"
                  id="credit_card"
                  name="payment_method"
                  value="credit_card"
                  defaultChecked={paymentMethod === 'credit_card'}
                />
                Cartão de crédito
              </label>
            </fieldset>
            <div className="savedCreditCards mb-3">
              {showSelectedCreditCard && (
                <>
                  <article className="shadow-sm pt-0 mt-5 mb-4">
                    <header className="text-center mb-4 d-flex justify-content-center">
                      <strong className="me-3">
                        Cartão de crédito
                        <BsCreditCardFill
                          size={26}
                          className="ms-2"
                          color="#546e7a"
                        />
                      </strong>
                    </header>

                    <div>
                      <div>
                        <strong className="me-2">Nome no cartão:</strong>
                        {creditCardsInfo[selectedCardIndex].ownerName}
                      </div>
                      <div>
                        <strong className="me-2">
                          Últimos 4 dígitos:
                        </strong>
                        {
                          creditCardsInfo[selectedCardIndex]
                            .cardNumberLastFoursDigits
                        }
                      </div>
                      <div>
                        <strong className="me-2">Marca do cartão:</strong>
                        <span>
                          {creditCardsInfo[selectedCardIndex].cardBrand}
                        </span>
                      </div>
                    </div>
                  </article>
                </>
              )}

              {paymentMethod === 'credit_card' && (
                <div className="selectCreditCardContainer">
                  {creditCardsInfo?.length > 1 && !showNewCreditForm && (
                    <>
                      <label htmlFor="selectCreditCard" className="mb-2">
                        <strong>Selecione um cartão</strong>
                      </label>
                      <select
                        id="selectCreditCard"
                        value={selectedCardIndex}
                        onChange={e =>
                          setSelectedCardIndex(parseInt(e.target.value))
                        }>
                        {creditCardsInfo.map((cardInfo, index) => (
                          <option value={index} key={`card-${index}`}>
                            Nome no cartão: {cardInfo?.ownerName}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="addNewCreditCard">
              {!showNewCreditForm && paymentMethod === 'credit_card' && (
                <button
                  className="btn-blue-grey"
                  onClick={handleAddNewCreditCard}>
                  Adicionar cartão de crédito
                </button>
              )}

              {showNewCreditForm && (
                <NewCreditCardForm
                  addNewCreditCard={addNewCreditCard}
                  creditCardsInfo={creditCardsInfo}
                  setIsAddingNewCreditCard={setIsAddingNewCreditCard}
                  setSelectedCardIndex={setSelectedCardIndex}
                  savedCreditCardsAmount={creditCardsInfo?.length || 0}
                  userHasCreditCard={userHasCreditCard}
                />
              )}
            </div>
          </div>

          <div className="totalPrice fs-6 mb-4">
            <strong className="me-2">Preço total:</strong>
            {formattedTotalPrice}
          </div>
          <div className="actions">
            {finalizingPurchase ? (
              <button
                aria-busy={true}
                className="btn-yellow"
                onClick={handleFinalizePurchase}>
                Finalizando compra...
              </button>
            ) : (
              <button
                className="btn-yellow"
                onClick={handleFinalizePurchase}>
                Finalizar compra
              </button>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default ProductOrderingSection

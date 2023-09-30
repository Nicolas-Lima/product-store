import { useContext, useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../contexts/store'
import { AuthContext } from '../../contexts/auth'
import StockMessage from '../../components/StockMessage'
import ProductAmountSelect from '../../components/ProductAmountSelect'
import NewCreditCardForm from '../../components/NewCreditCardForm'
import SelectedCreditCardInfo from '../SelectedCreditCardInfo'
import DeliveryAddress from '../DeliveryAddress'

import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

function ProductOrderingSection({ product, productPrice, productAmount }) {
  const [amount, setAmount] = useState(
    parseInt(productAmount) || product?.minPurchaseUnits
  )

  const [totalPrice, setTotalPrice] = useState(0)
  const { buyProduct } = useContext(StoreContext)
  const { user, addNewCreditCard, creditCardsInfo } =
    useContext(AuthContext)
  const [isAddingNewCreditCard, setIsAddingNewCreditCard] = useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = useState(0)
  const [finalizingPurchase, setFinalizingPurchase] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState(
    user?.deliveryAddress
  )
  const userHasDeliveryAddress = Object.keys(user?.deliveryAddress).every(
    key => !!user?.deliveryAddress[key] === true
  )

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
      setFinalizingPurchase(false)

      return
    }

    if (!userHasDeliveryAddress) {
      toast.error('Adicione um endereço de entrega!', {
        toastId: 'missingDeliveryAddress'
      })
      setFinalizingPurchase(false)
      return
    }

    const { status: purchaseStatus } = await buyProduct({
      productId: product.id,
      paymentMethod,
      cardId: creditCardsInfo[selectedCardIndex]?.id,
      cardNumberLastFoursDigits:
        creditCardsInfo[selectedCardIndex]?.cardNumberLastFoursDigits,
      totalPrice,
      amount,
      deliveryAddress
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
    if (amount > product?.maxPurchaseUnits) {
      setAmount(product?.minPurchaseUnits)
    }
  }, [])

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
            <strong>Sobre este item</strong>:{' '}
            {product.description ? product.description : 'Sem descrição'}
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
            {(showSelectedCreditCard ||
              (paymentMethod === 'credit_card' && !showNewCreditForm)) && (
              <div className="savedCreditCards mb-3 mt-5">
                {showSelectedCreditCard && (
                  <SelectedCreditCardInfo
                    creditCardsInfo={creditCardsInfo}
                    selectedCardIndex={selectedCardIndex}
                  />
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
            )}

            <div className="addNewCreditCard">
              {!showNewCreditForm && paymentMethod === 'credit_card' && (
                <button
                  className="btn-blue-grey"
                  onClick={handleAddNewCreditCard}>
                  Trocar cartão de crédito
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
                  withBorder={true}
                />
              )}
            </div>
          </div>
          <div className="deliveryAddress border rounded px-4 p-3 mb-4">
            {userHasDeliveryAddress ? (
              <div className="mb-2">
                <DeliveryAddress deliveryAddress={deliveryAddress} />
              </div>
            ) : (
              <legend className="mb-3">
                <strong>Endereço de entrega</strong>
                <p className="text-danger mt-1 mb-0">
                  Você não possui um endereço de entrega!
                </p>
              </legend>
            )}

            <Link to="/settings" className="text-success">
              {userHasDeliveryAddress ? 'Editar' : 'Adicionar'} endereço de
              entrega!
            </Link>
          </div>
          <div className="totalPrice fs-6 mb-4">
            <strong className="me-2">Preço total:</strong>
            {formattedTotalPrice}
          </div>
          <div className="actions">
            {finalizingPurchase ? (
              <button aria-busy={true} className="btn-yellow">
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

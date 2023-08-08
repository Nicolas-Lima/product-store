import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState, useMemo } from 'react'
import { StoreContext } from '../../contexts/store'
import Nav from '../../components/Nav'
import Loading from '../../components/Loading'
import ErrorComponent from '../../components/ErrorComponent'
import ProductComponent from '../../components/ProductComponent'
import StockMessage from '../../components/StockMessage'
import ProductAmountSelect from '../../components/ProductAmountSelect'

function BuyProduct() {
  const { id: productId, productAmount } = useParams()

  const [product, setProduct] = useState(null)
  const [productNotFound, setProductNotFound] = useState(false)
  const [productLoading, setProductLoading] = useState(true)
  const [hasStock, setHasStock] = useState(true)
  const [amount, setAmount] = useState(parseInt(productAmount))
  const [productPrice, setProductPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const { products, getProductById, productsLoading, buyProduct } =
    useContext(StoreContext)

  const handleFinalizePurchase = async () => {
    console.log('Comprando...')
    //await buyProduct(product.id)
  }

  const changeProductPrice = ({ dollars, cents } = {}) => {
    const areAllNumbers =
      [dollars, cents].filter(value => Number.isFinite(value)).length === 2
    if (areAllNumbers) {
      setProductPrice(dollars + cents / 100)
    }
  }

  useEffect(() => {
    if (!productsLoading) {
      const product = getProductById(productId)
      const { dollars = 0, cents = 0 } = product?.price
      setHasStock(product?.stock > 0)
      setProductNotFound(!product)
      setProduct(product)
      changeProductPrice({
        dollars,
        cents
      })
      setProductLoading(false)
    }
    console.error(
      "git commit -a -m 'Página buyProduct e orders finalizadas (Deixar um pequeno comentário)'"
    )
  }, [products])

  useEffect(() => {
    setTotalPrice(productPrice * amount)
  }, [productPrice, amount])

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

  if (productNotFound) {
    return <ErrorComponent message="Esse produto não existe!" />
  }

  if (!hasStock && !productsLoading) {
    return <ErrorComponent message="Esse produto está sem estoque!" />
  }

  return (
    <>
      <Nav />
      {productLoading ? (
        <Loading />
      ) : (
        <>
          <main className="container">
            <div>
              <h1 className="m-0 mb-2 text-center text-secondary">Comprar produto</h1>
            </div>
            <div className="grid">
              <div>
                <ProductComponent product={product} isProductPage={true} />
              </div>
              <div>
                <article className="mb-0">
                  <div>
                    <div className="price text-start p-1 px-2 mt-2">
                      <span>
                        R${product?.price.dollars}
                        <sup>
                          {String(product?.price.cents).padStart(2, 0)}
                        </sup>
                      </span>
                    </div>
                    <div className="mt-2 mb-3">
                      <StockMessage
                        stock={product.stock}
                        withBadge={true}
                      />
                    </div>
                    {hasStock && (
                      <div className="amount-container">
                        <ProductAmountSelect
                          amount={amount}
                          setAmount={setAmount}
                          maxPurchaseUnits={product?.maxPurchaseUnits}
                          minPurchaseUnits={product?.minPurchaseUnits}
                        />
                      </div>
                    )}
                    <div className="about-container mb-3">
                      <strong>Sobre este item</strong>:{' '}
                      {product.description}
                    </div>
                    <div className="paymentMethod border rounded px-4 p-3 mb-4">
                      <fieldset>
                        <legend className="mb-4">
                          Forma de pagamento
                        </legend>
                        <label
                          htmlFor="ticket"
                          className="mb-3 mb-sm-2 mb-md-1">
                          <input
                            type="radio"
                            id="ticket"
                            name="payment_method"
                            value="ticket"
                            defaultChecked
                          />
                          Boleto Bancário
                        </label>
                        <label htmlFor="credit_card">
                          <input
                            type="radio"
                            id="credit_card"
                            name="payment_method"
                            value="credit_card"
                          />
                          Cartão de crédito
                          <h1>
                            Se não tiver cartão cadastrado, aparecer uma
                            formulaŕio com as informações a serem
                            preenchidas
                          </h1>
                        </label>
                      </fieldset>
                    </div>
                    <div className="totalPrice fs-6 mb-4">
                      <strong className="me-2">Preço total:</strong>
                      {formattedTotalPrice}
                    </div>
                    <div className="actions">
                      <button
                        className="btn-yellow"
                        onClick={handleFinalizePurchase}>
                        Finalizar compra
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  )
}

export default BuyProduct

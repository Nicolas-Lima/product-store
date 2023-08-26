import { useContext, useState } from 'react'
import { StoreContext } from '../../contexts/store'
import { AuthContext } from '../../contexts/auth'
import StockMessage from '../StockMessage'
import './productInfo.css'
import {
  productAlreadyInList,
  productAlreadyInCart
} from '../../utils/productsUtils'
import BuyProductButton from '../BuyProductButton'
import ProductAmountSelect from '../ProductAmountSelect'

function ProductInfo({ product }) {
  const { addProductToList, addProductToCart, buyProduct } =
    useContext(StoreContext)
  const { userSigned, user } = useContext(AuthContext)
  const hasStock = product.stock > 0
  const { minPurchaseUnits, maxPurchaseUnits, price } = product
  const { dollars, cents } = price
  const [amount, setAmount] = useState(minPurchaseUnits || 1)

  const handleAddProductToList = () => {
    addProductToList(product.id)
  }
  const handleAddProductToCart = () => {
    addProductToCart(product.id)
  }

  const isProductAlreadyInList = productAlreadyInList(
    product.id,
    userSigned,
    user?.list
  )

  const isProductAlreadyInCart = productAlreadyInCart(
    product.id,
    user?.cart
  )

  return (
    <>
      <article className="mb-0">
        <div>
          <div className="price text-start p-1 px-2 mt-2">
            <span>
              R${dollars}
              <sup>{String(cents).padStart(2, 0)}</sup>
            </span>
          </div>
          <div className="mt-2 mb-3">
            <StockMessage stock={product.stock} withBadge={true} />
          </div>
          {hasStock && (
            <div className="amount-container">
              <ProductAmountSelect
                productStock={product?.stock}
                amount={amount}
                setAmount={setAmount}
                maxPurchaseUnits={maxPurchaseUnits}
                minPurchaseUnits={minPurchaseUnits}
              />
            </div>
          )}
          <div className="about-container mb-3">
            <strong>Sobre este item</strong>: {product.description}
          </div>

          <div className="actions">
            {hasStock ? (
              <>
                <BuyProductButton
                  productId={product.id}
                  purchaseData={{
                    amount
                  }}
                />
                {!isProductAlreadyInCart && userSigned && (
                  <button onClick={handleAddProductToCart}>
                    Adicionar ao carrinho
                  </button>
                )}

                {!isProductAlreadyInList && (
                  <button
                    className="btn-grey"
                    onClick={handleAddProductToList}>
                    Adicionar à Lista
                  </button>
                )}
              </>
            ) : (
              !isProductAlreadyInList && (
                <button onClick={handleAddProductToList}>
                  Adicionar à Lista
                </button>
              )
            )}
          </div>
        </div>
      </article>
    </>
  )
}

export default ProductInfo

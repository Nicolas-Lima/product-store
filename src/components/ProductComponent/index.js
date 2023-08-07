import { useContext, useState } from 'react'
import { StoreContext } from '../../contexts/store'
import { AuthContext } from '../../contexts/auth'
import StockMessage from '../StockMessage'
import { Link } from 'react-router-dom'
import './product.css'

import {
  productAlreadyInList,
  productAlreadyInCart
} from '../../utils/productsUtils'

function ProductContent({
  product,
  includeStockMessage,
  isListPage = false,
  isCartPage = false
}) {
  const {
    removeProductFromList,
    removeProductFromCart,
    addProductToCart,
    addProductToList
  } = useContext(StoreContext)
  const { userSigned, user } = useContext(AuthContext)
  const [removingProduct, setRemovingProduct] = useState(false)
  const { title, seller, imgUrl, description, price, stock } = product
  const { dollars, cents } = price

  const isProductAlreadyInList = productAlreadyInList(
    product.id,
    userSigned,
    user?.list
  )

  const isProductAlreadyInCart = productAlreadyInCart(
    product.id,
    user?.cart
  )

  const handleAddProductToCart = () => {
    addProductToCart(product.id)
  }
  const handleAddProductToList = () => {
    addProductToList(product.id)
  }
  const handleRemoveProductFromList = async () => {
    setRemovingProduct(true)
    await removeProductFromList(product.id)
    setTimeout(() => setRemovingProduct(false), 500)
  }

  const handleRemoveProductFromCart = async () => {
    setRemovingProduct(true)
    await removeProductFromCart(product.id)
    setTimeout(() => setRemovingProduct(false), 500)
  }

  return (
    <div>
      <article>
        <header className="text-center">
          <strong>{title}</strong>
        </header>
        <div className="d-flex flex-column align-items-center align-items-center">
          <img src={imgUrl} alt={title} />
          <div className="mt-4 pt-3 text-center border-top border-secondary border-opacity-25">
            <span className="seller badge bg-light p-1 px-2 rounded">
              {seller}
            </span>

            <div className="description text-center mt-3 text-gray">
              {description}
            </div>
            <div className="price text-start p-1 px-2 mt-2">
              <span>
                R${dollars}
                <sup>{String(cents).padStart(2, 0)}</sup>
              </span>
            </div>
            {includeStockMessage && (
              <div className="stockMessage mt-3">
                <StockMessage stock={stock} />
              </div>
            )}
          </div>
          {isListPage && (
            <div className="list-actions d-flex flex-column mt-3">
              <button className="btn-yellow">Comprar</button>
              {!isProductAlreadyInCart && (
                <button onClick={handleAddProductToCart}>
                  Adicionar ao carrinho
                </button>
              )}
              <button
                className="btn-orange"
                onClick={handleRemoveProductFromList}>
                {removingProduct
                  ? 'Removendo da Lista...'
                  : 'Remover da Lista'}
              </button>
            </div>
          )}
          {isCartPage && (
            <div className="list-actions d-flex flex-column mt-3">
              <button className="btn-yellow">Comprar</button>
              {!isProductAlreadyInList && (
                <button onClick={handleAddProductToList}>
                  Adicionar à Lista
                </button>
              )}

              <button
                className="btn-orange"
                onClick={handleRemoveProductFromCart}>
                {removingProduct
                  ? 'Removendo do carrinho...'
                  : 'Remover do carrinho'}
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

function ProductComponent({
  product,
  isProductPage = false,
  isListPage = false,
  isCartPage = false,
  includeStockMessage = false
}) {
  if (isProductPage || isListPage || isCartPage) {
    return (
      <ProductContent
        product={product}
        isListPage={isListPage}
        isCartPage={isCartPage}
        includeStockMessage={includeStockMessage}
      />
    )
  }

  return (
    <Link
      to={`${window.location.origin}/product/${product.id}`}
      className="custom-link shadow-none bg-transparent product">
      <ProductContent
        product={product}
        includeStockMessage={includeStockMessage}
      />
    </Link>
  )
}

export default ProductComponent

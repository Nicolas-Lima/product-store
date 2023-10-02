import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { StoreContext } from '../../contexts/store'
import { AuthContext } from '../../contexts/auth'
import StockMessage from '../StockMessage'
import { Link } from 'react-router-dom'
import BuyProductButton from '../BuyProductButton'
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
    addProductToList,
    getProductById
  } = useContext(StoreContext)
  const { userSigned, user, sellerUid } = useContext(AuthContext)
  const [removingProduct, setRemovingProduct] = useState(false)
  const {
    title,
    seller,
    imgUrl,
    name,
    price,
    stock,
    salesCount,
    reviews
  } = product
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

  const productExists = getProductById(product.id)

  const isUserTheProductSeller = sellerUid === product?.sellerUid

  const handleAddProductToCart = async () => {
    await addProductToCart(product.id)
  }

  const handleAddProductToList = async () => {
    await addProductToList(product.id)
  }

  const handleRemoveProductFromList = async () => {
    setRemovingProduct(true)
    await removeProductFromList(product.id)
    setTimeout(() => setRemovingProduct(false), 500)
    toast.success('Produto removido da lista!', {
      toastId: `productRemovedFromList-${product.id}`
    })
  }

  const handleRemoveProductFromCart = async () => {
    setRemovingProduct(true)
    await removeProductFromCart(product.id)
    setTimeout(() => setRemovingProduct(false), 500)
    toast.success('Produto removido do carrinho!', {
      toastId: `productRemovedFromCart-${product.id}`
    })
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

            <div className="name text-center mt-3 text-gray">{name}</div>
            <div>
              <div className="price text-start p-1 px-2 mt-2">
                <span>
                  R${dollars}
                  <sup>{String(cents).padStart(2, 0)}</sup>
                </span>
              </div>
              <div className="product-info text-secondary mt-2 text-center">
                <span className="me-3">
                  {salesCount} {salesCount === 1 ? 'venda' : 'vendas'}
                </span>
                <span className="d-block">
                  {reviews?.length}{' '}
                  {reviews?.length === 1 ? 'avaliação' : 'avaliações'}
                </span>
              </div>
            </div>

            {includeStockMessage && (
              <div className="stockMessage mt-2">
                <StockMessage stock={stock} />
              </div>
            )}
          </div>
          {isListPage && (
            <div className="list-actions d-flex flex-column mt-3">
              <BuyProductButton
                productId={product.id}
                isUserTheProductSeller={isUserTheProductSeller}
              />
              {!isProductAlreadyInCart &&
                userSigned &&
                !isUserTheProductSeller &&
                productExists && (
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
              <BuyProductButton
                productId={product.id}
                isUserTheProductSeller={isUserTheProductSeller}
              />
              {!isProductAlreadyInList &&
                !isUserTheProductSeller &&
                productExists && (
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

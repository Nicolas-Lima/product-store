import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../contexts/store'
import StockMessage from '../StockMessage'
import './myProduct.css'

function ProductComponent({ product, includeStockMessage = false }) {
  const { removeProduct } = useContext(StoreContext)
  const [removingProduct, setRemovingProduct] = useState(false)

  const {
    title,
    seller,
    imgUrl,
    name,
    price,
    stock,
    minPurchaseUnits,
    salesCount,
    reviews,
    id: productId
  } = product

  const { dollars, cents } = price

  const handleRemoveProduct = async () => {
    if (!window.confirm('Realmente deseja excluir o produto?')) {
      return
    }

    setRemovingProduct(true)
    await removeProduct({ productId })
    setRemovingProduct(false)
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
                <StockMessage
                  stock={stock}
                  minPurchaseUnits={minPurchaseUnits}
                />
              </div>
            )}

            <div className="actions mt-4">
              {!removingProduct && (
                <Link
                  to={`${window.location.origin}/product/${product.id}`}
                  className="custom-link shadow-none bg-transparent">
                  <button type="button">Acessar</button>
                </Link>
              )}

              {!removingProduct ? (
                <button
                  type="button"
                  className="btn-orange"
                  onClick={handleRemoveProduct}>
                  Excluir
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-orange"
                  disabled={true}
                  aria-busy={true}>
                  Excluindo...
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default ProductComponent

import { Link } from 'react-router-dom'

import './purchasedProduct.css'
import StarRating from '../StarRating'

function PurchasedProduct({
  product,
  handleToggleModalInfo,
  handleToggleModalReviewProduct,
  setCurrentOrderInfo
}) {
  const {
    canProvideReview,
    orderStatus,
    title,
    seller,
    imgUrl,
    description,
    price,
    rating,
    trackingId
  } = product
  const { dollars, cents } = price

  const locationOrigin = window.location.origin
  const productDelivered = orderStatus[3].done !== false

  return (
    <article>
      <header className="text-center">
        <strong>{title}</strong>
      </header>
      <div className="row">
        <div className="d-flex flex-column align-items-center col-12 col-md-7">
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
            <StarRating rate={rating} />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center col-12 col-md-5 mt-5 mt-md-0">
          <Link
            className="w-100 mb-3"
            to={`${locationOrigin}/trackOrder/${trackingId}`}
            role="button">
            Rastrear encomenda
          </Link>

          <h1 className="text-danger">
            canProvideReview && productDelivered
          </h1>
          {true && (
            <button
              className="btn-yellow"
              onClick={() => {
                handleToggleModalReviewProduct()
                setCurrentOrderInfo(product)
              }}>
              Avaliar o produto
            </button>
          )}

          <button
            className="btn-grey"
            onClick={() => {
              handleToggleModalInfo()
              setCurrentOrderInfo(product)
            }}>
            Mais informações
          </button>
        </div>
      </div>
    </article>
  )
}

export default PurchasedProduct

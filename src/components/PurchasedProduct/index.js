import { useContext } from 'react'
import { StoreContext } from '../../contexts/store'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import './product.css'
import StarRating from '../StarRating'

function PurchasedProduct({ product }) {
  const {
    removeProductFromList,
    removeProductFromCart,
    addProductToCart,
    addProductToList,
    buyProduct
  } = useContext(StoreContext)

  const { title, seller, imgUrl, description, price, rating } = product
  const { dollars, cents } = price

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
            <StarRating rate={rating} />
          </div>
        </div>
      </article>
    </div>
  )
}

export default PurchasedProduct

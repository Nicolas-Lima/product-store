import { BsPersonCircle } from 'react-icons/bs'

import StarRating from '../StarRating'
import './productReviews.css'

function ProductReviews({ reviews }) {
  return (
    <div className="productReviews">
      {reviews?.length > 0 ? (
        <article>
          <header className="text-center">
            <strong>Avaliações</strong>
          </header>
          <div className="d-flex flex-column">
            {reviews.map((review, reviewIndex) => {
              const {
                reviewerName,
                reviewerAvatarUrl: avatarUrl,
                comment,
                rate,
                edited
              } = review

              return (
                <div
                  className="d-flex flex-column bg-light p-3 ps-4 mb-3 rounded reviewContainer"
                  key={`review-${reviewIndex}`}>
                  <div className="reviewerInfo d-flex align-items-center mt-2">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={`reviewerPhoto-${reviewIndex}`}
                        className="reviewerPhoto"
                      />
                    ) : (
                      <BsPersonCircle className="reviewerPhoto" />
                    )}
                    <span>{reviewerName}</span>
                  </div>

                  <div className="review mt-3">
                    <span className="message">{comment}</span>

                    <StarRating rate={rate} />
                  </div>
                  <div className="reviewDate mt-3">
                    <p className="m-0">
                      {edited ? 'Editado' : 'Avaliado'} em 12/07/2022
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </article>
      ) : (
        <article className="pb-3">
          <header className="text-center">
            <strong>Avaliações</strong>
          </header>
          <div className="d-flex justify-content-center">
            <h4>Esse produto não possui avaliações!</h4>
          </div>
        </article>
      )}
    </div>
  )
}

export default ProductReviews

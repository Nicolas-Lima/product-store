import {
  BsPersonCircle,
  BsStar,
  BsStarFill,
  BsStarHalf,
} from "react-icons/bs";
import { Fragment } from "react";
import "./productReviews.css";

function ProductReviews({ reviews }) {
  const starRange = [1, 2, 3, 4, 5];
  return (
    <div className="productReviews">
      {reviews?.length > 0 ? (
        <article>
          <header className="text-center">
            <strong>Avaliações</strong>
          </header>
          <div className="d-flex flex-column">
            {reviews.map((review, reviewIndex) => {
              const { personName, avatarUrl, comment, rate } = review;

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
                    <span>{personName}</span>
                  </div>

                  <div className="review mt-3">
                    <span className="message">{comment}</span>
                    <div className="rate mt-2">
                      {starRange.map((number, starIndex) => {
                        const isFullStar = number <= rate;
                        const isHalfStar =
                          number - 1 === parseInt(rate) &&
                          rate - parseInt(rate) >= 0.5;

                        let starPng = <BsStar />;

                        if (isFullStar) {
                          starPng = <BsStarFill />;
                        } else if (isHalfStar) {
                          starPng = <BsStarHalf />;
                        }

                        return (
                          <Fragment
                            key={`star-${starIndex}-review-${reviewIndex}`}>
                            {starPng}
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
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
  );
}

export default ProductReviews;

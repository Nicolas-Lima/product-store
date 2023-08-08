import { Fragment } from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import './starRating.css'

function StarRating({ rate }) {
  const starRange = [1, 2, 3, 4, 5]
  return (
    <div className="rate mt-2">
      {starRange.map((number, starIndex) => {
        const isFullStar = number <= rate
        const isHalfStar =
          number - 1 === parseInt(rate) && rate - parseInt(rate) >= 0.5

        let starPng = <BsStar />

        if (isFullStar) {
          starPng = <BsStarFill />
        } else if (isHalfStar) {
          starPng = <BsStarHalf />
        }

        return (
          <Fragment key={`star-${starIndex}`}>
            {starPng}
          </Fragment>
        )
      })}
    </div>
  )
}

export default StarRating

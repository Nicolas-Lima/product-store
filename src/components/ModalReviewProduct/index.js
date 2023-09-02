import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth'
import { StoreContext } from '../../contexts/store'
import StarRating from '../StarRating'

import { toast } from 'react-toastify'

function toggleModalReviewProduct({
  modalReviewProductRef,
  modalReviewProductIsOpen,
  setModalReviewProductIsOpen
}) {
  if (modalReviewProductIsOpen) {
    document.body.classList.remove('modal-is-open', 'modal-is-opening')
    document.body.classList.add('modal-is-open', 'modal-is-closing')
    modalReviewProductRef?.current?.removeAttribute('open', '')
    document.body.classList.remove('modal-is-open', 'modal-is-closing')
    setModalReviewProductIsOpen(false)

    return
  }

  document.body.classList.add('modal-is-open', 'modal-is-opening')
  modalReviewProductRef?.current?.setAttribute('open', '')
  setModalReviewProductIsOpen(true)
}

function ModalReviewProduct({
  modalReviewProductRef,
  modalReviewProductIsOpen,
  setModalReviewProductIsOpen,
  currentOrderInfo
}) {
  const { user, userUid } = useContext(AuthContext)
  const {
    getProductById,
    updateProduct,
    updateProductState,
    updateCanProvideReview
  } = useContext(StoreContext)

  const [reviewMessage, setReviewMessage] = useState('')
  const [reviewMessageError, setReviewMessageError] = useState('')
  const [selectedRate, setSelectedRate] = useState(0)
  const [previousSelectedRate, setPreviousSelectedRate] = useState(0)

  const [isMobileOrNarrowScreen, setIsMobileOrNarrowScreen] =
    useState(true)

  const cleanStates = () => {
    setSelectedRate(0)
    setPreviousSelectedRate(0)
    setReviewMessage('')
    setReviewMessageError('')
  }

  useEffect(() => {
    cleanStates()
  }, [currentOrderInfo])

  useEffect(() => {
    cleanStates()
  }, [modalReviewProductIsOpen])

  useEffect(() => {
    const checkIsMobileOrNarrowScreen = () => {
      const isNarrowScreen = window.matchMedia(
        '(max-width: 500px)'
      ).matches

      const isMobile =
        /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(
          navigator.userAgent
        )

      setIsMobileOrNarrowScreen(isNarrowScreen || isMobile)
    }

    checkIsMobileOrNarrowScreen()

    const handleResize = () => {
      checkIsMobileOrNarrowScreen()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleMouseMove = e => {
    const rect = e.target.getBoundingClientRect()
    const percentage = (e.clientX - rect.left) / rect.width
    const newValue = Math.min(
      5,
      Math.max(0, Math.round(percentage * 10) / 2)
    )
    setSelectedRate(newValue)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (reviewMessage?.length < 3) {
      setReviewMessageError(
        'Digite uma mensagem que contenha, no mínimo, 3 letras!'
      )
    } else {
      setReviewMessageError('')

      const currentDate = new Date()
      const [currentDay, currentMonth, currentYear] = [
        currentDate.getDate(),
        currentDate.getMonth(currentDate),
        currentDate.getFullYear()
      ]

      const productReview = {
        reviewerUid: userUid,
        comment: reviewMessage,
        reviewDate: {
          day: currentDay,
          month: currentMonth + 1,
          year: currentYear
        },
        reviewerName: user?.profileConfiguration?.fullName,
        reviewerAvatarUrl: user?.profileConfiguration?.imgUrl,
        rate: selectedRate,
        edited: false
      }

      const orderId = currentOrderInfo?.orderId
      const selectedProductUid = currentOrderInfo?.productId
      const selectedProduct = await getProductById(selectedProductUid)

      const productReviews = selectedProduct?.reviews || []
      const userLastReviewInThisProduct = productReviews?.filter(
        productReview => productReview?.reviewerUid === userUid
      )[0]

      let updatedProductReviews = [...productReviews, productReview]

      if (userLastReviewInThisProduct) {
        Object.assign(userLastReviewInThisProduct, {
          ...productReview,
          edited: true
        })
        updatedProductReviews = selectedProduct?.reviews
      }

      await updateProduct(selectedProductUid, {
        reviews: updatedProductReviews
      })

      await updateProductState(selectedProductUid, {
        reviews: updatedProductReviews
      })

      await updateCanProvideReview(orderId, selectedProductUid)

      toast.success('Obrigado por avaliar o produto!', {
        toastId: `productReview-${currentOrderInfo?.productId}`
      })

      toggleModalReviewProduct({
        modalReviewProductRef,
        modalReviewProductIsOpen,
        setModalReviewProductIsOpen
      })
    }
  }

  return (
    <dialog id="modal-links" className="p-3" ref={modalReviewProductRef}>
      <article className="d-flex flex-column align-items-center">
        <a
          onClick={() =>
            toggleModalReviewProduct({
              modalReviewProductRef,
              modalReviewProductIsOpen,
              setModalReviewProductIsOpen
            })
          }
          aria-label="Close"
          className="close"
          style={{
            transform: 'scale(1.4)',
            marginRight: '5px'
          }}></a>

        <h3 id="projectName" className="text-center">
          Avalie o produto
        </h3>
        <div className="d-flex flex-column align-items-center w-100 px-5 py-2">
          <form onSubmit={handleSubmit}>
            <label htmlFor="reviewMessage" className="mb-0">
              Mensagem de avaliação
              <input
                type="text"
                id="reviewMessage"
                value={reviewMessage}
                onChange={e => setReviewMessage(e.target.value)}
                placeholder="Escreva sua avaliação!"
              />
            </label>
            {reviewMessageError && (
              <div className="mb-3 mt-0 text-danger">
                {reviewMessageError}
              </div>
            )}

            {isMobileOrNarrowScreen ? (
              <div className="d-flex flex-column align-items-center">
                <StarRating
                  rate={selectedRate}
                  onMouseMove={handleMouseMove}
                />
                <input
                  className="w-auto mt-3"
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={selectedRate}
                  onChange={e => setSelectedRate(e.target.value)}
                  id="rateRange"
                />
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                <div
                  className="mb-3"
                  style={{ position: 'relative', width: 'fit-content' }}>
                  <StarRating rate={selectedRate} />
                  <input
                    className="opacity-0"
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={selectedRate}
                    onClick={() => setPreviousSelectedRate(selectedRate)}
                    onMouseLeave={() =>
                      setSelectedRate(previousSelectedRate)
                    }
                    onMouseMove={handleMouseMove}
                    readOnly
                    id="rateRange"
                    style={{
                      position: 'absolute',
                      top: '7px',
                      height: '100%',
                      width: '100%',
                      zIndex: '1'
                    }}
                  />
                </div>
              </div>
            )}

            <button className="mt-3" type="submit">
              Avaliar
            </button>
          </form>
        </div>
      </article>
    </dialog>
  )
}

export default ModalReviewProduct
export { toggleModalReviewProduct }

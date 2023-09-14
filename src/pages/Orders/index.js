import { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../contexts/store'

import ModalOrderInfo, {
  toggleModalOrderInfo
} from '../../components/ModalOrderInfo'

import ModalReviewProduct, {
  toggleModalReviewProduct
} from '../../components/ModalReviewProduct'

import PurchasedProduct from '../../components/PurchasedProduct'

import Nav from '../../components/Nav'

function Orders() {
  const { userPurchasedProducts } = useContext(StoreContext)

  const modalInfoRef = useRef(null)
  const modalReviewProductRef = useRef(null)

  const [modalInfoIsOpen, setModalInfoIsOpen] = useState(false)
  const [currentOrderInfo, setCurrentOrderInfo] = useState(null)

  const [modalReviewProductIsOpen, setModalReviewProductIsOpen] =
    useState(false)

  const handleToggleModalInfo = () => {
    toggleModalOrderInfo({
      modalInfoRef,
      modalInfoIsOpen,
      setModalInfoIsOpen
    })
  }

  const handleToggleModalReviewProduct = () => {
    toggleModalReviewProduct({
      modalReviewProductRef,
      modalReviewProductIsOpen,
      setModalReviewProductIsOpen
    })
  }

  document.title = 'Pedidos'

  return (
    <>
      <ModalOrderInfo
        modalInfoRef={modalInfoRef}
        modalInfoIsOpen={modalInfoIsOpen}
        setModalInfoIsOpen={setModalInfoIsOpen}
        currentOrderInfo={currentOrderInfo}
      />

      <ModalReviewProduct
        modalReviewProductRef={modalReviewProductRef}
        modalReviewProductIsOpen={modalReviewProductIsOpen}
        setModalReviewProductIsOpen={setModalReviewProductIsOpen}
        currentOrderInfo={currentOrderInfo}
      />

      <Nav />
      <main className="container mt-4">
        {userPurchasedProducts?.length > 0 ? (
          userPurchasedProducts?.map((purchasedProduct, index) => (
            <PurchasedProduct
              product={purchasedProduct}
              handleToggleModalInfo={handleToggleModalInfo}
              handleToggleModalReviewProduct={
                handleToggleModalReviewProduct
              }
              setCurrentOrderInfo={setCurrentOrderInfo}
              key={index}
            />
          ))
        ) : (
          <h1 className="text-center text-secondary">
            <span className="d-block">
              Você ainda não comprou nenhum produto!
            </span>
            <span className="d-block mt-4">
              <Link to="/">Comprar produtos</Link>
            </span>
          </h1>
        )}
      </main>
    </>
  )
}

export default Orders

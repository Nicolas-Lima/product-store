import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { StoreContext } from '../../contexts/store'
import MyProducts from '../../components/MyProducts'
import Nav from '../../components/Nav'
import ModalRegisterProduct, {
  toggleModalRegisterProduct
} from '../../components/ModalRegisterProduct'

function Sell() {
  const navigate = useNavigate()
  const { seller, hasSellerAccount } = useContext(AuthContext)
  const { myProducts } = useContext(StoreContext)

  const modalRegisterProductRef = useRef(null)
  const [modalRegisterProductIsOpen, setModalRegisterProductIsOpen] =
    useState(false)

  useEffect(() => {
    if (!hasSellerAccount) {
      navigate('/registerSeller')
    }
  }, [hasSellerAccount, navigate])

  const handleToggleModalRegisterProduct = () => {
    toggleModalRegisterProduct({
      modalRegisterProductRef,
      modalRegisterProductIsOpen,
      setModalRegisterProductIsOpen
    })
  }

  document.title = 'Vender'

  if (hasSellerAccount) {
    return (
      <>
        <ModalRegisterProduct
          modalRegisterProductRef={modalRegisterProductRef}
          modalRegisterProductIsOpen={modalRegisterProductIsOpen}
          setModalRegisterProductIsOpen={setModalRegisterProductIsOpen}
        />

        <Nav />
        <main className="container mt-3 mb-2-3rem pb-4">
          <div className="my-products">
            <h1 className="text-secondary text-center">Meus produtos</h1>
            {myProducts?.length > 0 ? (
              <>
                <MyProducts />
              </>
            ) : (
              <h1 className="text-center text-danger mt-0 mb-4">
                Você não possui nenhum produto!
              </h1>
            )}
          </div>
          <div className="options">
            <h1 className="text-secondary text-center mb-4">Opções</h1>
            <div className="grid text-center">
              <article>
                <header className="text-center">Registrar produto</header>
                <button
                  className="btn-light-green"
                  onClick={handleToggleModalRegisterProduct}>
                  Registrar
                </button>
              </article>
              <article className="opacity-0">
                <header className="text-center"></header>
              </article>

              {/* <article>
                <header className="text-center">
                  Trocar cartão de crédito
                </header>
                <button className="btn-blue-grey">Trocar</button>
              </article> */}
            </div>
          </div>
        </main>
      </>
    )
  }
}

export default Sell

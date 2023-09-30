import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { StoreContext } from '../../contexts/store'
import RegisterProductForm from '../RegisterProductForm'
import './modalRegisterProduct.css'

function toggleModalRegisterProduct({
  modalRegisterProductRef,
  modalRegisterProductIsOpen,
  setModalRegisterProductIsOpen
}) {
  if (modalRegisterProductIsOpen) {
    document.body.classList.remove('modal-is-open', 'modal-is-opening')
    document.body.classList.add('modal-is-open', 'modal-is-closing')
    modalRegisterProductRef?.current?.removeAttribute('open', '')
    document.body.classList.remove('modal-is-open', 'modal-is-closing')
    setModalRegisterProductIsOpen(false)

    return
  }

  document.body.classList.add('modal-is-open', 'modal-is-opening')
  modalRegisterProductRef?.current?.setAttribute('open', '')
  setModalRegisterProductIsOpen(true)
}

function ModalRegisterProduct({
  modalRegisterProductRef,
  modalRegisterProductIsOpen,
  setModalRegisterProductIsOpen
}) {
  const { seller } = useContext(AuthContext)
  const { registerProduct } = useContext(StoreContext)

  const handleToggleModalRegisterProduct = () => {
    toggleModalRegisterProduct({
      modalRegisterProductRef,
      modalRegisterProductIsOpen,
      setModalRegisterProductIsOpen
    })
  }

  return (
    <dialog id="modal-links" className="p-3" ref={modalRegisterProductRef}>
      <article className="d-flex flex-column align-items-center">
        <a
          onClick={handleToggleModalRegisterProduct}
          aria-label="Close"
          className="close"
          style={{
            transform: 'scale(1.4)',
            marginRight: '5px'
          }}>
          <span className="opacity-0">X</span>
        </a>

        <h3 id="projectName" className="text-center">
          Cadastre o produto!
        </h3>
        <div className="d-flex flex-column align-items-center w-100 px-5 py-2">
          <RegisterProductForm
            registerProduct={registerProduct}
            seller={seller}
            handleToggleModalRegisterProduct={
              handleToggleModalRegisterProduct
            }
            modalRegisterProductIsOpen={modalRegisterProductIsOpen}
            modalRegisterProductRef={modalRegisterProductRef}
          />
        </div>
      </article>
    </dialog>
  )
}

export default ModalRegisterProduct
export { toggleModalRegisterProduct }

import { useState, useEffect } from 'react'

function toggleModalChangeStock({
  modalChangeStockRef,
  modalChangeStockIsOpen,
  setModalChangeStockIsOpen
}) {
  if (modalChangeStockIsOpen) {
    document.body.classList.remove('modal-is-open', 'modal-is-opening')
    document.body.classList.add('modal-is-open', 'modal-is-closing')
    modalChangeStockRef?.current?.removeAttribute('open', '')
    document.body.classList.remove('modal-is-open', 'modal-is-closing')
    setModalChangeStockIsOpen(false)

    return
  }

  document.body.classList.add('modal-is-open', 'modal-is-opening')
  modalChangeStockRef?.current?.setAttribute('open', '')
  setModalChangeStockIsOpen(true)
}

function ModalChangeStock({
  modalChangeStockRef,
  modalChangeStockIsOpen,
  setModalChangeStockIsOpen,
  changeProductStock,
  product
}) {
  const [stock, setStock] = useState(parseInt(product?.stock) || 0)
  const [changingStock, setChangingStock] = useState(false)
  const [currentError, setCurrentError] = useState('')

  useEffect(() => {
    // Resets the states when opens or closes the modal
    setStock(parseInt(product?.stock) || 0)
    setChangingStock(false)
    setCurrentError('')
  }, [modalChangeStockIsOpen])

  const handleChangeStock = e => {
    let { value } = e.target
    value = value === '' ? '' : parseInt(value)

    if (value >= 0 || value === '') {
      setStock(value)
      setCurrentError('')
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!(parseInt(stock) >= 0)) {
      setCurrentError('Estoque inválido!')
      return
    }

    // The new and old stock are the same
    if (stock === parseInt(product?.stock)) {
      setCurrentError('Mesmo estoque!')
      return
    }

    if (
      !window.confirm('Realmente deseja atualizar o estoque do produto?')
    ) {
      return
    }

    setChangingStock(true)
    await changeProductStock({
      productId: product?.id,
      newStock: stock,
      oldStock: parseInt(product?.stock),
      setCurrentError
    }).then(closeModal)
    setChangingStock(false)
  }

  const closeModal = () => {
    toggleModalChangeStock({
      modalChangeStockRef,
      modalChangeStockIsOpen,
      setModalChangeStockIsOpen
    })
  }

  return (
    <dialog id="modal-links" className="p-3" ref={modalChangeStockRef}>
      <article className="d-flex flex-column align-items-center">
        <a
          onClick={closeModal}
          aria-label="Close"
          className="close"
          style={{
            transform: 'scale(1.4)',
            marginRight: '5px'
          }}></a>

        <h3 className="text-center">Atualizar estoque</h3>
        <div className="d-flex justify-content-center w-100">
          <div className="d-flex flex-column px-5 py-2">
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                value={stock}
                onChange={handleChangeStock}
              />
              {currentError && (
                <div className="mt-0 mb-3 text-pico-danger">
                  {currentError}
                </div>
              )}
              {changingStock ? (
                <button type="button" aria-busy={true} disabled={true}>
                  Atualizando...
                </button>
              ) : (
                <>
                  {stock >= 0 && stock !== parseInt(product?.stock) ? (
                    <button type="submit">Atualizar</button>
                  ) : (
                    <button type="button" disabled={true}>
                      Atualizar
                    </button>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </article>
    </dialog>
  )
}

export default ModalChangeStock
export { toggleModalChangeStock }

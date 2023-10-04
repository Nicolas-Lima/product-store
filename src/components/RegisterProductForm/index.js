import { useState, useEffect, useRef } from 'react'
import { BsPlusLg, BsXCircle, BsImage } from 'react-icons/bs'
import ImageUploader from '../ImageUploader'
import { toast } from 'react-toastify'
import { validateRegisterProductForm } from '../../utils/validationUtils'
import './registerProduct.css'

function RegisterProductForm({
  registerProduct,
  handleToggleModalRegisterProduct,
  modalRegisterProductRef,
  modalRegisterProductIsOpen
}) {
  const [formState, setFormState] = useState({
    name: {
      value: '',
      startedTyping: false,
      error: ''
    },
    description: {
      value: '',
      startedTyping: false,
      error: ''
    },
    productImg: {
      value: '',
      startedTyping: false,
      error: ''
    },
    price: {
      value: {
        real: 0,
        price: 0
      },
      startedTyping: false,
      error: ''
    },
    real: {
      value: '',
      startedTyping: false,
      error: ''
    },
    cents: {
      value: '',
      startedTyping: false,
      error: ''
    },
    stock: {
      value: '',
      startedTyping: false,
      error: ''
    },
    minPurchaseUnits: {
      value: '',
      startedTyping: false,
      error: ''
    },
    maxPurchaseUnits: {
      value: '',
      startedTyping: false,
      error: ''
    },
    newKeyword: {
      value: '',
      startedTyping: false,
      error: ''
    },
    keywords: {
      value: [],
      startedTyping: false,
      error: ''
    },
    type: {
      value: 'default',
      startedTyping: false,
      error: ''
    }
  })
  const imageInputRef = useRef(null)
  const [imgUrl, setImgUrl] = useState(null)
  const [image, setImage] = useState(null)
  const [newProductErrorMessages, setNewProductErrorMessages] = useState({
    name: '',
    description: '',
    imgUrl: '',
    real: '',
    cents: '',
    stock: '',
    price: '',
    minPurchaseUnits: '',
    maxPurchaseUnits: '',
    newKeyword: '',
    type: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [areAllFieldsValid, setAreAllFieldsValid] = useState(false)
  const [registeringProduct, setRegisteringProduct] = useState(false)

  const cleanFormState = () => {
    const newFormState = {}
    const formStateKeys = Object.keys(formState)

    formStateKeys.forEach(stateKey => {
      let value = ['real', 'cents'].includes(stateKey) ? '0' : ''

      if (stateKey === 'price') {
        value = {
          real: 0,
          cents: 0
        }
      }

      if (stateKey === 'type') {
        value = 'default'
      }

      newFormState[stateKey] = {
        value,
        startedTyping: false,
        error: ''
      }
    })

    setFormState(newFormState)
  }

  const cleanNewProductErrorMessages = () => {
    const newProductErrorMessages = {}
    const newProductErrorMessagesKeys = Object.keys(formState)

    newProductErrorMessagesKeys.forEach(key => {
      newProductErrorMessages[key] = ''
    })

    setNewProductErrorMessages(newProductErrorMessages)
  }

  const resetFormAndImage = () => {
    setImage(null)
    setImgUrl(null)
    cleanFormState()
    cleanNewProductErrorMessages()
    setFormSubmitted(false)
  }

  useEffect(() => {
    const handleFocus = () => {
      const modalHasOpenAttribute =
        modalRegisterProductRef?.current?.hasAttribute('open')
      const isModalOpen =
        document.body.classList.contains('modal-is-open') &&
        document.body.classList.contains('modal-register-product-is-open')
      const imageInputValueLength = imageInputRef.current.value.length

      if (
        imageInputValueLength === 0 &&
        isModalOpen &&
        !modalHasOpenAttribute
      ) {
        handleToggleModalRegisterProduct()
      }
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  useEffect(() => {
    resetFormAndImage()
  }, [modalRegisterProductIsOpen])

  useEffect(() => {
    const updateNewProductErrorMessages = () => {
      const newRegisterProduct = {}

      const formStateKeys = Object.keys(formState)
      formStateKeys.forEach(stateKey => {
        newRegisterProduct[stateKey] = formState[stateKey]?.value
      })

      const { areAllFieldsValid, errorMessages } =
        validateRegisterProductForm({
          ...newRegisterProduct,
          price: formState?.price?.value
        })

      setNewProductErrorMessages(errorMessages)
      setAreAllFieldsValid(areAllFieldsValid)
    }

    updateNewProductErrorMessages()
  }, [formState])

  useEffect(() => {
    handleInputChange(
      {
        value: image
      },
      'productImg',
      false
    )
  }, [image])

  const isValidNumber = number => {
    const invalidCharacters = ['-', 'e']

    return (
      !invalidCharacters.some(
        invalidCharacter => invalidCharacter === number
      ) && /^[0-9]*$/.test(number)
    )
  }

  const handleCleanFields = () => {
    resetFormAndImage()
  }

  const handleRegisterProduct = async e => {
    e.preventDefault()

    setFormSubmitted(true)
    if (!areAllFieldsValid) {
      toast.error(
        'Por favor, verifique se todos os campos estão preenchidos corretamente.',
        {
          toastId: 'productFormInvalidFields'
        }
      )
      return
    }

    setRegisteringProduct(true)

    const formStateKeys = Object.keys(formState)
    const newProduct = formStateKeys.reduce((newProduct, key) => {
      return {
        ...newProduct,
        [key]: formState[key]?.value
      }
    }, {})

    await registerProduct(newProduct)

    if (handleToggleModalRegisterProduct) {
      handleToggleModalRegisterProduct()
    }
    setRegisteringProduct(false)
    setFormSubmitted(false)
  }

  const handleInputChange = (e, fieldName, startedTyping = true) => {
    const { value } = e.target || e

    setFormState(prevState => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        value,
        startedTyping // Marca que o usuário começou a digitar
      }
    }))
  }

  const handleAddKeyword = () => {
    const newKeyword = formState?.newKeyword?.value

    if (newKeyword.trim().length < 2) {
      setNewProductErrorMessages(prevState => {
        return {
          ...prevState,
          newKeyword:
            'A palavra-chave precisa de ter no mínimo, 2 caracteres!'
        }
      })

      return
    }

    const keywords = formState?.keywords?.value || []
    const newKeywords = [...keywords, newKeyword]

    handleInputChange(
      {
        value: newKeywords
      },
      'keywords'
    )

    handleInputChange(
      {
        value: ''
      },
      'newKeyword'
    )
  }

  const removeKeyword = keywordIndex => {
    const keywords = formState?.keywords?.value || []

    const newKeywords = keywords?.filter(
      (keyword, index) => keywordIndex !== index
    )

    handleInputChange(
      {
        value: newKeywords
      },
      'keywords'
    )
  }

  const handleChangeReal = e => {
    const currentPrice = formState?.price?.value
    const value = e.target.value

    handleInputChange(
      {
        value: {
          ...currentPrice,
          real: value
        }
      },
      'price'
    )

    handleInputChange(e, 'real')
  }

  const handleChangeCents = e => {
    const currentPrice = formState?.price?.value
    const value = e.target.value

    const isValid =
      value.trim() === '' ||
      (parseInt(value) >= 0 &&
        parseInt(value) <= 99 &&
        !value?.includes('-'))

    if (!isValid) {
      return
    }

    handleInputChange(
      {
        value: {
          ...currentPrice,
          cents: value
        }
      },
      'price'
    )

    handleInputChange(e, 'cents')
  }

  const handleChangeMinPurchaseUnits = e => {
    let value = e.target.value?.split('')
    value = value.filter(caracter => isValidNumber(caracter))?.join('')

    if (value <= 300) {
      handleInputChange(e, 'minPurchaseUnits')
    }
  }

  const handleChangeMaxPurchaseUnits = e => {
    let value = e.target.value?.split('')
    value = value.filter(caracter => isValidNumber(caracter))?.join('')

    if (value <= 300) {
      handleInputChange(e, 'maxPurchaseUnits')
    }
  }

  const Keywords = () =>
    formState?.keywords?.value?.map((keyword, index) => {
      return (
        <span
          className="d-inline-flex align-items-center p-2 me-2 bg-light text-dark rounded"
          key={`keyword-${index}`}>
          {keyword}{' '}
          <span
            role="button"
            className="removeKeyword p-0 m-0 bg-transparent border-0 text-danger ms-2"
            onClick={() => removeKeyword(index)}>
            <BsXCircle />
          </span>
        </span>
      )
    })

  const RenderInputError = ({ inputName }) => {
    const inputState = formState[inputName]
    const errorMessage = newProductErrorMessages[inputName]

    return (
      <>
        {errorMessage &&
          inputState &&
          (inputState?.startedTyping || formSubmitted) && (
            <div className="mb-3 mt-0 text-danger">{errorMessage}</div>
          )}
      </>
    )
  }

  return (
    <form onSubmit={handleRegisterProduct}>
      <label htmlFor="productName">Nome do produto</label>
      <input
        type="text"
        id="productName"
        placeholder="Nome do produto"
        maxLength={20}
        value={formState?.name?.value}
        onChange={e => handleInputChange(e, 'name')}
      />
      <RenderInputError inputName="name" />

      <label htmlFor="productDescription">Descrição do produto</label>
      <textarea
        style={{
          resize: 'none'
        }}
        id="productDescription"
        placeholder="Descrição do produto"
        className="mb-2"
        maxLength={200}
        value={formState?.description?.value}
        onChange={e => handleInputChange(e, 'description')}></textarea>
      <RenderInputError inputName="description" />

      <label htmlFor="imgUpload" className="mb-0">
        Imagem do produto
      </label>
      <div className="productImg-uploader mb-1">
        <ImageUploader
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          setImage={setImage}
          imageInputRef={imageInputRef}
          defaultImg={<BsImage className="imgPhoto" />}
          isAvatar={true}
        />
      </div>

      <RenderInputError inputName="productImg" />

      <div className="price-container border rounded p-3 mb-3">
        <strong>Preço</strong>
        <div className="grid mt-2">
          <div>
            <label htmlFor="real">Reais</label>
            <input
              type="number"
              id="real"
              placeholder="Reais"
              value={formState?.real?.value}
              onChange={handleChangeReal}
            />
            <RenderInputError inputName="real" />
          </div>
          <div>
            <label htmlFor="cents">Centavos</label>
            <input
              type="number"
              id="cents"
              placeholder="Centavos"
              value={formState?.cents?.value}
              onChange={handleChangeCents}
            />
            <RenderInputError inputName="cents" />
          </div>
        </div>
        <div className="d-block">
          <RenderInputError inputName="price" />
        </div>
      </div>
      <label htmlFor="stock">Estoque</label>
      <input
        type="number"
        id="stock"
        placeholder="Estoque"
        min={1}
        value={formState?.stock?.value}
        onChange={e => handleInputChange(e, 'stock')}
        pattern="[0-9]*"
      />
      <RenderInputError inputName="stock" />
      <label htmlFor="minPurchaseUnits">Unidades mínimas de compra</label>
      <input
        type="text"
        id="minPurchaseUnits"
        placeholder="Unidades mínimas de compra"
        min={1}
        value={formState?.minPurchaseUnits?.value}
        onChange={handleChangeMinPurchaseUnits}
        pattern="^[0-9]*$"
      />
      <RenderInputError inputName="minPurchaseUnits" />
      <label htmlFor="maxPurchaseUnits">Unidades máximas de compra</label>
      <input
        type="text"
        id="maxPurchaseUnits"
        placeholder="Unidades máximas de compra"
        min={1}
        value={formState?.maxPurchaseUnits?.value}
        onChange={handleChangeMaxPurchaseUnits}
        pattern="[0-9]*"
      />
      <RenderInputError inputName="maxPurchaseUnits" />
      <label htmlFor="keyword">Palavra-chave</label>
      <div className="newKeyword-container">
        <div className="d-flex">
          <input
            type="text"
            id="keyword"
            placeholder="Palavra-chave"
            value={formState?.newKeyword?.value}
            onChange={e => handleInputChange(e, 'newKeyword')}
            min="1"
            maxLength={10}
          />
          <button
            type="button"
            onClick={handleAddKeyword}
            className="w-auto h-auto ms-2">
            <BsPlusLg size={26} />
          </button>
        </div>
        <RenderInputError inputName="newKeyword" />
        {formState?.keywords?.value?.length > 0 && (
          <div className="keywords mb-4">
            <Keywords />
          </div>
        )}
      </div>
      <label htmlFor="productType">Tipo de produto</label>
      <select
        id="productType"
        onChange={e => handleInputChange(e, 'type')}
        value={formState?.type?.value}>
        <option value="default">Selecione um tipo</option>
        <option value="stationery">Papelaria</option>
        <option value="electronics">Eletrônicos</option>
        <option value="appliances">Eletrodomésticos</option>
        <option value="clothing">Roupas</option>
        <option value="toys">Brinquedos</option>
        <option value="books">Livros</option>
        <option value="food">Alimentos</option>
        <option value="furniture">Móveis</option>
        <option value="sports">Artigos esportivos</option>
        <option value="beauty">Produtos de beleza</option>
        <option value="jewelry">Joias</option>
        <option value="others">Outros</option>
      </select>
      <RenderInputError inputName="type" />
      {registeringProduct ? (
        <button type="button" disabled aria-busy={true}>
          Cadastrando...
        </button>
      ) : (
        <>
          <button type="submit">Cadastrar</button>
          <button
            type="button"
            className="btn-orange"
            onClick={handleCleanFields}>
            Limpar
          </button>
        </>
      )}
    </form>
  )
}

export default RegisterProductForm

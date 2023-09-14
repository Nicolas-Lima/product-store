import { useState, useContext, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { StoreContext } from '../../contexts/store'
import { toast } from 'react-toastify'
import Nav from '../../components/Nav'
import RegisterSellerForm from '../../components/RegisterSellerForm'
import NewCreditCardForm from '../../components/NewCreditCardForm'
import SelectedCreditCardInfo from '../../components/SelectedCreditCardInfo'

function RegisterSeller() {
  const navigate = useNavigate()
  const {
    seller,
    addNewCreditCard,
    creditCardsInfo,
    registerSeller,
    registering,
    setRegistering,
    hasSellerAccount
  } = useContext(AuthContext)
  const { brandNameAlreadyExists } = useContext(StoreContext)

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [newSeller, setNewSeller] = useState({
    cnpj: '',
    receivingCard: {},
    brandName: ''
  })
  const [newSellerErrorMessages, setNewSellerErrorMessages] = useState({
    cnpj: '',
    brandName: '',
    sellerTermsAndConditions: ''
  })
  const [termsAgreed, setTermsAgreed] = useState(false)
  const userHasCreditCard = creditCardsInfo.length > 0
  const [isAddingNewCreditCard, setIsAddingNewCreditCard] = useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = useState(0)

  useEffect(() => {
    if (hasSellerAccount) {
      navigate('/sell')
    }
  }, [hasSellerAccount, navigate])

  const showNewCreditForm = useMemo(() => {
    return isAddingNewCreditCard
  }, [isAddingNewCreditCard])

  const showSelectedCreditCard = useMemo(() => {
    return userHasCreditCard && !showNewCreditForm
  }, [userHasCreditCard, showNewCreditForm])

  const handleAddNewCreditCard = () => {
    setIsAddingNewCreditCard(true)
  }

  const updateNewSellerErrorMessages = updatedInfo => {
    if (!(updatedInfo instanceof Object)) {
      return
    }

    setNewSellerErrorMessages(prevState => {
      return {
        ...prevState,
        ...updatedInfo
      }
    })
  }

  const handleRegisterSeller = async e => {
    e?.preventDefault()
    setFormSubmitted(true)
    setRegistering(true)

    const isBrandNameAlreadyExists = await brandNameAlreadyExists(
      newSeller?.brandName
    )

    const currentBrandNameErrorMessage =
      newSellerErrorMessages?.brandName || ''

    updateNewSellerErrorMessages({
      brandName: isBrandNameAlreadyExists
        ? 'Essa marca já existe!'
        : currentBrandNameErrorMessage
    })

    if (isBrandNameAlreadyExists) {
      setRegistering(false)
      return
    }

    const missingCreditCard = !creditCardsInfo[selectedCardIndex]
    if (missingCreditCard) {
      toast.error('Adicione um cartão de crédito!', {
        toastId: 'missingCreditCard'
      })
      setRegistering(false)
      return
    }

    const isFormValid =
      Object.keys(newSellerErrorMessages)?.filter(
        key => !!newSellerErrorMessages[key]
      ).length === 0

    if (isFormValid) {
      await registerSeller(
        newSeller?.cnpj,
        creditCardsInfo[selectedCardIndex],
        newSeller?.brandName
      )
        .then(() => {
          toast.success('Registrado com sucesso!', {
            toastId: 'sellerRegistered'
          })
        })
        .catch(() => {
          toast.error(
            'Erro ao se cadastrar como um vendedor, tente novamente mais tarde!',
            {
              toastId: 'sellerRegisterError'
            }
          )
        })
    }
    setRegistering(false)
  }

  document.title = 'Novo vendedor'

  return (
    <>
      <Nav />
      <main className="container mt-3 mb-2-3rem">
        <div className="d-flex flex-column align-items-center">
          <h1 className="text-secondary">Cadastre-se como um vendedor!</h1>
          <div>
            <div className="paymentMethod mb-0 p-0">
              <hgroup className="d-flex flex-column align-items-center mb-4">
                <h1 className="mb-0">
                  {userHasCreditCard ? 'Escolha' : 'Adicione'} um cartão
                </h1>
                <h2>
                  Vocẽ irá receber o dinheiro de suas vendas neste cartão!
                </h2>
              </hgroup>
              {(showSelectedCreditCard ||
                (creditCardsInfo?.length > 1 && !showNewCreditForm)) && (
                <div className="savedCreditCards mb-3 mt-5">
                  {showSelectedCreditCard && (
                    <SelectedCreditCardInfo
                      creditCardsInfo={creditCardsInfo}
                      selectedCardIndex={selectedCardIndex}
                    />
                  )}
                  <div className="selectCreditCardContainer">
                    {creditCardsInfo?.length > 1 && !showNewCreditForm && (
                      <>
                        <label htmlFor="selectCreditCard" className="mb-2">
                          <strong>Selecione um cartão</strong>
                        </label>
                        <select
                          id="selectCreditCard"
                          value={selectedCardIndex}
                          onChange={e =>
                            setSelectedCardIndex(parseInt(e.target.value))
                          }>
                          {creditCardsInfo.map((cardInfo, index) => (
                            <option value={index} key={`card-${index}`}>
                              Nome no cartão: {cardInfo?.ownerName}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  </div>
                </div>
              )}
              <div className="addNewCreditCard">
                {!showNewCreditForm && (
                  <button
                    className="btn-blue-grey mb-2-3rem"
                    onClick={handleAddNewCreditCard}>
                    {userHasCreditCard ? 'Trocar' : 'Adicionar'} cartão de
                    crédito
                  </button>
                )}

                {showNewCreditForm && (
                  <NewCreditCardForm
                    addNewCreditCard={addNewCreditCard}
                    creditCardsInfo={creditCardsInfo}
                    setIsAddingNewCreditCard={setIsAddingNewCreditCard}
                    setSelectedCardIndex={setSelectedCardIndex}
                    savedCreditCardsAmount={creditCardsInfo?.length || 0}
                    userHasCreditCard={userHasCreditCard}
                    withBorder={false}
                  />
                )}
              </div>
            </div>
            <div className="mt-0">
              <RegisterSellerForm
                newSeller={newSeller}
                setNewSeller={setNewSeller}
                newSellerErrorMessages={newSellerErrorMessages}
                setNewSellerErrorMessages={setNewSellerErrorMessages}
                formSubmitted={formSubmitted}
                handleRegisterSeller={handleRegisterSeller}
                termsAgreed={termsAgreed}
                setTermsAgreed={setTermsAgreed}
                registering={registering}
                updateNewSellerErrorMessages={updateNewSellerErrorMessages}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default RegisterSeller

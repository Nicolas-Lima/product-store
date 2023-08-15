import { useState } from 'react'
import { toast } from 'react-toastify'

import { validateCreditCardForm } from '../../utils/validationUtils'
import NewCreditCardFormFields from '../NewCreditCardFormFields'

function NewCreditCardForm({
  addNewCreditCard,
  creditCardsInfo,
  setIsAddingNewCreditCard,
  setSelectedCardIndex,
  savedCreditCardsAmount
}) {
  const [fieldsErrorMessages, setFieldsErrorMessages] = useState({
    ownerName: '',
    expirationDate: '',
    cvv: '',
    billingAddress: '',
    postalCode: '',
    city: '',
    state: ''
  })

  const newCreditCardInfo = {}

  const handleAddNewCreditCard = async e => {
    e.preventDefault()

    const { areAllFieldsValid, errorMessages } =
      validateCreditCardForm(newCreditCardInfo)

    setFieldsErrorMessages(errorMessages)

    if (!areAllFieldsValid) {
      return
    }

    await addNewCreditCard(newCreditCardInfo)

    creditCardsInfo.push(newCreditCardInfo)

    toast.success('Cartão adicionado com sucesso!')
    setIsAddingNewCreditCard(false)
    setSelectedCardIndex(savedCreditCardsAmount)
  }

  return (
    <div className="newCreditCardForm border rounded px-4 p-3 mb-4">
      <strong>Adicionar novo cartão de crédito</strong>
      <form onSubmit={handleAddNewCreditCard} className="mt-3">
        <NewCreditCardFormFields
          newCreditCardInfo={newCreditCardInfo}
          fieldsErrorMessages={fieldsErrorMessages}
        />
        <button type="submit" className="btn-green mt-1">
          Adicionar cartão
        </button>
      </form>
    </div>
  )
}
export default NewCreditCardForm

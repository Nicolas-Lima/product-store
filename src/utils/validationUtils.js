import {
  hasUppercase,
  hasSpecialCharacter,
  hasNumber
} from './generalUtils'

function hasValidDomain(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  return emailPattern.test(email)
}

function validateCnpjWithMessage(cnpj) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !cnpj.trim(),
      errorMessage: 'Digite o CNPJ!'
    },
    {
      condition: !/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj),
      errorMessage: 'Digite um CNPJ válido no formato XX.XXX.XXX/XXXX-XX'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function validateBrandNameWithMessage(brandName) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !brandName.trim(),
      errorMessage: 'Digite o nome da sua marca!'
    },
    {
      condition: !(brandName?.trim().length >= 2),
      errorMessage:
        'O nome da sua marca precisa de ter no mínimo 2 letras!'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function validateCreditCardForm({
  ownerName,
  cardNumber,
  expirationDate,
  cvv,
  billingAddress,
  postalCode,
  city,
  state
} = {}) {
  const {
    isValid: ownerNameIsValid,
    errorMessage: ownerNameErrorMessage
  } = validateOwnerNameWithMessage(ownerName)

  const {
    isValid: cardNumberIsValid,
    errorMessage: cardNumberErrorMessage
  } = validateCardNumberWithMessage(cardNumber)

  const {
    isValid: expirationDateIsValid,
    errorMessage: expirationDateErrorMessage
  } = validateExpirationDateWithMessage(expirationDate)

  const { isValid: cvvIsValid, errorMessage: cvvErrorMessage } =
    validateCVVWithMessage(cvv)

  const {
    isValid: billingAddressIsValid,
    errorMessage: billingAddressErrorMessage
  } = validateBillingAddressWithMessage(billingAddress)

  const {
    isValid: postalCodeIsValid,
    errorMessage: postalCodeErrorMessage
  } = validatePostalCodeWithMessage(postalCode)

  const { isValid: cityIsValid, errorMessage: cityErrorMessage } =
    validateCityWithMessage(city)

  const { isValid: stateIsValid, errorMessage: stateErrorMessage } =
    validateStateWithMessage(state)

  const areAllFieldsValid = [
    ownerNameIsValid,
    cardNumberIsValid,
    expirationDateIsValid,
    cvvIsValid,
    billingAddressIsValid,
    postalCodeIsValid,
    cityIsValid,
    stateIsValid
  ].reduce(
    (areAllFieldsValid, currentField) => areAllFieldsValid && currentField,
    true
  )

  const errorMessages = {
    ownerName: ownerNameErrorMessage,
    cardNumber: cardNumberErrorMessage,
    expirationDate: expirationDateErrorMessage,
    cvv: cvvErrorMessage,
    billingAddress: billingAddressErrorMessage,
    postalCode: postalCodeErrorMessage,
    city: cityErrorMessage,
    state: stateErrorMessage
  }

  return { areAllFieldsValid, errorMessages }
}

function validateDeliveryAddressForm({
  city,
  postalCode,
  state,
  streetAddress
}) {
  const {
    isValid: pstalCodeIsValid,
    errorMessage: postalCodeErrorMessage
  } = validatePostalCodeWithMessage(postalCode)

  const { isValid: cityIsValid, errorMessage: cityErrorMessage } =
    validateCityWithMessage(city)

  const { isValid: stateIsValid, errorMessage: stateErrorMessage } =
    validateStateWithMessage(state)

  const {
    isValid: streetAddressIsValid,
    errorMessage: streetAddressErrorMessage
  } = validateStreetAddressWithMessage(streetAddress)

  const areAllFieldsValid = [
    pstalCodeIsValid,
    cityIsValid,
    stateIsValid,
    streetAddressIsValid
  ].reduce(
    (areAllFieldsValid, currentField) => areAllFieldsValid && currentField,
    true
  )

  const errorMessages = {
    postalCode: postalCodeErrorMessage,
    city: cityErrorMessage,
    state: stateErrorMessage,
    streetAddress: streetAddressErrorMessage
  }

  return { areAllFieldsValid, errorMessages }
}

function validateStreetAddressWithMessage(streetAddress) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !streetAddress.trim(),
      errorMessage: 'Digite o logradouro!'
    },
    {
      condition:
        typeof streetAddress !== 'string' || streetAddress.trim() === '',
      errorMessage: 'O logradouro não pode estar em branco!'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function validateOwnerNameWithMessage(ownerName) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !ownerName.trim(),
      errorMessage: 'Digite o nome escrito no cartão!'
    },
    {
      condition: !/^[a-zA-Z\s]+$/i.test(ownerName),
      errorMessage: 'Nome do cartão inválido! O nome não pode ter acentos.'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function validateCardNumberWithMessage(cardNumber) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !cardNumber.trim(),
      errorMessage: 'Digite o número do cartão!'
    },
    {
      condition: !/^\d{16}$/.test(cardNumber),
      errorMessage:
        'Número do cartão inválido! Deve conter exatamente 16 dígitos.'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function validateExpirationDateWithMessage(expirationDate) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !expirationDate.trim(),
      errorMessage: 'A data de validade é obrigatória.'
    },
    {
      condition: !/^(0[1-9]|1[0-2]) \/ \d{2}$/i.test(expirationDate),
      errorMessage:
        'Digite uma data de validade válida no formato MM / AA.'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function validateCVVWithMessage(cvv) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !cvv.trim(),
      errorMessage: 'O CVV é obrigatório.'
    },
    {
      condition: !/^\d{3,4}$/i.test(cvv),
      errorMessage: 'Digite um CVV válido de 3 ou 4 dígitos.'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function validateBillingAddressWithMessage(billingAddress) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !billingAddress.trim(),
      errorMessage: 'O endereço de cobrança é obrigatório.'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function validatePostalCodeWithMessage(postalCode) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !postalCode.trim(),
      errorMessage: 'O CEP é obrigatório.'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function validateCityWithMessage(city) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !city.trim(),
      errorMessage: 'A cidade é obrigatória.'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function validateStateWithMessage(state) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !state.trim(),
      errorMessage: 'O estado é obrigatório.'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function validateEmailWithMessage(email) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !email.trim(),
      errorMessage: 'Seu endereço de email está vazio'
    },
    {
      condition: !email.includes('@'),
      errorMessage: 'Inclua um @ no seu endereço de email'
    },
    {
      condition:
        email.split('').filter(caracter => caracter === '@')?.length > 1,
      errorMessage: 'Um endereço de email não pode ter mais de um @'
    },
    {
      condition: !email.split('@').pop().trim(),
      errorMessage: 'Digite algo depois do @'
    },
    {
      condition: !email.split('@')[0]?.trim(),
      errorMessage: 'Digite algo antes do @'
    },
    {
      condition: !hasValidDomain(email),
      errorMessage: 'Email inválido'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function validatePasswordWithMessage(password) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !password.trim(),
      errorMessage: 'Sua senha está vazia!'
    },
    {
      condition: !hasUppercase(password),
      errorMessage: 'Sua senha precisa ter pelo menos uma letra maiúscula!'
    },
    {
      condition: !hasSpecialCharacter(password),
      errorMessage:
        'Sua senha precisa ter pelo menos um caractere especial!'
    },
    {
      condition: !hasNumber(password),
      errorMessage: 'Sua senha precisa ter pelo menos um número!'
    },
    {
      condition: !(password.length >= 6),
      errorMessage: 'Sua senha precisa ter pelo menos 6 caracteres!'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function validateFullNameWithMessage(fullName) {
  let isValid = true
  let errorMessage = ''

  const validationConditions = [
    {
      condition: !fullName.trim(),
      errorMessage: 'Seu nome está vazio!'
    },
    {
      condition: !(fullName.length >= 3),
      errorMessage: 'Seu nome precisa de ter no mínimo 3 letras!'
    },
    {
      condition: !(fullName.trim().split(' ').length >= 2),
      errorMessage: 'Insira ao menos um sobrenome!'
    }
  ]

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false
      errorMessage = condition.errorMessage
    }
  })

  return {
    isValid,
    errorMessage
  }
}

function getAuthErrorMessage(errorCode) {
  let errorMessage = ''

  switch (errorCode) {
    case 'auth/invalid-email':
      errorMessage =
        'Endereço de email inválido. Por favor, verifique o email digitado.'
      break
    case 'auth/user-not-found':
      errorMessage =
        'Usuário não encontrado. Verifique o email e a senha e tente novamente.'
      break
    case 'auth/missing-password':
      errorMessage =
        'Senha obrigatória. Por favor, certifique-se de digitar sua senha antes de prosseguir.'
      break
    case 'auth/wrong-password':
      errorMessage = 'Sua senha está incorreta!'
      break
    default:
      errorMessage =
        'Erro ao efetuar login. Por favor, tente novamente mais tarde.'
  }

  return errorMessage
}

function getCreateAccountErrorMessage(errorCode) {
  let errorMessage = {
    password: '',
    email: '',
    default: ''
  }

  switch (errorCode) {
    case 'auth/weak-password':
      errorMessage.password = 'Senha fraca!'
      break
    case 'auth/email-already-in-use':
      errorMessage.email = 'Este email já está em uso!'
      break
    case 'auth/invalid-email':
      errorMessage.email = 'Email inválido!'
      break
    default:
      errorMessage.default =
        'Erro ao efetuar cadastro. Por favor, tente novamente mais tarde.'
  }

  return errorMessage
}

export {
  hasValidDomain,
  validateCnpjWithMessage,
  validateBrandNameWithMessage,
  validateCreditCardForm,
  validateDeliveryAddressForm,
  validateOwnerNameWithMessage,
  validateCardNumberWithMessage,
  validateExpirationDateWithMessage,
  validateCVVWithMessage,
  validateBillingAddressWithMessage,
  validatePostalCodeWithMessage,
  validateCityWithMessage,
  validateStateWithMessage,
  validateEmailWithMessage,
  validatePasswordWithMessage,
  validateFullNameWithMessage,
  getAuthErrorMessage,
  getCreateAccountErrorMessage
}

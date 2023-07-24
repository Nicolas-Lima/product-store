import {
  hasUppercase,
  hasSpecialCharacter,
  hasNumber,
} from "./generalUtils";

function hasValidDomain(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailPattern.test(email);
}

function validateEmailWithMessage(email) {
  let isValid = true;
  let errorMessage = "";

  const validationConditions = [
    {
      condition: !email,
      errorMessage: "Seu endereço de email está vazio",
    },
    {
      condition: !email.includes("@"),
      errorMessage: "Inclua um @ no seu endereço de email",
    },
    {
      condition:
        email.split("").filter(caracter => caracter === "@")?.length > 1,
      errorMessage: "Um endereço de email não pode ter mais de um @",
    },
    {
      condition: !email.split("@").pop().trim(),
      errorMessage: "Digite algo depois do @",
    },
    {
      condition: !email.split("@")[0]?.trim(),
      errorMessage: "Digite algo antes do @",
    },
    {
      condition: !hasValidDomain(email),
      errorMessage: "Email inválido",
    },
  ];

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false;
      errorMessage = condition.errorMessage;
    }
  });

  return {
    isValid,
    errorMessage,
  };
}

function validatePasswordWithMessage(password) {
  let isValid = true;
  let errorMessage = "";

  const validationConditions = [
    {
      condition: !password,
      errorMessage: "Sua senha está vazia!",
    },
    {
      condition: !hasUppercase(password),
      errorMessage:
        "Sua senha precisa ter pelo menos uma letra maiúscula!",
    },
    {
      condition: !hasSpecialCharacter(password),
      errorMessage:
        "Sua senha precisa ter pelo menos um caractere especial!",
    },
    {
      condition: !hasNumber(password),
      errorMessage: "Sua senha precisa ter pelo menos um número!",
    },
    {
      condition: !(password.length >= 6),
      errorMessage: "Sua senha precisa ter pelo menos 6 caracteres!",
    },
  ];

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false;
      errorMessage = condition.errorMessage;
    }
  });

  return {
    isValid,
    errorMessage,
  };
}

function getAuthErrorMessage(errorCode) {
  let errorMessage = "";

  switch (errorCode) {
    case "auth/invalid-email":
      errorMessage =
        "Endereço de email inválido. Por favor, verifique o email digitado.";
      break;
    case "auth/user-not-found":
      errorMessage =
        "Usuário não encontrado. Verifique o email e a senha e tente novamente.";
      break;
    case "auth/missing-password":
      errorMessage =
        "Senha obrigatória. Por favor, certifique-se de digitar sua senha antes de prosseguir.";
      break;
    default:
      errorMessage =
        "Erro ao efetuar login. Por favor, tente novamente mais tarde.";
  }

  return errorMessage;
}

function getCreateAccountErrorMessage(errorCode) {
  let errorMessage = {
    password: "",
    email: "",
    default: "",
  };

  switch (errorCode) {
    case "auth/weak-password":
      errorMessage.password = "Senha fraca!";
      break;
    case "auth/email-already-in-use":
      errorMessage.email = "Este email já está em uso!";
      break;
    case "auth/invalid-email":
      errorMessage.email = "Email inválido!";
      break;
    default:
      errorMessage.default =
        "Erro ao efetuar cadastro. Por favor, tente novamente mais tarde.";
  }

  return errorMessage;
}

export {
  hasValidDomain,
  validateEmailWithMessage,
  validatePasswordWithMessage,
  getAuthErrorMessage,
  getCreateAccountErrorMessage,
};

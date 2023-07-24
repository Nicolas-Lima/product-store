import {
  BsThermometerHigh,
  BsThermometerHalf,
  BsThermometerLow,
} from "react-icons/bs";

const hasUppercase = string => {
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (/[a-zA-Z]/.test(char) && char === char.toUpperCase()) {
      return true;
    }
  }
  return false;
};

const hasSpecialCharacter = string => {
  var regex = /[!@#$%^&*(),.?":{}|<>]/;
  return regex.test(string);
};

function hasNumber(string) {
  return /\d/.test(string);
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function mpsToKmph(mps) {
  // Convert meters per second to kilometers per hour
  const kmph = mps * 3.6;
  return parseFloat(kmph.toFixed(2));
}

function roundToNearestInteger(number) {
  const decimalPart = number - Math.floor(number);
  if (decimalPart >= 0.5) {
    return Math.ceil(number);
  }
  return Math.floor(number);
}

function getTempIcon(temperature) {
  if (temperature <= 10) {
    return <BsThermometerLow />;
  } else if (temperature >= 11 && temperature <= 25) {
    return <BsThermometerHalf />;
  } else if (temperature >= 26) {
    return <BsThermometerHigh />;
  }
  return null;
}

export {
  hasUppercase,
  hasSpecialCharacter,
  hasNumber,
  capitalizeFirstLetter,
  mpsToKmph,
  roundToNearestInteger,
  getTempIcon,
};

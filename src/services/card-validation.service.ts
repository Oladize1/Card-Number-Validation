import { cardValidationResult } from "../types/card-validation.types.js";
export const isValidCardNumber = (cardNumber: string): cardValidationResult => {
  const trimcardNumber = cardNumber.trim();
  if (trimcardNumber.length < 13 || trimcardNumber.length > 19) {
    return { isValid: false, message: "outside bound" };
  }
  if (!/^\d+$/.test(trimcardNumber)) {
    return {
      isValid: false,
      message: "invalid card number contains letters or special character",
    };
  }

  if (/^(\d)\1+$/.test(trimcardNumber)) {
    return {
      isValid: false,
      message: "invalid card number contains repetitive dummy digits",
    };
  }

  let total = 0;
  for (let i = trimcardNumber.length - 1; i >= 0; i--) {
    const check = trimcardNumber.length - 1 - i;
    if (check % 2 !== 0) {
      let toBeDoubled = Number(trimcardNumber[i]) * 2;
      if (toBeDoubled > 9) {
        toBeDoubled = toBeDoubled - 9;
      }
      total += toBeDoubled;
    } else {
      total += Number(trimcardNumber[i]);
    }
  }
  const result = total % 10;
  if (result !== 0) {
    return { isValid: false, message: "credit card number is invalid" };
  }
  return { isValid: true, message: "credit card number is valid" };
};

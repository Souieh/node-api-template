// employeeInfoValidator.js
import {
  isValidPassword,
  isValidString,
  isValidUsername,
} from "./validators.js";

module.exports = async function validateUser(user, keys) {
  const validationResult = {
    isValid: true,
    messages: [],
  };

  // Validation functions
  const validateField = async (field, validator) => {
    const fieldResult = await validator(user[field]);
    validationResult.isValid = validationResult.isValid && fieldResult.isValid;
    if (!fieldResult.isValid)
      validationResult.messages.push(`${field}: ${fieldResult.message}`);
  };

  // Validate each field
  await Promise.all(
    [
      //+++++
      //   { key: "email", r: validateField("email", isValidEmail) },

      { key: "name", r: validateField("name", isValidString) },

      { key: "username", r: validateField("username", isValidUsername) },

      { key: "password", r: validateField("password", isValidPassword) },
    ]
      .filter((i) => !keys || keys.indexOf(i.key) >= 0)
      .map((i) => i.r)
  );
  return validationResult;
};
module.exports = async function validateAdminUser(user, keys) {
  const validationResult = {
    isValid: true,
    messages: [],
  };

  // Validation functions
  const validateField = async (field, validator) => {
    const fieldResult = await validator(user[field]);
    validationResult.isValid = validationResult.isValid && fieldResult.isValid;
    if (!fieldResult.isValid)
      validationResult.messages.push(`${field}: ${fieldResult.message}`);
  };

  // Validate each field
  await Promise.all(
    [
      { key: "direction", r: validateField("direction", isValidString) },
      { key: "username", r: validateField("username", isValidUsername) },
      { key: "password", r: validateField("password", isValidPassword) },
    ]
      .filter((i) => !keys || keys.indexOf(i.key) >= 0)
      .map((i) => i.r)
  );
  return validationResult;
};

export default {
  validateUser,
  validateAdminUser,
};

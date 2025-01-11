// employeeInfoValidator.js
const { isValidString } = require("./validators.js");

module.exports = async function translationValidator(data) {
  const validationResult = {
    isValid: true,
    messages: [],
  };

  // Validation functions
  const validateField = async (field, validator) => {
    const fieldResult = await validator(data[field]);
    validationResult.isValid = validationResult.isValid && fieldResult.isValid;
    if (!fieldResult.isValid)
      validationResult.messages.push(`${field}: ${fieldResult.message}`);
  };

  // Validate each field
  await Promise.all(
    ["key", "ar", "fr"]
      .map((key) => ({ key, r: validateField(key, isValidString) }))
      .map((i) => i.r)
  );
  return validationResult;
};

module.exports = { translationValidator };

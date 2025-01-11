// validators.js

const {
  emplyeeAccessCredetnialsModel,
} = require("../../models/employeeModel.js");
const userModel = require("../../models/userModel.js");

// Utility function for string validation
export const isValidString = (str) => {
  if (typeof str !== "string" || str.trim().length === 0) {
    return { isValid: false, message: "Value must be a non-empty string." };
  }
  return { isValid: true, message: "Valid string." };
};

// Validation functions
export const isValidFirstName = (firstName) => isValidString(firstName);
export const isValidLastName = (lastName) => isValidString(lastName);
export const isValidAddress = (address) => isValidString(address);

export const isValidEmail = async (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return { isValid: false, message: "Invalid email format." };
  }

  const existingUser = await userModel.exists({ email });
  if (existingUser) {
    return { isValid: false, message: "Email is already taken." };
  }

  return { isValid: true, message: "Valid email." };
};

export const isValidUsername = async (username) => {
  // Customize the username pattern as needed
  const usernamePattern = /^[a-zA-Z0-9-_]{3,20}$/;

  if (!usernamePattern.test(username)) {
    return { isValid: false, message: "Invalid username format." };
  }

  const existingUser = await userModel.exists({ username });
  if (existingUser) {
    return { isValid: false, message: "Username is already taken." };
  }

  return { isValid: true, message: "Valid username." };
};
export const isValidEmployeeUsername = async (username) => {
  // Customize the username pattern as needed
  const usernamePattern = /^[a-zA-Z0-9-_]{3,28}$/;

  if (!usernamePattern.test(username)) {
    return { isValid: false, message: "Invalid username format." };
  }

  const existingUser = await emplyeeAccessCredetnialsModel.exists({ username });
  if (existingUser) {
    return { isValid: false, message: "Username is already taken." };
  }

  return { isValid: true, message: "Valid username." };
};
export const isValidPassword = (password) => {
  const isValid = isValidString(password).isValid && password.length >= 8;
  return {
    isValid,
    message: isValid
      ? "Valid password."
      : "Password must be at least 8 characters long.",
  };
};

export const isValidBirthDate = (birthDate) => {
  const isValid = isValidString(birthDate).isValid;
  if (!isValid) {
    return { isValid, message: "Invalid birth date format." };
  }

  const dateObject = new Date(birthDate);
  const isDateValid = !isNaN(dateObject.getTime());

  return {
    isValid: isDateValid,
    message: isDateValid
      ? "Valid birth date."
      : "Birth date is not within the valid range.",
  };
};

export default {
  isValidFirstName,
  isValidLastName,
  isValidAddress,
  isValidEmail,
  isValidPassword,
  isValidBirthDate,
  isValidUsername,
  isValidEmployeeUsername,
};

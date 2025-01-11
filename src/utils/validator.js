const { isValidObjectId } = require("mongoose");

// Validate name (non-empty and no special characters)
function validateName(name) {
  if (!name) return "Name is required.";

  // Allow Arabic, French, English letters, and spaces
  const namePattern =
    /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u8A00-\u8AFF\uFB50-\uFDFF\uFE70-\uFEFF\s\-']+$/;

  if (!namePattern.test(name)) {
    return "Name can only contain letters, spaces, dashes, and apostrophes.";
  }
  return null;
}

// Validate username (non-empty and no special characters)
function validateUsername(username) {
  if (!username) return "Username is required.";
  if (/[^a-zA-Z0-9._-]/.test(username))
    return "Username can only contain letters and numbers.";
  return null;
}

// Validate password (non-empty and minimum length)
function validatePassword(password) {
  if (!password) return "Password is required.";
  if (password.length < 8)
    return "Password must be at least 8 characters long.";
  return null;
}

// Validate email with regex
function validateEmail(email) {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!email) return "Email is required.";
  if (!emailPattern.test(email)) return "Invalid email address.";
  return null;
}

// Validate phone number (optional, but should be digits)
function validatePhone(phone) {
  if (phone && !/^\d{7,10}$/.test(phone)) return "Phone number is invalid.";
  return null;
}

// Validate ID number (non-empty)
function validateIdNumber(idNumber) {
  if (!idNumber) return "ID number is required.";
  return null;
}

// Validate ID type (non-empty)
function validateIdType(idType) {
  if (!idType) return "ID type is required.";
  return null;
}

// Validate ID information (ID type and ID number)
function validateIdentification(identification) {
  if (!identification) return "ID number and type are required.";
  const { idType, idNumber } = identification;
  if (!idType) return "ID type is required.";
  if (!idNumber) return "ID number is required.";
  return null;
}

// Validate entire visitor info
function validateVisitor(visitor) {
  // Validate name
  const nameError = validateName(visitor.name);
  if (nameError) return { valid: false, message: nameError };

  // Validate identification
  const identificationError = validateIdentification(visitor.identification);
  if (identificationError)
    return { valid: false, message: identificationError };

  // Validate ID type and ID number
  const idTypeError = validateIdType(visitor.identification.idType);
  if (idTypeError) return { valid: false, message: idTypeError };

  const idNumberError = validateIdNumber(visitor.identification.idNumber);
  if (idNumberError) return { valid: false, message: idNumberError };

  // Validate contact (optional fields)
  if (visitor.contact) {
    const emailError = validateEmail(visitor.contact.email);
    if (emailError) return { valid: false, message: emailError };

    const phoneError = validatePhone(visitor.contact.phone);
    if (phoneError) return { valid: false, message: phoneError };
  }

  // No errors
  return { valid: true, message: "Validation passed." };
}

// Validate Date
function validateDate(date) {
  if (!date || isNaN(new Date(date).getTime())) return "Date is required.";
  return null;
}

// Validate Time
function validateTime(time) {
  if (!time) return "Time is required.";
  return null;
}

// Validate host
function validateHost(host) {
  if (!host?.name) return "Host name is required.";

  return validateName(host?.name);
}
// Validation function for VisitCheckInType
function validateVisitCheckIn(data) {
  // Validate visitor
  if (!isValidObjectId(data.visitorId)) {
    return { valid: false, message: "Visitor information is required." };
  }

  if (!isValidObjectId(data.hostId))
    return { valid: false, message: `Host information is required` };

  // Validate date (optional but must be a valid date)
  if (!data.date || isNaN(new Date(data.date).getTime())) {
    return { valid: false, message: "Invalid date format." };
  }

  // Validate checkIn (optional, must be a valid time format)
  if (!data.checkIn || !/^\d{2}:\d{2}$/.test(data.checkIn)) {
    return { valid: false, message: "Check-in time must be in HH:mm format." };
  }

  return {
    valid: true,
    message: "Validation succeeded.",
  };
}
// Validation function for VisitCheckInType
function validateVisitCheckOut(data) {
  // Validate visitor
  if (!isValidObjectId(data.checkInId)) {
    return { valid: false, message: "Visitor information is required." };
  }

  // Validate checkIn (optional, must be a valid time format)
  if (!data.checkOut || !/^\d{2}:\d{2}$/.test(data.checkOut)) {
    return { valid: false, message: "Check-out time must be in HH:mm format." };
  }

  return {
    valid: true,
    message: "Validation succeeded.",
  };
}

function LoginCredentialsValidator(userCredentials) {
  let err = validateUsername(userCredentials.username);
  if (!!err) {
    return { valid: false, message: err };
  }
  err = validatePassword(userCredentials.password);
  if (!!err) {
    return { valid: false, message: err };
  }

  return { valid: true };
}

function SignUpCredentialsValidator(userCredentials) {
  let err = validateUsername(userCredentials.username);
  if (!!err) {
    return { valid: false, message: err };
  }
  err = validatePassword(userCredentials.password);
  if (!!err) {
    return { valid: false, message: err };
  }
  err = validateName(userCredentials.name);
  if (!!err) {
    return { valid: false, message: err };
  }

  return { valid: true };
}

module.exports = {
  validateName,
  validateUsername,
  validatePassword,
  validateEmail,
  validatePhone,
  validateIdNumber,
  validateIdType,
  validateIdentification,
  validateVisitor,
  validateDate,
  validateTime,
  validateHost,
  LoginCredentialsValidator,
  SignUpCredentialsValidator,
  validateVisitCheckIn,
  validateVisitCheckOut,
};

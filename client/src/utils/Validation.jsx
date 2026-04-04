/**
 * Validation utilities for the Store-For-All application.
 * Professional, reusable validation logic for forms.
 */

export const validateMobile = (mobile) => {
  const regex = /^[6789]\d{9}$/;
  if (!mobile) return "Mobile number is required";
  if (!regex.test(mobile)) return "Enter a valid 10-digit Indian mobile number";
  return "";
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!regex.test(email)) return "Enter a valid email address";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  // Add more complexity checks if needed (e.g. at least one number/special char)
  return "";
};

export const validateOTP = (otp) => {
  const regex = /^\d{6}$/;
  if (!otp) return "OTP is required";
  if (!regex.test(otp)) return "Enter a valid 6-digit OTP";
  return "";
};

export const validateName = (name) => {
  if (!name) return "Name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  return "";
};

/**
 * Generic validator that runs multiple validation rules
 * @param {Object} values - Form values
 * @param {Object} rules - Validation functions for each field
 * @returns {Object} errors - Error messages (empty if valid)
 */
export const validateForm = (values, rules) => {
  const errors = {};
  for (const field in rules) {
    const error = rules[field](values[field]);
    if (error) errors[field] = error;
  }
  return errors;
};

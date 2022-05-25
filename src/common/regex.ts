// Regex for form error checking

export const emailRegex = /.+@.+\..+/i;

// min. 8 characters, at least 1 alphanumeric and 1 symbol
export const passwordRegex =
  /^(?=.*[a-z0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]{8,}$/i;

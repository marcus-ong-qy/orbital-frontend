// Warning labels texts

// Login
export enum LOGIN_WARNINGS {
  INVALID = 'Email/Password Invalid!',
}

// Sign up
export enum SIGNUP_WARNINGS {
  EMAIL_INVALID = 'Please enter a valid email address',
  PASSWORD_INVALID = 'Must be 8 or more characters and contain a mix of alphanumeric and symbols',
}

export enum SIGNUP_ERROR_LABELS {
  INITIAL = '',
  ACCOUNT_EXISTS = 'An account has been created with this email!',
  EMAIL_INVALID = 'Email entered is invalid!',
  ERROR = 'Error when creating account!',
  REDIRECT = '',
  SUCCESS = '',
}

// Forget password

export enum RESET_PASSWORD_ERROR_LABELS {
  INITIAL = '',
  ACCOUNT_DOESNT_EXIST = 'An account has yet to be created with this email!',
  EMAIL_INVALID = 'Email invalid!',
  ERROR = 'Error sending reset email!',
  REDIRECT = '',
  SUCCESS = 'Reset Email sent!',
}

// Warning labels texts

// Login
export enum LOGIN {
  INVALID = 'Email/Password Invalid!',
}

// Sign up
export enum SIGNUP {
  SUCCESSFUL = 'Sign Up Successful!',
  EMAIL_INVALID = 'Please enter a valid email address',
  PASSWORD_INVALID = 'Must be 8 or more characters and contain a mix of alphanumeric and symbols',
}

export enum signupErrorLabels {
  initial = '',
  'account-exists' = 'An account has been created with this email!',
  'email-invalid' = 'Email entered is invalid!',
  'error' = 'Error when creating account!',
  redirect = '',
  success = '',
}

// Forget password

export enum resetPasswordErrorLabels {
  initial = '',
  'account-doesnt-exist' = 'An account has yet to be created with this email!',
  'email-invalid' = 'Email invalid!',
  error = 'Error sending reset email!',
  redirect = '',
  success = 'Reset Email sent!',
}

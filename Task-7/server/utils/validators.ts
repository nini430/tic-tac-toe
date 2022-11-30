type Errors = {
  username?: string;
  email?: string;
  password?: string;
};

export const registerValidator = (
  username: string,
  email: string,
  password: string
) => {
  const errors: Errors = {};

  if (username.trim() === "") {
    errors.username = "Username should not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Username should not be empty";
  } else {
    if (
      !email.match(
        /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
      )
    ) {
      errors.email = "Use valid E-mail address";
    }
  }
  if (password.trim() === "") {
    errors.password = "Password should not be empty";
  }

  return { isInvalid: Object.keys(errors).length > 0, errors };
};
export const loginValidator = (email: string, password: string) => {
  const errors: Errors = {};

  if (email.trim() === "") {
    errors.email = "Username should not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password should not be empty";
  }

  return { isInvalid: Object.keys(errors).length > 0, errors };
};

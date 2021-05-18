// Register Validator
module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  // Verify username
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  // Verify email
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
    // Verify password
    if (password.trim() === "") {
      errors.password = "Password must not be empty";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords must match";
    }

    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  }
};

// Login Validator
module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  // Verify username
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  // Verify password
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

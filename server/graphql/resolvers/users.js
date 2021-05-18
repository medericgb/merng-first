const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Validation
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
// Dotenv
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
// Model
const User = require("../../models/user.model");

// Function to generate a token
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    secretKey,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    // Register
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // Make sure user already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      // Hash password and create an auth token
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
      });
      // Save in DB
      const res = await newUser.save();

      // Token
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },

    // Login
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "User not found";
        throw new UserInputError("Wrong credentials", { errors });
      }

      // Token
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
  },
};

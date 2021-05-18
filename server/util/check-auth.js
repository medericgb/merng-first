const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
// Dotenv
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

module.exports = (context) => {
  //
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    //
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, secretKey);
        return user;
      } catch (e) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

const comparePasswords = async (password, dbPassword) => {
  return bcrypt.compare(password, dbPassword);
};

const createToken = (valuer_id) => {
  const token = jwt.sign({ valuer_id }, config.jwt.secret, { expiresIn: config.jwt.expiration });
  return {
    accessToken: token,
    tokenType: "Bearer",
    expiresIn: config.jwt.expiration,
  }
}

module.exports = {
  hashPassword,
  comparePasswords,
  createToken,
}
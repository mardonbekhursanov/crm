const jwt = require("jsonwebtoken")


const accessToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.SECRETKEY, { expiresIn: "15m" });

const refreshToken = (user) =>
  jwt.sign({ id: user.id }, process.env.REFRESHKEY, { expiresIn: "7d" });

module.exports = { accessToken, refreshToken };
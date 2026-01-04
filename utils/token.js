const jwt = require("jsonwebtoken")


const accessToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.SECRETKEY, { expiresIn: "7d" });

const refreshToken = (user) =>
  jwt.sign({ id: user.id }, process.env.REFRESHKEY, { expiresIn: "30d" });

module.exports = { accessToken, refreshToken };
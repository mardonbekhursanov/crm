const db = require('../../models');
const User = db.User;
const hashPassword = require("../../utils/hashedPassword");
const { ServerError, ValidError } = require("../../utils/validation"); // 👈 helperlar import

// ROUTE: /auth/register
// METHOD: POST
// ACCESS: private
const register = async (req, res) => {
  try {
    const { name, phone, password, lastname } = req.body;

    if (!name || !phone || !password) {
      return ValidError(res, 400, "Ism, raqam va parol kiritishingiz majburiy!");
    }

    const existUser = await User.findOne({ where: { phone } });
    if (existUser) {
      return ValidError(res, 403, "Bu foydalanuvchi mavjud!");
    }

    const newUser = await User.create({
      name,
      phone,
      password: await hashPassword(password, 10),
      ...(lastname && { lastname }),
    });

    res.status(201).json({
      alert: {
        message: "Foydalanuvchi muvaffaqiyatli yaratildi!",
        user: newUser,
      },
    });
  } catch (error) {
    ServerError(res, error); // 👈 server xatolari
  }
};

module.exports = register;
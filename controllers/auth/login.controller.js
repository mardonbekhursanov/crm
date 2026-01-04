const db = require("../../models/index");
const User = db.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { accessToken, refreshToken } = require("../../utils/token");
const { ServerError, ValidError } = require("../../utils/validation"); // 👈 helperlar import

// ROUTE: /auth/login
// METHOD: POST
// ACCESS: public
const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return ValidError(res, 400, "Barcha zonalarni to'ldirishingiz shart!");
    }

    const user = await User.findOne({ where: { phone } });
    if (!user) return ValidError(res, 401, "Bunday foydalanuvchi mavjud emas");

    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) return ValidError(res, 401, "Raqam yoki parol xato!");

    await User.update({ is_active: true }, { where: { id: user.id } });

    // ✅ refresh token cookie
    res.cookie("refreshToken", refreshToken(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS faqat prod
      sameSite: "None", // cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 kun
    });

    // ✅ access token frontendga yuboriladi
    res.json({
      alert: { message: "Login muvaffaqiyatli" },
      accessToken: accessToken(user),
    });
  } catch (error) {
    ServerError(res, error);
  }
};

// ROUTE: /auth/logout
// METHOD: POST
// ACCESS: private
const logout = async (req, res) => {
  try {
    const user = req.user;

    await User.update({ is_active: false }, { where: { id: user.id } });

    // ✅ refresh tokenni cookie dan o‘chirish
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.status(200).json({
      alert: { message: "Muvaffaqiyatli chiqildi!" },
    });
  } catch (error) {
    ServerError(res, error);
  }
};

// ROUTE: /auth/refresh
// METHOD: GET
// ACCESS: private
const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return ValidError(res, 401, "Refresh token topilmadi");

  try {
    const { id } = jwt.verify(token, process.env.REFRESH_SECRET);

    const user = await User.findByPk(id);
    if (!user) return ValidError(res, 401, "Foydalanuvchi topilmadi");

    // ✅ Yangi refresh token cookie
    const newRefreshToken = refreshToken(user);
    res.cookie("refreshToken", refreshToken(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ Yangi access token frontendga
    res.json({ accessToken: accessToken(user) });
  } catch (error) {
    ServerError(res, error);
  }
};

module.exports = {
  login,
  logout,
  refresh,
};

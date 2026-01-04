const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

// ROUTE PROTECTION: Admin only
const isAdmin = async (req, res, next) => {
  try {
    // 1️⃣ Tokenni cookie’dan olish
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        alert: { message: "Authorization token yo‘q" },
      });
    }

    // 2️⃣ Tokenni tekshirish
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    // 3️⃣ User’ni DB’dan olish
    const user = await User.findOne({
      where: { id: decoded.id },
      raw: true,
    });

    if (!user) {
      return res.status(401).json({
        alert: { message: "Foydalanuvchi topilmadi" },
      });
    }

    // 4️⃣ Role tekshirish
    if (user.role !== "superuser") {
      return res.status(403).json({
        alert: { message: "Sizda bu amalni bajarish huquqi yo‘q" },
      });
    }

    // 5️⃣ Passwordni olib tashlab req.user ga qo‘yish
    const { password, ...adminWithoutPassword } = user;
    req.user = adminWithoutPassword;

    next();
  } catch (error) {
    return res.status(401).json({
      alert: { message: "Token yaroqsiz yoki muddati tugagan" },
    });
  }
};

module.exports = isAdmin;
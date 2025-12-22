const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

// ROUTE PROTECTION: Admin only
const isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        alert: { message: "Authorization token yo‘q" },
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    const user = await User.findOne({where: {id: decoded.id}, raw: true});

    if (!user) {
      return res.status(401).json({
        alert: { message: "Foydalanuvchi topilmadi" },
      });
    }

    if (user.role !== "superuser") {
      return res.status(403).json({
        alert: { message: "Sizda bu amalni bajarish huquqi yo‘q" },
      });
    }

    // user ma'lumotlarini keyingi handlerga uzatish

    const {password, ...adminWithoutPassword} = user
    req.user = adminWithoutPassword;

    next();
  } catch (error) {
    return res.status(401).json({
      alert: { error: error.message },
    });
  }
};

module.exports = isAdmin;
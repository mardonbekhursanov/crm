const jwt = require("jsonwebtoken");
const { User } = require("../models");

const protect = async (req, res, next) => {
  try {
    // 1️⃣ Tokenni cookie’dan olish
    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 2️⃣ Tokenni tekshirish
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    // 3️⃣ User’ni DB’dan olish
    const user = await User.findOne({
      where: { id: decoded.id },
      raw: true
    });

    if (!user) {
      return res.status(401).json({ message: "User topilmadi" });
    }

    // 4️⃣ Passwordni olib tashlash
    const { password, ...userWithoutPassword } = user;

    // 5️⃣ req.user ga bir marta yozish
    req.user = userWithoutPassword;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token yaroqsiz yoki muddati tugagan" });
  }
};

module.exports = {
  protect
};

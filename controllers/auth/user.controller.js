const jwt = require("jsonwebtoken");
const db = require("../../models");
const User = db.User;
const { ServerError, ValidError } = require("../../utils/validation"); // 👈 helperlar import

// ROUTE: /user/me
// METHOD: PATCH
// ACCESS: private
const update_user = async (req, res) => {
  try {
    const user = req.user;
    const allowedFields = ["name", "email", "avatar"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    if (Object.keys(updates).length === 0) {
      return ValidError(res, 400, "Yangilash uchun ma'lumot yo‘q");
    }

    await User.update(updates, { where: { id: user.id } });

    const updatedUser = await User.findByPk(user.id, {
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    ServerError(res, error);
  }
};

// ROUTE: /user/me/avatar
// METHOD: PATCH
// ACCESS: private
const profileImageUpdate = async (req, res) => {
  try {
    if (!req.file) {
      return ValidError(res, 400, "Rasm yuklanmadi");
    }

    const user = req.user;
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    await User.update({ profile_image: imageUrl }, { where: { id: user.id } });

    return res.status(200).json({
      success: true,
      alert: { message: "Profil rasmi muvaffaqiyatli o‘zgartirildi" },
      profile_image: imageUrl,
    });
  } catch (error) {
    ServerError(res, error);
  }
};

// ROUTE: /user/delete
// METHOD: DELETE
// ACCESS: private
const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    await User.destroy({ where: { id: user.id } });

    return res.status(200).json({
      alert: { message: "Akkaunt muvaffaqiyatli o'chirildi!" },
    });
  } catch (error) {
    ServerError(res, error);
  }
};
const getProfile = async (req, res) => {
  try {
    const user = await req.user
    res.status(200).json(user)
  } catch (error) {
    ServerError(res, error)
  }
}

module.exports = {
  update_user,
  profileImageUpdate,
  deleteUser,
  getProfile
};
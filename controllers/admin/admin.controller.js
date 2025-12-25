const { Op } = require("sequelize");
const db = require("../../models/index");
const User = db.User;
const hashPassword = require("../../utils/hashedPassword");
const { ServerError, ValidError } = require("../../utils/validation"); // 👈 ServerError import

// DESCRIPTION: Automatically creates a superuser admin if it doesn't exist
// USAGE: Call adminRegister() when server starts
// ACCESS: private (internal use only, not exposed via API)

const adminRegister = async () => {
  try {
    const existUser = await User.findOne({
      where: { phone: process.env.ADMIN_PHONE },
    });
    if (!existUser) {
      await User.create({
        name: process.env.ADMIN_NAME,
        password: await hashPassword(process.env.ADMIN_PASSWORD, 10),
        phone: process.env.ADMIN_PHONE,
        role: "superuser",
      });
    }
  } catch (error) {
    console.log(error); // server start-da console log qilamiz, response yo‘q
  }
};

// ROUTE: /admin/users
// METHOD: GET
// ACCESS: private
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      raw: true,
      attributes: { exclude: ["password"] },
      where: { id: { [Op.ne]: req.user.id } },
    });

    res.status(200).json(users);
  } catch (error) {
    ServerError(res, error); // 👈 helper ishlatildi
  }
};
const addAdmin = async (req, res) => {
  try {
    const { check_admin, user_id } = req.body;
    if (!user_id) {
      return ValidError(res, 400, "user_id majburiy!");
    }
    if (check_admin) {
      const user = await User.findByPk(user_id);
      if (!user) {
        return ValidError(res, 404, "Foydalanuvchi topilmadi!");
      }

      if (user.role === "superuser") {
        return ValidError(res, 400, "Foydalanuvchi allaqachon admin!");
      }

      await User.update({ role: "superuser" }, { where: { id: user_id } });

      res.status(200).json({
        alert: {
          message: "Foydalanuvchi admin qilindi",
        },
      });
    }
  } catch (error) {
    ServerError(res, error);
  }
};
const getUserById = async (req, res) =>{
    try {
      const user = await User.findByPk(req.params.id)
      if(!user){
        return ValidError(res, 404, "Bunday foydalanuvchi topilmadi!")
      }
      
    } catch (error) {
      ServerError(res, error)
    }
}
const deleteUserForAdmin = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if(!user){
      return ValidError(res, 404, "Bunday foydalanuvchi topilmadi!")
    }
    await User.destroy({where: {id: user.id}})

    res.status(200).json({
      alert: {
        message: "Foydalanuvchi muvaffaqiyatli o'chirildi!"
      }
    })
  } catch (error) {
    ServerError(res, error)
  }
}
module.exports = {
  adminRegister,
  getAllUsers,
  addAdmin,
  getUserById,
  deleteUserForAdmin
};

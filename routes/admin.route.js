const { getAllUsers, addAdmin, getUserById, deleteUserForAdmin } = require("../controllers/admin/admin.controller");
const isAdmin = require("../middlewares/isadmin");
const { protect } = require("../middlewares/protection");

const route = require("express").Router();

route.get("/users", protect, isAdmin, getAllUsers);
route.post("/add", protect, isAdmin, addAdmin);
route.get("/user/:id", protect, isAdmin, getUserById);
route.delete('/user/:id', protect, isAdmin, deleteUserForAdmin)
module.exports = route
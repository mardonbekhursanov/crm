const { getAllUsers, addAdmin } = require("../controllers/admin/admin.controller");
const isAdmin = require("../middlewares/isadmin");
const { protect } = require("../middlewares/protection");

const route = require("express").Router();

route.get("/users", protect, isAdmin, getAllUsers);
route.post("/add", protect, isAdmin, addAdmin);
module.exports = route
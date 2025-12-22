const route = require("express").Router();
const { register, login } = require("../controllers/auth");
const { logout, refresh } = require("../controllers/auth");
const {
  update_user,
  profileImageUpdate,
  deleteUser,
  getProfile
} = require("../controllers/auth");
const { protect } = require("../middlewares/protection");
const upload = require("../utils/fileUpload");

route.post("/auth/register", register);
route.post("/auth/login", login);
route.post("/auth/logout", protect, logout);
route.post("/auth/refresh", refresh);

route.patch("/me", protect, update_user);
route.patch("/me/avatar", protect, upload.single("avatar"), profileImageUpdate);
route.delete("/me", protect, deleteUser);
route.get("/me/profile", protect, getProfile);

module.exports = route;
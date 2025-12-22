const route = require("express").Router();
const {
  addFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/feedback/feedback.controller");
const isAdmin = require("../middlewares/isadmin");
const { protect } = require("../middlewares/protection");
const upload = require("../utils/fileUpload");

route.post(
  "/add",
  protect,
  isAdmin,
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addFeedback
);

route.get("/:id", getFeedbackById);
route.patch("/:id", updateFeedback);
route.delete("/:id", deleteFeedback);
route.get("/", getAllFeedback);
module.exports = route;

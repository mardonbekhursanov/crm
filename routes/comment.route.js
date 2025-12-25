const { addComment } = require("../controllers/comment/comment.controller")
const { protect } = require("../middlewares/protection")

const route = require("express").Router()


route.post("/add", protect, addComment)
route.get('/:courseId', protect, addComment)

module.exports = route
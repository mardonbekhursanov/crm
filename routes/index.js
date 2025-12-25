const route = require("express").Router()

route.use("/user", require('./auth.route'))
route.use("/admin", require('./admin.route'))
route.use("/feedback", require('./feedback.route'))
route.use('/teachers', require("./teacher.route"))
route.use('/comment', require('./comment.route'))
module.exports = route
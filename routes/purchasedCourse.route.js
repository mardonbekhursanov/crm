const { protect } = require("../middlewares/protection")
const isAdmin = require("../middlewares/isadmin")
const { addPurchasedCourse, updatePurchasedStatus, allPurchaseRequest } = require("../controllers/purchasedCourse/purchasedCourse.controller")
const upload = require("../utils/fileUpload")

const route = require("express").Router()

// Foydalanuvchi kurs sotib oladi (so'rov yuboradi)
route.post('/:courseId/add', protect, upload.single("receiptImage"), addPurchasedCourse)

// Admin yoki payment gateway to'lov holatini yangilaydi
route.put('/:id/status', protect, isAdmin, updatePurchasedStatus)
route.get('/', protect, isAdmin, allPurchaseRequest)

module.exports = route
const { PurchasedCourse, Course } = require("../../models")
const { ServerError } = require("../../utils/validation")

// ROUTE: /purchased/add
// METHOD: POST
// ACCESS: private (user)
const addPurchasedCourse = async (req, res) => {
    try {
        const { courseId } = req.params
        const { amount, paymentMethod } = req.body
        const userId = req.user.id

        const course = await Course.findByPk(courseId)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Kurs topilmadi",
                data: null
            })
        }

        const purchased = await PurchasedCourse.create({
            courseId,
            userId,
            amount,
            paymentMethod,
            receiptImage: `${req.protocol}://${req.host}/uploads/${req.file.filename}`,
            status: "pending"
        })

        return res.status(201).json({
            success: true,
            message: "To'lov so'rovi yaratildi",
            data: purchased
        })
    } catch (error) {
        ServerError(res, error)
    }
}



// ROUTE: /purchased/:id/status
// METHOD: PUT
// ACCESS: private (admin yoki payment gateway callback)
const updatePurchasedStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body // "success" yoki "failed"

        const purchased = await PurchasedCourse.findByPk(id)
        if (!purchased) {
            return res.status(404).json({
                success: false,
                message: "Purchase yozuvi topilmadi"
            })
        }

        await purchased.update({ status })

        return res.status(200).json({
            success: true,
            message: `To'lov holati ${status} qilindi`,
            data: purchased
        })
    } catch (error) {
        ServerError(res, error)
    }
}
const allPurchaseRequest = async (req, res) => {
    try {
        const requests = await PurchasedCourse.findAll({raw: true})
        res.status(200).json(requests)
    } catch (error) {
        ServerError(res, error)
    }
}
module.exports = {
    addPurchasedCourse,
    updatePurchasedStatus,
    allPurchaseRequest
}

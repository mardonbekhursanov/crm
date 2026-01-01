const { Course, Video, PurchasedCourse } = require("../../models")
const { ServerError } = require("../../utils/validation")

// ROUTE: /course/add
// METHOD: POST
// ACCESS: private
const addCourse = async (req, res) => {
    try {
        const { name, type, price, about, teacher } = req.body

        if (!name || !type || !price || !about || !teacher) {
            return res.status(400).json({
                success: false,
                message: "Barcha maydonlarni to'ldirish shart!",
                data: null
            })
        }

        const course = await Course.create({ name, type, price, about, teacher })

        return res.status(201).json({
            success: true,
            message: "Kurs muvaffaqiyatli qo'shildi",
            data: course
        })

    } catch (error) {
        ServerError(res, error)
    }
}

// ROUTE: /course/:id/update
// METHOD: PUT
// ACCESS: private
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params
        const { name, type, price, about, teacher } = req.body

        const course = await Course.findByPk(id)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Kurs topilmadi",
                data: null
            })
        }

        await course.update({
            name: name || course.name,
            type: type || course.type,
            price: price || course.price,
            about: about || course.about,
            teacher: teacher || course.teacher
        })

        return res.status(200).json({
            success: true,
            message: "Kurs muvaffaqiyatli yangilandi",
            data: course
        })

    } catch (error) {
        ServerError(res, error)
    }
}

// ROUTE: /course/:id/delete
// METHOD: DELETE
// ACCESS: private
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params

        const course = await Course.findByPk(id)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Kurs topilmadi",
                data: null
            })
        }

        await course.destroy()

        return res.status(200).json({
            success: true,
            message: "Kurs muvaffaqiyatli o'chirildi",
            data: null
        })

    } catch (error) {
        ServerError(res, error)
    }
}

// ROUTE: /course/:id
// METHOD: GET
// ACCESS: private
const getCourseById = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        const user = req.user

        const course = await Course.findByPk(id, {
            include: [{ model: Video, as: "videos" }]
        })

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Kurs topilmadi",
                data: null
            })
        }

        const courseData = course.toJSON()

        const purchased = await PurchasedCourse.findOne({
            where: { courseId: course.id, userId, status: "success" }
        })

        if (user.role === "superuser") {
            return res.status(200).json({
                success: true,
                message: "Kurs ma'lumotlari",
                data: courseData
            })
        }

        if (!purchased) {
            courseData.videos = courseData.videos.slice(0, 2)
        }

        return res.status(200).json({
            success: true,
            message: "Kurs ma'lumotlari",
            data: courseData
        })

    } catch (error) {
        ServerError(res, error)
    }
}

// ROUTE: /courses
// METHOD: GET
// ACCESS: private
const getCourses = async (req, res) => {
    try {
        const courses = await Course.findAll()

        return res.status(200).json({
            success: true,
            message: "Kurslar ro'yxati",
            data: courses
        })
    } catch (error) {
        ServerError(res, error)
    }
}

module.exports = {
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    getCourses
}
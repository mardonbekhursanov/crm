const { Course, Video } = require("../../models")
const { ServerError } = require("../../utils/validation")

// ROUTE: /course/:id/video/add
// METHOD: POST
// ACCESS: private

const addVideoToCourse = async (req, res) => {
    try {
        const { id } = req.params
        const { lesson_number, title } = req.body   // lesson_number va title body’dan olinadi

        // Kurs mavjudligini tekshirish
        const course = await Course.findByPk(id)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Kurs topilmadi",
                data: null
            })
        }

        // Fayl yuklanganini tekshirish
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Video fayl yuklanishi shart!",
                data: null
            })
        }

        const video_url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        const video_name = req.file.filename

        const video = await Video.create({
            lesson_name: video_name,   // modelga moslashtirildi
            lesson_number,             // majburiy maydon
            title: title || video_name,
            url: video_url,
            courseId: course.id
        })

        return res.status(201).json({
            success: true,
            message: "Video kursga muvaffaqiyatli qo'shildi",
            data: video
        })

    } catch (error) {
        ServerError(res, error)
    }
}

// ROUTE: /course/:courseId/video/:videoId/update
// METHOD: PUT
// ACCESS: private
const updateVideoInCourse = async (req, res) => {
    try {
        const { courseId, videoId } = req.params
        const { title, lesson_name, lesson_number, url } = req.body

        // Kursni tekshirish
        const course = await Course.findByPk(courseId)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Kurs topilmadi",
                data: null
            })
        }

        // Videoni tekshirish
        const video = await Video.findByPk(videoId)
        if (!video || video.courseId !== course.id) {
            return res.status(404).json({
                success: false,
                message: "Video topilmadi yoki ushbu kursga tegishli emas",
                data: null
            })
        }

        // Agar fayl yuborilgan bo'lsa, URL va nomni yangilash
        let newUrl = url
        let newLessonName = lesson_name
        if (req.file) {
            newUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
            newLessonName = req.file.filename
        }

        await video.update({
            title: title ?? video.title,
            lesson_name: newLessonName ?? video.lesson_name,
            lesson_number: lesson_number ?? video.lesson_number, // yangilashda ham qo‘shildi
            url: newUrl ?? video.url
        })

        return res.status(200).json({
            success: true,
            message: "Video muvaffaqiyatli yangilandi",
            data: video
        })

    } catch (error) {
        ServerError(res, error)
    }
}

// ROUTE: /course/:courseId/video/:videoId/delete
// METHOD: DELETE
// ACCESS: private
const deleteVideoFromCourse = async (req, res) => {
    try {
        const { courseId, videoId } = req.params

        // Kursni tekshirish
        const course = await Course.findByPk(courseId)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Kurs topilmadi",
                data: null
            })
        }

        // Videoni tekshirish va kursga tegishliligi
        const video = await Video.findByPk(videoId)
        if (!video || video.courseId !== course.id) {
            return res.status(404).json({
                success: false,
                message: "Video topilmadi yoki ushbu kursga tegishli emas",
                data: null
            })
        }

        await video.destroy()

        return res.status(200).json({
            success: true,
            message: "Video muvaffaqiyatli o'chirildi"
        })

    } catch (error) {
        ServerError(res, error)
    }
}

module.exports = {
    addVideoToCourse,
    updateVideoInCourse,
    deleteVideoFromCourse
}
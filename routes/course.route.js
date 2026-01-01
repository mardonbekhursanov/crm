const { protect } = require("../middlewares/protection")
const isAdmin = require('../middlewares/isadmin')
const { 
    addCourse, 
    updateCourse, 
    deleteCourse, 
    getCourseById, 
    getCourses 
} = require("../controllers/course/course.controller")
const { 
    addVideoToCourse, 
    updateVideoInCourse, 
    deleteVideoFromCourse 
} = require("../controllers/course/video.controller")
const upload = require("../utils/fileUpload")

const route = require("express").Router()

// === Course routes ===
route.post('/add', protect, isAdmin, addCourse)                // Kurs qo‘shish
route.put('/:id/update', protect, isAdmin, updateCourse)       // Kurs yangilash
route.delete('/:id/delete', protect, isAdmin, deleteCourse)    // Kurs o‘chirish
route.get('/:id', protect, getCourseById)                      // Bitta kursni olish (videolar shart bilan)
route.get('/', protect, getCourses)                            // Barcha kurslarni olish (videolarsiz)

// === Video routes ===
route.post('/:id/video/add', protect, isAdmin, upload.single("video_url"), addVideoToCourse) // Kursga video qo‘shish
route.put('/:courseId/video/:videoId/update', protect, isAdmin, upload.single("video_url"), updateVideoInCourse) // Kursdagi videoni yangilash
route.delete('/:courseId/video/:videoId/delete', protect, isAdmin, deleteVideoFromCourse) // Kursdagi videoni o‘chirish

module.exports = route
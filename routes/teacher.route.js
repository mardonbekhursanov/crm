const { addTeacher, getAllTeachers, deleteTeacher, updateTeacher } = require('../controllers/teacher/teacher.controller')
const isAdmin = require('../middlewares/isadmin')
const { protect } = require('../middlewares/protection')

const route = require('express').Router()


route.post("/add", protect, isAdmin, addTeacher)
route.patch("/:id", protect, isAdmin, updateTeacher)
route.delete('/:id', protect, isAdmin, deleteTeacher)
route.get('/', getAllTeachers)
module.exports = route
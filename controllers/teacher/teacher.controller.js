const db = require('../../models')
const Teacher = db.Teacher
const { ServerError, ValidError } = require("../../utils/validation")

// ROUTE: /teachers/add
// METHOD: POST
// ACCESS: private
const addTeacher = async (req, res) => {
    try {
        const { name, lastname, about, course_name} = req.body

        const image = req.files.image[0].filename
        const video = req.files.video[0].filename
        if(!name || !lastname || !about || !course_name || !image){
            return ValidError(res, 400, "Siz videodan boshqa zonalarni to'ldirishingiz shart!")
        }
        if(!video){
            const teacher = await Teacher.create({
                name, 
                lastname, 
                about, 
                course_name, 
                image
            })
            return res.status(201).json({
                alert: {
                    message: "O'qituvchi muvaffaqiyatli qo'shildi!"
                },
                teacher
            })
        }
        else{
            const teacher = await Teacher.create({
                name, 
                lastname, 
                about, 
                course_name, 
                image,
                video
            })
            res.status(201).json({
                alert: {
                    message: "O'qituvchi muvaffaqiyatli qo'shildi!"
                },
                teacher
            })
        }
    } catch (error) {
        ServerError(res, error)
    }
}

// ROUTE: /teachers/
// METHOD: GET
// ACCESS: public / private
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({raw: true})
        res.status(200).json(teachers)
    } catch (error) {
        ServerError(res, error)
    }
}
// ROUTE: /teachers/:id
// METHOD: PATCH
// ACCESS: private
const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params

        const teacher = await Teacher.findOne({ where: { id } })
        if (!teacher) {
            return ValidError(res, 404, "Bunday o'qituvchi topilmadi!")
        }

        const updates = {}

        // text fields
        if (req.body.name) updates.name = req.body.name
        if (req.body.lastname) updates.lastname = req.body.lastname
        if (req.body.about) updates.about = req.body.about
        if (req.body.course_name) updates.course_name = req.body.course_name

        // files
        if (req.files) {
            if (req.files.image && req.files.image[0]) {
                updates.image = req.files.image[0].filename
            }
            if (req.files.video && req.files.video[0]) {
                updates.video = req.files.video[0].filename
            }
        }

        if (Object.keys(updates).length === 0) {
            return ValidError(res, 400, "Yangilash uchun ma'lumot yuborilmadi!")
        }

        await Teacher.update(updates, { where: { id } })

        const updatedTeacher = await Teacher.findByPk(id, { raw: true })

        res.status(200).json({
            alert: {
                message: "O'qituvchi ma'lumotlari muvaffaqiyatli yangilandi!"
            },
            teacher: updatedTeacher
        })

    } catch (error) {
        ServerError(res, error)
    }
}

const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id)
        if(!teacher){
            return ValidError(res, 404, "Bunday O'qituvchini topa olmadik!")
        }
        await Teacher.destroy({where: {id: req.params.id}})

        res.status(200).json({
            alert: {
                message: "O'qituvchi muvaffaqiyatli o'chirildi!"
            }
        })
    } catch (error) {
        ServerError(res, error)
    }
}
module.exports = {
    addTeacher,
    getAllTeachers,
    updateTeacher,
    deleteTeacher
}
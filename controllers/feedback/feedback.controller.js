const db = require("../../models");
const Feedback = db.Feedback;
const { ServerError, ValidError } = require("../../utils/validation");

// ROUTE: /feedback/add
// METHOD: POST
// ACCESS: private
const addFeedback = async (req, res) => {
  try {
    const { people_fullname, course_name } = req.body;

    if (!people_fullname || !course_name) {
      return ValidError(res, 400, "Ism va kurs nomini kiritishingiz shart!");
    }

    if (!req.files || !req.files.cover_image || !req.files.video) {
      return ValidError(res, 400, "Rasm va video faylni yuklashingiz shart!");
    }

    const image = req.files.cover_image[0].filename;
    const video = req.files.video[0].filename;

    const newFeedback = await Feedback.create({
      cover_image: `${req.protocol}://${req.get("host")}/uploads/${image}`,
      video: `${req.protocol}://${req.get("host")}/uploads/${video}`,
      people_fullname,
      course_name,
    });

    res.status(201).json({
      alert: {
        message: "Fikr muvafaqqiyatli yaratildi!",
      },
      feedback: newFeedback,
    });
  } catch (error) {
    ServerError(res, error); // 👈 server xatolari
  }
};

// ROUTE: /feedback
// METHOD: GET
// ACCESS: private / public
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      raw: true
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    ServerError(res, error); // 👈 server xatolari
  }
};

// ROUTE: /feedback/:id
// METHOD: GET
// ACCESS: private / public
const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findOne({where: {id: req.params.id}, raw: true})
    if(!feedback){
      return ValidError(res, 400, "Bunday Firk topiladi!")
    }
    res.status(200).json(feedback)
  } catch (error) {
    ServerError(res, error)
  }
}

// ROUTE: /feedback/:id
// METHOD: PATCH
// ACCESS: private
const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findOne({ where: { id: req.params.id } });
    if (!feedback) {
      return ValidError(res, 400, "Bunday feedback topilmadi!");
    }

    const updates = {};

    if (req.body.people_fullname) updates.people_fullname = req.body.people_fullname;
    if (req.body.course_name) updates.course_name = req.body.course_name;


    if (req.files) {
      if (req.files.cover_image && req.files.cover_image[0]) {
        updates.cover_image = `${req.protocol}://${req.get("host")}/uploads/${req.files.cover_image[0].filename}`;
      }
      if (req.files.video && req.files.video[0]) {
        updates.video = `${req.protocol}://${req.get("host")}/uploads/${req.files.video[0].filename}`;
      }
    }


    if (Object.keys(updates).length === 0) {
      return ValidError(res, 400, "Yangilash uchun ma'lumot yo‘q!");
    }

    await Feedback.update(updates, { where: { id: req.params.id } });

    const updatedFeedback = await Feedback.findByPk(req.params.id, { raw: true });

    res.status(200).json({
      alert: { message: "Feedback muvaffaqiyatli yangilandi" },
      feedback: updatedFeedback,
    });
  } catch (error) {
    ServerError(res, error);
  }
};


// ROUTE: /feedback/:id
// METHOD: DELETE
// ACCESS: private

const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params

    const feedback = await Feedback.findByPk(id)
    if (!feedback) {
      return ValidError(res, 404, "Bunday fikr topilmadi!")
    }

    await Feedback.destroy({ where: { id } })

    res.status(200).json({
      alert: {
        message: "Fikr muvaffaqiyatli o‘chirildi!"
      }
    })

  } catch (error) {
    ServerError(res, error)
  }
}

module.exports = {
  addFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
};
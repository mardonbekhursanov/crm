const db = require("../../models");
const Comment = db.Comment;
const { ServerError } = require('../../utils/validation');

const addComment = async (req, res) => {
  try {
    // Endi body'dan courseId ni ham kutib olamiz
    const { text, parentId, courseId } = req.body;

    // 1️⃣ Matn va Kurs ID borligini tekshirish
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment matni bo‘sh bo‘lishi mumkin emas" });
    }
    if (!courseId) {
      return res.status(400).json({ message: "Qaysi kursga comment yozilayotgani ko'rsatilmadi (courseId)" });
    }

    // 2️⃣ Agar reply bo‘lsa — parent comment bormi tekshiramiz
    if (parentId) {
      const parentComment = await Comment.findByPk(parentId);
      if (!parentComment) {
        return res.status(404).json({ message: "Reply qilinayotgan comment topilmadi" });
      }
    }

    // 3️⃣ Comment yaratish
    // Eslatma: userId munosabatini olib tashlaganimiz uchun uni bu yerdan o'chirdik
    const comment = await Comment.create({
      text,
      courseId, // Kursga bog'lash
      parentId: parentId || null
    });

    return res.status(201).json({
      message: "Comment muvaffaqiyatli qo‘shildi",
      data: comment
    });

  } catch (error) {
    console.error(error);
    ServerError(res, error);
  }
};

const getComments = async (req, res) => {
  try {
    const { courseId } = req.params; // Kurs ID sini paramdan olamiz

    // Kursga tegishli barcha asosiy commentlarni va ularning javoblarini (replies) olish
    const comments = await Comment.findAll({
      where: { 
        courseId: courseId,
        parentId: null // Faqat asosiy izohlarni olamiz, javoblar ichida keladi
      },
      include: [
        {
          model: Comment,
          as: 'replies', // Modelda ko'rsatilgan alias
          include: [{ model: Comment, as: 'replies' }] // Ichma-ich 2-darajali javoblar (kerak bo'lsa)
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      data: comments
    });

  } catch (error) {
    console.error(error);
    ServerError(res, error);
  }
};

module.exports = {
  addComment,
  getComments
};
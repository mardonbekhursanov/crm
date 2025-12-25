/**
 * @swagger
 * /v1/api/feedback/add:
 *   post:
 *     summary: Yangi feedback qo‘shish (admin)
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - people_fullname
 *               - course_name
 *               - cover_image
 *               - video
 *             properties:
 *               people_fullname:
 *                 type: string
 *                 example: "Ali Valiyev"
 *               course_name:
 *                 type: string
 *                 example: "Node.js Backend"
 *               cover_image:
 *                 type: string
 *                 format: binary
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Feedback muvafaqqiyatli yaratildi
 *       400:
 *         description: Validation xatosi
 *       401:
 *         description: Token yo‘q yoki noto‘g‘ri
 *       403:
 *         description: Admin emas
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /v1/api/feedback:
 *   get:
 *     summary: Barcha feedbacklarni olish
 *     description: Ushbu endpoint barcha feedbacklarni oladi. Public va private access mumkin.
 *     tags:
 *       - Feedback
 *     responses:
 *       200:
 *         description: Feedbacklar muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alert:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Barcha feedbacklar muvafaqqiyatli olindi
 *                 feedbacks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: uuidabc1
 *                       cover_image:
 *                         type: string
 *                         example: http://localhost:5500/uploads/example.jpg
 *                       video:
 *                         type: string
 *                         example: http://localhost:5500/uploads/example.mp4
 *                       people_fullname:
 *                         type: string
 *                         example: "Mardonbek Hursanov"
 *                       course_name:
 *                         type: string
 *                         example: "Node.js Bootcamp"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-21T10:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-21T10:00:00.000Z"
 *       500:
 *         description: Server xatoligi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alert:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Serverda xatolik yuz berdi"
 */

/**
 * @swagger
 * /v1/api/feedback/{id}:
 *   get:
 *     summary: ID bo‘yicha bitta feedbackni olish
 *     tags:
 *       - Feedback
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Feedbackning unikal ID raqami
 *     responses:
 *       200:
 *         description: Feedback topildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: uuidabc1
 *                 cover_image:
 *                   type: string
 *                   example: http://localhost:5500/uploads/example.jpg
 *                 video:
 *                   type: string
 *                   example: http://localhost:5500/uploads/example.mp4
 *                 people_fullname:
 *                   type: string
 *                   example: "Mardonbek Hursanov"
 *                 course_name:
 *                   type: string
 *                   example: "Node.js Bootcamp"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-12-21T10:00:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-12-21T10:00:00.000Z"
 *       400:
 *         description: Bunday feedback topilmadi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /v1/api/feedback/{id}:
 *   patch:
 *     summary: Feedback yangilash
 *     description: |
 *       Mavjud feedback ma’lumotlarini yangilaydi.  
 *       Faqat yuborilgan maydonlar yangilanadi.  
 *       Fayllar `multipart/form-data` orqali yuboriladi.
 *     tags:
 *       - Feedback
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         description: Feedback UUID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               people_fullname:
 *                 type: string
 *                 example: "Ali Valiyev"
 *               course_name:
 *                 type: string
 *                 example: "Backend Node.js"
 *               cover_image:
 *                 type: string
 *                 format: binary
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Feedback muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alert:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Feedback muvaffaqiyatli yangilandi"
 *                 feedback:
 *                   type: object
 *                   example:
 *                     id: "550e8400-e29b-41d4-a716-446655440000"
 *                     people_fullname: "Ali Valiyev"
 *                     course_name: "Backend Node.js"
 *                     cover_image: "http://localhost:5000/uploads/image.jpg"
 *                     video: "http://localhost:5000/uploads/video.mp4"
 *       400:
 *         description: Xatolik (feedback topilmadi yoki yangilash uchun ma’lumot yo‘q)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Bunday feedback topilmadi!"
 *       500:
 *         description: Server xatoligi
 */
/**
 * @swagger
 * /feedback/{id}:
 *   delete:
 *     summary: Feedbackni o‘chirish
 *     tags:
 *       - Feedback
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Mavjud feedbackni ID orqali o‘chiradi.  
 *       Ushbu endpoint faqat **admin / superuser** huquqiga ega foydalanuvchilar uchun ochiq  
 *       (role tekshiruvi middleware orqali amalga oshiriladi).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         description: Feedback UUID
 *     responses:
 *       200:
 *         description: Feedback muvaffaqiyatli o‘chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alert:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Fikr muvaffaqiyatli o‘chirildi!"
 *       404:
 *         description: Feedback topilmadi
 *       401:
 *         description: Avtorizatsiya qilinmagan
 *       403:
 *         description: Ruxsat yo‘q (admin emas)
 *       500:
 *         description: Server xatoligi
 */

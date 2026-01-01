/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Kurslarni boshqarish
 */

/**
 * @swagger
 * /course/add:
 *   post:
 *     summary: Yangi kurs qo'shish
 *     description: Admin yangi kurs yaratadi
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - price
 *               - about
 *               - teacher
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Node.js kursi"
 *               type:
 *                 type: string
 *                 example: "Online"
 *               price:
 *                 type: number
 *                 example: 100
 *               about:
 *                 type: string
 *                 example: "Node.js asoslari va amaliyot"
 *               teacher:
 *                 type: string
 *                 example: "Mardonbek"
 *     responses:
 *       201:
 *         description: Kurs muvaffaqiyatli qo'shildi
 *       400:
 *         description: Majburiy maydonlar to'ldirilmagan
 */

/**
 * @swagger
 * /course/{id}/update:
 *   put:
 *     summary: Kursni yangilash
 *     description: Admin kurs ma'lumotlarini yangilaydi
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kurs ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *               about:
 *                 type: string
 *               teacher:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kurs muvaffaqiyatli yangilandi
 *       404:
 *         description: Kurs topilmadi
 */

/**
 * @swagger
 * /course/{id}/delete:
 *   delete:
 *     summary: Kursni o'chirish
 *     description: Admin kursni o'chiradi
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kurs ID
 *     responses:
 *       200:
 *         description: Kurs muvaffaqiyatli o'chirildi
 *       404:
 *         description: Kurs topilmadi
 */

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Bitta kursni olish
 *     description: Kurs ma'lumotlari va videolari (agar sotib olinmagan bo'lsa faqat 2 ta video)
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kurs ID
 *     responses:
 *       200:
 *         description: Kurs ma'lumotlari
 *       404:
 *         description: Kurs topilmadi
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Barcha kurslarni olish
 *     description: Kurslar ro'yxati (videolarsiz)
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Kurslar ro'yxati
 */

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Kurs videolarini boshqarish
 */

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Kurs videolarini boshqarish
 */

/**
 * @swagger
 * /course/{id}/video/add:
 *   post:
 *     summary: Kursga video qo'shish
 *     description: Admin kursga video fayl yuklaydi
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Kurs ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - lesson_name
 *               - lesson_number
 *             properties:
 *               lesson_name:
 *                 type: string
 *                 example: "1-dars"
 *               lesson_number:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "Kirish"
 *               url:
 *                 type: string
 *                 format: binary
 *                 description: Yuklanadigan video fayl
 *     responses:
 *       201:
 *         description: Video kursga muvaffaqiyatli qo'shildi
 *       400:
 *         description: Video fayl yuklanmagan
 *       404:
 *         description: Kurs topilmadi
 */

/**
 * @swagger
 * /course/{courseId}/video/{videoId}/update:
 *   put:
 *     summary: Kursdagi videoni yangilash
 *     description: Admin kursdagi videoni yangilaydi
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Kurs ID
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Video ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_name:
 *                 type: string
 *                 example: "Yangilangan dars nomi"
 *               lesson_number:
 *                 type: integer
 *                 example: 2
 *               title:
 *                 type: string
 *                 example: "Yangilangan sarlavha"
 *               url:
 *                 type: string
 *                 format: binary
 *                 description: Yangilangan video fayl
 *     responses:
 *       200:
 *         description: Video muvaffaqiyatli yangilandi
 *       404:
 *         description: Kurs yoki video topilmadi
 */

/**
 * @swagger
 * /course/{courseId}/video/{videoId}/delete:
 *   delete:
 *     summary: Kursdagi videoni o'chirish
 *     description: Admin kursdagi videoni o'chiradi
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Kurs ID
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Video ID
 *     responses:
 *       200:
 *         description: Video muvaffaqiyatli o'chirildi
 *       404:
 *         description: Kurs yoki video topilmadi
 */


/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Sotib olingan kurslarni boshqarish
 */

/**
 * @swagger
 * /purchased/add/{courseId}:
 *   post:
 *     summary: Kurs uchun purchase request yaratish
 *     description: Foydalanuvchi kurs sotib olish uchun to‘lov so‘rovi yaratadi. Chek rasmi (receipt image) ham yuklanishi mumkin.
 *     tags:
 *       - Purchases
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Kursning UUID identifikatori
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 99.99
 *               paymentMethod:
 *                 type: string
 *                 example: "Payme"
 *               receiptImage:
 *                 type: string
 *                 format: binary
 *                 description: To‘lov chek rasmini yuklash (fayl)
 *     responses:
 *       201:
 *         description: To‘lov so‘rovi yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "To'lov so'rovi yaratildi"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     courseId:
 *                       type: string
 *                       format: uuid
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                     amount:
 *                       type: number
 *                       example: 99.99
 *                     paymentMethod:
 *                       type: string
 *                       example: "Payme"
 *                     receiptImage:
 *                       type: string
 *                       example: "uploads/receipts/1735400000000.png"
 *                     status:
 *                       type: string
 *                       enum: [pending, success, failed]
 *                       example: "pending"
 *       404:
 *         description: Kurs topilmadi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /purchase/{id}/status:
 *   put:
 *     summary: Sotib olingan kurs holatini yangilash
 *     description: Admin yoki to'lov tizimi kursning to'lov holatini yangilaydi
 *     tags: [Purchases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Purchase ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, success, failed]
 *                 example: success
 *     responses:
 *       200:
 *         description: To'lov holati yangilandi
 *       404:
 *         description: Purchase yozuvi topilmadi
 */
/**
 * @swagger
 * /purchase/:
 *   get:
 *     summary: Barcha purchase requestlarni olish
 *     description: Admin yoki tizim orqali yaratilgan barcha kurs purchase yozuvlarini qaytaradi.
 *     tags:
 *       - Purchases
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Barcha purchase requestlar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   courseId:
 *                     type: integer
 *                     example: 10
 *                   userId:
 *                     type: integer
 *                     example: 5
 *                   amount:
 *                     type: number
 *                     format: float
 *                     example: 99.99
 *                   paymentMethod:
 *                     type: string
 *                     example: "credit_card"
 *                   status:
 *                     type: string
 *                     enum: [pending, success, failed]
 *                     example: "pending"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-12-28T18:52:00.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-12-28T18:52:00.000Z"
 *       500:
 *         description: Server xatosi
 */

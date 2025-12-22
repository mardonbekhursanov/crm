/**
 * @swagger
 * /v1/api/teachers/add:
 *   post:
 *     summary: Yangi o‘qituvchi qo‘shish
 *     tags:
 *       - Teachers
 *     description: |
 *       Yangi o‘qituvchi yaratadi.  
 *       `video` majburiy emas, qolgan maydonlar majburiy.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - about
 *               - course_name
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mardon"
 *               lastname:
 *                 type: string
 *                 example: "Hursanov"
 *               about:
 *                 type: string
 *                 example: "5 yillik tajribaga ega backend dasturchi"
 *               course_name:
 *                 type: string
 *                 example: "Node.js Backend"
 *               image:
 *                 type: string
 *                 format: binary
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: O‘qituvchi muvaffaqiyatli qo‘shildi
 *       400:
 *         description: Majburiy maydonlar to‘ldirilmagan
 *       500:
 *         description: Server xatoligi
 */
/**
 * @swagger
 * /v1/api/teachers:
 *   get:
 *     summary: Barcha o‘qituvchilarni olish
 *     tags:
 *       - Teachers
 *     description: Barcha o‘qituvchilar ro‘yxatini qaytaradi
 *     responses:
 *       200:
 *         description: O‘qituvchilar ro‘yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: "550e8400-e29b-41d4-a716-446655440000"
 *                   name:
 *                     type: string
 *                   lastname:
 *                     type: string
 *                   about:
 *                     type: string
 *                   course_name:
 *                     type: string
 *                   image:
 *                     type: string
 *                   video:
 *                     type: string
 *       500:
 *         description: Server xatoligi
 */
/**
 * @swagger
 * /v1/api/teachers/{id}:
 *   patch:
 *     summary: O‘qituvchi ma’lumotlarini yangilash
 *     tags:
 *       - Teachers
 *     description: |
 *       O‘qituvchini qisman yangilaydi.  
 *       Faqat yuborilgan maydonlar yangilanadi.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: O‘qituvchi UUID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               about:
 *                 type: string
 *               course_name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: O‘qituvchi muvaffaqiyatli yangilandi
 *       400:
 *         description: Yangilash uchun ma’lumot yo‘q
 *       404:
 *         description: O‘qituvchi topilmadi
 *       500:
 *         description: Server xatoligi
 */

/**
 * @swagger
 * /v1/api/teachers/{id}:
 *   delete:
 *     summary: O‘qituvchini o‘chirish
 *     tags:
 *       - Teachers
 *     description: |
 *       Mavjud o‘qituvchini ID orqali o‘chiradi.  
 *       Ushbu endpoint faqat ruxsatga ega foydalanuvchilar uchun (admin/superuser).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         description: O‘qituvchi UUID
 *     responses:
 *       200:
 *         description: O‘qituvchi muvaffaqiyatli o‘chirildi
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
 *                       example: "O‘qituvchi muvaffaqiyatli o‘chirildi!"
 *       404:
 *         description: O‘qituvchi topilmadi
 *       401:
 *         description: Avtorizatsiya qilinmagan
 *       403:
 *         description: Ruxsat yo‘q
 *       500:
 *         description: Server xatoligi
 */

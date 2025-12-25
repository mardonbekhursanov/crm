/**
 * @swagger
 * /v1/api/comment/add:
 *   post:
 *     summary: Kursga yangi izoh qo'shish yoki javob yozish
 *     tags: 
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - courseId
 *             properties:
 *               text:
 *                 type: string
 *                 description: Izoh matni
 *                 example: "Bu kurs juda foydali bo'ldi!"
 *               courseId:
 *                 type: integer
 *                 description: Izoh tegishli bo'lgan kurs ID si
 *                 example: 1
 *               parentId:
 *                 type: integer
 *                 description: Asosiy izoh ID si (ixtiyoriy)
 *                 example: null
 *     responses:
 *       201:
 *         description: Izoh muvaffaqiyatli yaratildi
 *       400:
 *         description: Matn yoki CourseId yuborilmagan
 *       401:
 *         description: Avtorizatsiyadan o'tilmagan
 *       404:
 *         description: Parent comment topilmadi
 */

/**
 * @swagger
 * /v1/api/comment/{courseId}:
 *   get:
 *     summary: Kursga tegishli barcha izohlarni ierarxiya shaklida olish
 *     tags: 
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kurs ID si
 *     responses:
 *       200:
 *         description: Izohlar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Avtorizatsiyadan o'tilmagan
 */

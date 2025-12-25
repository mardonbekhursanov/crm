
/**
 * @swagger
 * /v1/api/admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Barcha foydalanuvchilar ro‘yxatini olish (admin)
 *     description: >
 *       Faqat superuser (admin) bo‘lgan foydalanuvchi barcha userlarni ko‘ra oladi.
 *       Joriy adminning o‘zi ro‘yxatdan chiqarib tashlanadi.
 *       Parollar qaytarilmaydi.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro‘yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 24c79550-dcaa-45e5-a04d-acf38a7f6f0a
 *                   name:
 *                     type: string
 *                     example: Ali
 *                   lastname:
 *                     type: string
 *                     example: Valiyev
 *                   phone:
 *                     type: string
 *                     example: "998901234567"
 *                   profile_image:
 *                     type: string
 *                     example: https://api.site.com/uploads/avatar.png
 *                   role:
 *                     type: string
 *                     example: user
 *                   is_active:
 *                     type: boolean
 *                     example: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Avtorizatsiya qilinmagan (token yo‘q yoki noto‘g‘ri)
 *       403:
 *         description: Admin huquqi yo‘q
 *       500:
 *         description: Server xatosi
 */
/**
 * @swagger
 * /v1/api/admin/add:
 *   post:
 *     summary: Foydalanuvchini admin qilish
 *     tags:
 *       - Admin
 *     description: |
 *       Mavjud foydalanuvchini `superuser` (admin) roliga o‘tkazadi.  
 *       Ushbu endpoint faqat **superuser** huquqiga ega foydalanuvchilar uchun ochiq  
 *       (role tekshiruvi middleware orqali amalga oshiriladi).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - check_admin
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               check_admin:
 *                 type: boolean
 *                 example: true
 *                 description: Frontend tasdiqlash (HA / YO‘Q) uchun ishlatiladi
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli admin qilindi
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
 *                       example: "Foydalanuvchi admin qilindi"
 *       400:
 *         description: Noto‘g‘ri so‘rov yoki foydalanuvchi allaqachon admin
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       401:
 *         description: Avtorizatsiya qilinmagan
 *       403:
 *         description: Ruxsat yo‘q (superuser emas)
 *       500:
 *         description: Server xatoligi
 */
/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: ID orqali foydalanuvchini olish
 *     description: Berilgan ID bo‘yicha foydalanuvchi ma’lumotlarini qaytaradi
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Foydalanuvchi ID raqami
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Foydalanuvchi topildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 phone:
 *                   type: string
 *                 role:
 *                   type: string
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Foydalanuvchini o‘chirish (Admin)
 *     description: Admin huquqi orqali foydalanuvchini butunlay o‘chiradi
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O‘chiriladigan foydalanuvchi ID si
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o‘chirildi
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
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
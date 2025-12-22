/**
 * @swagger
 * /v1/api/user/me:
 *   patch:
 *     tags:
 *       - User
 *     summary: Foydalanuvchi akkaunt ma'lumotlarini yangilash
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mardonbek
 *               email:
 *                 type: string
 *                 example: mardonbek@gmail.com
 *               avatar:
 *                 type: string
 *                 example: https://cdn.site.com/avatar.png
 *     responses:
 *       200:
 *         description: Akkaunt muvaffaqiyatli yangilandi
 *       400:
 *         description: Yangilash uchun ma'lumot yuborilmagan
 *       401:
 *         description: Avtorizatsiya qilinmagan
 *       500:
 *         description: Server xatosi
 * 
 *   delete:
 *     tags:
 *       - User
 *     summary: Foydalanuvchi akkauntini o‘chirish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Akkount muvaffaqiyatli o‘chirildi
 *       401:
 *         description: Avtorizatsiya qilinmagan
 *       500:
 *         description: Server xatosi
 *
 * /v1/api/user/me/avatar:
 *   patch:
 *     tags:
 *       - User
 *     summary: Foydalanuvchi profil rasmini yangilash
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profil rasmi muvaffaqiyatli yangilandi
 *       400:
 *         description: Rasm yuborilmagan yoki noto‘g‘ri format
 *       401:
 *         description: Avtorizatsiya qilinmagan
 *       500:
 *         description: Server xatosi
 */
/**
 * @swagger
 * /v1/api/user/me/profile:
 *   get:
 *     summary: Foydalanuvchi profilini olish
 *     description: >
 *       Avtorizatsiyadan o‘tgan foydalanuvchi o‘z profil ma’lumotlarini oladi. 
 *       Parol javobga kirmaydi.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil muvaffaqiyatli olindi
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
 *                       example: "Foydalanuvchi profili muvaffaqiyatli olindi"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: uuidabc1
 *                     name:
 *                       type: string
 *                       example: "Mardonbek"
 *                     email:
 *                       type: string
 *                       example: "mardonbek@gmail.com"
 *                     avatar:
 *                       type: string
 *                       example: "https://cdn.site.com/avatar.png"
 *                     phone:
 *                       type: string
 *                       example: "998901234567"
 *       401:
 *         description: Avtorizatsiya qilinmagan yoki token noto‘g‘ri
 *       500:
 *         description: Server xatosi
 */

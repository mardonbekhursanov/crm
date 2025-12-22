/**
 * @swagger
 * /v1/api/user/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Foydalanuvchini ro'yxatdan o'tkazish
 *     description: Yangi foydalanuvchi yaratadi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               phone:
 *                 type: number
 *                 example: 998901234567
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli yaratildi
 *       401:
 *         description: Kerakli maydonlar to'ldirilmagan
 *       403:
 *         description: Foydalanuvchi allaqachon mavjud
 *       500:
 *         description: Server xatoligi
 *
 * /v1/api/user/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User login
 *     description: Telefon raqam va parol orqali tizimga kirish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: number
 *                 example: 998901234567
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login muvaffaqiyatli
 *       401:
 *         description: Login xatolik
 *
 * /v1/api/user/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User logout
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli chiqildi
 *       401:
 *         description: Token noto‘g‘ri yoki mavjud emas
 *
 * /v1/api/user/auth/refresh:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh access token
 *     description: Refresh token (httpOnly cookie) orqali yangi access token olish
 *     responses:
 *       200:
 *         description: Yangi access token
 *       401:
 *         description: Refresh token eskirgan yoki mavjud emas
 */

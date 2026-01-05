const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // ⚠️ MUHIM
    },
  },
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Modellarni yuklash
db.User = require("./user.model")(sequelize, Sequelize);
db.Feedback = require("./feedback.model")(sequelize, Sequelize);
db.Teacher = require("./teachers.module")(sequelize, Sequelize);
db.Comment = require("./comment.model")(sequelize, Sequelize);
db.Course = require("./course.model")(sequelize, Sequelize)
db.Video = require("./video.model")(sequelize, Sequelize)
db.PurchasedCourse = require('./purchasedCourse.model')(sequelize, Sequelize)
// 1. TEACHER va COURSE (O'qituvchi va Kurs bog'liqligi)
// Bir o'qituvchi ko'plab kurslarni yaratishi mumkin
db.Teacher.hasMany(db.Course, { as: "courses", foreignKey: "teacherId" });
db.Course.belongsTo(db.Teacher, { as: "instructor", foreignKey: "teacherId" });

// 2. COURSE va COMMENT (Kurs va Izohlar)
// Izohlar faqat kursga tegishli
db.Course.hasMany(db.Comment, { as: "comments", foreignKey: "courseId", onDelete: "CASCADE" });
db.Comment.belongsTo(db.Course, { as: "course", foreignKey: "courseId" });

// 3. COMMENT ichidagi REPLIES (O'z-o'ziga bog'lanish)
// Izohlarga javob yozish ierarxiyasi
db.Comment.hasMany(db.Comment, { as: "replies", foreignKey: "parentId", onDelete: "CASCADE" });
db.Comment.belongsTo(db.Comment, { as: "parent", foreignKey: "parentId" });


db.Course.hasMany(db.Video, { foreignKey: "courseId" });
db.Video.belongsTo(db.Course, { foreignKey: "courseId" });

module.exports = db;
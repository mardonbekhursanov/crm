const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
});
const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.User = require("./user.model")(sequelize, Sequelize)
db.Feedback = require("./feedback.model")(sequelize, Sequelize)
db.Teacher = require("./teachers.module")(sequelize, Sequelize)

module.exports = db
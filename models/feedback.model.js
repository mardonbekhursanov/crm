const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, Sequelize) => {
    const Feedback = sequelize.define("feedback", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        cover_image: {
            type: Sequelize.STRING,
            allowNull: false
        },
        video: {
            type: Sequelize.STRING,
            allowNull: false
        },
        people_fullname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        course_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })




    return Feedback
}
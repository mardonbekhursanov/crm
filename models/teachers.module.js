const { v4: uuidv4 } = require('uuid');
module.exports = ( sequelize, Sequelize ) => {
    const Teacher = sequelize.define("teacher", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        about: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        video: {
            type: Sequelize.STRING,
            allowNull: true
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        course_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Teacher
}
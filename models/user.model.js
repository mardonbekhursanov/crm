const { v4: uuidv4 } = require('uuid');
module.exports = ( sequelize, Sequelize ) => {
    const User = sequelize.define("user", {
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
            allowNull: true
        },
        phone: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profile_image: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png"
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: "user"
        }
    })

    return User
}
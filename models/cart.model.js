module.exports = (sequelize, Sequelize) => {
    return sequelize.define("cart", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        courseId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        isPay: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: "cart"
    })
}
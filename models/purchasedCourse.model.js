module.exports = (sequelize, Sequelize) => {
    return sequelize.define("purchasedCourse", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        courseId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        paymentMethod: {
            type: Sequelize.STRING, // masalan: "Payme", "Click", "Stripe"
            allowNull: false
        },
        paymentDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        status: {
            type: Sequelize.ENUM("pending", "success", "failed"),
            defaultValue: "pending"
        },
        receiptImage: {
            type: Sequelize.STRING, // chek rasmi URL yoki fayl path
            allowNull: true
        }
    },
    {
        timestamps: true,
        tableName: "purchasedCourse"
    })
}

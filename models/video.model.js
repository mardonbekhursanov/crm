module.exports = (sequelize, Sequelize) => {
  const Video = sequelize.define("video", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    lesson_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lesson_number: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    duration: { type: 
      Sequelize.INTEGER, 
      allowNull: true 
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    courseId: {
      type: Sequelize.UUID,
      allowNull: false
    }
  });

  return Video;
};

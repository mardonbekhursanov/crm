module.exports = (sequelize, Sequelize) => {
  const Video = sequelize.define("video", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
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
    },
    isPreview: {
      type: Sequelize.BOOLEAN,
      defaultValue: false // preview videolarni belgilash uchun
    }
  });

  return Video;
};

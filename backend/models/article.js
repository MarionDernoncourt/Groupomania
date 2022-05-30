/***** Modules nécessaires */
const { DataTypes } = require("sequelize");

/***** Définition du model article */
module.exports = (sequelize) => {
  return Article = sequelize.define("Article", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(225),
      defaultValue: "",
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      defaultValue: "",
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

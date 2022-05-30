/***** Modules nécessaires */
const { DataTypes } = require("sequelize");

/**** Definition du model comments */

module.exports = (sequelize) => {
  return Comment = sequelize.define("Comments", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    id_article: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    name : {
      type: DataTypes.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      defaultValue: "",
      allowNull: false,
    },
  });
};

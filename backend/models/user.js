/**** Module nécessaires */
const { DataTypes } = require("sequelize");

/************************ */
/**** Définition du model */

module.exports = (sequelize) => {
  return User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    pseudo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(64),
      is: /^[0-9a-z]{64}$/i,
    },
  });
};

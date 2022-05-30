/***** Modules nécessaires */
const { Sequelize } = require("sequelize");

/***** Connexion a la base de données */
let sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

/**** Mise en place des relations */
const db = {};

db.sequelize = sequelize;
db.User = require("./models/user")(sequelize);
db.Article = require("./models/article")(sequelize);
db.Comments = require("./models/comments")(sequelize);

db.User.hasMany(db.Article, { foreignKey: "user_id", onDelete : "cascade" });
db.Article.belongsTo(db.User, { foreignKey: "user_id" });
db.Article.hasMany(db.Comments, { foreignKey: "id_article", onDelete: "cascade" });
db.Comments.belongsTo(db.Article, { foreignKey: "id_article"});


/**** Synchronisation des modèles */
sequelize.sync(() => {
  console.log("Database Sync Error", err);
});


module.exports = db;

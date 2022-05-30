/******** Modules nécessaires */
const express = require("express");
const cors = require("cors");

const DB = require("./db.config");

const path = require("path");
/********** Initialisation de l'api */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**** Import des modules de routage */
const user_router = require("./routes/users");
const article_router = require("./routes/articles");
const commentRouter = require("./routes/comments");

/****** Mise en place du routage */

app.use("images", express.static(path.join(__dirname, "images")));

app.use("/api", user_router);
app.use("/api", article_router);
app.use("/api", commentRouter);

// app.all("*", (req, res) => res.status(501).send("Nothing to do here !"));

/***** Démarage du server */
DB.sequelize
  .authenticate()
  .then(() => console.log("Database connection Ok !"))
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `This server is running on port ${process.env.SERVER_PORT}. Have fun !`
      );
    });
  })
  .catch((err) => console.log("Database error", err));

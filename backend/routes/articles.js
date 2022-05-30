/***** Modules nécessaires */
const express = require("express");
const articleCtrl = require("../controllers/article");

let router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

/**** Routage de la ressource Article */

router.get("/auth/article", auth, articleCtrl.getAllArticles); // Lire tous les articles
router.get("/auth/article/:id", auth, articleCtrl.getOneArticle); //Lire un article
router.put("/auth/article", auth, multer, articleCtrl.addArticle); // Ajouter un article
router.patch("/auth/article/:id", auth, multer, articleCtrl.updateArticle); // Modifier un article
router.delete("/auth/article/:id", auth, articleCtrl.deleteArticle); //Supprimer un article

module.exports = router;

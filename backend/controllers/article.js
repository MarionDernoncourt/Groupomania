/******* Modules nécessaires */
const fs = require("fs");

const DB = require("../db.config");

/*** Routage de la ressource article */
// Lire tous les articles
exports.getAllArticles = (req, res) => {
  DB.Article.findAll()
    .then((articles) => res.json({ data: articles }))
    .catch((err) => res.status(500).json({ err }));
};

// //Lire un article
exports.getOneArticle = (req, res) => {
  let articleId = parseInt(req.params.id);

  // Vérification champs id complété et cohérent
  if (!articleId) {
    return res.status(400).json({ message: "Missing parameter" });
  }
  // Récupération de l'article
  DB.Article.findOne({ where: { id: articleId } })
    .then((article) => {
      if (article === null) {
        return res
          .status(404)
          .json({ message: "This article does not exists !" });
      }
      // Si article trouvé
      return res.json({ data: article });
    })
    .catch((err) => res.status(500).json({ message: "Database error", err }));
};

// //Ajouter un article
exports.addArticle = (req, res) => {
  // Verification données cohérentes
  const { title, content } = req.body;
  if (!title | !content) {
    return res.status(400).json({ message: "Missing data" });
  }
  // Création de l'article
  const article = new DB.Article({
    ...req.body,
    user_id: req.user.id,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  // Sauvegarde de l'article
  article
    .save()
    .then(() => res.status(201).json({ message: "Article created" }))
    .catch((err) => res.status(500).json({ err }));
};

// // Modifier un article
exports.updateArticle = async (req, res) => {
  /// Vérification si id présent et cohérent
  const articleID = req.params.id;
  if (!articleID) {
    res.status(400).json({ message: "Missing parameter" });
  }
  try {
    //Recherche de l'article et vérification
    let article = await DB.Article.findOne({ where: { id: articleID } });
    if (article === null) {
      return res
        .status(404)
        .json({ message: "This article does not exists !" });
    }
    // Modification de l'article
    let userConnected = req.user.id;
    if (article.user_id === userConnected) {
      await DB.Article.update(req.body, { where: { id: articleID } });
      return res.json({ message: "Article updated" });
    } else {
      return res
        .status(400)
        .json({ message: "You can't modify this article !" });
    }
  } catch {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

// // Supprimer un article
exports.deleteArticle = async (req, res) => {
  // Vérification si id est cohérent
  let articleId = req.params.id;
  if (articleId === null) {
    return res.status(400).json({ message: "Missing parameter" });
  }
  // Recherche de l'article à supprimer 
  let article = await DB.Article.findOne({ where: { id: articleId } });
  // Recherche si article existe
  if (article === null) {
    return res.status(404).json({ message: "This article does not exists !" });
  }
// Suppression de l'article si user connecté est celui qui a écrit l'article
  if (article.user_id === req.user.id) {
    const filename = article.image.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      DB.Article.destroy({ where: { id: articleId } })
        .then(() => res.status(200).json({ message: "Article deleted" }))
        .catch((err) => res.status(500).json(err));
    });
  } else {
    return res
      .status(400)
      .json({ message: "What are you doing ?! You can't delete this article" });
  }
};

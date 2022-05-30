/******* Modules nécessaires */
const jwt = require("jsonwebtoken");
const DB = require("../db.config");

/****** Routage de la ressource commentaires */
exports.getAllComments = async (req, res) => {
    // Vérification si l'article existe
  const articleId = req.params.id;
  const article = await DB.Article.findOne({ where: { id: articleId } });
  if (article === null) {
    return res.status(400).json({ message: "This article does not exists!" });
  }
  // Recherche des commentaires
  DB.Comments.findAll({ where: { id_article: articleId } })
    .then((comments) => res.status(200).json({ data: comments }))
    .catch((err) => res.status(500).json(err));
};

exports.addComment = async (req, res) => {
  // Vérification si donnée cohérentes
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: "Missing data" });
  }
  // vérification si article existe
  const articleId = req.params.id;
  const article = await DB.Article.findOne({ where: { id: articleId } });
  if (article === null) {
    return res.status(400).json({ message: "This article does not exists !" });
  }
  // Création du nouveau commentaire
  const comment = new DB.Comments({
    name: req.user.pseudo,
    content: content,
    id_article: articleId,
  });
  // Sauvagarde du commentaire, rattaché a l'article
  comment
    .save()
    .then(() => {
      DB.Comments.findAll({ where: { id_article: articleId } })
        .then(() => res.status(200).json({ message: "Comment added !" }))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json({ err }));
};

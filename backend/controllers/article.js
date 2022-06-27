/******* Modules nécessaires */
const fs = require("fs");

const DB = require("../db.config");

/*** Routage de la ressource article */
// Lire tous les articles
exports.getAllArticles = (req, res) => {
  DB.Article.findAll({ include: User }) // extraire donnée user
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
  const articleObject = JSON.parse(req.body.article);
  // Verification données cohérentes
  if (!articleObject.title | !articleObject.content) {
    return res.status(400).json({ message: "Missing data" });
  }
  // Création de l'article

  const article = new DB.Article({
    ...articleObject,
    user_id: req.user.id,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });

  // Sauvegarde de l'article
  article
    .save()
    .then(() => res.status(201).json({ message: "Article created" }))
    .catch((err) => res.status(500).json({ err }));
};

/// // Modifier un article
exports.updateArticle = async (req, res) => {
  /// Vérification si id présent et cohérent
  const articleID = req.params.id;
  if (!articleID) {
    res.status(400).json({ message: "Missing parameter" });
  }
  try {
    const articleObject = req.file
      ? {
          // si une image est modifiée => transforme en objet js exploitable
          ...JSON.parse(req.body.article),
          image: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...JSON.parse(req.body.article) }; //sans image a modifier

      
    //Recherche de l'article et vérification
    let article = await DB.Article.findOne({ where: { id: articleID } });
    if (article === null) {
      return res
        .status(404)
        .json({ message: "This article does not exists !" });
    }

    // suppression de l'image si image est modifiée
    if (req.file) {
      const filename = article.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) throw err;
        console.log("successfully deleted /tmp/hello");
      });
    }

    // Modification de l'article si user connecté est celui qui a écrit l'article ou l'admin (user 7)
    let userConnected = req.user.id;
    console.log(process.env.ADMIN_USER, userConnected);
    if (
      article.user_id === userConnected ||
      userConnected == process.env.ADMIN_USER
    ) {
      await DB.Article.update(articleObject, { where: { id: articleID } });
      return res.json({ message: "Article updated", articleObject });
    } else {
      return res
        .status(400)
        .json({ message: "You can't modify this article !" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Database Error" + err });
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
  // Suppression de l'article si user connecté est celui qui a écrit l'article ou l'admin (user 7)
  if (
    article.user_id === req.user.id ||
    req.user.id == process.env.ADMIN_USER
  ) {
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

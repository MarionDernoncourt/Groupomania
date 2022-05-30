/***** Modules nécessaires */
const express = require("express");
let router = express.Router();

const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

/**** Mise en place du routage Comments */
router.get("/auth/article/:id/comment", auth, commentCtrl.getAllComments);
router.put("/auth/article/:id/comment", auth, commentCtrl.addComment);

module.exports = router;

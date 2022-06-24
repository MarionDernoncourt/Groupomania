/***** Modules nécessaires */
const express = require("express");
let router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

/***** Routage de la ressource User */

router.put("/auth/signup", userCtrl.signup); // création user
router.get("/auth/users", auth, userCtrl.getAll); // récuperation all users
router.get("/auth/user/:id", auth, userCtrl.getUser); // récupération one user
router.post("/auth/login", userCtrl.loggin); // connexion au compte user
router.patch("/auth/user/:id", auth, userCtrl.updateUser); // modification user
router.delete("/auth/user/:id", auth, userCtrl.deleteUser); // suppression user

module.exports = router;

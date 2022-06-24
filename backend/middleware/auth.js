/***** Modules nécessaires */
const jwt = require("jsonwebtoken");
const DB = require("../db.config");

module.exports = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    try {
      {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId && userId !== 7) {
          throw "Invalid UserId";
        } else {
          // Récupération du User pour commentaire
          req.user = await DB.User.findOne({ where: { id: userId } });

          next();
        }
      }
    } catch {
      res.status(401).json({ error: "Invalid request" });
    }
  else {
    return res.status(401).json({ error: "Invalid request" });
  }
};

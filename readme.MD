# Groupomania - Projet 7
NodeJs - Vue JS 3 - Express - Sequelize - MariaDB

## Back-end
### Base de donnée
MySQL
la base de données utilisée pour créer ce projet était MariaDB.
Les identifiants seront à renseignés dans le _.env_ (voir ci dessous)

### Installation du back-end
Depuis le dossier back-end, installer les différents packages nécessaires avec la commande ```npm install```
### Initialisation des variables d'environnement 
Renommer le fichier _.env.example_ en _.env_ 
Compléter les différents champs du dossier avec vos propres variables:
- SERVER_PORT: 8000
- BCRYPT_SALT_ROUND: nombre de salage souhaité pour le hashage du mot de passe
- DB_HOST: par défaut " localhost "
- DB_PORT: par défaut "3306"
- DB_USER: utilisateur de la base de donnée (par défaut root)
- DB_PASSWORD: mot de passe de l'utilisateur de la base de donnée
- JWT_SECRET: Mot de passe secret pour jsonwebtoken
- JWT_DURATION: durée de validité du token (ex: "1h")
- ADMIN_USER : ID du user souhaité comme admin (ex: 1)

### Gestion téléchargement des images
Créer un dossier images dans le dossier back-end.
Ce dossier est nécessaire pour stocker les images téléchargées par les utilisateurs
### Lancement du serveur
Lancer le serveur avec la commande ```npm run dev```

## Front-end
### Installation du front-end
Depuis le dossier front-end/groupomania, installer les différents packages nécessaires avec la commande ```npm install```
### Lancement du serveur
Lancer le serveur avec la commande ```npm run serve```
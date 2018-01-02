# Ockham-landing-page
Ockham landing page

Après copie du dépôt git ou mise à jour : lancer "npm install -d" pour installer les dépendances (un dossier node_modules sera créé ou mis à jour)

On privilégiera l'hébergement des images sur un site externe (type Cloudinary) et l'utilisation des liens CDN pour les scripts ou ressources de styles qui le permettent.

Lancement avec deux terminaux en parallèle :

1/ le premier avec la commande : "npm run build" (création des bundle.css et bundle.js à partir des sources scss et js dans src/)

2/ le second avec la commande : "npm start" (lancement du serveur Node avec dist/ comme dossier de fichiers statiques)

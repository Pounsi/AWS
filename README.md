Welcome to MyCalendar app
=========================

Click `Show` in the header to see the app or
visit this link: [here](https://projet-aws.glitch.me/)


Au niveau de la base de données:
--------------------------------
- un utilisateur a un login et un pass qui doit être stocké en haché .
- un événement a un id ,un titre , un créateur , une description , le titre du calendrier dans lequel il appartient ,une date début, une heure debut et un nombre de créneaux  .
- un calendrier a un titre , un créateur et un droit (privé ou public)
- un tuple favoris a un calendrier , un créateur et une personne (celle qui le rajoute dans favoris).
- plusieurs fonctions de création , insertion ,suppression et affichage ont été faites pour modifier plus rapidement la BDD.
- les Packages Knex et Sqlite3 sont rajoutés pour utiliser une base de données
- bcrypt est ajouté pour hacher les mdp

Au niveau du HTML:
-------------------
- le contenu qui n'as pas besoin d'être rechargé plusieur fois a été fait en HTML, la partie qui est rechargée après certains événements est généré par JavaScript dans des fonctions .
- le module Nunjucks a été utiliser pour certaines pages .

Au niveau du CSS:
------------------
- la mise en page a été faite en grande partie grace a bootstrap 4 .
- le fichier style.css contient les quelques classes et mise en pages que nous avons implémenté pour répondre à nos besoins.
- certaines figures ont été utilisées dans le site elle sont incluses dans nos assets .

Au niveau du JS:
-----------------
- nous avons utilisé les handlers vu pendant le TD3 et le TD4 pour naviguer dans notre application.
-le fichier server.js contiend ces handlers.
-le fichier fonction.js quand à lui, contient toutes les fonctions utilisées soit dans server.js soit dans le HTML au niveau des listener (vu au TD2).
- certaines variables globales ont été déclarées pour garder le contenu du calendrier ainsi il sera rechargé à chaque modification sans recharger la page. 
- nous utilisons les variables de sessions vu au TD5 pour garder le login de l'utilisateur pendant tout le temps de sa connexion ce qui va nous permettre de vérifier ses droits sur chacun des calendriers qu'il visite. 
- grâce aux fonctions de chargement du calendrier nous ne rechargeons pas toute notre page calendrier ce qui se fait plus rapidement et qui rend donc notre application plus fluide.
- certaines fonctions ont été implémentées pour vérifier des champs de certains formulaires pour ne pas envoyer n'importe quel valeur au serveur.

Au niveau de la sécurité:
---------------------------
- le mot de passe n'est jamais envoyer dans l'url.
- le mot de passe n'est stocker ni dans le navigateur ni le serveur .
- pour xss on ne peut pas mettre du javascript dans une balise css (avec background) car https détecte que l'image n'est pas sécurisée
- pour ce qui concerne le vol de session l'attaquant ne peut pas utiliser l'écoute sur le canal car glitch  Utilise HTTPS.
- pour ce qui concerne la génération des identifiant de session dans notre cas nos varibles de session sont géneres aleatoirement (example : PEdUGaqDGvIkYjBKDmsj5Az59-5zR5Kp) les verifications ont ete effectuées en affichant l'identifiant de session (req.sessionID)
- pour se protéger contre la fixation on n'accepte pas des identifiants de session de la part de l'utilisateur
- les identifiants de session sont renouvelés à chaque connexion.
- le client a accès au fichier fonction.js qui contient les fonctions utilisées
  1. grâce à cela il peut afficher des variables mais cela ne pose pas problème car les seuls variables auxquels il a accès sont soit ses propre variables soit des variables publics (calendrier public)
  2. il peut également modifier des variables (localement) et les envoyer au serveur pour faire un certain traitement mais cela n'est pas dangereux également car les vérifications des variables sont faite des deux côtés.
- nous demandons la confirmation a chaque modification ou suppression d'un événement .    
- nos sessions expirent au bout de 10 minutes d'inactivitées ;
- pour bloquer les iframes, nous avons utilisé Helmet. Helmet est appelé coté serveur .

Made by Alabi Abiodun and Benyamna Younes 
---------------------------------------



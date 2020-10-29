# OpenClassrooms P5 - Site e-commerce Orinoco
5ème projet de la formation de [développeur web de OpenClassrooms](https://openclassrooms.com/fr/paths/185-developpeur-web)

## Pour tester l'application
1. Cloner le repository
2. Lancer le serveur NodeJs :
    - Dans le terminal accéder au dossier du projet
    - lancer: "node server"
3. Accéder au site à l'adresse: http://localhost:3000/

## Scénario
L'objectif est développer en **JavaScript**, et **sans framework**, le **Front-End** d'un site e-commerce.  
L'entreprise fictive est Orinoco, qui crée des applications thématiques ne vendant qu'un seul type de produit. Entre les 3 thèmes qui étaient proposés, j'ai choisi la vente d'appareil photos vintage.  
Carte blanche est donnée au design de la maquette. Donc j'ai fait quelque chose d'assez simple en utilisant sass, et surtout responsive.

## Apperçu du rendu
Voilà [une vidéo qui décrit rapidement le différentes fonctionnalités de l'application](https://youtu.be/k5JQiV9_muU)

## Objectifs du projet
1. Développement Front-End en Javascript d'un site e-commerce.
    - Page d'accueil : liste tous les produits
    - Page produit : affiche de manière dynamique le produit. L'utilisateur peut choisir une option et la quantité, et l'ajouter au panier
    - Page panier : contient le résumé des articles dans le panier, avec un formulaire permettant de passer commande. Les fonnées du formulaires seront vérifiées avant d'être envoyées au back-end
    - Page de confirmation : affichant un remerciement, le montant total de la commande, et le numéro de commande récupéré du back-end.

2. Réaliser un plan de tests

## Compétences évaluées
- Javascript Front-End
- Plan de test

## Organisation des dossiers
L'application backend est fournie par OpenClassrooms, à l'adresse : https://github.com/OpenClassrooms-Student-Center/JWDP5  
L'ensemble de mon code frontend est regroupé dans le nouveau dossier "public".  
Le fichier backend "app.js" a été modifié pour que ce dossier "public" soit accessible directement via localhost:3000  
Le fichier de plan de test (Plan de tests.ods) est situé à la racine du repository. 

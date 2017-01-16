# 911 Calls

## Jeu de données

Le jeu de données utilisé pour ce workshop est une liste d'appels au numéro d'urgence 911 dans le [Comté de Montgomery](https://www.google.fr/maps/place/Comt%C3%A9+de+Montgomery,+Pennsylvanie,+%C3%89tats-Unis/data=!4m2!3m1!1s0x89c69c3956b226eb:0x4b0baa22f9505dbd?sa=X&ved=0ahUKEwiMt6HWp8fRAhUG0xoKHfyWCvsQ8gEIdDAO) en Pennsylvanie.

Le fichier CSV des appels est disponible sur le site [Kaggle](https://www.kaggle.com/datasets) : https://www.kaggle.com/mchirico/montcoalert. La version utilisée ici est la version 30.

Extrait du jeu de données :

| lat | lng | desc | zip | title | timeStamp | twp | addr | e   |
| --- | --- | ---- | --- | ----- | --------- | --- | ---- | --- |
| 40.2978759 | -75.5812935 | REINDEER CT & DEAD END;  NEW HANOVER; Station 332; 2015-12-10 @ 17:10:52; | 19525 | EMS: BACK PAINS/INJURY | 2015-12-10 17:10:52 | NEW HANOVER | REINDEER CT & DEAD END | 1 |
| 40.2580614 | -75.2646799 | BRIAR PATH & WHITEMARSH LN;  HATFIELD TOWNSHIP; Station 345; 2015-12-10 @ 17:29:21; | 19446 | EMS: DIABETIC EMERGENCY | 2015-12-10 17:29:21 | HATFIELD TOWNSHIP | BRIAR PATH & WHITEMARSH LN | 1 |
| 40.1211818 | -75.3519752 | HAWS AVE; NORRISTOWN; 2015-12-10 @ 14:39:21-Station:STA27; | 19401 | Fire: GAS-ODOR/LEAK | 2015-12-10 14:39:21 | NORRISTOWN | HAWS AVE | 1 |

Analyse de la première ligne :

| Colonne   | Valeur                                               | Description               |
| --------- | ---------------------------------------------------- | ------------------------- |
| lat       | 40.2978759                                           | Latitude                  |
| lng       | -75.5812935                                          | Longitude                 |
| desc      | REINDEER CT & DEAD END; (...) 2015-12-10 @ 17:10:52; | Description               |
| zip       | 19525                                                | Code postal               |
| title     | EMS: BACK PAINS/INJURY                               | Titre                     |
| timeStamp | 2015-12-10 17:10:52                                  | Date et heure             |
| twp       | NEW HANOVER                                          | Quartier                  |
| addr      | REINDEER CT & DEAD END                               | Adresse                   |
| e         | 1                                                    | ? (inutile, toujours à 1) |

La donnée `titre` est particulière, elle débute toujours par un identifiant permettant de catégoriser l'appel. Trois valeurs sont possibles :

* `EMS` : appel lié à un problème médical (Emergency Medical Services).
* `Fire` : appel lié à un incendie.
* `Traffic` : appel lié à un problème de circulation (accident, panne...)


## Objectif

L'objectif est d'importer les données dans ElasticSearch et/ou dans MongoDB et de construire un certain nombre de requêtes pour répondre à différents besoin listés ci-après.

### Compter le nombre d'appels autour de Lansdale dans un rayon de 500 mètres

Coordonnées GPS du quartier de *Lansdale, PA, USA* :

* Latitude : 40.241493
* Longitude : -75.283783

Le résultat attendu est **717**.

### Compter le nombre d'appels par catégorie

Le résultat attendu est :

| EMS   | Fire  | Traffic |
| ----- | ----- | ------- |
| 54549 | 23056 | 54549   |

### Trouver les 3 mois ayant comptabilisés le plus d'appels

Le résultat attendu est :

| 01/2016 | 10/2016 | 12/2016 |
| ------- | ------- | ------- |
| 13084   | 12502   | 12162   |

### Trouver le top 3 des villes avec le plus d'appels pour overdose

Le résultat attendu est :

| POTTSTOWN | NORRISTOWN | UPPER MORELAND |
| --------- | ---------- | -------------- |
| 203       | 180        | 110            |

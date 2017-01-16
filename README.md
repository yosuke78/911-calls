# 911 Calls

## Jeu de données

Dataset Kaggle : https://www.kaggle.com/mchirico/montcoalert

## Objectif

* Import des données CSV dans un datastore NoSQL orienté Documents (ElasticSearch ou MongoDB)
  * Gestion des index géographiques
* Recherche géographique
  * Lister les appels autour d'un point géographique donné dans un rayon donné
* Écriture de requêtes d'agrégation
  * Nombre d'appels au 911 par ZIP code
  * Nombre d'appels au 911 par mois, par semaine, par jour.
  * Mixer agrégations et recherche géographique
* Visualisation dans Kibana (pour les données importées dans ElasticSearch)

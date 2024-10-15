---
title: "Tableau de bord d'analyse de sentiment avec apprentissage automatique"
description: "Tableau de bord interactif pour l'analyse des données de satisfaction des employés au Ministère de l'Économie et des Finances"
dateString: Août 2024 - Octobre 2024
draft: false
tags: ["Python", "Hugging Face 🤗", "Streamlit", "NLP", "ML", "Pandas", "Données", "IA", "S3"]
showToc: false
weight: 230
cover:
    image: "projects/etna/etna.png"
--- 

## Description

Ce projet vise à extraire de la valeur d'un large jeu de données collecté via une enquête annuelle de satisfaction menée par un département du Ministère de l'Économie (Bercy). L'enquête cible tous les employés à travers différentes divisions.

## Étapes clés :

- **Collecte de données** : Récupération des données brutes de l'enquête annuelle.
- **Traitement des données** : Nettoyage et formatage des données brutes pour une analyse plus approfondie.
- **Analyse de sentiment** : Application d'un modèle d'apprentissage automatique pour analyser les retours des utilisateurs.
- **Stockage des données** : Stockage des données traitées dans un bucket S3.
- **Visualisation des données** : Construction d'un tableau de bord Streamlit pour comparer les données sur différentes années.

Ce flux de travail permet une analyse efficace et un reporting des tendances de satisfaction des employés au fil du temps.

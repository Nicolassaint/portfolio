---
title: "OlympIA"
description: "Chatbot pour le Ministère de l'Économie et des Finances"
dateString: Avril 2024 - Présent
draft: false
tags: ["Python", "Streamlit", "LLM", "NLP", "LangChain", "Ollama", "DL", "IA"]
showToc: false
weight: 200
cover:
    image: "projects/olympia/olympia-chatbot.png"
--- 
### 🔗 <a href="https://olympia.bhub.cloud" target="_blank">Site web</a>

## Description
OlympIA est une application web d'IA pour le Ministère de l'Économie et des Finances. Elle rassemble différents outils d'IA sous une seule interface, facilitant l'accès et l'utilisation pour les utilisateurs.

Voici les outils qui peuvent être utilisés dans OlympIA :

### **Chatbot** :
- **Chatbot Vanilla** : Chatbot avec un modèle d'IA open source.
- **Chatbot RAG** : Utilisation d'une pipeline RAG robuste connecté à une base de données de documents.
- **Recherche Web** : Le chatbot va chercher des informations sur le web.

### **Résumé de documents** :
- **Pipeline de résumé** : Un pipeline qui permet aux utilisateurs de résumer des documents avec le nombre de mots souhaité.

### **Base de données de documents** :
- **Base de données** : Une base de données qui permet aux utilisateurs de stocker et d'interroger des documents.

J'ai développé le POC d'OlympIA en utilisant Python, Streamlit, LangChain, l'API Tavily et les modèles llama de Meta fonctionnant sur un GPU NVIDIA A100.

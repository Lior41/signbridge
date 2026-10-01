# Préparer un entretien — SIGNBRIDGE

## Présentation d’environ trois minutes

SIGNBRIDGE est un prototype de recherche pour une communication assistée en langue des signes américaine, l’ASL. Je commence par sa limite principale : cette version ne reconnaît pas encore de signes et ne génère pas de réponse vidéo. Elle rend utilisable et testable le parcours qui entourerait un futur modèle validé.

Le besoin est humain. Une personne doit pouvoir comprendre ce que le système propose, corriger une erreur et savoir quand le système ne sait pas. Le prototype place donc la vidéo au centre, garde le texte lisible et ne communique aucune information essentielle uniquement par le son.

La prévisualisation caméra commence seulement après un clic explicite. Le micro n’est pas demandé. Une vidéo choisie sur l’appareil reste locale. La capture s’arrête lorsque la personne quitte le parcours ou place la page en arrière-plan. Aucune conversation n’est sauvegardée par le serveur.

Pour montrer l’interface sans tricher, j’ai créé un scénario écrit à l’avance. Il est marqué comme tel. On peut confirmer la suggestion, la rejeter ou taper une correction. Ce scénario ne constitue pas une reconnaissance réussie et ne doit jamais servir à annoncer une précision du modèle.

Avant d’intégrer la reconnaissance, il faut résoudre trois problèmes. D’abord, vérifier les droits des données et des poids du modèle. Un jeu de données disponible publiquement n’est pas forcément redistribuable sur un site. Ensuite, mesurer les performances sur des personnes différentes de celles utilisées pour l’entraînement. Enfin, faire valider le vocabulaire et les réponses par des personnes compétentes en ASL.

Reconnaître un signe isolé n’est pas traduire une conversation entière. De même, aligner des vidéos de mots anglais ne garantit pas une phrase correcte en ASL. Les réponses devront donc être des phrases complètes, enregistrées avec autorisation et revues en ASL. Le produit devra annoncer qu’il sélectionne une vidéo préenregistrée, pas qu’il la génère.

Sur le plan technique, le projet sépare l’interface, la validation des fichiers et un contrat de résultat pour un futur modèle. Les tests vérifient notamment qu’un résultat insuffisant peut être refusé. Les seuils actuels sont des valeurs de travail, pas des mesures de confiance garanties.

Ce travail, réalisé avec assistance IA, montre ma capacité à traiter un problème difficile avec honnêteté : construire les éléments utiles, tester ce qui est testable et identifier les validations humaines indispensables. Mon prochain jalon est un petit vocabulaire réellement autorisé et évalué, avec au moins un exemple reconnu et un exemple refusé. Je ne présenterais pas cette version comme un interprète ni comme une application de traduction achevée.

La durée dépend de ton débit : répète avec un chronomètre et réserve quelques secondes à la démonstration. Ne récite pas une partie que tu ne sais pas encore expliquer.

## Questions et réponses

### Pourquoi ne pas brancher directement une API vision ?

Une sortie plausible ne prouve pas une traduction correcte. Il faut connaître le vocabulaire, les droits, les conditions d’évaluation et les cas d’abstention.

### Quelle différence entre ASL et LSF ?

Ce sont des langues distinctes. Des signes ou données LSF ne peuvent pas être présentés comme de l’ASL.

### Que fonctionne-t-il actuellement ?

La prévisualisation locale, les contrôles de confidentialité et un parcours de correction préécrit. L’inférence et les réponses signées restent bloquées par les ressources et validations nécessaires.

### Comment évaluera-t-on le modèle ?

Avec une séparation par personne entre entraînement et test, des résultats par signe, des gestes inconnus, des cas sans signe et une latence mesurée sur du matériel décrit.

### Qu’est-ce que l’abstention ?

Le système choisit de ne pas proposer de signe lorsque les conditions ne permettent pas un résultat suffisamment étayé. Le seuil doit être calibré et mesuré avant d’être utilisé publiquement.

### Où vont les vidéos ?

Dans cette version, elles restent dans la page. Aucun endpoint ne les reçoit. Ajouter des uploads imposerait de nouvelles protections et un consentement explicite.

### Pourquoi des phrases vidéo complètes ?

La grammaire et les expressions non manuelles comptent. Coller des mots ne suffit pas. Une phrase doit être validée et sa diffusion autorisée.

### Quelle amélioration prioritaire ?

Obtenir des ressources exploitables légalement et une revue ASL compétente, puis intégrer et évaluer un petit périmètre réel. Pas ajouter un faux score de précision.

## Exercice pratique

Objectif : comprendre le refus d’une proposition sans prétendre entraîner un modèle.

1. Lis `src/lib/recognition.ts` et les tests à étiquettes synthétiques.
2. Ajoute un cas contenant deux propositions proches : le système doit s’abstenir selon la règle définie.
3. Ajoute un cas sans signe détecté et vérifie qu’aucune correction automatique ne lui invente un sens.
4. Modifie le texte d’aide affiché après un refus pour proposer une action simple.
5. Lance les tests et explique pourquoi ils valident une politique logicielle mais ne mesurent pas la précision en ASL.

## Méthode d’apprentissage

Pour chaque fonction, explique son entrée, sa sortie, les erreurs possibles et le test qui les couvre. Montre les limites avec assurance. Dis « développé avec assistance IA, puis vérifié et étudié » plutôt que de t’attribuer une autonomie que tu n’as pas encore acquise.

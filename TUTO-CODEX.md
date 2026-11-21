# Tuto Codex — site laura gregori

Tu modifies le site en écrivant ta demande à Codex. Rien n'est en ligne tant que tu n'as pas vérifié l'aperçu et cliqué sur « Merge ».

## Le principe

Chaque changement suit toujours le même circuit, en 4 temps :

1. **Tu demandes** à Codex, en français normal, ce que tu veux changer.
2. **Codex prépare la modification** et la range dans une « pull request » (PR) : une proposition de changement, pas encore en ligne.
3. **Tu vérifies l'aperçu** : Vercel fabrique une copie du site avec ta modification, sur une adresse à part.
4. **Tu valides (« Merge »)** : le vrai site est mis à jour en 1 à 2 minutes.

Tant que tu n'as pas cliqué sur Merge, le vrai site ne bouge pas. Tu ne peux rien casser en essayant.

## Mise en place (une seule fois)

Compte 20 minutes. Luca peut le faire avec toi.

1. **Crée un compte GitHub** sur [github.com/signup](https://github.com/signup), puis envoie ton pseudo GitHub à Luca.
2. **Accepte l'invitation de Luca** : tu reçois un email de GitHub « invited you to collaborate on website-maison-gregotte ». Clique sur « Accept invitation ».
3. **Ouvre Codex** dans ChatGPT, avec ton compte ChatGPT Pro : va sur [chatgpt.com/codex](https://chatgpt.com/codex). Si la page a changé, ouvre ChatGPT et choisis « Work in », puis « Cloud ». Sur ton Mac, utilise **Firefox** ([firefox.com](https://www.firefox.com)) : Safari est trop ancien sur macOS Catalina. Cette étape et les deux suivantes se font sur un ordinateur, pas sur l'iPhone.
4. **Connecte GitHub** quand Codex te le demande. GitHub te demande quels dépôts autoriser : choisis seulement `website-maison-gregotte`.
5. **Crée l'environnement du site** : « Select environment », puis « Create environment ». Choisis `website-maison-gregotte`, clique « Get started », puis « Publish ». Tu ne le fais qu'une fois ; ensuite tu choisis juste cet environnement.

Les noms des boutons de Codex changent souvent. Si tu ne trouves pas exactement le même mot, cherche le plus proche ou demande à Luca.

## Faire une modification

1. **Ouvre Codex** et choisis l'environnement `website-maison-gregotte`.
2. **Écris ta demande** : une seule chose par demande, avec le texte exact si tu en as un (exemples plus bas). Envoie.
3. **Attends que Codex ait fini** (quelques minutes). Il résume ce qu'il a changé. Si ce n'est pas ce que tu voulais, réponds-lui dans la même conversation : « Non, plutôt… ».
4. **Crée la pull request** : clique sur le bouton de Codex qui crée une PR (souvent « Create PR »). Codex te donne un lien vers la PR sur GitHub.
5. **Ouvre l'aperçu** : sur la page de la PR, attends 1 à 2 minutes. Vercel ajoute un commentaire avec un lien « Preview » ou « Visit Preview ». Clique dessus et regarde les pages indiquées dans la description de la PR, en français et en anglais.
6. **Si quelque chose ne va pas**, retourne dans la même conversation Codex, demande la correction, et mets à jour la PR avec le bouton proposé par Codex. L'aperçu se met à jour tout seul.
7. **Si tout est bon, valide** : sur la page de la PR, clique « Merge pull request » puis « Confirm merge ». Le vrai site est à jour 1 à 2 minutes après.

Tu veux abandonner une demande ? Ne merge pas : sur la PR, clique « Close pull request ». Rien ne change sur le site.

## Depuis l'iPhone

Une fois la mise en place faite sur un ordinateur, tu peux faire tes demandes depuis ton iPhone.

1. **Installe l'app ChatGPT** et l'app **GitHub** depuis l'App Store, et connecte-toi avec tes comptes.
2. **Dans l'app ChatGPT**, ouvre Codex, choisis l'environnement `website-maison-gregotte` et écris ta demande, comme sur l'ordinateur.
3. **Crée la PR** depuis Codex quand il a fini, puis ouvre le lien de la PR : il s'ouvre dans l'app GitHub ou dans Safari.
4. **Vérifie l'aperçu** : touche le lien « Preview » du commentaire Vercel. Regarde le site sur ton téléphone ; il vaut mieux jeter aussi un œil sur ordinateur pour un gros changement.
5. **Merge** depuis l'app GitHub : « Merge pull request », puis « Confirm merge ».

Les photos se déposent plus facilement depuis le Mac (section suivante). L'app GitHub ne permet pas d'envoyer des fichiers. Sinon, envoie-les à Luca.

## Ajouter des photos

Codex ne peut pas prendre les photos que tu colles dans la conversation pour les mettre sur le site. Tu les déposes d'abord sur GitHub, puis tu demandes à Codex de les utiliser.

1. **Renomme tes photos** avant, avec un nom simple qui décrit l'œuvre : `collage-soleil.jpg` plutôt que `WhatsApp Image 2026-11-10.jpeg`.
2. **Ouvre le dossier des images** : [src/assets/images](https://github.com/lucaguery/website-maison-gregotte/tree/main/src/assets/images).
3. Clique **« Add file »**, puis **« Upload files »**, et glisse tes photos dans la page (25 Mo maximum par photo).
4. En bas, GitHub propose de créer une nouvelle branche : garde ce choix et clique **« Propose changes »**, puis **« Create pull request »**.
5. **Merge tout de suite** cette PR (« Merge pull request », puis « Confirm merge »). Les photos sont stockées mais pas encore affichées : le site ne change pas.
6. **Demande à Codex** de les utiliser, en donnant le nom exact du fichier (exemple plus bas).

## Exemples de demandes

Plus tu es précise, moins il y a d'allers-retours. Donne les textes exacts, les prix et les dimensions. Codex fait toujours la version anglaise lui-même.

**Ajouter une œuvre**

> Ajoute un nouveau collage à vendre. Titre : « Soleil ». Prix : 180 €. Dimensions : 30 × 40 cm. Photo : `collage-soleil.jpg` (déjà dans src/assets/images). Description : « Papiers déchirés et gouache sur carton. »

**Marquer une œuvre comme vendue**

> Le collage « Cordée » est vendu, indique-le sur le site.

**Changer un prix**

> Passe le prix du collage « Mesa » à 220 €.

**Modifier un texte**

> Sur la page À propos, remplace le deuxième paragraphe par : « … »

**Retirer une œuvre**

> Retire le collage « Cortège » du site.

À éviter : plusieurs demandes dans un seul message (« ajoute ces 3 œuvres, change la page contact et les couleurs »). Fais une demande, merge, puis la suivante.

## Si ça coince

| Ce que tu vois | Quoi faire |
| --- | --- |
| Pas de lien d'aperçu sur la PR après 5 minutes | Recharge la page. Toujours rien : envoie le lien de la PR à Luca. |
| Le commentaire Vercel dit « Failed » ou affiche une croix rouge | Le site ne se construit pas. Dis à Codex, dans la même conversation : « Le déploiement Vercel échoue, corrige-le ». Puis mets à jour la PR. |
| Codex dit qu'il ne trouve pas ta photo | Vérifie que tu as bien mergé la PR des photos, et donne-lui le nom exact du fichier. |
| Le bouton « Merge » est grisé | Attends que les vérifications en cours sur la PR soient finies. Toujours grisé : demande à Luca. |
| Le vrai site a un problème après un merge | Pas de panique : tout est réversible. Envoie le lien de la PR à Luca, il peut annuler le changement en un clic. |

Ne touche jamais aux réglages du dépôt GitHub (onglet « Settings ») ni au compte Vercel.

### Collection
**GET** `/{resource}s?` => récupérer une liste de {resource}s
*200* => tableau de {resource}s => TOUJOURS UN TABLEAU

**POST** `/{resource}s?` => créer une nouvelle {resource}
*201* => l'objet créé
*400* => erreur de syntaxe => pas de body
*409* => erreur de conflit => object d'erreur indéxé par le nom du champ
*422* => erreur de validation => object d'erreur indéxé par le nom du champ
### Item
**GET** `/{resource}s/{id}` => récupérer une {resource}
*200* => {resource}
*404* => {resource} non trouvée => pas de body

**PUT** `/{resource}s/{id}` => remplacer complètement une {resource} / Créer une {resource} avec un id précis
*200* => remplacement de la resource => donnée remplacée
*201* => création de la resource => donnée créée
*400* => erreur de syntaxe => pas de body
*409* => erreur de conflit => object d'erreur indéxé par le nom du champ
*422* => erreur de validation => object d'erreur indéxé par le nom du champ

**PATCH** `/{resource}s/{id}` => modifier partiellement une {resource}
*200* => modification de la resource => donnée modifiée
*400* => erreur de syntaxe => pas de body
*404* => {resource} non trouvée => pas de body
*409* => erreur de conflit => object d'erreur indéxé par le nom du champ
*422* => erreur de validation => object d'erreur indéxé par le nom du champ

**DELETE** `/{resource}s/{id}` => supprimer une {resource}
*204* => {resource} supprimée => pas de body
*404* => {resource} non trouvée => pas de body
### SubCollection
**GET** `/{resource}s/{id}/{subresource}s?` => récupérer une liste de {subresource}s
*200* => tableau de {subresource}s => TOUJOURS UN TABLEAU
*404* => {resource} non trouvée => pas de body
###
**POST** `/{verb}` => exécuter une action spécifique
*200* => résultat de l'action
*400* => erreur de syntaxe => pas de body
*422* => erreur de validation => object d'erreur indéxé par le nom du champ
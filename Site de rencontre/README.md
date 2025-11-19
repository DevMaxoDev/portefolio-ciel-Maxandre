# Coup2Foudre — Site de Rencontre

Application de rencontre avec login/registration et gestion de profil.

## Fonctionnalités

✅ Inscription et connexion (login/register)
✅ Profil utilisateur persistant
✅ Mode offline (localStorage fallback)
✅ Mode online avec json-server (persistance fichier `db.json`)
✅ Dropdown menu "Produits" avec animation
✅ Popup de login positionnée sous le bouton navbar

## Installation

### Prérequis

- Node.js et npm (pour json-server)
- Python 3 (pour serveur HTTP local)

### Étapes

1. **Installer les dépendances** :
```bash
cd "Site de rencontre"
npm install
```

## Démarrage

### Option 1 : Lancer les deux serveurs ensemble
```bash
npm run start
```
Cela lance :
- `json-server` sur `http://localhost:3000` (API mock + persistance db.json)
- Serveur HTTP sur `http://localhost:8000` (site frontend)

### Option 2 : Lancer les serveurs séparément
```bash
# Terminal 1 : json-server (persistance fichier)
npm run mock

# Terminal 2 : serveur HTTP
npm run server
```

### Option 3 : Mode offline (localStorage uniquement)
```bash
npm run server
# Pas besoin de json-server
```

## Utilisation

1. Ouvrez `http://localhost:8000` dans votre navigateur
2. Cliquez sur « Login » dans la navbar
3. Sélectionnez « Register » pour créer un compte
   - Username : votre nom d'utilisateur
   - Email : votre email
   - Password : votre mot de passe
4. Vous serez redirigé vers votre page de profil
5. Cliquez sur « Se déconnecter » pour vous déconnecter

## Architecture

### Frontend
- `index.html` — page principale avec popup login
- `profile.html` — page profil utilisateur
- `style.css` — styles principaux
- `profile.css` — styles page profil
- `js.js` — logique login/register/navigation

### Backend (mode online)
- `db.json` — fichier de persistance json-server
- `package.json` — scripts npm

## Fonctionnement offline vs online

### Mode Offline (localStorage)
- Les profils sont stockés dans `localStorage` du navigateur
- Les données ne persistent que sur le même navigateur/dispositif
- Aucun serveur backend requis

### Mode Online (json-server)
- Les profils sont stockés dans `db.json`
- Persistance sur le serveur local
- Possibilité de partager la base entre utilisateurs sur le réseau local

## Sécurité

⚠️ **Attention** : Ce projet est une démo locale. Les mots de passe sont stockés en clair dans `db.json` et `localStorage`. Ne pas utiliser en production.

## Fichiers principaux

```
Site de rencontre/
├── index.html              # Page principale
├── profile.html            # Page profil
├── style.css               # Styles (navbar, popup, dropdown)
├── profile.css             # Styles profil
├── js.js                   # Logique interactif
├── db.json                 # Base de données (json-server)
├── package.json            # Scripts npm
└── README.md               # Cette doc
```

## Troubleshooting

### Erreur "Impossible de contacter le serveur"
- Vérifiez que json-server est lancé : `npm run mock`
- Ou utilisez le mode offline : `npm run server` (sans json-server)

### Profil ne s'affiche pas
- Ouvrez la console navigateur (F12 → Console)
- Vérifiez que `localStorage.getItem('profile_id')` retourne un ID
- Vérifiez les erreurs réseau dans l'onglet Network

### Port déjà utilisé
- Si le port 3000 ou 8000 est occupé, modifiez les scripts npm dans `package.json`

## Contact & Support

Pour toute question ou amélioration, consultez le code source ou lancez les serveurs en debug mode.

---

**Dernière mise à jour** : 17/11/2025

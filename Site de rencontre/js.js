document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector(".wrapper");
    if (!wrapper) {
        console.warn('Element .wrapper introuvable — vérifiez la page chargée.');
        return;
    }

    const loginLink = wrapper.querySelector(".login-link");
    const registerLink = wrapper.querySelector(".register-link");
    const btnPopup = document.querySelector(".btnLogin-popup");
    const iconClose = wrapper.querySelector(".icon-close");

    if (iconClose) {
        iconClose.addEventListener("click", () => {
            wrapper.classList.remove("active-popup");
        });
    } else {
        console.warn('.icon-close introuvable dans .wrapper');
    }

    if (registerLink) {
        registerLink.addEventListener("click", () => {
            wrapper.classList.add("active");
        });
    } else {
        console.warn('.register-link introuvable dans .wrapper');
    }

    if (loginLink) {
        loginLink.addEventListener("click", () => {
            wrapper.classList.remove("active");
        });
    } else {
        console.warn('.login-link introuvable dans .wrapper');
    }

    if (btnPopup) {
        btnPopup.addEventListener("click", (e) => {
            // positionner la popup juste sous le bouton Login
            const rect = btnPopup.getBoundingClientRect();
            // forcer position absolue afin de placer la popup par rapport au viewport
            wrapper.style.position = 'absolute';
            // calculer coordonnées (sous le bouton)
            const top = rect.bottom + window.scrollY + 8; // 8px de marge
            // aligner le bord droit de la popup avec le bord droit du bouton
            const left = rect.right + window.scrollX - wrapper.offsetWidth;
            wrapper.style.top = top + 'px';
            wrapper.style.left = Math.max(8, left) + 'px';
            wrapper.style.transformOrigin = 'top right';
            wrapper.classList.toggle("active-popup");
        });
    } else {
        console.warn('.btnLogin-popup introuvable (vérifiez s\'il est en dehors de .wrapper)');
    }

    /* Login via json-server: chercher le profil par email et vérifier le password */
    const loginForm = wrapper.querySelector('.form-box.login form');
    if (loginForm) {
        loginForm.addEventListener('submit', (ev) => {
            ev.preventDefault();
            const emailInput = loginForm.querySelector('input[type="email"]');
            const passInput = loginForm.querySelector('input[type="password"]');
            const email = emailInput ? emailInput.value.trim() : '';
            const password = passInput ? passInput.value : '';

            if (!email || !password) {
                alert('Veuillez renseigner l\'email et le mot de passe.');
                return;
            }

            fetch('http://localhost:3000/profiles?email=' + encodeURIComponent(email))
                .then(res => res.json())
                .then(arr => {
                    if (!arr || arr.length === 0) {
                        alert('Compte introuvable. Veuillez vous inscrire.');
                        return;
                    }
                    const user = arr[0];
                    if (user.password && user.password !== password) {
                        alert('Mot de passe incorrect.');
                        return;
                    }
                    // enregistrer l'id du profil localement et rediriger
                    try { localStorage.setItem('profile_id', user.id); } catch(e){}
                    wrapper.classList.remove('active-popup');
                    window.location.href = 'profile.html';
                })
                .catch(err => {
                    console.error('Erreur lors de la requête login:', err);
                    console.warn('Fallback: mode hors-ligne, acceptation du login');
                    // fallback: en mode hors-ligne, accepter le login et créer un profil temporaire
                    const fallbackId = 'local-' + Date.now();
                    const fallbackProfile = {
                        id: fallbackId,
                        email,
                        displayName: email.split('@')[0],
                        password,
                        bio: 'Profil hors-ligne — mode démo',
                        premium: false,
                        joined: new Date().toISOString()
                    };
                    try {
                        localStorage.setItem('fake_profile', JSON.stringify(fallbackProfile));
                        localStorage.setItem('profile_id', fallbackId);
                    } catch (e) {}
                    wrapper.classList.remove('active-popup');
                    window.location.href = 'profile.html';
                });
        });
    } else {
        console.warn('formulaire de login introuvable dans .wrapper');
    }

    /* Fake register: intercepter l'inscription, stocker un profil et rediriger vers profile.html */
    const registerForm = wrapper.querySelector('.form-box.register form');
    if (registerForm) {
        registerForm.addEventListener('submit', (ev) => {
            ev.preventDefault();
            const usernameInput = registerForm.querySelector('input[type="text"]');
            const emailInput = registerForm.querySelector('input[type="email"]');
            const passInput = registerForm.querySelector('input[type="password"]');

            const username = usernameInput ? usernameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const password = passInput ? passInput.value : '';

            if (!username || !email || !password) {
                alert('Veuillez remplir tous les champs du formulaire d\'inscription.');
                return;
            }

            const profile = {
                email,
                displayName: username,
                password, // stocké en clair ici (mock only)
                bio: 'Nouveau membre — modifiez votre bio dans le profil.',
                premium: false,
                joined: new Date().toISOString()
            };

            fetch('http://localhost:3000/profiles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            })
            .then(r => r.json())
            .then(saved => {
                try { localStorage.setItem('profile_id', saved.id); } catch(e){}
                wrapper.classList.remove('active-popup');
                window.location.href = 'profile.html';
            })
            .catch(err => {
                console.error('Erreur lors de la création du profil:', err);
                // fallback: enregistrer localement dans fake_profile et générer un id
                try {
                    const fallbackId = 'local-' + Date.now();
                    const fallbackProfile = Object.assign({ id: fallbackId }, profile);
                    localStorage.setItem('fake_profile', JSON.stringify(fallbackProfile));
                    localStorage.setItem('profile_id', fallbackId);
                    wrapper.classList.remove('active-popup');
                    window.location.href = 'profile.html';
                    return;
                } catch (e) {
                    console.error('Impossible de sauvegarder le profil en fallback:', e);
                }
                alert('Impossible de sauvegarder le profil localement.');
            });
        });
    } else {
        console.warn('formulaire d\'inscription introuvable dans .wrapper');
    }
});

console.log("Script chargé avec succès.");

const cards = document.querySelectorAll(".tinder-card");
const nopeBtn = document.querySelector(".nope");
const likeBtn = document.querySelector(".like");

let currentCard = 0;

function swipeCard(direction) {
    const card = cards[currentCard];
    if (!card) return;

    card.style.transform = `translateX(${direction * 800}px) rotate(${direction * 45}deg)`;
    card.style.opacity = 0;

    currentCard++;

    setTimeout(() => {
        card.style.display = "none";
    }, 300);
}

// Buttons
nopeBtn.addEventListener("click", () => swipeCard(-1));
likeBtn.addEventListener("click", () => swipeCard(1));

// Drag swipe
cards.forEach(card => {
    let startX = 0;

    card.addEventListener("mousedown", e => {
        startX = e.clientX;
    });

    card.addEventListener("mouseup", e => {
        const diff = e.clientX - startX;

        if (diff > 120) swipeCard(1);
        if (diff < -120) swipeCard(-1);
    });
});

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
        btnPopup.addEventListener("click", () => {
            wrapper.classList.add("active-popup");
        });
    } else {
        console.warn('.btnLogin-popup introuvable (vérifiez s\'il est en dehors de .wrapper)');
    }
});
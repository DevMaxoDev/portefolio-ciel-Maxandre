document.addEventListener("DOMContentLoaded", () => {
    const cards = Array.from(document.querySelectorAll(".tinder-card"));
    let currentIndex = cards.length - 1;

    // z-index pour empiler correctement
    cards.forEach((card, i) => card.style.zIndex = i);

    const nopeBtn = document.querySelector(".nope");
    const likeBtn = document.querySelector(".like");

    function swipeCard(direction) {
        if (currentIndex < 0) return;
        const card = cards[currentIndex];
        card.style.transform = `translateX(${direction * 800}px) rotate(${direction * 45}deg)`;
        card.style.opacity = 0;

        currentIndex--;

        // Mettre à jour les cartes restantes pour l'effet pile
        for (let i = 0; i <= currentIndex; i++) {
            cards[i].style.transition = "transform 0.3s";
            let scale = 0.9 + 0.05 * i;
            let translateY = 20 - 10 * i;
            cards[i].style.transform = `scale(${scale}) translateY(${translateY}px)`;
        }
    }

    nopeBtn.addEventListener("click", () => swipeCard(-1));
    likeBtn.addEventListener("click", () => swipeCard(1));

    // Drag swipe
    cards.forEach(card => {
        let startX = 0;
        card.addEventListener("mousedown", e => startX = e.clientX);
        card.addEventListener("mouseup", e => {
            const diff = e.clientX - startX;
            if (diff > 120) swipeCard(1);
            if (diff < -120) swipeCard(-1);
        });
    });
});

function createStars(type, quantity) {
    for (let i = 0; i < quantity; i++) {
        let star = document.createElement('div');
        star.classList.add('star', `type-${type}`);
        star.style.left = `${Math.random() * 99}%`;
        star.style.bottom = `${Math.random() * 99 + 1}%`;
        star.style.animationDuration = `${Math.floor(Math.random() * 200) + 50}s`;
        document.body.appendChild(star);
    }
}

createStars(1, 100);

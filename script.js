// Get elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionContainer = document.getElementById('question-container');
const celebrationContainer = document.getElementById('celebration-container');
const subtitle = document.getElementById('subtitle');

// Counter for "No" button attempts
let noClickCount = 0;

// Messages that change as she tries to click "No"
const messages = [
    "Please say yes... 🥺",
    "Are you sure? 🥺👉👈",
    "Please reconsider! 💔",
    "But... but... 😢",
    "You're breaking my heart! 💔",
    "Give me a chance! 🙏",
    "Pretty please? 🥺✨",
    "I'll be so sad! 😭",
    "Just click Yes! It's easier! 😊",
    "The Yes button is right there! 👀"
];

// Function to move the "No" button to a random position
function moveNoButton() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();

    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate random position within reasonable bounds
    const maxX = 200; // maximum horizontal offset
    const maxY = 150; // maximum vertical offset

    const randomX = Math.floor(Math.random() * maxX * 2) - maxX;
    const randomY = Math.floor(Math.random() * maxY * 2) - maxY;

    // Apply the new position
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    // Increase the Yes button size
    const currentScale = 1 + (noClickCount * 0.15);
    yesBtn.style.transform = `scale(${Math.min(currentScale, 2.5)})`;

    // Update message
    if (noClickCount < messages.length) {
        subtitle.textContent = messages[noClickCount];
    }

    noClickCount++;
}

// Event listeners for the "No" button
// Move button on hover (mouse enter)
noBtn.addEventListener('mouseenter', moveNoButton);

// Move button on touch (for mobile)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Also move on click attempt (in case they're quick)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// "Yes" button click handler
yesBtn.addEventListener('click', () => {
    // Hide question container
    questionContainer.style.display = 'none';

    // Show celebration container
    celebrationContainer.classList.add('active');

    // Create more floating hearts
    createCelebrationHearts();
});

// Function to create extra hearts for celebration
function createCelebrationHearts() {
    const heartsContainer = document.querySelector('.hearts-background');

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-50px';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heartsContainer.appendChild(heart);
    }
}

// Add a subtle shake animation to the Yes button periodically
setInterval(() => {
    if (questionContainer.style.display !== 'none') {
        yesBtn.style.animation = 'none';
        setTimeout(() => {
            yesBtn.style.animation = 'shake 0.5s';
        }, 10);
    }
}, 5000);

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) scale(var(--scale, 1)); }
        25% { transform: translateX(-10px) scale(var(--scale, 1)); }
        75% { transform: translateX(10px) scale(var(--scale, 1)); }
    }
`;
document.head.appendChild(style);

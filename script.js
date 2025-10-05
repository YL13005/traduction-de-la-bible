// Prix des objectifs
const VERSE_PRICE = 35;
const CHAPTER_PRICE = 1500;

// Données stockées en mémoire
let gameData = {
    totalAmount: 67.18,
    startDate: new Date().toDateString()
};

// Initialiser le dashboard
function init() {
    updateDisplay();
}

function addDonation() {
    const input = document.getElementById('donationInput');
    const amount = parseInt(input.value);

    if (amount && amount > 0) {
        const oldVersesCompleted = Math.floor(gameData.totalAmount / VERSE_PRICE);
        const oldChaptersCompleted = Math.floor(gameData.totalAmount / CHAPTER_PRICE);

        gameData.totalAmount += amount;

        const newVersesCompleted = Math.floor(gameData.totalAmount / VERSE_PRICE);
        const newChaptersCompleted = Math.floor(gameData.totalAmount / CHAPTER_PRICE);

        // Vérifier les nouveaux accomplissements
        if (newVersesCompleted > oldVersesCompleted) {
            celebrate('🎉 Nouveau verset traduit ! 📖');
        }

        if (newChaptersCompleted > oldChaptersCompleted) {
            celebrate('🏆 NOUVEAU CHAPITRE TRADUIT ! 🎊');
            createConfetti();
        }

        updateDisplay();
        input.value = '';

        // Animation du bouton
        const btn = event.target;
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    }
}

function updateDisplay() {
    const versesCompleted = Math.floor(gameData.totalAmount / VERSE_PRICE);
    const chaptersCompleted = Math.floor(gameData.totalAmount / CHAPTER_PRICE);

    // Mise à jour des statistiques
    document.getElementById('totalAmount').textContent = gameData.totalAmount + '€';
    document.getElementById('versesCompleted').textContent = versesCompleted;
    document.getElementById('chaptersCompleted').textContent = chaptersCompleted;

    // Progrès vers le prochain verset
    const verseRemainder = Number.parseFloat(gameData.totalAmount % VERSE_PRICE).toFixed(2);
    const verseProgressPercent = (verseRemainder / VERSE_PRICE) * 100;
    document.getElementById('verseProgress').style.width = verseProgressPercent + '%';
    document.getElementById('verseProgressText').textContent =
        `${verseRemainder}€ / ${VERSE_PRICE}€ (${(VERSE_PRICE - verseRemainder).toFixed(2)}€ restants)`;

    // Progrès vers le prochain chapitre
    const chapterRemainder = Number.parseFloat(gameData.totalAmount % CHAPTER_PRICE).toFixed(2);
    const chapterProgressPercent = (chapterRemainder / CHAPTER_PRICE) * 100;
    document.getElementById('chapterProgress').style.width = chapterProgressPercent + '%';
    document.getElementById('chapterProgressText').textContent =
        `${chapterRemainder}€ / ${CHAPTER_PRICE}€ (${CHAPTER_PRICE - chapterRemainder}€ restants)`;

    // Mise à jour des jalons
    updateMilestones();
}

function updateMilestones() {
    const milestones = [
        {id: 'milestone1', target: 35},
        {id: 'milestone2', target: 350},
        {id: 'milestone3', target: 1500},
        {id: 'milestone4', target: 3000}
    ];

    milestones.forEach(milestone => {
        const element = document.getElementById(milestone.id);
        if (gameData.totalAmount >= milestone.target) {
            element.classList.add('achieved');
        } else {
            element.classList.remove('achieved');
        }
    });
}

function celebrate(message) {
    // Créer un message de célébration
    const celebrationMsg = document.createElement('div');
    celebrationMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                color: white;
                padding: 30px;
                border-radius: 20px;
                font-size: 2em;
                text-align: center;
                z-index: 2000;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                animation: celebrationPop 3s ease-out forwards;
            `;

    celebrationMsg.innerHTML = message;
    document.body.appendChild(celebrationMsg);

    // Style d'animation
    const style = document.createElement('style');
    style.textContent = `
                @keyframes celebrationPop {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                    20% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                    80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                }
            `;
    document.head.appendChild(style);

    // Supprimer après l'animation
    setTimeout(() => {
        document.body.removeChild(celebrationMsg);
        document.head.removeChild(style);
    }, 3000);
}

function createConfetti() {
    const celebration = document.getElementById('celebration');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#f39c12', '#e74c3c'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        celebration.appendChild(confetti);

        setTimeout(() => {
            if (celebration.contains(confetti)) {
                celebration.removeChild(confetti);
            }
        }, 3000);
    }
}

function resetData() {
    if (confirm('Êtes-vous sûr de vouloir recommencer le projet ?')) {
        gameData = {
            totalAmount: 0,
            startDate: new Date().toDateString()
        };
        updateDisplay();
    }
}

// Gestion de l'entrée
document.getElementById('donationInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addDonation();
    }
});

const btn = document.getElementById("fullscreen-btn");

btn.addEventListener("click", () => {
    const element = document.documentElement; // la page entière
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { // Safari
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge anciens
        element.msRequestFullscreen();
    }
});

// Initialiser au chargement
init();

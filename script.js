function formatTime(seconds) {
    const m = Math.floor(seconds/ 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

}

document.addEventListener('DOMContentLoaded', () => {
    let deck = createDeck();
    let selectedCards = [];
    let timer;
    let time = 0;

    function createDeck() {
        const colors = [1, 2, 3, 4, 5, 6];
        let deck = [];
        for (let i = 1; i < (1 << colors.length); i++) {
            let subset = [];
            for (let j = 0; j < colors.length; j++) {
                if (i & (1 << j)) {
                    subset.push(colors[j]);
                }
            }
            deck.push(subset);
        }
        return shuffle(deck);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startGame() {
        time = 0;
        document.getElementById('gameTitle').style.display = 'none';
        document.getElementById('controls').classList.add('side-controls');
        document.getElementById('gameControls').style.display = 'block'; // Show game controls
        document.getElementById('startBtn').style.display = 'none'; // Hide start button
        document.getElementById('timer').style.display = 'block'; // Show timer
        timer = setInterval(() => {
            time += 0.1;
            document.getElementById('timer').innerText = formatTime(time); // Display with one decimal place
        }, 100);
        document.getElementById('cardsRemaining').style.display = 'block';
        dealCards();
    }

    function resetGame() {
        clearInterval(timer);
        time = 0;
        document.getElementById('timer').innerText = "00:00";
        deck = createDeck();
        selectedCards = [];
        document.getElementById('cardsLeft').innerText = deck.length;
        document.getElementById('cardTable').innerHTML = '';
        document.getElementById('gameTitle').style.display = 'block';
        document.getElementById('controls').classList.remove('side-controls');
        document.getElementById('gameControls').style.display = 'none'; // Hide game controls
        document.getElementById('startBtn').style.display = 'block'; // Show start button
        document.getElementById('timer').style.display = 'none'; // Hide timer
        document.getElementById('cardsRemaining').style.display = 'none'; // Hide remaining cards
    }

    function dealCards() {
        const positions = [
            [0, 1],
            [2, 3, 4],
            [5, 6]
        ];
        document.getElementById('cardTable').innerHTML = '';
        positions.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            row.forEach(() => {
                if (deck.length === 0) return;
                const card = deck.pop();
                const cardElement = createCardElement(card);
                rowDiv.appendChild(cardElement);
                // Add animation class for dealing cards
                cardElement.classList.add('deal-animation');
            });
            document.getElementById('cardTable').appendChild(rowDiv);
        });

        updateCardsLeft(); // Update cards left count
    }

    function createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        for (let i = 0; i < 6; i++) {
            const color = card.includes(i + 1) ? `dot${i + 1}` : null;
            if (color) {
                const dot = document.createElement('div');
                dot.classList.add('dot', color);
                cardElement.appendChild(dot);
            }
        }

        // Click event listener for selecting cards
        cardElement.addEventListener('click', () => {
            toggleCardSelection(cardElement, card);
        });

        return cardElement;
    }

    function toggleCardSelection(cardElement, card) {
        if (cardElement.classList.contains('selected')) {
            cardElement.classList.remove('selected');
            deselectCard(card); // Deselect card
        } else {
            cardElement.classList.add('selected');
            selectCard(card); // Select card
        }
    }

    function selectCard(card) {
        selectedCards.push(card);
    }

    function deselectCard(card) {
        const index = selectedCards.findIndex(selCard => arraysEqual(selCard, card));
        if (index !== -1) {
            selectedCards.splice(index, 1);
        }
    }

    function checkSelection() {
        if (selectedCards.length === 0) {
            return; // Exit early if no cards are selected
        }

        const colorCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        selectedCards.forEach(card => {
            card.forEach(color => {
                colorCount[color]++;
            });
        });

        if (Object.values(colorCount).every(count => count % 2 === 0)) {
            const rows = document.querySelectorAll('.row');
            rows.forEach(row => {
                Array.from(row.children).forEach(cardElement => {
                    const cardData = getCardDataFromElement(cardElement);
                    const isCardInSubset = selectedCards.some(selectedCard => arraysEqual(selectedCard, cardData));
                    if (!isCardInSubset) {
                        return; // Skip cards not in subset
                    }
                    if (deck.length > 0) {
                        const newCard = deck.pop();
                        const newCardElement = createCardElement(newCard);

                        // Apply animation classes for card removal and addition
                        cardElement.classList.add('remove-animation');
                        newCardElement.classList.add('deal-animation');

                        // Replace the card element with animation
                        row.replaceChild(newCardElement, cardElement);

                        // After animation ends, remove animation classes
                        cardElement.addEventListener('animationend', () => {
                            cardElement.classList.remove('remove-animation');
                        });
                        newCardElement.addEventListener('animationend', () => {
                            newCardElement.classList.remove('deal-animation');
                        });
                    } 
                });
            });
            selectedCards = []; // Clear selected cards array
            updateCardsLeft(); // Update cards left count
        }
    }

    function updateCardsLeft() {
        const remainingCards = deck.length;
        document.getElementById('deckNumber').innerText = remainingCards;
        if (remainingCards === 0) {
            endGame();
        }
    }

    function endGame() {
        clearInterval(timer); // Stop the timer
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        const d = (time % 1).toFixed(1).substring(2); // Get the decimal part
        document.getElementById('timer').innerText = `⏳${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${d}`; // Show full time with decimal places
        document.getElementById('timer').style.color = 'green'; // Turn the timer text green
    
        const cards = document.querySelectorAll('.card');
    
        let colorClasses = ['dot1', 'dot2', 'dot3', 'dot4', 'dot5', 'dot6'];
        let currentColorIndex = 0;
    
        function flyAwayDots() {
            if (currentColorIndex < colorClasses.length) {
                const colorClass = colorClasses[currentColorIndex];
                cards.forEach(card => {
                    const dots = card.querySelectorAll(`.${colorClass}`);
                    dots.forEach(dot => {
                        dot.style.animation = 'flyAway3D 3s forwards';
                    });
                });
                currentColorIndex++;
                setTimeout(flyAwayDots, 1000); // Wait for the current animation to finish before starting the next one
            } else {
                setTimeout(() => {
                    cards.forEach(card => card.style.display = 'none');
                }, 1000);
            }
        }
        flyAwayDots();

    }    
    

    function getCardDataFromElement(cardElement) {
        const cardData = [];
        const dots = cardElement.querySelectorAll('.dot');
        dots.forEach(dot => {
            const colorClass = dot.classList[1]; // Assumes dot classes are like dot1, dot2, etc.
            const colorNumber = parseInt(colorClass.replace('dot', ''));
            cardData.push(colorNumber);
        });
        return cardData.sort(); // Sort to ensure correct comparison
    }

    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    // Keyboard event handling for card selection and Enter key
    document.addEventListener('keydown', event => {
        const key = event.key.toLowerCase();
        const cardElement = getCardElementByKey(key);
        if (cardElement) {
            toggleCardSelection(cardElement, getCardDataFromElement(cardElement));
        }
        if (key === 'enter' || key === 'return') {
            checkSelection();
        }
    });

    // Helper function to get card element by keyboard key
    function getCardElementByKey(key) {
        const cardElements = document.querySelectorAll('.card');
        switch (key) {
            case 'w':
                return cardElements[0]; // Top-left card
            case 'e':
                return cardElements[1]; // Top-right card
            case 'a':
                return cardElements[2]; // Middle-left card
            case 's':
                return cardElements[3]; // Middle card
            case 'd':
                return cardElements[4]; // Middle-right card
            case 'z':
                return cardElements[5]; // Bottom-left card
            case 'x':
                return cardElements[6]; // Bottom-right card
            default:
                return null;
        }
    }

    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('resetBtn').addEventListener('click', resetGame);

    resetGame(); // Initialize game state
});

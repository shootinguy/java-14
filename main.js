const board = document.querySelector("#game_board");
const emojis = ['😂', '🥴', '🤓', '😒', '😠', '😍', '😥', '😆'];
let cards = [].concat(emojis, emojis);
let flipped_cards = [];
let lock_board = false;

cards.sort(function() {
    return .5 - Math.random();
});

cards.forEach(function(emoji, index){
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerText = "";
    board.appendChild(card);
});

board.addEventListener("click", function(e) {
    const clicked = e.target;
    if (!clicked.classList.contains("card") || lock_board) return;
    if (flipped_cards.includes(clicked)) return;

    clicked.innerText = clicked.dataset.emoji;
    clicked.classList.add("flipped");
    flipped_cards.push(clicked);

    if (flipped_cards.length === 2) {
        lock_board = true;
        const first = flipped_cards[0];
        const second = flipped_cards[1];

        if (first.dataset.emoji === second.dataset.emoji) {
            flipped_cards = [];
            lock_board = false;
        }
        else {
            setTimeout(function() {
                first.innerText = "";
                second.innerText = "";
                first.classList.remove("flipped");
                second.classList.remove("flipped");
                flipped_cards = [];
                lock_board = false;
            }, 1000);
        }
    }
});

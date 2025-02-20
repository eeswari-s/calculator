document.addEventListener("DOMContentLoaded", function () {
    const fname = document.getElementById("fname");
    const submitButton = document.getElementById("submitButton");

    function loadSession() {
        let data = sessionStorage.getItem("formdata") || "{}";

        try {
            data = JSON.parse(data);
        } catch (error) {
            console.error("Invalid JSON format in sessionStorage:", error);
            data = {};  
        }

        if (data.name) {
            fname.value = data.name;
        }
    }

    loadSession();

    submitButton.addEventListener("click", function () {
        if (fname.value !== "") {
            const formdata = JSON.parse(sessionStorage.getItem("formdata") || "{}");
            formdata.name = fname.value;

            sessionStorage.setItem("formdata", JSON.stringify(formdata));  
            location.replace("scardgame.html");
        } else {
            alert("Please enter your name");
            fname.focus();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const datatable = document.getElementById("dataTable");

    function loadSession() {
        let data = sessionStorage.getItem("formdata") || "{}";

        try {
            data = JSON.parse(data);
        } catch (error) {
            console.error("Invalid JSON format in sessionStorage:", error);
            data = {}; 
        }

        if (data.name) {
            const output = `<h1>Welcome ${data.name}</h1>`;
            datatable.innerHTML = output;
        }
    }

    loadSession();
});





function submit() {
    alert("Objective:Match all pairs of identical cards to win the game.How to Play:1.Click on any card to flip it over and reveal the image behind it. 2.Click on another card to try and find the matching image.3If the two cards match, they will stay flipped, and you earn 10 points.4If the two cards do not match, they will flip back over and you will lose 2 points.Scoring System:+10 points for every correct match.-2 points for every incorrect match."  );
        
  
}

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const scoreDisplay = document.getElementById("score"); 
    let matched = 0;
    let cardOne, cardTwo;
    let disableDeck = false;
    let score = 0;

    function updateScore(points) {
        score += points;
        scoreDisplay.textContent = `Score: ${score}`; 
    }

    function flipCard({ target: clickedCard }) {
        if (cardOne !== clickedCard && !disableDeck) {
            clickedCard.classList.add("flip");
            if (!cardOne) {
                return cardOne = clickedCard;
            }
            cardTwo = clickedCard;
            disableDeck = true;
            let cardOneImg = cardOne.querySelector(".back-view img").src,
                cardTwoImg = cardTwo.querySelector(".back-view img").src;
            matchCards(cardOneImg, cardTwoImg);
        }
    }

    function matchCards(img1, img2) {
        if (img1 === img2) {
            matched++;
            updateScore(10); 

            if (matched === 10) {
                setTimeout(() => {
                    shuffleCard();
                }, 1000);
            }
            cardOne.removeEventListener("click", flipCard);
            cardTwo.removeEventListener("click", flipCard);
            cardOne = cardTwo = "";
            return disableDeck = false;
        }

        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = "";
            disableDeck = false;
            updateScore(-2);
        }, 1200);
    }

    function shuffleCard() {
        matched = 0;
        disableDeck = false;
        cardOne = cardTwo = "";
        score = 0; 
        updateScore(0); 

        let arr = [1, 2, 3, 4, 5, 6, 7, 8 ,9, 10, 1, 2, 3, 4, 5, 6, 7, 8,9,10];
        arr.sort(() => Math.random() > 0.5 ? 1 : -1);
        cards.forEach((card, i) => {
            card.classList.remove("flip");
            let imgTag = card.querySelector(".back-view img");
            imgTag.src = `./assets/image${arr[i]}.jpg`;
            card.addEventListener("click", flipCard);
        });
    }

    shuffleCard();

    cards.forEach(card => {
        card.addEventListener("click", flipCard);
    });
});

 



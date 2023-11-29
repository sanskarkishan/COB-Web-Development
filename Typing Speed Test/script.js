//Navigation buttons redirection
document.addEventListener("DOMContentLoaded",function(){
    const homeButton = document.querySelector('nav ul li:nth-child(1) a');
    const aboutButton = document.querySelector('nav ul li:nth-child(2) a');

    // Highlight Home button as active (blue) by default on the Home page
    homeButton.classList.add('active');
    aboutButton.classList.remove('active');

    // Redirect to About page when About button is clicked
    aboutButton.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "about.html";
    });
});

const paragraphs = [
    "The sun peeked through the dense canopy of trees, casting dappled shadows on the forest floor. Birds chirped in the distance, their melodic tunes echoing through the woodland. A gentle breeze rustled the leaves, creating a soothing symphony of nature's orchestra.",

    "The old bookstore stood at the corner of the bustling street, its weathered facade adorned with ivy creeping up the walls. Inside, shelves were stacked with books of all shapes and sizes, each holding stories waiting to be discovered. The scent of aged paper lingered in the air, inviting visitors to lose themselves in the magic of words.",

    "High above the city skyline, skyscrapers pierced the clouds, reaching for the heavens. The hustle and bustle of urban life painted a vibrant picture below, with cars honking, people rushing, and buildings standing tall as monuments to human endeavor.",

    "In the tranquil countryside, fields stretched endlessly, adorned with colorful wildflowers swaying in the gentle breeze. A farmer tended to the crops, his weathered hands working in rhythm with the cycles of nature.",

    "A lone figure stood atop the cliff, gazing out at the vast expanse of the ocean. Waves crashed against the rocks below, sending sprays of salty mist into the air. Seagulls soared overhead, riding the currents with effortless grace.",

    "The quaint village nestled in the valley seemed frozen in time, with cobblestone streets winding between charming cottages adorned with blooming flower gardens. The sound of laughter and chatter filled the air as villagers went about their day.",

    "At the heart of the bustling city, a fountain adorned with intricate sculptures served as a meeting point for locals and tourists alike. Water cascaded down in mesmerizing patterns, reflecting the vibrant energy of the urban landscape.",

    "In the distant mountains, a hiker trekked along rugged trails, surrounded by breathtaking vistas of snow-capped peaks and lush valleys. The crisp mountain air filled their lungs as they embraced the serenity of the wilderness.",

    "Amidst the desert sands, a caravan of camels traversed the dunes, their silhouettes etched against the fiery hues of the setting sun. The vast emptiness of the desert held an inexplicable allure, drawing adventurers seeking the beauty of solitude.",

    "Deep within the tropical rainforest, exotic creatures danced among emerald foliage, their vibrant colors a testament to the wonders of biodiversity. The symphony of chirping insects and rustling leaves created an immersive sensory experience.",
];

const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistake = isTyping = 0;

function loadParagraph(){
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`;
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping(){
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0){
        if (!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null){
            if (charIndex > 0){
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")){
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        }
        else{
            if(characters[charIndex].innerHTML == typedChar){
                characters[charIndex].classList.add("correct");
            }
            else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm <0 || !wpm || wpm === Infinity ? 0: wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    }
    else{
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    }
    else{
        clearInterval(timer);
    }
}

function resetGame(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
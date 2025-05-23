const quotes = [
    "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.", 
    "There is nothing more deceptive than an obvious fact.", 
    "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpertation.", 
    "I never make exceptions. An exception disproves the rule.", 
    "What one man can invent another man can discover.", 
    "Nothing clears up a case so much as stating it to another person", 
    "Education never ends, Watson. It is a series of lessons, with the greatest for the last",
    "To be, or not to be: that is the question.", 
    "Love all, trust a few, do wrong to none.", 
    "Is this a dagger which I see before me?", 
    "Be not afraid of greatness.", 
    "If you prick us do we not bleed?", 
    "The eyes are the window to your soul.", 
    "We know what we are, but know not what we may be."

];

let words = [];
let wordIndex = 0;
let startTime;
let timerInterval;
let countdownInterval;
let timeLeft = 30;
let wordsTyped = 0;
let quotesCompleted = 0;

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");
const timerDisplay = document.getElementById("timer");

function loadNewQuote(){
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(" ");
    wordIndex = 0;

    const spanWords = words.map((word) => `<span>${word} </span>`);
    quoteElement.innerHTML = spanWords.join("");
    quoteElement.children[0].className = "highlight";

    messageElement.innerText = "";
    typedValueElement.value = "";
    typedValueElement.focus();
    
}

function updateTimerDisplay(){
    timerDisplay.innerText = `Time: ${timeLeft}s`;
}

function startCountdown(){
    countdownInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0){
            clearInterval(countdownInterval);
            typedValueElement.disabled = true;
            const elapsedTime = (Date.now() - startTime) / 1000 / 60;
            const wpm = Math.round(wordsTyped / elapsedTime);
            messageElement.innerHTML = `Time is up!<br> Quotes Completed: ${quotesCompleted}, WPM: ${wpm}`;
        }
    },1000);
}

document.getElementById('start').addEventListener("click", () =>{
    clearInterval(countdownInterval);
    startTime = Date.now();
    timeLeft = 30;
    wordsTyped = 0;
    quotesCompleted = 0;
    typedValueElement.disabled = false;
    loadNewQuote();
    startCountdown();
});
    

typedValueElement.addEventListener("input", () => {
    const currentWord = words[wordIndex];

    const typedValue = typedValueElement.value;

    if (typedValue.trim() == currentWord && wordIndex == words.length - 1){
        wordsTyped += words.length;
        quotesCompleted++;

        if (timeLeft > 0){
            loadNewQuote();
        }
        
    }
    else if (typedValue.endsWith(' ') && typedValue.trim() == currentWord){

        typedValueElement.value = '';

        wordIndex++;
        wordsTyped++;

        for (const wordElement of quoteElement.childNodes){
            wordElement.className = '';
        }
        quoteElement.childNodes[wordIndex].className="highlight";

    }
    else if ( currentWord.startsWith(typedValue)){
        typedValueElement.className = '';

    }
    else{
        typedValueElement.className = 'error';
    }

});
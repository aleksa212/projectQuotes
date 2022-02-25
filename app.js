const quoteText = document.querySelector('.text');
const author = document.querySelector('.author');
const tweetBtn = document.querySelector('.tweet');
const newBtn = document.querySelector('.new-quote');
const loader = document.getElementById('loader');
const wrapper = document.querySelector('.wrapper');

let apiQuotes = [];

async function getQuotes() {
    loaderActive();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        randomQuote();
    } catch (error) {

    }
    loaderInactive();
}

function randomQuote() {
    loaderActive();
    let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        author.textContent = 'Unknown'
    } else {
        author.textContent = quote.author;
    }
    quoteText.textContent = quote.text;
    loaderInactive();
}

//wrapper.style.display = 'none';

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

function loaderActive() {
    loader.hidden = false;
    wrapper.style.display = 'none';
    
    console.log(wrapper.hidden);
}

function loaderInactive() {
    wrapper.style.display = 'flex';
    loader.hidden = true;
    console.log(wrapper.hidden);
}

setTimeout(() => {getQuotes()}, 1000);

newBtn.addEventListener('click', randomQuote);
tweetBtn.addEventListener('click', tweetQuote);

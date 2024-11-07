'use strict';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const vkBtn = document.getElementById('vk');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Show New Quote
function newQuote() {
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with 'Unknown'
    authorText.textContent = !quote.author ? 'Unknown' : quote.author;
    // Check Quote length to determine styling
    if (quote.quote.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.quote;
}

// Get Quotes From API
async function getQuotes() {
    const apiURL = 'https://dummyjson.com/quotes?limit=0'
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        apiQuotes = data.quotes;
        newQuote();
    } catch (err) {
        console.log(err)
    }
}

// Send Quote
function postQuoteVK() {
    const vkUrl = `https://vk.com/share.php?comment=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(vkUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
vkBtn.addEventListener('click', postQuoteVK);

// On load
getQuotes();

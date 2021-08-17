// HTML Elements 
const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")
let counter = 0

function showLoadingSpinner() {
    loader.hidden = false
    quoteContainer.hidden = true
}

function hideLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false
        loader.hidden = true
    }
}

async function getQuote () {
    showLoadingSpinner()
    const apiUrl = "https://api.quotable.io/random"
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        // Check ir Author field is blank and replace it with 'Unknown'
        if ( data.quoteAuthor === '') {
            authorText.innerText = "Unknown"
        } else {
            authorText.innerText = data.author
        }
        // Dynamically reduce font size for long quotes
        if (data.content.length > 120 ) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.content
        // Stop loader, Show Quote
        hideLoadingSpinner()
    } catch (error) {
        counter++
        if( counter < 10) {
            getQuote()
        } else {
            console.log("Hay un error con el Servidor que provee los datos. ", error)
        }
    }
}

function tweetQuote() {
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)


// On load
getQuote()

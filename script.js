const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete(){
    if(!loader.hidden ){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote() {
    loading();
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const apiUrl = 'https://ruravi80-eval-prod.apigee.net/myown';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

        // if author is blank, add 'Unknown'
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        // reduce font size for long quotes
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
        quoteText.classList.remove('long-quote');    
        }
        quoteText.innerText = data.quoteText;
        //stop loader, show quote
        complete();
    }catch(error){
        getQuote();
        console.log('whoops, no quote', error);
    }
}



// Tweet Quote
function tweetQuote(){
const quote = quoteText.innerText;
const author = authorText.innerText;
const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote)
newQuoteBtn.addEventListener('click', getQuote);

// On Load
getQuote();

const quoteContainer = document.getElementById('quoteContainer');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newQuote');

//getting Quote from API
async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';  
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    if(data.authorText === ''){
        authorText.innerText = 'Unknown';
    }else{
        authorText.innerText = data.quoteAuthor;
    }  
    console.log(data);

  //Reduce font Size for long quotes
    if(data.quoteText.length > 50) {
        quoteText.classList.add('longQuote')
       
    }else{
        quoteText.classList.remove('longQuote')
    }

    quoteText.innerText = data.quoteText;
} catch (error) {
   
    console.log('oh my ! no quote' , error);
}

}

//Twitter Quote Functionality
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

//Event Listners 
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

getQuote();
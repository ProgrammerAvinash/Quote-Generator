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
    quoteText.innerText = data.quoteText;
   
    console.log(data);
  
    
} catch (error) {
   
    console.log('oh my ! no quote' , error);
}

}

getQuote();
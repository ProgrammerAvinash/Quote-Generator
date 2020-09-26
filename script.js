const quoteContainer = document.getElementById('quoteContainer');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newQuote');
const loader = document.getElementById('loader');

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden=true;
}
//hide Loading
function complete(){
    if (!loader.hidden) {
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

//getting Quote from API
async function getQuote() {
    loading();
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
    complete();
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

// Get random quote
document.getElementById('new-quote').addEventListener('click', getRandomQuote);

// Search for quotes by author
document.getElementById('search-author').addEventListener('click', searchQuoteByAuthor);

// Fetch random quote from the API
async function getRandomQuote() {
    try {
        const response = await fetch('http://localhost:3000/api/quote/random');
        const data = await response.json();
        document.getElementById('quote').innerHTML = `<p>"${data.quote.body}"</p><p><i>- ${data.quote.author}</i></p>`;
    } catch (error) {
        console.error('Error fetching random quote:', error);
        document.getElementById('quote').innerHTML = `<p>Sorry, we couldn't fetch a quote at the moment.</p>`;
    }
}

// Fetch quotes by author from the API
async function searchQuoteByAuthor() {
    const author = document.getElementById('author-name').value.trim();
    console.log(author);
    if (!author) {
        alert('Please enter an author name');
        return;
    }

    try {
        
        const response = await fetch(`http://localhost:3000/api/quote/search?author=${encodeURIComponent(author)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch quotes');
        }
        const data = await response.json();
        let results = `<h3>Results for "${author}":</h3>`;
        const resultsContainer = document.getElementById('search-results');
        if (data.length > 0) {
            resultsContainer.innerHTML = `<h3>Results for "${author}":</h3>`;
            data.forEach((quote) => {
                resultsContainer.innerHTML += `<p>"${quote.body}"<br><i>- ${quote.author}</i></p>`;
            });
        } else {
            resultsContainer.innerHTML = `<p>No quotes found for "${author}".</p>`;
        }
    } catch (error) {
        console.error('Error fetching quotes:', error);
        document.getElementById('search-results').innerHTML = `<p>Sorry, we couldn't fetch quotes for this author.</p>`;
    }
}


// Initial random quote on page load
getRandomQuote();

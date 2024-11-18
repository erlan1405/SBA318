const express = require('express');
const axios = require('axios');
const app = express();

// Create ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Route for the main page
app.get('/', async (req, res) => {
    try {
        // Request to CoinGecko API to get cryptocurrency rates
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                // Currency for rates US dollars and list of cryptocurrencies
                vs_currency: 'usd',
                ids: 'bitcoin,ethereum,litecoin,ripple',
            }
        });

        // Cryptocurrency data we receive from the API
        const coins = response.data;

        // Sending data to views
        res.render('index', { coins });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving cryptocurrency data');
    }
});


// Webpage with news
app.get('/news', async (req, res) => {
    try {
        // Example with NewsAPI to get crypto news
        const newsResponse = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: 'cryptocurrency',
                apiKey: 'd070b49b31964bca96afa3b7f9e2d64b',
                language: 'en',
                sortBy: 'publishedAt',
            }
        });

        const newsArticles = newsResponse.data.articles;
        res.render('news', { newsArticles });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving news');
    }
});

// Run server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

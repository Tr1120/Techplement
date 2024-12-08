const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));

// API Base URL
const API_KEY = process.env.FAVQS_API_KEY;
const API_BASE_URL = 'https://favqs.com/api';

// Random Quote Endpoint
app.get('/api/quote/random', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/qotd`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch random quote' });
    }
});

// Search Quotes by Author
app.get('/api/quote/search', async (req, res) => {
    const { author } = req.query;
    console.log(author);
    if (!author) {
        return res.status(400).json({ error: 'Author name is required' });
    }
    try {
        const URL=`${API_BASE_URL}/quotes?filter=${author}&type=author`;
        const AuthToken = `Bearer ${API_KEY}`;
        
        const response = await axios.get(URL, {
            headers: {
                Authorization: AuthToken,
            },
        });
        res.json(response.data.quotes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quotes for the author' });
    }
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

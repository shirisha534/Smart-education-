const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));

// Initialize Database
require('./models/db');

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));

// Frontend Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// For any other route, redirect to index or send 404 (for a true SPA this would be index.html, but here we have multiple pages)
app.get('/:page', (req, res) => {
    const page = req.params.page;
    if (page.endsWith('.html')) {
        res.sendFile(path.join(__dirname, 'views', page));
    } else {
        res.sendFile(path.join(__dirname, 'views', `${page}.html`), (err) => {
            if (err) {
                res.status(404).send('Page not found');
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

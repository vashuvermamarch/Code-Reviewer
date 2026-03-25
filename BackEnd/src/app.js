const path = require('path');
const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve API routes
app.use('/ai', aiRoutes);

// --- PRODUCTION SETUP: Serve Static Frontend ---
// This handles cases where the project is deployed as a single service
const frontendPath = path.join(__dirname, '../../FrontEnd/dist');
app.use(express.static(frontendPath));

// 4. Fallback: Serve Frontend for all other routes
app.use((req, res) => {
    // If the request is for an API route that doesn't exist, don't serve index.html
    if (req.path.startsWith('/ai')) {
        return res.status(404).json({ error: 'API route not found' });
    }
    
    res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
        if (err) {
            res.status(200).send('API is active. Frontend build not found.');
        }
    });
});

module.exports = app;
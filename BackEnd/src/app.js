const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');
const app = express();

app.use(cors());

// 1. Middleware to parse JSON bodies (Crucial for Postman)
app.use(express.json());

// 2. Middleware to parse URL-encoded bodies (Optional but recommended)
app.use(express.urlencoded({ extended: true }));

// 3. Health check route
app.get('/', (req, res) => {
    res.send('Hello, the Code Reviewer API is active!');
});

// 4. Use the AI routes
// This prefix means your URL will be: http://localhost:3000/ai/get-review
app.use('/ai', aiRoutes);

module.exports = app;
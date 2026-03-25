const aiService=require('../services/ai.services')

module.exports.getReview = async (req, res) => {
    const code = req.body.code;
    if (!code) {
        return res.status(400).send('prompt is required');
    }

    try {
        const response = await aiService(code);
        res.send(response);
    } catch (error) {
        // If it's a 429 error, send a friendly message
        if (error.message.includes('429')) {
            return res.status(429).send('AI is busy (Quota Exceeded). Please wait a minute and try again.');
        }
        
        // Handle other errors
        console.error(error);
        res.status(500).send('Something went wrong with the AI service.');
    }
}
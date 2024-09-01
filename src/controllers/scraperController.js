const questionsData = require('../services/jsonManager');
const scraper = require('../services/scraperService');

// GET all question data
const getAllQuestions = async (req, res) => {
    try {
        const data = questionsData.readJSON();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single page data
const getSingleQuestion = async (req, res) => {
    try {
        const data = await scraper.singlePageScraper();
        const { id, question, excerpt, answer } = data[0];
        const htmlResponse = `
            <h1>${question}</h1>
            <h2>Problem:</h2>${excerpt}<h2>Solution:</h2>${answer}`;
        res.send(htmlResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST scrape all URLs with parameters
const scrapeAllUrls = async (req, res) => {
    const { pagesize, url } = req.body;

    if (!pagesize || !url) {
        return res.status(400).json({ message: 'Pagesize and URL are required' });
    }

    try {
        // Validate and sanitize the URL
        const baseUrl = new URL(url);
        baseUrl.searchParams.set('pagesize', pagesize);

        // Call the scraper service with the updated URL
        const results = await scraper.questionScraper(parseInt(pagesize, 10), baseUrl.toString());
        res.json(results);
        res.json({});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    getAllQuestions,
    getSingleQuestion,
    scrapeAllUrls
};
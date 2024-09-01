const express = require('express');
const router = express.Router();
const scraperController = require('../controllers/scraperController');
const wordpressController = require('../controllers/wordpressController');

// Default route
router.get('/', (req, res) => {
    res.send('Hello World, from express');
});

// GET all question data
router.get('/questions', scraperController.getAllQuestions);

// GET single page data
router.get('/question', scraperController.getSingleQuestion);

// Scrape and post a single question to WordPress
router.get('/question/post', wordpressController.postQuestion);

// Get recent WordPress posts
router.get('/recentposts/:num', wordpressController.getRecentPosts);

// Get today's WordPress posts
router.get('/todayposts', wordpressController.getTodayPosts);

// Route to scrape and update URLs
router.post('/scrape-urls', scraperController.scrapeAllUrls);

module.exports = router;

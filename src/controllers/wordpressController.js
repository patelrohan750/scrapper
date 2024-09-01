const wp = require('../services/wordpressService');
const scraper = require('../services/scraperService');
const questionsData = require('../services/jsonManager');


// Post a single question to WordPress
const postQuestion = async (req, res) => {
    try {
        const data = await scraper.singlePageScraper();
        const post = await wp.createPost(data[0]);
        if (post) {
            // Update in JSON after publish.
            questionsData.updateQuestionById(data[0].id, { isPublish: 1 });
            res.json(post);
        } else {
            res.send("SOMETHING WENT WRONG...");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get recent posts from WordPress
const getRecentPosts = async (req, res) => {
    try {
        const num = req.params.num ? req.params.num : 10;
        const posts = await wp.recentPosts(num);
        if (posts.length > 0) {
            res.json(posts);
        } else {
            res.send("NO RECENT POST FOUND");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get today's posts from WordPress
const getTodayPosts = async (req, res) => {
    try {
        const posts = await wp.todayPosts();
        res.json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    postQuestion,
    getRecentPosts,
    getTodayPosts,
};
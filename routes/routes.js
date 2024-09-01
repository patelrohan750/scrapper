const express = require('express');
const router = express.Router();
const questionsData = require('../lib/jsonManager');
const scraper = require('../lib/scraper');
const wp = require('../lib/wordpress');
const axios = require("axios")    

// GET ALL Question Data
router.get('/', (req, res) => {
    res.send('Hello World, from express');
});

router.get('/questions', async (req, res) => {
    try {
        const data = questionsData.readJSON();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET Single Page
router.get('/question', async (req, res) => {
    try {
        const data = await scraper.singlePageScraper();
        const {id,question,excerpt,answer} = data[0]
        const htmlResponse = `
        <h1>${question}</h1>
        <h2>Problem:</h2>${excerpt}<h2>Solution:</h2>${answer}`;
        res.send(htmlResponse)
        // res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/question/post', async (req, res) => {
    try {
        const data = await scraper.singlePageScraper();
        const post = await wp.createPost(data[0]);
        if(post){
            // update in json after publish.
            questionsData.updateQuestionById(data[0].id,{ isPublish: 1 });
            res.json(post);
        } else{
            res.send("SOMETHING WENT WRONG...");
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.get('/recentposts/:num', async (req, res) => {
    try {
        const num = req.params.num ? req.params.num : 10;
        const posts = await wp.recentPosts(num);
        if(posts.length > 0){
            res.json(posts);
        } else{
            res.send("NO RECENT POST FOUND");
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/todayposts', async (req, res) => {
    try {
        const posts = await wp.todayPosts();
        res.json(posts);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router;

require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const routes = require('./routes/routes');

app.use('/api', routes)

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})


// const URL = "https://stackoverflow.com/questions/tagged/javascript?tab=newest&pagesize=50";
// scraper.questionScraper(50,URL);


// scraper.singlePageScraper();

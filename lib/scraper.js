const puppeteer = require("puppeteer");
const jsonHandler = require('./jsonManager');
const cheerio = require('cheerio');

// Multiple question scrapper and save into json file
const questionScraper = async (pages = 1,url) => {
  console.log("Opening the browser...");
  try{
    const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "load" });
  
  const totalPages = pages;
  let questions = [];

  for (let initialPage = 1; initialPage <= totalPages; initialPage++) {
    console.log(`Collecting the questions of page ${initialPage}...`);
    let pageQuestions = await page.evaluate(async() => {
      var cookieBtn = document.querySelector('.js-accept-cookies');
      if(cookieBtn){
          cookieBtn.click();
      }
      // await page.waitForSelector('.js-post-summary')
        return [...document.querySelectorAll(".js-post-summary")].map(
            (question) => {
              if (question.querySelector(".js-post-summary-stats .has-accepted-answer") !== null) {
                return {
                  id: question.getAttribute("data-post-id"),
                  question: question.querySelector(".s-post-summary--content-title")
                    .innerText,
                  url: question.querySelector(".s-post-summary--content-title a")
                    .href,
                  isPublish:0
                };
              }
            }
        ).filter(question => question !== undefined);
    });

    questions = questions.concat(pageQuestions);

    // Go to next page until the total number of pages to scrap is reached
    if (initialPage < totalPages) {
        await page.waitForSelector('.pager a:last-child')
        await page.click('.pager a:last-child')
        await page.waitForSelector('.js-post-summary')
    }
  }

  console.log('Closing the browser...');
  
  await page.close();
  await browser.close();

  console.log("Job done!");
  // console.log(questions);
  console.log("TOTAL QUESTIONS: ",questions.length);
  // SAVE TO CSV.
  jsonHandler.saveToJSON(questions);
  return questions;
  } catch(error){
    console.log(error);
  }
  
};

// Scrape single page content
const singlePageScraper = async (limit = 1) => {
  const questions = jsonHandler.filterQuestions(0,limit); 
  if(questions.length == 0){
    console.log("No Any Question Found.");
    return false
  }
  
  console.log("Opening the browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log(`Navigating to ${URL}...`);
  
  try {
    const articles = await Promise.all(questions.map(async (question) => {
      console.log("QUESTION: ", question);
      const URL = question.url;
      await page.goto(URL, { waitUntil: "load" });

      const pageData = await page.evaluate(() => {
        return {
          html: document.documentElement.innerHTML,
        };
      });
      const $ = cheerio.load(pageData.html);
      const questionTitle = $("#question-header .question-hyperlink")
        .text()
        .trim();
      const questionExcerpt = $("#question .post-layout .js-post-body").html();
      let acceptedAnswer = '';
      $('.js-answer').each((i, elem) => {
        if ($(elem).hasClass('js-accepted-answer')) {
          acceptedAnswer = $('.js-accepted-answer .js-post-body').html();
        }
      });

      return {
        id: question.id,
        question: questionTitle,
        excerpt: questionExcerpt,
        answer: acceptedAnswer,
      };
    }));

    console.log("Closing the browser...");
    await page.close();
    await browser.close();
    console.log("Job done!");
    console.log(articles); // Array of articles
    return articles;

    
  } catch (error) {
    console.log("ERROR: ", error);
  }

};

module.exports = {
    questionScraper,
    singlePageScraper,
};


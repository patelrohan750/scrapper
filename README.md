# 🛠️ Stack Overflow Content Scraper with WordPress Auto-Publishing

## 📜 Description
This Node.js project automates the scraping of data from Stack Overflow and publishes it as WordPress posts via the WordPress REST API. The process involves two main APIs:
1. **Stack Overflow Scraping API**: Scrapes data from Stack Overflow URLs and updates it in a JSON file.
2. **WordPress Publishing API**: Fetches URLs, scrapes content, and publishes it on WordPress.

## 💻 Technology Stack
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web application framework for Node.js.
- **WordPress**: Content management system for publishing web content.

## 📦 Packages
The following packages are used in this project:

- `axios` - Promise-based HTTP client.
- `cheerio` - jQuery-like library for server-side DOM manipulation.
- `dotenv` - Loads environment variables from a `.env` file.
- `express` - Web framework for Node.js.
- `locate-chrome` - Finds the installed Chrome or Chromium executable.
- `moment` - Parse, validate, manipulate, and display dates and times.
- `nodemon` - Utility that monitors for changes in your source code and automatically restarts your server.
- `puppeteer` - Headless Chrome Node.js API for web scraping.
- `puppeteer-core` - Core library for Puppeteer, without the bundled Chromium.

## ⚙️ Set Up Environment Variables
Create a `.env` file in the root directory of the project and include the following variables. You can refer to the `.env.example` file for details.

```plaintext
WP_URL="<WORDPRESS SITE URL>"
WP_USER="<WORDPRESS USER>"
WP_PASSWORD="<WORDPRESS PASSWORD>"
JWT_SECRET_KEY="<JWT_SECRET_KEY>"
```

✨ Features
----------

*   **Automated Stack Overflow Scraping:** Automatically scrape questions from Stack Overflow based on specific tags and page sizes.
    
*   **WordPress Integration:** Publish scraped questions directly to WordPress as posts using the WordPress REST API.
    
*   **Preview Posts:** Preview the content of posts before publishing to ensure accuracy and quality.
    
*   **Recent and Today's Posts:** Retrieve recent posts and posts published today from WordPress for easy management and review.
    
*   **Customizable Scraping:** Customize the scraping process by specifying the URL and the number of pages to scrape.
    
*   **Data Management:** Store and manage scraped data in JSON format for easy access and processing.

📡 API List
-----------

#### GET `/api/questions`

**Description:** Retrieves all scraped question data from JSON.

**Response:**

    [
        {
            "id": "77335868",
            "question": "How to close dropdown by clicking outside?",
            "url": "https://stackoverflow.com/questions/77335868/how-to-close-dropdown-by-clicking-outside",
            "isPublish": 1
        },
        {
            "id": "77335266",
            "question": "How to use for each function inside a for loop",
            "url": "https://stackoverflow.com/questions/77335266/how-to-use-for-each-function-inside-a-for-loop",
            "isPublish": 1
        },
        {
            "id": "77334799",
            "question": "Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'videoId')",
            "url": "https://stackoverflow.com/questions/77334799/uncaught-in-promise-typeerror-cannot-read-properties-of-undefined-reading-v",
            "isPublish": 1
        },
        {
            "id": "77334578",
            "question": "How to trigger the css style as we typing the onChange in React",
            "url": "https://stackoverflow.com/questions/77334578/how-to-trigger-the-css-style-as-we-typing-the-onchange-in-react",
            "isPublish": 1
        },
        {
            "id": "77272382",
            "question": "Issue with redux-toolkit testing",
            "url": "https://stackoverflow.com/questions/77272382/issue-with-redux-toolkit-testing",
            "isPublish": 0
        },
        {
            "id": "77272366",
            "question": "ApexCharts - How to set width for x/y axis",
            "url": "https://stackoverflow.com/questions/77272366/apexcharts-how-to-set-width-for-x-y-axis",
            "isPublish": 0
        },
        {
            "id": "77271540",
            "question": "How to work with a function that can be either sync or async [closed]",
            "url": "https://stackoverflow.com/questions/77271540/how-to-work-with-a-function-that-can-be-either-sync-or-async",
            "isPublish": 0
        },
        {
            "id": "77271365",
            "question": "Cannot find module '@nestjs/core'",
            "url": "https://stackoverflow.com/questions/77271365/cannot-find-module-nestjs-core",
            "isPublish": 0
        }
    ]

#### GET `/api/question`

**Description:** Retrieves the HTML preview of the post to be published on WordPress.

**Response:** HTML content of the post.

#### POST `/api/question/post`

**Description:** Publishes a post to WordPress based on the data retrieved from the JSON file.

**Response:** Status of the publication process.

#### GET `/api/recentposts/:num`

**Description:** Retrieves the most recent posts from WordPress. `:num` specifies the number of posts.

**Response:** Recent post URLs.

#### GET `/api/todayposts`

**Description:** Retrieves posts published today from WordPress.

**Response:** URLs of posts published today.

#### POST `/api/scrape-urls`

**Description:** Scrapes questions from Stack Overflow based on the provided URL and pagesize.

**Request Body:**

    {
        "url": "https://stackoverflow.com/questions/tagged/javascript?tab=newest",
        "pagesize": 2
    }

**Response:**

    [
        {
            "id": "78937044",
            "question": "A proper way to install leaflet in Nuxt/Vue",
            "url": "https://stackoverflow.com/questions/78937044/a-proper-way-to-install-leaflet-in-nuxt-vue",
            "isPublish": 0
        },
        {
            "id": "78936584",
            "question": "In ECHARTS how to setOptions for a specific serie (selecting it by name name)",
            "url": "https://stackoverflow.com/questions/78936584/in-echarts-how-to-setoptions-for-a-specific-serie-selecting-it-by-name-name",
            "isPublish": 0
        }
    ]
    
🚀 Running the Project
----------------------

Follow these steps to set up and run the project on your local machine:

1.  **Clone the Repository:**
    
    Start by cloning the repository to your local machine:
    
        git clone https://github.com/your-username/your-repo.git
    
2.  **Install Dependencies:**
    
    Navigate to the project directory and install the required npm packages:
    
        cd your-repo
        npm install
    
3.  **Set Up Environment Variables:**
    
    Create a new file named `.env` in the root directory and add the necessary environment variables. Use the provided `.env.example` as a reference:
    
        WP_URL=""
        WP_USER=""
        WP_PASSWORD=""
        JWT_SECRET_KEY=""
    
4.  **Start the Server:**
    
    Run the server using npm:
    
        npm start
    
    Alternatively, for development with auto-reloading, use:
    
        npm run dev
    
5.  **Access the API:**
    
    Once the server is running, you can access the API endpoints at:
    
    *   `http://localhost:3000/` - Default route
    *   `http://localhost:3000/api/questions` - Get all question data
    *   `http://localhost:3000/api/question` - Preview a post
    *   `http://localhost:3000/api/question/post` - Publish a post
    *   `http://localhost:3000/api/recentposts/:num` - Get recent posts
    *   `http://localhost:3000/api/todayposts` - Get today's posts
    *   `http://localhost:3000/api/scrape-urls` - Scrape and update URLs
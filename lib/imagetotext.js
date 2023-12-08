const Tesseract = require("tesseract.js");
const path = require("path");
const fs = require("fs");
var request = require('request');


const receiptOcrEndpoint = 'https://ocr.asprise.com/api/v1/receipt';

const extractTextFromImage = async (imagePath) => {
  try {
    console.log(imagePath);
    
    const response = await request.post({
        url: receiptOcrEndpoint,
        formData: {
          api_key: 'TEST1',        // Use 'TEST' for testing purpose
          recognizer: 'auto',        // can be 'US', 'CA', 'JP', 'SG' or 'auto'
          ref_no: 'ocr_nodejs_123', // optional caller provided ref code
          file: fs.createReadStream(imagePath) // the image file
        },
      }, function(error, response, body) {
        if(error) {
          console.error(error);
        }
        const parsedBody = JSON.parse(body);

        console.log("TEXT:")
        console.log(parsedBody); // Receipt OCR result in JSON
      });
    // return "Test";
  } catch (error) {
    throw error;
  }
};

const processImagesInFolder = async () => {
  try {
    const folderPath = "./images/";
    const directoryPath = path.join(__dirname, "..", folderPath);
    console.log("directoryPath: ", directoryPath);
    fs.readdir(directoryPath, async (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      for (const file of files) {
        const imagePath = path.join(directoryPath, file);
        try {
          const fileStats = fs.statSync(imagePath);
          if (fileStats.isFile()) {
            const text = await extractTextFromImage(imagePath);
            console.log(`Text extracted from ${file}:`, text);
            break;
          }
        } catch (error) {
          console.error("Error processing file:", file, error);
        }
      }
    });
  } catch (error) {
    console.error("Error processing images:", error);
  }
};

processImagesInFolder();

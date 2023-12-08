const sharp = require('sharp');
const fs = require("fs");
const path = require("path");

const imageTemplate = "./image/template.png";
const fontPath = path.join(__dirname, "../font/Fredoka-Medium.ttf");

const textToImage = async () => {
  const text = "How to Work With Responding to and Tracking Key Presses";
  sharp(imageTemplate)
  .resize(800) // Resize if needed
  .jpeg() // Ensure output format is JPEG
  .toBuffer()
  .then(buffer => {
    return sharp(buffer)
      .composite([{ // Add the text as an overlay
        input: Buffer.from(
          `<svg>
            <text x="10" y="40" font-family="Arial" font-size="24" fill="black">How to Work With Responding to and Tracking Key Presses</text>
          </svg>`
        ),
        gravity: 'northwest' // Position of the text on the image
      }])
      .toFile('output_image.png'); // Save the modified image
  })
  .then(info => {
    console.log('Text added to the image successfully!');
  })
  .catch(err => {
    console.error(err);
  });
  
};


textToImage();

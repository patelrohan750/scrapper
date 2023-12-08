const fs = require('fs');

// Write JSON Data.
const saveToJSON = (data) => {
  try {
    fs.writeFileSync('questions.json', JSON.stringify(data, null, 2));
    console.log('Data written to file successfully.');
  } catch (error) {
    console.error('Error writing to the JSON file:', error);
  }
};

// Read JSON Data
const readJSON = () => {
  try {
    const rawData = fs.readFileSync('questions.json');
    const jsonData = JSON.parse(rawData);
    return jsonData;
  } catch (error) {
    console.error('Error reading or parsing the JSON file:', error);
    return [];
  }
};

// updateQuestionById("123456", { isPublish: 0 });
/**
 * Update the Question
 * 
 * @param int id 
 * @param object updatedQuestion 
 */
const updateQuestionById = (id, updatedQuestion) => {
  const jsonData = readJSON();
  const index = jsonData.findIndex(question => question.id === id);

  if (index !== -1) {
    jsonData[index] = { ...jsonData[index], ...updatedQuestion };
    saveToJSON(jsonData);
    console.log(`Question with ID ${id} updated successfully.`);
  } else {
    console.log(`Question with ID ${id} not found.`);
  }
};

/**
 * Filter Questions
 * @param int isPublished 
 * @param int limit Default 1.
 * @returns array
 */
const filterQuestions = (isPublished, limit = 1) => {
  const jsonData = readJSON();
  const filteredData = jsonData.filter(question => question.isPublish === isPublished).slice(0, limit);
  return filteredData;
};


module.exports = {
  saveToJSON,
  readJSON,
  updateQuestionById,
  filterQuestions
};
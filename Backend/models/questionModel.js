// questionModel.js

const fs = require('fs/promises');

const questionModel = {
  getQuestions: async () => {
    try {
      // Read and parse questions from the JSON file
      const questionsData = await fs.readFile('./question.json');
      const questions = JSON.parse(questionsData);
      return questions;
    } catch (err) {
      throw new Error('Failed to fetch questions');
    }
  }
};

module.exports = questionModel;

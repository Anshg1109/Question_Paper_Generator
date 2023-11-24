const express = require('express');
const cors = require('cors');

const questionController = require('./controllers/questionController');
const app = express();
app.use(cors());
app.use(express.json());
// Endpoint to generate question paper
app.get('/generate-paper', questionController.generateQuestionPaper);

const PORT = process.env.PORT || 3001;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


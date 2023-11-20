import './App.css';

import React, { useState } from 'react';

function App() {
  const [totalMarks, setTotalMarks] = useState('');
  const [easy, setEasy] = useState('');
  const [medium, setMedium] = useState('');
  const [hard, setHard] = useState('');
  const [questionPaper, setQuestionPaper] = useState('');

  const generateQuestionPaper = async () => {
    try {
      const response = await fetch(`http://localhost:3001/generate-paper?totalMarks=${totalMarks}&easy=${easy}&medium=${medium}&hard=${hard}`);
      const data = await response.json();
      setQuestionPaper(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Failed to generate question paper:', error);
    }
  };

  return (
    <div className="App">
      <h1>Question Paper Generator</h1>
      <label htmlFor="totalMarks">Total Marks:</label>
      <input type="number" id="totalMarks" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} /><br />
      <label htmlFor="easy">Easy (%):</label>
      <input type="number" id="easy" value={easy} onChange={(e) => setEasy(e.target.value)} /><br />
      <label htmlFor="medium">Medium (%):</label>
      <input type="number" id="medium" value={medium} onChange={(e) => setMedium(e.target.value)} /><br />
      <label htmlFor="hard">Hard (%):</label>
      <input type="number" id="hard" value={hard} onChange={(e) => setHard(e.target.value)} /><br />
      <button onClick={generateQuestionPaper}>Generate Question Paper</button>
      <div className='questions'>
        <h2>Question Paper</h2>
        <pre>{questionPaper}</pre>
      </div>
    </div>
  );
}

export default App;


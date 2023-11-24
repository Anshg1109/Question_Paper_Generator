import React, { useState } from 'react';
import './App.css';
import jsPDF from 'jspdf';

function App() {
  const [totalMarks, setTotalMarks] = useState('');
  const [easy, setEasy] = useState('');
  const [medium, setMedium] = useState('');
  const [hard, setHard] = useState('');
  const [questionPaper, setQuestionPaper] = useState([]);
  const [showPDFButton, setShowPDFButton] = useState(false);
  const [error, setError] = useState('');

  const generateQuestionPaper = async () => {
    try {
      const response = await fetch(`http://localhost:3001/generate-paper?totalMarks=${totalMarks}&easy=${easy}&medium=${medium}&hard=${hard}`);
      const data = await response.json();

      if (!response.ok) {
        // alert(data.error);
        throw new Error(data.error);
      }

      const formattedData = data.questionPaper.map(({ question, marks }) => ({ question, marks }));
      setQuestionPaper(formattedData);
      setShowPDFButton(true);
      setError('');
    } catch (error) {
      setError(`Failed to generate question paper: ${error.message}`);
      setQuestionPaper([]); 
      setShowPDFButton(false);    }
  };
  const resetRequirements = () => {
    setQuestionPaper([]); 
    setShowPDFButton(false);
    setTotalMarks('');
    setEasy('');
    setMedium('');
    setHard('');
  };
  const generatePDF = (formattedData) => {
  const doc = new jsPDF();
  doc.setFontSize(12);

  
  const questionPaperText = 'Question Paper';
  const textWidth = doc.getTextWidth(questionPaperText);
  const pageWidth = doc.internal.pageSize.width;

  
  const xPos = (pageWidth - textWidth) / 2;

  
  let yPos = 10;

  
  doc.text(questionPaperText, xPos, yPos);
  yPos += 20;

  
  formattedData.forEach((item, index) => {
    doc.text(`Q.${index + 1}: ${item.question}`, 10, yPos);
    const marksTextWidth = doc.getTextWidth(`Marks: ${item.marks}`);
    const marksXPos = pageWidth - marksTextWidth - 10;
    doc.text(`Marks: ${item.marks}`, marksXPos, yPos);
    yPos += 15;
  });

  doc.save('question-paper.pdf');
  resetRequirements();
};


  return (
    <div className='container'>
      <h1 className='title'>Question Paper Generator</h1>
      <div className='input-section'>
        <label htmlFor="totalMarks">Total Marks:</label>
        <input type="number" id="totalMarks" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} />
        <label htmlFor="easy">Easy (%):</label>
        <input type="number" id="easy" value={easy} onChange={(e) => setEasy(e.target.value)} />
        <label htmlFor="medium">Medium (%):</label>
        <input type="number" id="medium" value={medium} onChange={(e) => setMedium(e.target.value)} />
        <label htmlFor="hard">Hard (%):</label>
        <input type="number" id="hard" value={hard} onChange={(e) => setHard(e.target.value)} />
        <button className='generate-btn' onClick={generateQuestionPaper}>Generate Question Paper</button>
        {showPDFButton && (
          <button className='download-btn' onClick={() => generatePDF(questionPaper)}>Download PDF</button>
        )}
      </div>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (questionPaper.length > 0 && (
        <div className="questions">
          <h2>Question Paper</h2>
          <table className="question-table">
            <thead>
              <tr>
                <th>Q No.</th>
                <th>Questions</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {questionPaper.map((item, index) => (
                <tr key={index}>
                  <td>Q.{index+1}</td>
                  <td>{item.question}</td>
                  <td>{item.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default App;

// questionUtils.js

const questionUtils = {
    generateQuestionPaper: (questions, totalMarks, distribution) => {
        const questionPaper = [];
        let remainingMarks = totalMarks;
        // Calculate the marks required for each difficulty level
        const easyMarks = (distribution.easy / 100) * totalMarks;
        const mediumMarks = (distribution.medium / 100) * totalMarks;
        const hardMarks = (distribution.hard / 100) * totalMarks;
    
        const getSelectedQuestions = (questionsArray, marks) => {
          const selectedQuestions = [];
          const shuffledQuestions = questionsArray.sort(() => 0.5 - Math.random());
          let totalSelectedMarks = 0;
    
          for (const question of shuffledQuestions) {
            if (totalSelectedMarks + question.marks <= marks) {
              selectedQuestions.push(question);
              totalSelectedMarks += question.marks;
            }
    
            if (totalSelectedMarks >= marks) {
              break; // Stop if total selected marks reach the required marks
            }
          }
          remainingMarks -= totalSelectedMarks;
          return selectedQuestions;
        };
    
        const easyQuestions = questions.filter(
          (question) => question.difficulty === 'Easy'
        );
        const mediumQuestions = questions.filter(
          (question) => question.difficulty === 'Medium'
        );
        const hardQuestions = questions.filter(
          (question) => question.difficulty === 'Hard'
        );
    
        const selectedEasyQuestions = getSelectedQuestions(
          easyQuestions,
          easyMarks
        );
        const selectedMediumQuestions = getSelectedQuestions(
          mediumQuestions,
          mediumMarks
        );
        const selectedHardQuestions = getSelectedQuestions(
          hardQuestions,
          hardMarks
        );

        if(remainingMarks === 0){
          questionPaper.push(...selectedEasyQuestions);
          questionPaper.push(...selectedMediumQuestions);
          questionPaper.push(...selectedHardQuestions);
  
          return questionPaper;
        }else {
            throw new Error('This requierment could not be fulfilled with available Questions Bank');
          }
        
        },
    };


module.exports = questionUtils;
  
// questionController.js
const express = require("express");
const asyncHandler = require("express-async-handler");

const questionModel = require('../models/questionModel');
const questionUtils = require('../utils/questionUtils');

const questionController = {
  generateQuestionPaper: asyncHandler(async (req, res) => {
    try {
      // Assuming request contains criteria like total marks and distribution percentages
      const { totalMarks, easy, medium, hard } = req.query;
      // Convert the query parameters to numbers (since they are strings by default)
      const totalMarksValue = parseInt(totalMarks);
      const easyValue = parseInt(easy);
      const mediumValue = parseInt(medium);
      const hardValue = parseInt(hard);

      // Ensure these values are valid numbers before proceeding
      if (isNaN(totalMarksValue) || isNaN(easyValue) || isNaN(mediumValue) || isNaN(hardValue)) {
        return res.status(400).json({ error: 'Invalid parameters' });
      }

      // Retrieve questions from the model
      const questions = await questionModel.getQuestions();
      // Calculate distribution based on percentages
      const distribution = {
        easy: (easyValue / 100) * totalMarksValue,
        medium: (mediumValue / 100) * totalMarksValue,
        hard: (hardValue / 100) * totalMarksValue,
      };

      // Generate question paper based on criteria using utility function
      const questionPaper = questionUtils.generateQuestionPaper(
        questions,
        totalMarksValue,
        distribution
      );

      res.status(200).json({ questionPaper });
    } catch (err) {
      res.status(500).json({ error: 'Failed to generate question paper' });
    }
  }
)};

module.exports = questionController;

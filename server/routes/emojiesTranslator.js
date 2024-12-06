const express = require('express');
const router = express.Router();

const { GoogleGenerativeAI } = require('@google/generative-ai');
console.log(process.env.GEMINI_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const llm = async (prompt) => {
  const result = await model.generateContent(
    'translate the following input to text if the input is in emoji language and to emoji language if the input is text (give me only the result dont say anything else) text: ' +
      prompt
  );
  return result.response.text();
};
router.post('/translateT2E', async (req, res) => {
  const { text } = req.body;
  console.log({ text });

  const response = await llm(text);
  console.log({ response });
  res.json({ data: response });
});

module.exports = router;

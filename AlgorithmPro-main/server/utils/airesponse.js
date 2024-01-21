const router = require('express').Router();
const OpenAI  = require('openai');
require('dotenv').config();

const openai = new OpenAI({apiKey: process.env.OPEN_AI_KEY});



router.post("/airesponse", async (req, res) => {
  console.log('hioo');

  try {
    const { prompt } = req.body;
    console.log('Prompt:', prompt);

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a programming algorithm challenger used to challenge and help developers get better at coding." },
        { role: "user", content: `Context From App: ${prompt}` },
      ],
      model: "gpt-3.5-turbo",
    });

    const responseData = completion.choices[0].message.content.trim().replace(/\n/g, "");
    console.log('Response:', responseData);

    return res.status(200).json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error('Error:', error);

    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server"
    });
  }
});

module.exports = router;

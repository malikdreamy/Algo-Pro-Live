//const express = require("express")
//require("dotenv").config();
//import { Configuration, OpenAIApi } from 'openai'
//const app = express();
//app.use(express.json());
const aiResponse = async () => {
    let question = ''
const url = window.location.pathname + '/';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: question }),
    });
    const responseData = await response.json();
    const aiResponseText = responseData.data;

    return aiResponseText;
}

module.exports = aiResponse
// const configuration = new Configuration({
//   apiKey: process.env.OPEN_AI_KEY,
// });
// const openai = new OpenAIApi(configuration);
// app.post("/find-complexity", async (req, res) => {
//   try{
//     const { prompt } = req.body;
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt:` Pretend you are a programming teacher.  Only answer programming questions. Do not answer or engage if it is not programming related
//       Question: ${prompt}
//      `,
//       max_tokens: 50,
//       temperature: 0.5,
//       top_p: 1.0,
//       frequency_penalty: 0.0,
//       presence_penalty: 0.0,
//     })
//     const responseData = response.data.choices[0].text.trim().replace(/\n/g, "");
//     return res.status(200).json({
//       success: true,
//       data: responseData
//     });
//   } catch(error){
//     return res.status(400).json({
//       success: false,
//       error: error.response
//       ? error.response.data
//       : "There was an issue on the server"
//     });

//   }
// })
//const port = process.env.PORT || 5000;
//app.listen(port, ()=> console.log(`Server listening on port ${port}`));






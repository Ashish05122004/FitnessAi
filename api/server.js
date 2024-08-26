// server.js
import express from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/api/generate", async (req, res) => {
  try {
    const basePromptPrefix = "";

    console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

    const baseCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `name : ${req.body.name}
      Height : ${req.body.height} cm
      Weight : ${req.body.weight} kg
      Age : ${req.body.age} years
      Diseases : ${req.body.ailments}
      Goal : ${req.body.userInput}
      
      Create a creative dialogue tutorial by dragon ball Z Goku (where only he speaks (!important)) who is now my Personal Fitness Trainer & Dietitian. 
      Create a daily meal plan. (prepare a detailed schedule from Mon to Sun and time-specific) (${req.body.country} - ${req.body.preference})
      Create a Workout Plan. (general)
      Create Health goals. (be funny, motivating + add a funny quick advice quote tip)\n`,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

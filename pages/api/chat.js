import express from "express";
import serverless from "serverless-http";
import { Configuration, OpenAIApi } from "openai";

const app = express();
app.use(express.json());

// OpenAI setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Use root route because Next.js API route already handles /api/chat
app.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    const reply = response.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export wrapped with serverless
export default serverless(app);

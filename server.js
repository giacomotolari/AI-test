import "./config.js"; // This will import dotenv and run the config function
import express from "express";
import logEndPoints from "./utils/logEndpoints.js";
import fs from "node:fs";

import Replicate from "replicate";

const token = process.env.AI_API_TOKEN;

const replicate = new Replicate({
  auth: token,
});



const port = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/ai-answer", (req, res) => {
  res.json({ message: "AI answer" });
});

app.post("/send-prompt", async (req, res) => {
  try {
    const input = {
      prompt: req.body.prompt,
    };
    for await (const event of replicate.stream("meta/llama-2-70b-chat", {
      input,
    })) {
      process.stdout.write(event.toString());
    }
    res.json({ message: "AI-prompt send successfully!", prompt: input });
  }
  catch {
    res.json({ message: "AI-prompt failed to send!" }).status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} \n`);
  logEndPoints(app, port);
});

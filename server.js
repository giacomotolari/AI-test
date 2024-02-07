import "./config.js"; // This will import dotenv and run the config function
import express from "express";
import logEndPoints from "./utils/logEndpoints.js";
import fs from "node:fs";

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/ai-answer", (req, res) => {
  res.json({ message: "AI answer" });
});


app.post("/send-prompt", (req, res) => {
  res.json({ message: "User registered successfully!", prompt: req.body });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} \n`);
  logEndPoints(app, port);
});

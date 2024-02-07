import "./config.js"; // This will import dotenv and run the config function
import express from "express";
import logEndPoints from "./utils/logEndpoints.js";
import fs from "node:fs";

const port = process.env.PORT;
const app = express();

app.use(express.json()); // Middleweare - This will parse incoming JSON requests and make it available under req.body property.

// Custom Middleware - This will log the incoming request to the console.
app.use((req, res, next) => {
  console.log(
    `req-log middleweare - method:${req.method} originalUrl:${req.originalUrl}`
  );
  // This will call the next middleware in the stack. If this is the last middleware, it will call the route handler. If next() is not called, the request will hang.
  next();
});

app.get("/", (req, res) => {
  console.log("request received at /");
  res.send("Hello!");
});

app.post(
  "/signup",
  (req, res, next) => {
    console.log("signup middleware.");
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ message: "Username and password are required!" });
      return;
    }
    next();
  },
  (req, res) => {
    res.json({ message: "User registered successfully!", user: req.body });
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port} \n`);
  logEndPoints(app, port);
});

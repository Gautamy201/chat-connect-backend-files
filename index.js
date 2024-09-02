const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { app, server } = require("./socket/index.js");

const url = ["https://chat-connect-app.netlify.app", "http://localhost:8080"];
app.use(
  cors({
    origin: url, // Allow this origin
    methods: ["GET", "POST"], // Specify allowed methods
    credentials: true, // Allow credentials if needed
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the chat connect api",
  });
  console.log("Welcome to the API");
});

// api end points

app.use("/api", router);

connectDB().then(() => {
  console.log("MongoDB connected");
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

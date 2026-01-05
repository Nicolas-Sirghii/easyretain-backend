// index.js
const express = require("express");
const cors = require("cors");

const app = express();

// Allow only your frontend to access (replace with your frontend URL)
app.use(cors());

// Object to send (no database)
const myObject = {
  name: "Nicolas",
  age: 38,
  hobby: "coding"
};

// GET endpoint
app.get("/data", (req, res) => {
  res.json(myObject);
});

// Use environment variable PORT or default 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

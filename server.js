const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// allow requests from browser
app.use(cors());

// the object you want to access
const data = {
  name: "Nicolai",
  role: "Frontend Developer",
  skills: ["HTML", "CSS", "JavaScript", "Node.js"],
  active: true
};

// endpoint
app.get("/api/data", (req, res) => {
  res.json(data);
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

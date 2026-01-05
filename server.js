const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// The data object
const data = {
  name: "Nicolai",
  role: "Frontend Developer",
  skills: ["HTML", "CSS", "JavaScript", "Node.js"],
  active: true
};

// Endpoint
app.get("/api/data", (req, res) => {
  res.json(data);
});

// Listen on Render’s port or local 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

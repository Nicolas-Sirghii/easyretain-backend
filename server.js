const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ⚡ MySQL connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "databaseCode1",
  database: "easyretain"
});

// GET all posts
app.get("/api/posts", (req, res) => {
  db.query("SELECT * FROM posts ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST new post
app.post("/api/posts", (req, res) => {
  const { content } = req.body;
  db.query("INSERT INTO posts (content) VALUES (?)", [content], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Post added", id: result.insertId });
  });
});

// PUT: update last post
app.put("/api/posts", (req, res) => {
  const { content } = req.body;
  // get last post
  db.query("SELECT id FROM posts ORDER BY id DESC LIMIT 1", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: "No post to update" });
    const lastId = results[0].id;
    db.query("UPDATE posts SET content = ? WHERE id = ?", [content, lastId], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({ message: "Last post updated", id: lastId });
    });
  });
});

// DELETE: delete last post
app.delete("/api/posts", (req, res) => {
  db.query("SELECT id FROM posts ORDER BY id DESC LIMIT 1", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: "No post to delete" });
    const lastId = results[0].id;
    db.query("DELETE FROM posts WHERE id = ?", [lastId], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({ message: "Last post deleted", id: lastId });
    });
  });
});

// ⚡ Start server on Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import db from "./db.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM messages");
    res.render("index", { messages: results, error: null });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).render("index", {
      messages: [],
      error: "Unable to load messages",
    });
  }
});

app.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    await db.query("INSERT INTO messages (message) VALUES (?)", [message]);
    res.redirect("/");
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).render("index", {
      messages: [],
      error: "Unable to save message",
    });
  }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));

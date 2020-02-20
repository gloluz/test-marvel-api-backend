const express = require("express");
const cors = require("cors");
const formidableMiddleware = require("express-formidable");

const app = express();
app.use(formidableMiddleware());
app.use(cors());

const character = require("./routes/character");
const characters = require("./routes/characters");
const comics = require("./routes/comics");
const favorites = require("./routes/favorites");

app.get("/", async (req, res) => {
  try {
    return res.json({ message: "Welcome to marvel API" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.use(characters);

app.use(character);

app.use(comics);

app.use(favorites);

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});

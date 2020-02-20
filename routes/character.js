require("dotenv").config();

const express = require("express");
const router = express.Router();
const axios = require("axios");
const md5 = require("md5");

const server = express();

// READ BY ID

router.get("/character/:id", async (req, res) => {
  const publickey = process.env.YOUR_PUBLIC_KEY;
  const privatekey = process.env.YOUR_PRIVATE_KEY;
  const date = new Date();
  const ts = date.getTime().toString();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/characters/${req.params.id}?ts=${ts}&apikey=${publickey}&hash=${hash}`
    );

    res.json(response.data.data.results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

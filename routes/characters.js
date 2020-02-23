require("dotenv").config();

const express = require("express");
const router = express.Router();
const axios = require("axios");
const md5 = require("md5");

const server = express();

// READ

router.get("/characters", async (req, res) => {
  console.log("coucou");

  const publickey = process.env.YOUR_PUBLIC_KEY;
  const privatekey = process.env.YOUR_PRIVATE_KEY;
  const date = new Date();
  const ts = date.getTime().toString();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const limit = req.query.limit || 100;
  const offset = req.query.offset || 0;
  const search = req.query.nameStartsWith || null;

  try {
    if (search) {
      const response = await axios.get(
        `${process.env.BASE_URL}/characters?orderBy=name&limit=${limit}&offset=${offset}&nameStartsWith=${search}&ts=${ts}&apikey=${publickey}&hash=${hash}`
      );
      res.json(response.data);
    } else {
      const response = await axios.get(
        `${process.env.BASE_URL}/characters?orderBy=name&limit=${limit}&offset=${offset}&ts=${ts}&apikey=${publickey}&hash=${hash}`
      );

      res.json(response.data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const formidableMiddleware = require("express-formidable");

const server = express();
server.use(formidableMiddleware());

router.get("/favorites", async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

//? Index
const express = require("express");

const router = express.Router();

router.get("/ejs", (req, res) => {
  res.send('intento')
});

module.exports = router;

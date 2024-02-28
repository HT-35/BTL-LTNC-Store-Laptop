const router = require("express").Router();

router.get("/", (req, res) => {
  req.statusCode(200)
});

module.exports = router;

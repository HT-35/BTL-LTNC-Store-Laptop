const HomePageRouter = require("express").Router();
import { Json } from "./../node_modules/sequelize/types/utils.d";

HomePageRouter.get("/", (req, res) => {
  req.statusCode(200).Json({
    status: true,
    data: "welcome to IUH",
  });
});

module.exports = router;

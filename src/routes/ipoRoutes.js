
const express = require("express");
const { getIPOListings } = require("../controller/ipoController");

const ipoRouter = express.Router();

ipoRouter.get("/", getIPOListings);

module.exports = ipoRouter;

const express = require("express")
const {
  home
} = require("../Controllers/indexController")


let router = express.Router()



router.get("/", home)

module.exports = router
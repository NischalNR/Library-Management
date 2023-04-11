const express = require("express");
const {
  getAllBooks,
  CreateBook,
  newBook,
  upload
} = require("../controllers/booksController");
const router = express.Router();



router.get("/", getAllBooks)
router.post("/", upload.single("cover"), CreateBook)
router.get("/new", newBook)

module.exports = router
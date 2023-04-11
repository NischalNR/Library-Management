const express = require("express")
const {
  getAllAuthors,
  createAuthor,
  newAuthor,
  viewAuthor,
  removeAuthor
} = require("../Controllers/authorControllers")


let router = express.Router()


// get all authors
router.get("/", getAllAuthors)
// create authors
router.post("/", createAuthor)
// new author
router.get("/new", newAuthor)
//view author
router.get("/:id", viewAuthor)

////edit author
// router.get("/:id/edit",viewAuthor)

// //update author
// router.put("/:id",updateAuthor)

//delete Author
router.post("/:id", removeAuthor)

module.exports = router
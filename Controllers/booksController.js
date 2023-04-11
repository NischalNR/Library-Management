const Book = require("../Model/book")
const Author = require("../Model/author")
const multer = require("multer")
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

let upload = multer({
  storage: storage
})

async function getAllBooks(req, res) {
  let query = Book.find().lean()
  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"))
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    query = query.lte("publishDate", req.query.publishedBefore);
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
    query = query.gte("publishDate", req.query.publishedAfter);
  }
  try {
    const books = await query.exec();
    res.render("books/index", {
      books
    });
  } catch {
    res.redirect("/");
  }
}

async function CreateBook(req, res) {
  let book = {
    title: req.body.title,
    publishDate: new Date(req.body.publishDate),
    author: req.body.author,
    description: req.body.description,
    cover: req.file

  }
  //console.log(req.file);
  // console.log(book);
  try {
    await Book.create(book)

    res.redirect("/books")
  } catch {
    if (book.cover != null) {
      removeCover(book.cover)
    }
    renderNewPage(res, book, true)
  }
}
async function newBook(req, res) {
  renderNewPage(res, new Book())
}

async function renderNewPage(res, book, hasError = false) {
  try {
    let author = await Author.find({}).lean()

    let params = {
      author: author,
      book: book
    }
    if (hasError) {
      params.errorMessage = "Couldn't Create book"
    }
    res.render("books/new", params)

  } catch {
    res.redirect("/")
  }
}

function removeCover(cover) {

  fs.unlink(path.join("public/uploads", cover.filename), (err) => {
    if (err)
      console.log(err);
  })

}

module.exports = {
  getAllBooks,
  CreateBook,
  newBook,
  upload
}
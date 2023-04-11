let Book = require("../Model/book")

async function home(req, res) {
  try {
    let books = await Book.find().lean().sort({
      "createdAt": "desc"
    }).limit(10)
    res.render("index", {
      books
    })
  } catch (error) {
    books = []
  }
}
module.exports = {
  home
}
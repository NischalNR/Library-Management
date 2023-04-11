const Author = require("../Model/author");

function newAuthor(req, res) {
  res.render("authors/new");
}

async function getAllAuthors(req, res) {
  let searchOptions = {};
  if (req.query.name != null || req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    let author = await Author.find(searchOptions).lean();
    res.render("authors/index", {
      author,
      query: req.query.name,
    });
  } catch (error) {
    res.render("authors/index", {
      error: "Couldn't find authors",
    });
  }
}
async function createAuthor(req, res) {
  let name = {
    name: req.body.name,
  };
  try {
    await Author.create(name);
    res.redirect("/authors");
  } catch (error) {
    res.render("authors/new", {
      error: "Couldn't create authors",
    });
  }
}

async function viewAuthor(req, res) {
  try {
    let author = await Author.findById({ _id: req.params.id });
    res.render("authors/viewAuthor", { author });
  } catch {
    res.redirect("/authors");
  }
}

async function removeAuthor(req, res) {
  try {
    let author = await Author.findById({ _id: req.params.id });
    let remove = await Author.deleteOne(author);
    res.redirect("authors/index", { remove });
  } catch {
    res.redirect("/authors");
  }
}

module.exports = {
  getAllAuthors,
  createAuthor,
  newAuthor,
  viewAuthor,
  removeAuthor,
};

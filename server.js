if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { engine } = require("express-handlebars");
const library = require("./Routers/index");
const handlebars = require("handlebars");
const authorRouter = require("./Routers/authorRouter");
const booksRouter = require("./Routers/bookRouter");
const mongoose = require("mongoose");
let app = express();

mongoose.set("strictQuery", "true");
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) throw err;
  console.log("db connected");
});

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

handlebars.registerHelper("trimString", function (pathString) {
  let newString = pathString.slice(6);
  console.log(newString);
  return new handlebars.SafeString(newString);
});

app.use("/", library);
app.use("/authors", authorRouter);
app.use("/books", booksRouter);

app.listen(process.env.PORT || 4000, (err) => {
  if (err) throw err;
  console.log("the server is running on port 4000...");
});

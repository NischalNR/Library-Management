const {
    Schema,
    model,
    default: mongoose
} = require("mongoose")
const author = require("../Model/author")

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        required: true

    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Author"
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    cover: {
        type: [""],
        required: true
    }

})
module.exports = model("Books", bookSchema)
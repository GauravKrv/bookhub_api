const mongoose = require('mongoose');
const BookSchema = mongoose.Schema(
    {
    ISBN: String,
    title : String,
    pubDate : String,
    language : String,
    numPage : Number,
    author : [Number],//suppose there are t wo authors for this book with id 1 and 2
    publications : [Number],
    category : [String]
}
);

const BookModel = mongoose.model("Books",BookSchema);

module.exports = BookModel;


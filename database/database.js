const books = [
{
    ISBN : "12345Book",
    title : "Tesla",
    pubDate : "2020-08-05",
    language : "en",
    numPage : "250",
    author : [1,2],//suppose there are t wo authors for this book with id 1 and 2
    publications : [1],
    category : ["tech", "space", "education"]
}

]

const author = [
    {
        id : 1,
        name : "Gaurav krv",
        books : ["12345Book", "12345karve"]
    },
    {
        id : 2,
        name : "Elon Musk",
        books : ["12345Book"]
    }
]

const publication = [
    {
        id : 1,
        name : "writerx",
        books : ["12345Book"]
    },
    {
        id : 2,
        name : "writer2",
        books : []
    }
]
//we have to export this data set or arrays of objects above and use it in some other files so .. 
module.exports = {books, author, publication};
require('dotenv').config();

const express = require("express");
const bookaz = express();
//Database object to access all the properties in it
const database = require("./database/database");

/* ----------------------------- require mngoose => works as interpreter between mongodb and us---------------------------- */
const mongoose = require('mongoose');

/* //!--------------------------- connecting mongoose with mongodb in our cloud which we created using the user name ad passwerd and database name AND HIDING IN .ENV FILE SO THAT THING ARE NOT VISIBLE WHEN ANYONE INSPECT IT-------------------------- */
mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => 
console.log("Connection Established"));

//!importing all the data models we created
const BookModel = require('./database/books')
const AuthorModel = require('./database/author')
const PublicationiModel = require('./database/publication')


/* --------------------------- Import body parser --------------------------- */
var bodyParser = require("body-parser");
bookaz.use(bodyParser.urlencoded({ extended: true }));
bookaz.use(bodyParser.json());
/* ------------------------------------ 1 ----------------------------------- */
/* Description of below API
Route           /  -> (root)
Description     Get all the books
Access          PUBLIC??
Parameter       NONE
Methods         GET
*/

bookaz.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
  return res.json({ books: getAllBooks });
});

/* ------------------------------------ 2 ----------------------------------- */
/* Description of below API
Route           /is  -> (root)
Description     Get specific book on ISBN
Access          PUBLIC??
Parameter       ISBN
Methods         GET
*/
bookaz.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );
  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/* ------------------------------------ 3 ----------------------------------- */
/* Description of below API
Route           /c  -> (root)
Description     Get a list of books based on category
Access          PUBLIC??
Parameter       Category
Methods         GET
*/
bookaz.get("/c/:category", (req, res) => {
  const getSpecificBookOnCategory = database.books.filter(
    (book) => book.category.includes(req.params.category) //*use of "includes"
  );
  if (getSpecificBookOnCategory.length === 0) {
    return res.json({
      error: `No book found for the Category of ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBookOnCategory });
});

/* ------------------------------------ 4 ----------------------------------- */
/* Description of below API
Route           /l  -> (root)
Description     Get a list of books based on languages
Access          PUBLIC??
Parameter       Language
Methods         GET
*/
bookaz.get("/l/:language", (req, res) => {
  const getSpecificBookOnLanguage = database.books.filter(
    (book) => book.language == req.params.language //*use of "includes"
  );
  if (getSpecificBookOnLanguage.length === 0) {
    return res.json({
      error: `No book found for the Language of ${req.params.language}`,
    });
  }

  return res.json({ book: getSpecificBookOnLanguage });
});

/* ------------------------------------ 5 ----------------------------------- */
/* Description of below API
Route           /author  -> (root)
Description     Get all the authors
Access          PUBLIC??
Parameter       NONE
Methods         GET
*/
bookaz.get("/author", (req, res) => {
  return res.json({ authors: database.author });
});

/* ------------------------------------ 6 ----------------------------------- */
/* Description of below API
Route           /author  -> (root)
Description     get a specifc author
Access          PUBLIC??
Parameter       authorName
Methods         GET
*/
bookaz.get("/author/:authorName", (req, res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.name == req.params.authorName //*use of "includes"
  );
  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No book found for the given Autor ${req.params.authorName}`,
    });
  }

  return res.json({ authors: getSpecificAuthor });
});

/* ------------------------------------ 7 ----------------------------------- */
/* Description of below API
Route           /author/book  -> (root)
Description     get a list of author based books
Access          PUBLIC??
Parameter       isbn
Methods         GET
*/
bookaz.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthorOnBook = database.author.filter(
    (author) => author.books.includes(req.params.isbn) //*use of "includes"
  );
  if (getSpecificAuthorOnBook.length === 0) {
    return res.json({
      error: `No Author found for the given book ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificAuthorOnBook });
});

/* ------------------------------------ 9 ----------------------------------- */
/* Description of below API
Route           /publications  -> (root)
Description     Get all the publications
Access          PUBLIC??
Parameter       NONE
Methods         GET
*/
bookaz.get("/publications", (req, res) => {
  return res.json({ publication: database.publication });
});

/* ------------------------------------ 10 ----------------------------------- */
/* Description of below API
Route           /publications  -> (root)
Description     get a specific publication
Access          PUBLIC??
Parameter       id
Methods         GET
*/

bookaz.get("/publications/:id", (req, res) => {
  const getSpecificPublication = database.publication.filter(
    (publication) => publication.id === parseInt(req.params.id)
  );

  if (getSpecificPublication.length === 0) {
    return res.json({
      error: `No such publication found for id ${req.params.id}`,
    });
  }

  return res.json({ publications: getSpecificPublication });
});

/* ------------------------------------ 11 ----------------------------------- */
/* Description of below API
Route           /publications/book  -> (root)
Description     get a list of publication based on books
Access          PUBLIC??
Parameter       ISBN
Methods         GET
*/
bookaz.get("/publications/book/:isbn", (req, res) => {
  const getSpecificPublicationBook = database.publication.filter(
    (publication) => publication.books.includes(req.params.isbn) //*use of "includes"
  );
  if (getSpecificPublicationBook.length === 0) {
    return res.json({
      error: `No Publication found for the given book ${req.params.isbn}`,
    });
  }

  return res.json({ publications: getSpecificPublicationBook });
});

//DONE FOR DAY 1 API PROJECT
//POST

/* ------------------------------------ 1 ----------------------------------- */
/* Description of below API
Route           /book/new  -> (root)
Description     Add or post new books in our database
Access          PUBLIC??
Parameter       NONE
Methods         POST
*/
bookaz.post("/book/new", (req, res) => {
  const newBook = req.body; //body will be created in json format as out dbase is in json, through other ways
  database.books.push(newBook);
  return res.json({ updatedBooks: database.books });
});

/* ------------------------------------ 2 ----------------------------------- */
/* Description of below API
Route           /author/new  -> (root)
Description     Add or post new author in our database
Access          PUBLIC??
Parameter       NONE
Methods         POST
*/

bookaz.post("/author/new", (req, res) => {
  const newAuthor = req.body; //body will be created in json format as out dbase is in json, through other ways
  database.author.push(newAuthor);
  return res.json({ updatedAuthors: database.author });
});

/* ------------------------------------ 3 ----------------------------------- */
/* Description of below API
Route           /publications/new  -> (root)
Description     Add or post new Publication in our database
Access          PUBLIC??
Parameter       NONE
Methods         POST
*/

bookaz.post("/publications/new", (req, res) => {
  const newPub = req.body;
  if (database.publication.includes(newPub) == false) {
    database.publication.push(newPub);
  }

  return res.json({ newPublications: database.publication });
});

//PUT
/* ------------------------------------ 1 ----------------------------------- */
/* Description of below API
Route           /publication/update/book/  -> (root)
Description     Add or UPDATE new Publication in our database
Access          PUBLIC??
Parameter       ISBN
Methods         PUT
*/

bookaz.put("/publications/update/book/:isbn", (req, res) => {
  //Update the publication database and nothing to be returned so use forEach loop to iterate
  database.publication.forEach((pub) => {
    if (pub.id === req.body.pubId) {
      //if the id in bdy matches with any id in my publication then update the puvliacation value for that book present in the request body
      pub.books.push(req.params.isbn);
    }
  });

  //Update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      //MAMMSS  book.publications = req.body.pubId;  //think is wrong here i.e are WE UPDATING PUBLICAION FOR A BOOK OR ADDING ANOTHER PUBLICATION TO EXISTING
      book.publications.push(req.body.pubId); //MYYYYY
      return; //!why we return here  == GOOD PRACTICE- To stop the program gracefully
    }
  });

  return res.json({
    books: database.books,
    publications: database.publication,
    message: "Successfully updated publications",
  });
});
//DELETE
/* ------------------------------------ 1 ----------------------------------- */
/* Description of below API
Route           /book/delete  -> (root)
Description     Delete a book
Access          PUBLIC??
Parameter       ISBN
Methods         DELETE
*/
bookaz.delete("/book/delete/:isbn", (req, res) => {
  //Whichever book doesnt match with isbn, just send it to an updatedBookDatabaseArray and rest will be filtered out
  const updatedBookDatabaseArray = database.books.filter((book) => {
    book.ISBN !== req.params.isbn;
  });
  //Splice is not good thing for memory reasons by mam but can use
  database.books = updatedBookDatabaseArray;
  return res.json({ books: database.books });
});

/* ------------------------------------ 2 ----------------------------------- */
/* Description of below API
Route           /book/delete/author/ -> (root)
Description     Delete author from book and related book from author
Access          PUBLIC??
Parameter       ISBN, AUTHOR-ID
Methods         DELETE
*/
bookaz.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
  //UPDATE THE BOOK DATABASE
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthorList = book.author.filter((authId) => {
        authId !== parseInt(req.params.authorId);
      }); //if authors not match with the passed id then add to new author list
      book.author = newAuthorList;
      return;
    }
  });

  //UPDATE THE AUTHOR DATABASE
  database.author.forEach((author) => {
    if (author.id === parseInt(req.params.authorId)) {
      const newIsbnList = author.books.filter(
        (isbn) => isbn !== req.params.isbn
      );

      author.books = newIsbnList;
      return;
    }
  });

  return res.json({
    book: database.books,
    author: database.author,
    message: "Author was deleted!!!",
  });
});

//?OTHER  WAY
/* bookaz.delete('/book/author/delete/:isbn/:authid', (req,res) => {
    //Delte author from book
    database.books.forEach((book) =>{
        if(book.author.includes[parseInt(req.params.authid)] && book.ISBN==req.params.isbn){
            book.author.splice(book.author.indexOf(parseInt(req.params.authid)),1);
        }
    });

    return res.json({
        books: database.books
    });
})
 */

/* ------------------------------------ 3 ----------------------------------- */
/* Description of below API
Route           /book/author/delete/:authorId -> (root)
Description     Delete author from book
Access          PUBLIC??
Parameter       AUTHOR-ID
Methods         DELETE
*/
bookaz.delete("/book/author/delete/:isbn/:authorId", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthorList = book.author.filter(
        (authorId) => authorId !== parseInt(req.params.authorId)
      );
      book.author = newAuthorList;
      return;
    }
  });

  return res.json({
    books: database.books,
    message: "Deleted Authors from the given book Successfully!",
  });
});

bookaz.listen(3000, () => {
  console.log("Server is up and running");
});

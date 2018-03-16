import axios from "axios";


// export default {
//   // Gets all books
//   getBooks: function(response) {
//     return axios.get("https://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?query=ipod&format=json&apiKey=ksnm9gjdt5ubq6mxkdq2wash")
//   },
//   // Gets the book with the given id
//   getBook: function(id) {
//     return axios.get("/api/books/" + id);
//   },
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
//   // Saves a book to the database
//   saveBook: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
// };

// import axios from "axios";
const CORS = 'https://cors-anywhere.herokuapp.com/'
const BASEURL = "http://api.walmartlabs.com/v1/search?query="

const APIKEY = "&format=json&apiKey=ksnm9gjdt5ubq6mxkdq2wash";

export default {
  search: function(query) {
    return axios.get(CORS + BASEURL + query.title + APIKEY, {
      crossdomain: true
    });
  }, 

  addToTrackedList: function(query) {
    console.log(query)
    return axios.post('/toTracked', query)
  }
};
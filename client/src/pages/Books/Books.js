import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import "./Books.css";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    ASIN: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        console.log(res)
        this.setState({ books: res.data.items, title: "", author: "", ASIN: "" })
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.ASIN
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-8 sm-8">
            <Jumbotron>
              <h3>Search by author, title, ASIN # or product desription</h3>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author"
              />
              <Input
                value={this.state.ASIN}
                onChange={this.handleInputChange}
                name="ASIN #"
                placeholder="ASIN #"
              />
              {/* <Input
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Product Description"
              /> */}
              {/* <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
              <FormBtn
                disabled={!(this.state.author && this.state.itemId)}
                onClick={this.handleFormSubmit}
              >
                Submit Query
              </FormBtn>
            </form>

            <List>
                {this.state.books.map(book => (
                  <ListItem key={book.itemId}>
                    <Link to={"/books/" + book.itemId}>
                      <strong>
                        <div className="card border-primary mb-3" style={{ maxWidth: 100}}>
                          <img className="card-im-top" src={book.mediumImage} alt="Product"></img>
                            <div className="card-body">
                              <h4 className="card-title">${book.salePrice}</h4>
                              <p className="card-text">{book.name}</p>
                            </div>
                        </div>
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book.itemId)} />
                  </ListItem>
                ))}
              </List>
          </Col>
          <Col size="md-4 sm-4">
            <Jumbotron>
              <h2>Tracking:</h2>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.itemId}>
                    <Link to={"/books/" + book.itemId}>
                      <strong>
                        <img src={book.mediumImage}></img>
                        <h4>${book.salePrice}</h4>
                        <p>{book.name}</p>
                        {/* <p>Item #: {book.itemId}</p> */}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book.itemId)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h4>Not tracking anything yet</h4>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
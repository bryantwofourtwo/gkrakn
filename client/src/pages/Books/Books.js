import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import "./Books.css";

class Books extends Component {
  state = {
    books: [],
    tracked: [],
    title: "",
    author: "",
    ASIN: "",
    // search: ''

  };

  componentDidMount() {
    

    // this.loadBooks(this.search);
  }


  loadBooks = query => {
        this.setState({ books: query.data.items })
        console.log(query)

  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    console.log(event.target.value)
    // { name, value } = event.target;
    this.setState({
     [name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    
    event.preventDefault();

 
      API.search({
        title: this.state.title,
        // author: this.state.author,
        // synopsis: this.state.ASIN

      })
        .then(res => this.loadBooks(res))
        .catch(err => console.log(err));
    }
  
    addToTracked = event => {
        console.log(event.target)
        var image = event.target.img;
        console.log(image);

    var toTracked = {
      image: event.target.img,
      title: event.target.title,
      price: event.target.sale
    }
    console.log("hello", toTracked)
      API.addToTrackedList(toTracked) 
      .then(res => (console.log(res)))

    }
      


  render() {
    var btnClass;

    if (this.state.bookSchema) {
        btnClass = "btn btn-danger"
    } else {
        btnClass = "btn btn-primary";
    }
    return (
      <Container fluid>
        <Row>
          <Col size="md-8 sm-8">
            <Jumbotron>
              <h3>Search by Item or ASIN #</h3>

            </Jumbotron>
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title"
                id="query"
              />
              {/* <Input
                value={this.state.author}

                onChange={this.handleInputChange}
                name="author"
                placeholder="Author"
              /> */}
              <Input
                value={this.state.msrp}
                onChange={this.handleInputChange}
                name="ASIN #"
                placeholder="ASIN # (Optional)"
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
              <Row>
              
              <FormBtn

                // disabled={!(this.state.author && this.state.itemId)}
                onClick={this.handleFormSubmit}

                >Submit Query
              </FormBtn>
              </Row>
              
            </form>
          
            <List>
                {this.state.books.map(book => (
                  <ListItem key={book.itemId}>
                
                      <strong>
                        <div className="card border-primary mb-3" id="rescon">
                          <img className="card-im-top" src={book.mediumImage} alt="Product"></img>
                            <div className="card-body">
                              <h4 className="card-title">${book.salePrice}</h4>
                              <p className="card-text">{book.name}</p>
                              <button href="" img={book.mediumImage} title={book.name}
                              sale={book.salePrice}
                              onClick={this.addToTracked} className={btnClass}>Track Item</button>
                            </div>
                        </div>
                      </strong>
                  
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
                {this.state.tracked.map(trackedItem => (
                  <ListItem key={trackedItem.itemId}>
                    <Link to={"/trackedItems/" + trackedItem.itemId}>
                      <strong>
                        <img src={trackedItem.mediumImage} alt={trackedItem.name}></img>
                        <h4>${trackedItem.salePrice}</h4>
                        <p>{trackedItem.name}</p>
                        {/* <p>Item #: {trackedItem.itemId}</p> */}
                        
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deletetrackedItem(trackedItem.itemId)}>

                    </DeleteBtn>
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
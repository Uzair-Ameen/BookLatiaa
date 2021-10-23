import React from 'react';

import "bootstrap/dist/css/bootstrap.css"
import NavigationBar from "./NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css'
import Welcome from "./Welcome";
import Footer from "./Footer";
import BookList from "./BookList";
import Book from "./Book";
import About from './About';
import SearchResults from "./SearchResults";

function App() {
    const columnStyle = {
        marginTop: "20px",
        marginBottom: "20px"
    }
    return (
        <div>
            <Router>
                <NavigationBar/>
                <Container fluid>
                    <Row>
                        <Col lg={12} style={columnStyle}>
                            <Switch>
                                <Route exact path="/">
                                    <Welcome/>
                                </Route>
                                <Route exact path="/add">
                                    <Book/>
                                </Route>
                                <Route exact path="/list">
                                    <BookList/>
                                </Route>
                                <Route exact path="/about">
                                    <About/>
                                </Route>
                                <Route path="/edit/:issbn">
                                    <Book/>
                                </Route>
                                <Route exact path="/search/:keyword">
                                    <SearchResults/>
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;

import React, {useEffect, useState} from 'react'
import {InputGroup, Button, Card, Col, Container, FormControl, Jumbotron, Row} from "react-bootstrap";
import SideBar from "./SideBar";
import axios from 'axios'
import BookCard from "./BookCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
function Welcome() {

        const [books, setBooks] = useState([]);
        const [genres, setGenres] = useState([]);
        const [page, setPage] = useState(1);
        const [number, setNumber] = useState(15);
        const [totalBook, setTotalBook] = useState(0)
        const [genre, setGenre] = useState("")

        useEffect(() => {
            axios.get('http://localhost:8080/api/books/genres').then(res => {
                setGenres(res.data)
            })
        }, [])
        useEffect(() => fetchBooks(), [page, genre]);
        useEffect(() => getBookCount(), [])


        const getBookCount = () => {
            axios.get(`http://localhost:8080/api/books/allBooks`).then(response => setTotalBook(response.data))
        }

        const fetchBooks = () => {
            const url = genre === "" ? `http://localhost:8080/api/books/${page}/${number}`:
                `http://localhost:8080/api/books/${genre}/${page}/${number}`;
            axios.get(url).then(response => {
                setBooks(response.data);
                //setBooksT(response.data);
            });
        }

        const items = genres.
        map(g => ({label: g, onClick: () => {
                setGenre(g)
                setPage(1)
            }}));
        items.push({label: "All", onClick: () => {
                setGenre("")
                setPage(1)
        }})

    const formControlStyle = {
        background: "none",
        border: "1px solid #3d7abf",
        borderRadius: 0,
        boxShadow: "none",
        outline: "none",
        color: "#4e76b8",
        width: "50px"
    }

    let totalPages = Math.ceil(totalBook / number);
    return (
            <div style={{marginBottom: "20px"}}>
                <div>
                    <Row noGutters={true}>
                        <Col xs={1} lg={2}>
                            <SideBar items={items}/>
                        </Col>
                        <Col xs={2} lg={10}>
                             <Container fluid>
                                 <Jumbotron className="bg-dark text-white">
                                     <h1>Welcome to BookLatia</h1>
                                     <blockquote className="blockquote mb-0">
                                         Good friends, good books, and a sleepy conscience: this is the ideal life.
                                     </blockquote>
                                     <footer className="blockquote-footer">
                                         Mark Twain
                                     </footer>
                                 </Jumbotron>
                                 <Card bg={"dark"} text={"light"}>
                                     <Card.Header>
                                         Books
                                     </Card.Header>
                                     <Card.Body>
                                         <Row noGutters={true} md={2} xs={1} lg={6}>
                                             {
                                                 books.map(b => (
                                                     <Col>
                                                         <BookCard book={b}/>
                                                     </Col>
                                                 ))
                                             }
                                         </Row>
                                     </Card.Body>
                                     <Card.Footer className={"text-light"}>
                                         <div style={{"float": "left"}}>
                                             Showing page {page} of {totalPages}
                                         </div>
                                         <div style={{"float": "right"}}>
                                             <InputGroup size={"sm"}>
                                                 <InputGroup.Prepend>
                                                     <Button text={"white"}
                                                             variant={"outline-primary"}
                                                             onClick={() => setPage(1)}>
                                                         First
                                                     </Button>
                                                     <Button text={"white"}
                                                             variant={"outline-primary"}
                                                             onClick={() => setPage(page - 1)}
                                                             disabled={page <= 1}>
                                                         <FontAwesomeIcon icon={faArrowLeft}/>
                                                     </Button>
                                                 </InputGroup.Prepend>
                                                 <FormControl type={"number"}
                                                              style={formControlStyle}
                                                              value={page}
                                                              onChange={(e) => setPage(e.target.value)}/>
                                                 <InputGroup.Append>
                                                     <Button text={"white"}
                                                             variant={"outline-primary"}
                                                             onClick={() => setPage(page + 1)}
                                                             disabled={page >= totalPages}>
                                                         <FontAwesomeIcon icon={faArrowRight}/>
                                                     </Button>
                                                     <Button text={"white"} variant={"outline-primary"}
                                                             onClick={() => setPage(totalPages)}>
                                                         Last
                                                     </Button>
                                                 </InputGroup.Append>
                                             </InputGroup>
                                         </div>
                                     </Card.Footer>
                                 </Card>
                             </Container>
                        </Col>
                    </Row>
                </div>

            </div>

        );
    }

export default Welcome;